import { ShowHintOptions, Editor, Handle } from 'codemirror';
import { HintFunc, HintInfo } from 'src/views/management/Services/EditorCommon/types';

export default class HintOptions implements ShowHintOptions {
  hint: HintFunc;
  completeSingle = false;
  hintValues: HintInfo[] = [];
  completeOnSingleClick: boolean;
  closeOnUnfocus: boolean;
  alignWithWord = false;
  container: HTMLElement | null = null;
  extraKeys: { [key: string]: ((editor: Editor, handle: Handle) => void) | string } | null;
  disableDoubleClick: boolean;
}
