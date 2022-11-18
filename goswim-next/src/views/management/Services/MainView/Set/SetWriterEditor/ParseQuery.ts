import CodeMirror from 'codemirror';
import _ from 'lodash';
import SetProperties from 'src/views/management/Services/MainView/Set/SetWriterEditor/SetProperties';
import { nativeFind } from 'src/views/management/Services/MainView/Set/SetWriterEditor/utils';
import ShowHint from 'src/views/management/Services/MainView/Set/SetWriterEditor/ShowHint';
import MultiplierMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/MultiplierMetadata';
import SwimmerTagMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/SwimmerTagMetadata';
import GroupMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/GroupMetadata';
import MSGTraceHistory from 'src/views/management/Services/MainView/Set/SetWriterEditor/MSGTraceHistory';
import {
  Set,
  TraceHistory,
  SWEditorProps,
  SWEWorkoutEnumsDefaultValues,
  SWEWorkoutEnums,
  SWEWorkoutEnumCourseProps,
  SWEWorkoutEnumProps,
  MultiplierMetadataHistory,
  SwimmerTagMetadataHistory,
  GroupMetadataHistory,
  MSGSetValue,
  SetProps,
  MSGPropertyMap,
  ParseQueryCurrentActiveMultiplierTracker,
  ParseQueryCurrentActiveSwimmerTagTracker,
  ParseQueryCurrentActiveGroupTracker
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

const msgTrackers = [
  {
    propertyMap: 'multiplierPropertyMap',
    metaDataHistory: 'multiplierMetadataHistory'
  },
  {
    propertyMap: 'swimmerTagPropertyMap',
    metaDataHistory: 'swimmerTagMetadataHistory'
  },
  {
    propertyMap: 'groupPropertyMap',
    metaDataHistory: 'groupMetadataHistory'
  }
] as const;

export default class ParseQuery {
  public traceHistory: TraceHistory = new Map();
  public multiplierPropertyMap: MSGPropertyMap = new Map();
  public swimmerTagPropertyMap: MSGPropertyMap = new Map();
  public groupPropertyMap: MSGPropertyMap = new Map();
  private multiplierMetadataHistory: MultiplierMetadataHistory = new Map();
  private swimmerTagMetadataHistory: SwimmerTagMetadataHistory = new Map();
  private groupMetadataHistory: GroupMetadataHistory = new Map();
  private sweWorkoutEnumsDefaultValues: SWEWorkoutEnumsDefaultValues = {
    stroke: { id: '', name: 'free' },
    swimType: { id: '', name: 'swim' }
  };
  private showHint: ShowHint;
  private workoutEnumsArray: string[] = [];

  constructor(private editor: CodeMirror.Editor, private props: SWEditorProps) {
    this.processDefaultValues();
    this.showHint = new ShowHint(this.editor, this.props, this.getSwimmerId);
    this.workoutEnumsArray = this.constructWorkoutEnumsArray(['strokes', 'swimTypes']);
  }

  private constructWorkoutEnumsArray = (requiredEnums?: (keyof SWEWorkoutEnums)[]): string[] => {
    if (!this.props.workoutEnums) return [];
    const workoutEnums = { ...this.props.workoutEnums };
    const workoutEnumsKeys = Object.keys(workoutEnums) as (keyof SWEWorkoutEnums)[];
    return workoutEnumsKeys.reduce<string[]>((acc, curr) => {
      if (requiredEnums && !requiredEnums?.includes(curr)) {
        return acc;
      }
      const currentEnums = (workoutEnums[curr] as (
        | SWEWorkoutEnumCourseProps
        | SWEWorkoutEnumProps
      )[])?.reduce<string[]>((acc2, curr2) => {
        if ('metric' in curr2) {
          acc2 = [...acc2, curr2.metric.toLowerCase()];
        } else {
          acc2 = [...acc2, curr2.name.toLowerCase(), curr2.shortForm.toLowerCase()];
        }
        return acc2;
      }, []);
      acc = [...acc, ...currentEnums];
      return acc;
    }, []);
  };

  private processDefaultValues = () => {
    if (this.props.workoutEnums) {
      const defaultStroke = nativeFind(
        [...this.props.workoutEnums.strokes],
        ({ name }) => name.toLowerCase() === 'free'
      );
      this.sweWorkoutEnumsDefaultValues.stroke = {
        ...this.sweWorkoutEnumsDefaultValues.stroke,
        ...(defaultStroke?.id && { id: defaultStroke.id }),
        ...(defaultStroke?.name && { name: defaultStroke.name })
      };

      const defaultSwimType = nativeFind(
        [...this.props.workoutEnums.swimTypes],
        ({ name }) => name.toLowerCase() === 'swim'
      );
      this.sweWorkoutEnumsDefaultValues.swimType = {
        ...this.sweWorkoutEnumsDefaultValues.swimType,
        ...(defaultSwimType?.id && { id: defaultSwimType.id }),
        ...(defaultSwimType?.name && { name: defaultSwimType.name })
      };
    }
  };

  parse() {
    const lineCount = this.editor.lineCount();
    this.traceHistory.clear();
    this.multiplierPropertyMap.clear();
    this.swimmerTagPropertyMap.clear();
    this.multiplierMetadataHistory.clear();
    this.checkSwimmerTagMetadataHistory();
    const currentActiveMultiplier: ParseQueryCurrentActiveMultiplierTracker = {
      value: 1
    };
    const currentActiveSwimmerTag: ParseQueryCurrentActiveSwimmerTagTracker = {
      uuid: null,
      metadata: null
    };
    let currentActiveGroup: ParseQueryCurrentActiveGroupTracker = {
      groupName: null
    };
    /* loop through the lines of the editor */
    for (let currentLineNumber = 0; currentLineNumber < lineCount; currentLineNumber++) {
      const lineValue = this.editor.getLine(currentLineNumber);
      const isMultiplierLine = /^\t?[0-9]+(x|X)$/g.test(lineValue);
      const isSwimmerTagLine =
        lineValue === '#' ||
        (/^#((\w*,? ?)*)$/g.test(lineValue) && this.getSwimmerId(currentLineNumber, lineValue));
      const isGroupNameLine = /^#[\w\s]+$/gm.test(lineValue) && !isSwimmerTagLine;

      if (isMultiplierLine) {
        currentActiveMultiplier.value = +(lineValue.match(/[0-9]+/g)?.[0] || 1);
        currentActiveMultiplier.line = currentLineNumber;
      }

      if (isGroupNameLine) {
        /* slice to remove the # present in the beginning */
        currentActiveGroup.groupName = lineValue.slice(1);
        currentActiveGroup.line = currentLineNumber;
      }

      if (!lineValue.trim().length) {
        /* reset current active multiplier */
        currentActiveMultiplier.value = 1;
        currentActiveMultiplier.line = null;

        /* reset current active swimmer tag */
        currentActiveSwimmerTag.uuid = null;
        currentActiveSwimmerTag.metadata = null;

        /* reset current active group */
        currentActiveGroup.groupName = null;
        currentActiveGroup.line = null;

        /* Clear selected swimmers if line was cleared */
        this.showHint.clearSelectedSwimmers(true);
      }

      if (!lineValue.trim().length || isMultiplierLine || isSwimmerTagLine || isGroupNameLine) {
        if (this.traceHistory.has(currentLineNumber)) this.traceHistory.delete(currentLineNumber);

        if (isSwimmerTagLine) {
          /* if  it  is swimmerline invoke swimmer suggestion when line value is '#'*/
          if (lineValue === '#') {
            this.showHint.renderHint({
              suggestionText: '#',
              onSwimmerTagSelected: (uuid, tagText, tagData) => {
                const metadata = new SwimmerTagMetadata(currentLineNumber, tagText, tagData);
                this.swimmerTagMetadataHistory.set(uuid, metadata);
                currentActiveSwimmerTag.uuid = uuid;
                currentActiveSwimmerTag.metadata = metadata;
              }
            });
          } else {
            const swimmerLineUUID = this.getSwimmerId(currentLineNumber, lineValue);
            if (swimmerLineUUID) {
              const swimmerTagMetaData = this.swimmerTagMetadataHistory.get(swimmerLineUUID);
              if (swimmerTagMetaData) {
                currentActiveSwimmerTag.uuid = swimmerLineUUID;
                currentActiveSwimmerTag.metadata = swimmerTagMetaData;
                /* update current line number to metadata */
                currentActiveSwimmerTag.metadata.lineNumber = currentLineNumber;
              }
            }
          }
          continue;
        }

        if (isMultiplierLine) {
          this.multiplierMetadataHistory.set(
            currentLineNumber,
            new MultiplierMetadata(currentLineNumber, currentActiveMultiplier.value!)
          );
        }

        if (isGroupNameLine && currentActiveGroup.groupName) {
          this.groupMetadataHistory.set(
            currentLineNumber,
            new GroupMetadata(currentLineNumber, currentActiveGroup.groupName)
          );
        }

        continue;
      }

      if (!isSwimmerTagLine && currentActiveSwimmerTag.uuid) {
        const swimmerTagMetadata = this.swimmerTagMetadataHistory.get(currentActiveSwimmerTag.uuid);
        if (swimmerTagMetadata) {
          this.swimmerTagMetadataHistory.set(currentActiveSwimmerTag.uuid, swimmerTagMetadata);
        }
      }

      /* push applied lines to Multiplier Metadata */
      if (
        !isMultiplierLine &&
        currentActiveMultiplier.line !== null &&
        currentActiveMultiplier.value !== 1
      ) {
        const multiplierMetadata = this.multiplierMetadataHistory.get(
          currentActiveMultiplier.line!
        );
        if (multiplierMetadata) {
          multiplierMetadata?.appliedLines.push(currentLineNumber);
          this.multiplierMetadataHistory.set(currentActiveMultiplier.line!, multiplierMetadata);
        }
      }

      /* push applied lines to SwimmerTag Metadata */
      if (!isSwimmerTagLine && currentActiveSwimmerTag.uuid) {
        const swimmerTagMetdadata = this.swimmerTagMetadataHistory.get(
          currentActiveSwimmerTag.uuid
        );
        if (swimmerTagMetdadata) {
          swimmerTagMetdadata.appliedLines = this.checkAppliedLinesForSG(
            currentActiveSwimmerTag.metadata?.lineNumber
          );
          this.swimmerTagMetadataHistory.set(currentActiveSwimmerTag.uuid, swimmerTagMetdadata);
        }
      }

      /* push applied lines to Multiplier Metadata */
      if (
        !isGroupNameLine &&
        currentActiveGroup.line !== null &&
        currentActiveGroup.groupName !== null
      ) {
        const groupMetadata = this.groupMetadataHistory.get(currentActiveGroup.line!);
        if (groupMetadata) {
          groupMetadata?.appliedLines.push(currentLineNumber);
          this.groupMetadataHistory.set(currentActiveMultiplier.line!, groupMetadata);
        }
      }

      const parsedValue = this.generateSetProperties(
        lineValue,
        currentActiveMultiplier.value!,
        currentActiveSwimmerTag.metadata?.tagData || null,
        currentActiveGroup.groupName,
        currentLineNumber
      )
        .applyDefaults()
        .validate()
        .toJSON();

      this.traceHistory.set(currentLineNumber, parsedValue);

      this.processMSGProperties();
    }
  }

  private generateSetProperties = (
    setQuery: string,
    multiplier: number,
    swimmerTagData: Set['swimmers'] | null,
    groupName: Set['groupName'] | null,
    line: number
  ) => {
    const setProps = new SetProperties(
      setQuery,
      multiplier,
      swimmerTagData,
      groupName,
      line,
      this.props,
      this.sweWorkoutEnumsDefaultValues,
      this.editor,
      this.showHint,
      this.workoutEnumsArray
    );

    return setProps;
  };

  /** Process Multiplier SwimmerTag GroupName Properties */
  private processMSGProperties = () => {
    msgTrackers.forEach(tracker => {
      this[tracker.metaDataHistory].forEach(
        (msgProperty: MultiplierMetadata | SwimmerTagMetadata | GroupMetadata) => {
          const msgTraceHistory = new MSGTraceHistory(msgProperty.lineNumber);

          msgProperty.appliedLines.forEach(line => {
            const traceHistoryValue = this.traceHistory.get(line);
            if (!traceHistoryValue) return;
            const multiplier = traceHistoryValue.multiplier;
            const distance = traceHistoryValue.distance;
            const time = traceHistoryValue.time;
            msgTraceHistory.distance += multiplier * distance;
            msgTraceHistory.time += multiplier * time;
            traceHistoryValue.setProps.forEach(setProp =>
              this.assignMSGTHValues(setProp, msgTraceHistory, multiplier)
            );
          });

          this[tracker.propertyMap].set(msgProperty.lineNumber, msgTraceHistory.toJSON());
        }
      );
    });
  };

  /** Assign Multiplier SwimmerTag GroupName Trace History values */
  private assignMSGTHValues = (
    setProp: SetProps,
    multiplierTraceHistory: MSGTraceHistory,
    multiplier: number
  ) => {
    (['stroke', 'type', 'intensity', 'equipment'] as const).forEach(key => {
      if (!setProp[key].id) return;
      let multiplierSetValue: MSGSetValue | undefined = {
        ...multiplierTraceHistory[key][setProp[key].id]
      };
      if (!_.isEmpty(multiplierSetValue)) {
        multiplierSetValue.value += multiplier * (setProp.iteration * setProp.value);
        multiplierSetValue.interval += multiplier * (setProp.iteration * setProp.interval);
      } else {
        multiplierSetValue = {
          ...setProp[key],
          value: multiplier * (setProp.iteration * setProp.value),
          interval: multiplier * (setProp.iteration * setProp.interval)
        };
      }
      multiplierTraceHistory[key][setProp[key].id] = multiplierSetValue;
    });
  };

  /** get swimmer id from line number */
  private getSwimmerId = (lineNumber: number, lineValue: string) => {
    const element = [lineNumber, lineNumber + 1].reduce<Element | null>((acc, curr) => {
      if (acc) return acc;
      const currentElement = document.querySelector(
        `.CodeMirror-code pre:nth-child(${curr}) span>span`
      );
      acc = currentElement?.innerHTML === lineValue ? currentElement : null;
      return acc;
    }, null);
    const classList = [...(element?.classList || [])];
    const validId = classList.find(datum =>
      /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm.test(datum)
    );
    return validId || null;
  };

  /** check and remove if any unwanted  swimmer meta data is present */
  private checkSwimmerTagMetadataHistory = () => {
    if (!this.swimmerTagMetadataHistory.size) return;
    const lineElements = document.querySelectorAll('.CodeMirror-code pre span>span');
    const swimmerTagMetadataHistoryKeys = this.swimmerTagMetadataHistory.keys();
    [...swimmerTagMetadataHistoryKeys].forEach(key => {
      const isKeyAbsent = ![...lineElements].find(element => element.className.includes(key));
      if (isKeyAbsent) this.swimmerTagMetadataHistory.delete(key);
    });
  };

  /* check and return applied lines for swimmer tag data and group data */
  private checkAppliedLinesForSG = (lineNumber?: number): number[] => {
    if (lineNumber === undefined) return [];
    const splitEditorValue = this.editor
      .getValue()
      .split('\n')
      .slice(lineNumber);
    let isAppliedLinesOver = false;
    const appliedLines = splitEditorValue.reduce<number[]>((acc, curr, index) => {
      const currentLineNumber = lineNumber + index;
      if ((index === 0 && [' ', ''].includes(curr)) || isAppliedLinesOver) return acc;
      if (!/^\s*$/gm.test(curr) && !/^(#((\w*,? ?)*))|(#[\w\s]+)$/g.test(curr)) {
        acc.push(currentLineNumber);
      } else if (/^\s*$/gm.test(curr)) {
        isAppliedLinesOver = true;
      }
      return acc;
    }, []);

    return appliedLines;
  };
}
