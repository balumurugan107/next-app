import * as CodeMirror from 'codemirror';

declare module 'codemirror' {
  interface ShowHintOptions {
    disableDoubleClick?: boolean;
  }
}
