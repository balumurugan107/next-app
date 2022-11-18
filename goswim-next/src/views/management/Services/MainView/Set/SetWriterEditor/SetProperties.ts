import _ from 'lodash';
import {
  msToSeconds,
  nativeFind
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/utils';
import { defaultSWEWorkoutEnums } from 'src/views/management/Services/MainView/Set/SetWriterEditor/constants';
import ShowHint from 'src/views/management/Services/MainView/Set/SetWriterEditor/ShowHint';
import CPVM from 'src/views/management/Services/MainView/Set/SetWriterEditor/helpers/checkPreviousValueMatches';
import {
  Set,
  SetProps as ISetProps,
  TraceItem,
  SWEditorProps,
  SWEWorkoutEnums,
  SWEWorkoutEnumsDefaultValues,
  SetPropsEnumProperty,
  SWEWorkoutEnumProps
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

const defaultSetPropsEnumPropertyValue: SetPropsEnumProperty = { id: '', name: '' };

export default class SetProperties {
  public distance: Set['distance'] = 0;
  public time: Set['time'];
  public setProps: Set['setProps'] = [];
  public intervalData: string[];
  public isError: boolean = false;
  private masterIteration: number | null = null;
  private remainingMasterIteration: number | null = null;
  private masterDistance: number | null = null;
  private workoutEnums: SWEWorkoutEnums = { ...defaultSWEWorkoutEnums };
  private isRemainingMasterIterationValid: boolean = false;

  constructor(
    public setText: Set['setText'],
    public multiplier: Set['multiplier'],
    public swimmers: Set['swimmers'] | null,
    public groupName: Set['groupName'] | null,
    public line: number,
    private props: SWEditorProps,
    private sweWorkoutEnumsDefaultValues: SWEWorkoutEnumsDefaultValues,
    private editor: CodeMirror.Editor,
    private showHint: ShowHint,
    private workoutEnumsArray: string[]
  ) {
    const cursor = this.editor.getCursor();
    const splitLastTextFromSeperator = this.editor
      .getRange({ ...cursor, ch: 0 }, { ...cursor })
      .match(/\S+$/g)
      ?.slice(-1)
      .pop();

    if (splitLastTextFromSeperator) {
      this.showHint.renderHint({ suggestionText: splitLastTextFromSeperator });
    }
    if (this.props.workoutEnums) {
      this.workoutEnums = { ...this.props.workoutEnums };
    }
    this.intervalData = setText
      .split(',')
      .filter(Boolean)
      .reduce<string[]>(this.modifyAndConstructIntervalData, [])
      .reduce<string[]>(this.filterAndRefineIntervalData, []);
    this.assignSetText();
    this.processAndAssignDistance();
    this.processIntervalData();
    this.handleRemainingMasterIteration();
  }

  /**
   * @description handle remaining master iteration if any is present
   */
  private handleRemainingMasterIteration = () => {
    if (!this.remainingMasterIteration || !this.isRemainingMasterIterationValid) {
      return;
    }
    const setProps = new SetProps();
    setProps.iteration = this.remainingMasterIteration;
    setProps.interval = 120;
    setProps.value = this.checkIfNegativeValue(setProps.iteration * (this.masterDistance || 0));
    this.time += this.checkIfNegativeValue(setProps.iteration * setProps.interval);
    this.setProps.push(setProps.toJSON());
  };

  private assignSetText = () => {
    const swimmerText = this.swimmers
      ? `#${this.swimmers?.map(datum => datum.name)?.join(', ')}\n`
      : this.groupName
      ? `#${this.groupName}`
      : '';
    const multiplierText = this.multiplier !== 1 ? `${this.multiplier}x\n` : '';
    this.setText = `${swimmerText}${multiplierText}${this.setText}`;
  };

  private checkIfNegativeValue = (value: number) => (value <= 0 ? 0 : value);

  /**
   *@description Converts the instance to JSON
   */
  toJSON(): TraceItem {
    const {
      multiplier,
      distance,
      time,
      setProps,
      line,
      isError,
      setText,
      swimmers,
      groupName
    } = this;
    return {
      multiplier,
      distance,
      time,
      setProps,
      line,
      isError,
      setText,
      ...(swimmers && { swimmers }),
      ...(groupName && { groupName })
    };
  }

  validate = () => {
    this.isError = !this.distance;
    return this;
  };

  applyDefaults = () => {
    for (let i = 0; i < this.setProps.length; i++) {
      if (!this.setProps[i].stroke.id || !this.setProps[i].stroke.name)
        this.setProps[i].stroke = { ...this.sweWorkoutEnumsDefaultValues.stroke };
      if (!this.setProps[i].type.id || !this.setProps[i].type.name)
        this.setProps[i].type = { ...this.sweWorkoutEnumsDefaultValues.swimType };
    }

    return this;
  };

  private calculateDistanceFromQuery = (query: string) => {
    const splitQuery = query.toLowerCase().split('x');
    const value = +splitQuery[0] * +splitQuery[1];
    this.masterIteration = +splitQuery[0] || null;
    this.remainingMasterIteration = this.masterIteration || null;
    this.masterDistance = +splitQuery[1] || null;
    if (isNaN(value)) return 0;

    return value;
  };

  private processAndAssignDistance = () => {
    const isLineExist = this.setText.includes('\n');
    const splitSetText = isLineExist
      ? this.setText.split('\n')?.[1].split('@')
      : this.setText.split('@');

    if (/([0-9]+\s?(x|X)(\s?)+[A-z]+)/g.test(splitSetText[0])) {
      this.isError = true;
      return;
    }

    const matchedDatum =
      splitSetText[0].match(/([0-9]+\s?(x|X)\s?[0-9]+)/g)?.[0] ||
      splitSetText[0].match(/\b([0-9]+)\b/g)?.[0];

    if (matchedDatum?.toLowerCase().includes('x')) {
      const calculatedDistance = this.calculateDistanceFromQuery(matchedDatum.replace(/\s/g, ''));
      this.distance = this.checkIfNegativeValue(
        !(calculatedDistance % 25) ? calculatedDistance : 0
      );
    } else if (matchedDatum && !isNaN(+matchedDatum)) {
      this.distance = this.checkIfNegativeValue(!(+matchedDatum % 25) ? +matchedDatum : 0);
    }
  };

  private modifyAndConstructIntervalData = (acc: string[], curr: string) => {
    if (/[0-9]+x[0-9]+/g.test(curr)) {
      let splitDatum = curr.split(' ');
      const doesSingleNumericExist = splitDatum.some(datum => /^[0-9]+$/g.test(datum));
      if (doesSingleNumericExist) {
        splitDatum = this.handleSingleNumericInIntervalDataSplit(splitDatum);
      }
      if (splitDatum.some(datum => /^@$/gm.test(datum))) {
        acc.push(curr.trim());
        return acc;
      }
      for (let i = 0; i <= splitDatum.length; i++) {
        if (/\S*@\S*/g.test(splitDatum[i]) && !/(@)(\d+:\d+)/gm.test(splitDatum[i])) {
          acc.push(splitDatum[i].trim());
          return acc;
        }
      }
    }
    acc.push(curr.trim());
    return acc;
  };

  private filterAndRefineIntervalData = (acc: string[], datum: string) => {
    /* replace unsupported charecters to ignore parsing */
    datum = datum.replace(/[\w]+-[\w]+/gm, '');
    if (datum) acc.push(datum.trim());
    return acc;
  };

  private handleSingleNumericInIntervalDataSplit = (data: string[]) => {
    var finalData: string[] = [];
    var combinedIndexes: string[] = [];

    for (let i = 0; i < data.length; i++) {
      if (/^[0-9]+$/g.test(data[i])) {
        finalData.push(data[i] + ' ' + data[i + 1]);
        combinedIndexes = [
          ...combinedIndexes,
          data[i] + ',' + data[i + 1],
          data[i + 1] + ',' + data[i]
        ];
      } else if (!finalData.some(datum => datum.includes(data[i]))) {
        finalData.push(data[i]);
      }
    }
    return finalData;
  };

  private validateInterval = (interval: string) => {
    let isValid = false;
    if (interval.includes(':')) {
      const splitIntervalData = interval.split(':');
      isValid = splitIntervalData.reduce<boolean>((acc, curr, index) => {
        if (acc) {
          acc = +curr < 60 && ((index && !!+curr) || true);
        }
        return acc;
      }, true);
    } else {
      isValid = +interval < 60 && !!+interval;
    }
    return isValid;
  };

  private checkIfValueIsPrecededByX = (data: string, value: string): boolean => {
    const indexOfValue = data.indexOf(value);
    if (indexOfValue === -1 || indexOfValue - 2 < 0) return false;
    const slicedValue = data.slice(indexOfValue - 2, indexOfValue);
    const result = /^[0-9]+[xX]$/g.test(slicedValue.trim());
    return result;
  };

  private reCheckMatchingIteration = (data: string): number | null => {
    const matchedData = data.match(/[0-9]+(\s?)((?![xX])[A-z]{1,})/g);
    if (matchedData) {
      const interval = matchedData[0].match(/[0-9]+/g)?.[0];
      const isValueValid = !!(interval && !this.checkIfValueIsPrecededByX(data, interval));
      return interval && isValueValid ? Number(interval) : null;
    }
    return null;
  };

  private processIntervalData = () => {
    let totalSeconds = 0;
    const isOnlyIntervalData = this.intervalData.length === 1;
    for (let i = 0; i < this.intervalData.length; i++) {
      const isLastIntervalData = i === this.intervalData.length - 1;
      const matchedIntervaltext = this.intervalData[i].match(/([0-9]+:[0-9]+)/g) ||
        this.intervalData[i].match(/@(\s?)+(:?)[0-9]+/g)?.[0].match(/[0-9]+/g) || ['2:00'];
      const splitIntervalData = this.intervalData[i].split('@');

      const matchedIterationWithX1 = splitIntervalData?.[0].match(
        /([0-9]+)(\s?)((?![x|x])([A-z]{1,2}))(\s)/i
      )?.[0];

      let matchedIterationWithX2 =
        !isOnlyIntervalData &&
        splitIntervalData?.[0].match(/([0-9]+)(\s?)((?![x|x])([a-z])+)/i)?.[0];

      if (matchedIterationWithX2 && CPVM(splitIntervalData[0], matchedIterationWithX2, 'x')) {
        matchedIterationWithX2 = undefined;
      }

      const ismatchedIterationWithX1Valid = !!_.intersection(
        (matchedIterationWithX1 &&
          ((/^[0-9]+\s[A-z]{1,2}$/g.test(matchedIterationWithX1) &&
            matchedIterationWithX1?.toLowerCase().match(/\w+/g)) ||
            (/^[0-9]+[A-z]{1,2}$/g.test(matchedIterationWithX1) &&
              matchedIterationWithX1.toLowerCase().match(/\w+/g)))) ||
          [],
        [...this.workoutEnumsArray]
      ).length;

      const ismatchedIterationWithX2Valid = !!_.intersection(
        (matchedIterationWithX2 &&
          ((/^[0-9]+\s[A-z]{1,2}$/g.test(matchedIterationWithX2) &&
            matchedIterationWithX2?.toLowerCase().match(/\w+/g)) ||
            (/^[0-9]+[A-z]{1,2}$/g.test(matchedIterationWithX2) &&
              matchedIterationWithX2.toLowerCase().match(/[\d.]+|\D+/g)))) ||
          [],
        [...this.workoutEnumsArray]
      ).length;

      const matchedIteration =
        (ismatchedIterationWithX1Valid && matchedIterationWithX1?.match(/[0-9]+/g)?.[0]) ||
        (ismatchedIterationWithX2Valid && matchedIterationWithX2) ||
        '1';

      const isDefaultIterationTaken =
        !ismatchedIterationWithX1Valid && !ismatchedIterationWithX2Valid;

      const isMatchingIterationValid =
        /([0-9]+)(\s?)([A-z]{1,2}(?![A-z]))/g.test(matchedIteration) ||
        /^[0-9]+$/g.test(matchedIteration);

      const reCheckMatchingIteration =
        !isOnlyIntervalData &&
        isDefaultIterationTaken &&
        splitIntervalData[0] &&
        this.reCheckMatchingIteration(splitIntervalData[0]);

      const iteration =
        (!isDefaultIterationTaken &&
          Number((isMatchingIterationValid && matchedIteration.match(/[0-9]+/g)?.[0]) || 0)) ||
        reCheckMatchingIteration ||
        (isLastIntervalData && this.remainingMasterIteration) ||
        (isDefaultIterationTaken && 1) ||
        null;

      const isRemainingMasterIterationTaken = !(
        !isDefaultIterationTaken || reCheckMatchingIteration
      );

      const value =
        iteration && this.masterDistance ? iteration * this.masterDistance : this.distance;

      const setProps = new SetProps(value);

      if (this.validateInterval(matchedIntervaltext[0])) {
        const seconds = msToSeconds(matchedIntervaltext[0]);
        totalSeconds += seconds * (iteration || 1);
        setProps.interval = seconds;
      } else {
        this.isError = true;
      }

      if (
        this.remainingMasterIteration &&
        iteration &&
        (!isDefaultIterationTaken || reCheckMatchingIteration || isRemainingMasterIterationTaken)
      ) {
        this.isRemainingMasterIterationValid = true;
        this.remainingMasterIteration -= iteration;
      }
      setProps.iteration = iteration || 1;
      this.setProps[i] = setProps.toJSON();
      this.matchAndAssignEnums(this.intervalData[i], i);
    }
    this.time = this.checkIfNegativeValue(totalSeconds);
  };

  private findAndsetEnums = (
    type: Exclude<keyof ISetProps, 'iteration' | 'interval' | 'multiplier' | 'value'>,
    enumProps: SWEWorkoutEnumProps[],
    setPropsIndex: number,
    text: string
  ) => {
    if (!this.setProps[setPropsIndex][type].id && !this.setProps[setPropsIndex][type].name) {
      const foundResult = nativeFind(
        [...enumProps],
        ({ name, shortForm }) =>
          !!_.intersection(
            [name.toLowerCase(), shortForm.toLowerCase()],
            /[0-9]+\w/g.test(text) ? text.toLowerCase().match(/\w/g) : text.toLowerCase().split(' ')
          ).length
      );
      this.setProps[setPropsIndex][type].id = foundResult?.id || '';
      this.setProps[setPropsIndex][type].name = foundResult?.name || '';
    }
  };

  private matchAndAssignEnums = (intervalDatum: string, setPropsIndex: number) => {
    const splitIntervalDatum = intervalDatum.match(/\w+/g) || [intervalDatum];
    for (let i = 0; i < splitIntervalDatum.length; i++) {
      if (
        /^[0-9]+$/g.test(splitIntervalDatum[i]) ||
        /([0-9]+\s?(x|X)\s?[0-9]+)/g.test(splitIntervalDatum[i])
      ) {
        continue;
      }
      this.findAndsetEnums(
        'intensity',
        this.workoutEnums.intensities,
        setPropsIndex,
        splitIntervalDatum[i]
      );
      this.findAndsetEnums(
        'stroke',
        this.workoutEnums.strokes,
        setPropsIndex,
        splitIntervalDatum[i]
      );
      this.findAndsetEnums(
        'type',
        this.workoutEnums.swimTypes,
        setPropsIndex,
        splitIntervalDatum[i]
      );
      this.findAndsetEnums(
        'equipment',
        this.workoutEnums.equipment,
        setPropsIndex,
        splitIntervalDatum[i]
      );
    }
  };
}

class SetProps implements ISetProps {
  iteration: number;
  interval: number;
  stroke: SetPropsEnumProperty = { ...defaultSetPropsEnumPropertyValue };
  type: SetPropsEnumProperty = { ...defaultSetPropsEnumPropertyValue };
  intensity: SetPropsEnumProperty = { ...defaultSetPropsEnumPropertyValue };
  equipment: SetPropsEnumProperty = { ...defaultSetPropsEnumPropertyValue };

  constructor(public value: number = 0) {}

  /**
   *@description Converts the instance to JSON
   */
  toJSON = () => {
    const { toJSON: _1, ...rest } = this;
    return { ...rest };
  };
}
