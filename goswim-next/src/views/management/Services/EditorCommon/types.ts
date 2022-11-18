export interface HintOptions {
  hint: HintFunc;
  completeSingle: boolean;
  hintValues: HintInfo[];
}

export interface HintFunc {
  (): HintResult;
  supportsSelection?: boolean;
}

export interface HintResult {
  from: CodeMirror.Position;
  to: CodeMirror.Position;
  list: Completion[];
}

export interface Completion {
  value: string;
  id?: string;
  type?: string;
  displayText?: string;
  className?: string;
  render?: (element: ShowHintHTMLElement, self: HintResult, data: Completion) => void;
  hint?: (cm: CodeMirror.Editor, self: HintResult, data: Completion) => void;
}

export interface HintInfo {
  value: string | Object;
  type: string;
}

export interface ShowHintHTMLElement extends HTMLElement {
  hintId: number | null;
}
