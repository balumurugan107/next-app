import React from 'react';
import * as ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import HintOptions from 'src/views/management/Services/EditorCommon/HintOptions';
import ParseQuery from 'src/views/management/Services/MainView/Set/SetWriterEditor/ParseQuery';
import {
  HintResult,
  Completion,
  ShowHintHTMLElement
} from 'src/views/management/Services/EditorCommon/types';
import {
  SWEditorProps,
  SuggestionProp,
  SwimmerTag,
  LastKeyDown
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { CommonKeywords } from 'src/constants';

export default class ShowHint {
  private suggestions: string[] = [];
  private isSuggestionClosed: boolean;
  private isSwimmerSuggestionMode: boolean = false;
  private selectedSwimmers: Map<string, SwimmerTag> = new Map();
  private swimmerSuggestionInterval: number;
  private lastKeyDown: LastKeyDown = { keyCode: 0, ctrlKey: false, altKey: false, shiftKey: false };

  constructor(
    private editor: CodeMirror.Editor,
    private editorProps: SWEditorProps,
    private getSwimmerId: ParseQuery['getSwimmerId']
  ) {
    const swimmerTagLineWhitelistKeyCodes = [16, 35, 36, 37, 38, 39, 40];
    const swimmerTagLineWhitelistCtrlKeyCodes = [65, 67, 89, 90];
    const swimmerTagLineWhitelistShiftKeyCodes = [35, 36, 37, 38, 39, 40];
    if (this.editorProps.workoutEnums) {
      const workoutEnums = { ...this.editorProps.workoutEnums };
      const keys = Object.keys(workoutEnums) as (keyof typeof workoutEnums)[];
      this.suggestions = keys.reduce<string[]>((acc, curr) => {
        let mappedValues: string[] = [];
        if (curr === 'courses') {
          mappedValues =
            workoutEnums[curr]?.map(datum => `${datum.poolSize} ${datum.metric}`) || [];
        } else {
          mappedValues = workoutEnums[curr]?.map(datum => datum.name);
        }
        acc = [...new Set([...acc, ...mappedValues])];
        return acc;
      }, []);
    }

    this.editor.on('keydown', (editor: CodeMirror.Editor, event: KeyboardEvent) => {
      const { keyCode, ctrlKey, altKey, shiftKey } = event;
      this.lastKeyDown = { keyCode, ctrlKey, altKey, shiftKey };
      const { line, ch } = editor.getCursor();
      const lineValue = editor.getLine(line);
      const isSwimmerTagLine = !!this.getSwimmerId(line, lineValue);
      const isLineTextSelected = lineValue === editor.getSelection();
      const allowTextDeletion = isLineTextSelected && [8, 46].includes(keyCode);
      const allowEnter = keyCode === 13 && ch === 0;
      const allowBackspace = keyCode === 8 && (lineValue === '#' || ch === 0);
      /* if text deleteion is allowed it takes priority */
      if ((isSwimmerTagLine && allowTextDeletion) || allowEnter || allowBackspace) return;
      /* prevent typing  on swimmer tag line */
      if (
        isSwimmerTagLine
          ? (!ctrlKey && !shiftKey && !swimmerTagLineWhitelistKeyCodes.includes(keyCode)) ||
            (ctrlKey && !shiftKey && !swimmerTagLineWhitelistCtrlKeyCodes.includes(keyCode)) ||
            (shiftKey && !ctrlKey && !swimmerTagLineWhitelistShiftKeyCodes.includes(event.keyCode))
          : false
      ) {
        event.preventDefault();
      }
    });

    this.editor.on('endCompletion', () => {
      this.isSuggestionClosed = true;
      setTimeout(() => (this.isSuggestionClosed = false));
      if (this.isSwimmerSuggestionMode) clearInterval(this.swimmerSuggestionInterval);
    });
  }

  private isSeparator = (c: string) => [' ', ''].includes(c);

  private findLastSeparatorIndex = (text: string) =>
    _.findLastIndex(text, f => this.isSeparator(f));

  private findLastSeparatorPositionWithEditor = (): CodeMirror.Position => {
    let cursor = this.editor.getCursor();
    let text = this.editor.getRange({ ...cursor, ch: 0 }, { ...cursor });
    let index = this.findLastSeparatorIndex(text);
    return {
      line: cursor.line,
      ch: index + 1
    };
  };

  private hint = (
    editor: CodeMirror.Editor,
    self: HintResult,
    completion: Completion,
    suggestionProp: SuggestionProp
  ) => {
    let fromPosition = self.from;
    const toPosition = self.to;
    let uuid!: string;
    let value = '';
    if (!this.isSwimmerSuggestionMode) {
      const shouldSpaceBeAppended = !this.editor.getRange(
        { ...toPosition },
        { ...toPosition, ch: toPosition.ch + 1 }
      );
      value = `${completion.value}${(shouldSpaceBeAppended && ` `) || ``}`;
    } else {
      const selectedSwimmersArray = Array.from(this.selectedSwimmers.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      fromPosition = { ...self.from, ch: self.from.ch + 1 };
      uuid = uuidv4();
      value = `${selectedSwimmersArray?.map(datum => datum.name).join(', ')}\n\t`;
      /* to slice off new line and tab space in tag text */
      suggestionProp.onSwimmerTagSelected?.(uuid, value.slice(0, -2), selectedSwimmersArray);
    }
    editor.replaceRange(value, fromPosition, toPosition, 'complete');

    if (this.isSwimmerSuggestionMode) {
      /* add a uuid to swimmer meta tag for line identification */
      const token = editor.getTokenAt(fromPosition);
      editor.markText(
        { ...fromPosition, ch: token.start },
        { ...toPosition, ch: token.end },
        { className: `swe-swimmer-tag ${uuid}` }
      );
    }
  };

  private render = (
    element: ShowHintHTMLElement,
    _self: HintResult,
    data: Completion,
    _suggestionProp: SuggestionProp
  ) => {
    if (!this.isSwimmerSuggestionMode) {
      const div = document.createElement('div');
      div.className = 'suggestion-par';
      let renderElement = <span>{data.value}</span>;

      if (renderElement?.props?.onClick) {
        div.onclick = renderElement?.props?.onClick;
      }

      ReactDOM.render(renderElement, div);
      element.appendChild(div);
    } else {
      const div = document.createElement('div');
      div.className = 'suggestion-par swimmer-suggestion';
      let renderElement = (
        <>
          <input
            type="checkbox"
            data-id={data.id}
            name={data.id}
            value={data.value}
            defaultChecked={!!data.id && this.selectedSwimmers.has(data.id)}
          />
          &ensp;
          <label htmlFor={data.id}>{data.value}</label>
          &nbsp;
        </>
      );

      if (renderElement?.props?.onClick) div.onclick = renderElement?.props?.onClick;

      ReactDOM.render(renderElement, div);

      /* Suggestion header code */
      if ((element.parentElement?.firstChild as Element).id !== 'swimmer-suggestion-header') {
        const li = document.createElement('li');
        li.style.cursor = 'default';
        li.id = 'swimmer-suggestion-header';
        const div = document.createElement('div');
        div.className = 'suggestion-par swimmer-suggestion sug-head';
        li.append(div);
        let headerElement = (
          <>
            <input
              type="checkbox"
              id={CommonKeywords.ALL}
              name={'swimmer-suggestion-header'}
              value={CommonKeywords.ALL}
              defaultChecked={this.selectedSwimmers.size === this.editorProps.swimmers?.length}
            />
            <img
              src="/static/images/select-swimmer.svg"
              alt="select-swimmer"
              onClick={this.confirmSwimmerSelection}
            />
          </>
        );
        ReactDOM.render(headerElement, div);
        (element.parentElement as Element).prepend(li);
      }
      element.style.cursor = 'default';
      element.appendChild(div);
    }
  };

  private populateSuggestions = (value: string, suggestionProp: SuggestionProp, id?: string) => ({
    id,
    value,
    hint: (editor: CodeMirror.Editor, self: HintResult, data: Completion) =>
      this.hint(editor, self, data, suggestionProp),
    render: (element: ShowHintHTMLElement, self: HintResult, data: Completion) =>
      this.render(element, self, data, suggestionProp)
  });

  private createHintOptions = (suggestions: string[], suggestionProp: SuggestionProp) => {
    const hintOptions = new HintOptions();

    hintOptions.completeSingle = false;

    hintOptions.completeOnSingleClick = !this.isSwimmerSuggestionMode;

    hintOptions.disableDoubleClick = this.isSwimmerSuggestionMode;

    hintOptions.closeOnUnfocus = false;

    hintOptions.container = ReactDOM.findDOMNode(
      this.editorProps.suggestionsContainer?.current
    ) as HTMLElement;

    hintOptions.hint = () => {
      let cursor = this.editor.getCursor();
      let lastSeparatorPos = this.findLastSeparatorPositionWithEditor();

      let activeSuggestions: (string | SwimmerTag)[] = [...suggestions];

      if (suggestionProp.suggestionText) {
        const suggestionText = this.isSwimmerSuggestionMode
          ? this.editor.getLine(cursor.line).slice(1)
          : suggestionProp.suggestionText;
        activeSuggestions =
          (this.isSwimmerSuggestionMode &&
            [...(this.editorProps.swimmers || [])]
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.filter(datum =>
                datum.name.toLowerCase().startsWith(suggestionText.toLowerCase())
              )) ||
          suggestions.reduce<string[]>((acc, curr) => {
            const currLC = curr.toLowerCase();
            const tracedValueLC = suggestionText?.toLowerCase() || '';
            if (currLC.startsWith(tracedValueLC) && currLC !== tracedValueLC) {
              acc.push(curr);
            }
            return acc;
          }, []);
      }

      /* attach listners for ever hint call */
      setTimeout(() => {
        this.attachSwimmerSuggestionHeaderListner();
        this.attachSwimmerSuggestionInputListners();
        this.attachSwimmerSuggestionListListners();
      }, 0);

      return {
        list: activeSuggestions?.map(datum => {
          let value, id;
          if (typeof datum === 'object') {
            id = datum.id;
            value = datum.name;
          } else {
            value = datum;
          }
          return this.populateSuggestions(value, suggestionProp, id);
        }),
        from: lastSeparatorPos,
        to: cursor
      };
    };

    hintOptions.hint.supportsSelection = true;

    return hintOptions;
  };

  private attachSwimmerSuggestionHeaderListner = () => {
    const element = document.querySelector<HTMLInputElement>(
      '#swimmer-suggestion-header .swimmer-suggestion input'
    );
    element?.addEventListener('change', event => {
      const target = event.target as HTMLInputElement;
      const elements = document.querySelectorAll<HTMLInputElement>('.swimmer-suggestion input');
      elements.forEach((element, index) => {
        if (index === 0) return;
        element.checked = target.checked;
        this.updateSelectedSwimmers(
          target.checked,
          element.getAttribute('data-id')!,
          element.value
        );
      });
    });
  };

  private attachSwimmerSuggestionInputListners = () => {
    const inputElements = document.querySelectorAll<HTMLInputElement>('.swimmer-suggestion input');
    inputElements.forEach(element =>
      element?.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;
        if (target.value === CommonKeywords.ALL) return;
        this.updateSelectedSwimmers(
          target.checked,
          target.getAttribute('data-id')!,
          target.value,
          true
        );
      })
    );
  };

  private attachSwimmerSuggestionListListners = () => {
    this.swimmerSuggestionInterval = window.setInterval(() => {
      const inputElements = document.querySelectorAll<HTMLLIElement>('ul.CodeMirror-hints li');
      inputElements.forEach(element => element.classList.remove('CodeMirror-hint-active'));
    }, 0);
  };

  private updateSelectedSwimmers = (
    checked: boolean,
    id: string,
    name: string,
    isSwimmerItem?: boolean
  ) => {
    if (checked) {
      this.selectedSwimmers.set(id, { id, name });
    } else {
      this.selectedSwimmers.delete(id);
    }
    if (isSwimmerItem) {
      const element = document.querySelector<HTMLInputElement>(
        '#swimmer-suggestion-header .swimmer-suggestion input'
      );
      if (element) {
        element.checked = this.selectedSwimmers.size === this.editorProps.swimmers?.length;
      }
    }
  };

  private confirmSwimmerSelection = () =>
    this.editor
      .getInputField()
      ?.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 } as KeyboardEventInit));

  public clearSelectedSwimmers = (checkKeycode?: boolean) => {
    if (
      [undefined, false].includes(checkKeycode) ||
      (checkKeycode &&
        this.selectedSwimmers.size &&
        ([8, 46].includes(this.lastKeyDown.keyCode) ||
          (this.lastKeyDown.ctrlKey && this.lastKeyDown.keyCode === 88)))
    ) {
      this.selectedSwimmers.clear();
    }
  };

  public renderHint = (suggestionProp: SuggestionProp) => {
    const lineValue = this.editor.getLine(this.editor.getCursor().line);
    /* clear selected swimmers if line is empty */
    if (
      lineValue === '' &&
      this.selectedSwimmers.size &&
      ([8, 46].includes(this.lastKeyDown.keyCode) ||
        (this.lastKeyDown.ctrlKey && this.lastKeyDown.keyCode === 88))
    ) {
      this.selectedSwimmers.clear();
    }
    this.isSwimmerSuggestionMode = lineValue.startsWith('#');
    if (!this.isSuggestionClosed || this.isSwimmerSuggestionMode) {
      /* do not show suggestions if swimmer suggestion mode is disabled and it is a swimmer suggestion line */
      if (!this.isSwimmerSuggestionMode && lineValue.charAt(0) === '#') return;
      const hintOptions = this.createHintOptions(this.suggestions, suggestionProp);
      this.editor.showHint(hintOptions);
    }
  };
}
