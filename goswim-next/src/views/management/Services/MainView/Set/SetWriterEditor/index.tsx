import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { UnControlled as UnControlledCodeMirror } from 'react-codemirror2';
import _ from 'lodash';
import ParseQuery from 'src/views/management/Services/MainView/Set/SetWriterEditor/ParseQuery';
import { nativeFind } from 'src/views/management/Services/MainView/Set/SetWriterEditor/utils';
import {
  SWEditorProps,
  TraceHistory,
  TraceItem,
  CodeMirrorRefUC
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

/* imported from node_modules for type support will be overwritten in the next import */
import 'codemirror/addon/hint/show-hint';

/* imported from local to modify code */
import 'src/views/management/Services/MainView/Set/SetWriterEditor/show-hint';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

let isEnterPressed = false;
let previousTraceHistory: TraceHistory = new Map();

const SWEditor: <T = {}>(props: SWEditorProps & T) => JSX.Element = props => {
  const [query, setQuery] = useState<string>(props.query || '');
  const codeMirrorRef = useRef<CodeMirrorRefUC | null>(null);
  const parseQueryRef = useRef<ParseQuery | null>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onSWEMount();
    if (codeMirrorRef.current?.editor) {
      parseQueryRef.current = new ParseQuery(codeMirrorRef.current.editor, {
        ...props,
        suggestionsContainer: suggestionsContainerRef
      });
      codeMirrorRef.current.editor.on('cursorActivity', (instance: CodeMirror.Editor) => {
        const cursor = instance.getCursor();
        props.onLineChange?.(cursor.line);
      });
      const cursor = codeMirrorRef.current.editor.getCursor();
      props.onLineChange?.(cursor.line);
      if (props.editorInstance) {
        props.editorInstance.current = codeMirrorRef.current.editor;
      }
    }
    return () => {
      isEnterPressed = false;
      previousTraceHistory.clear();
    };
  }, []); // eslint-disable-line

  /* useEffect to monitor query changes */
  useEffect(() => {
    parseQueryRef.current?.parse();
    if (
      parseQueryRef.current?.traceHistory.size &&
      !_.isEqual(
        Object.fromEntries(previousTraceHistory),
        Object.fromEntries(parseQueryRef.current.traceHistory)
      )
    ) {
      props.onValueChange?.([...parseQueryRef.current.traceHistory.values()]);
      const msgValue = [
        ...parseQueryRef.current.multiplierPropertyMap.values(),
        ...parseQueryRef.current.swimmerTagPropertyMap.values(),
        ...parseQueryRef.current.groupPropertyMap.values()
      ];
      props.onMSGValueChange?.(msgValue.length ? msgValue : null);
      previousTraceHistory = new Map(parseQueryRef.current.traceHistory);
    }
    setTimeout(() => {
      const doesEditorValueHaveError = !!(
        parseQueryRef.current &&
        nativeFind<TraceItem>(
          Object.values(parseQueryRef.current.traceHistory),
          datum => datum.isError
        )
      );
      props.onErrorStatusChange?.(!query || doesEditorValueHaveError);
    }, 50);
    props.onQueryChange?.(query);
  }, [query]); // eslint-disable-line

  const onSWEMount = () => {
    codeMirrorRef.current?.editor?.on('keydown', (_1, e) => {
      if ([13].includes(e.keyCode)) {
        isEnterPressed = true;
      } else {
        isEnterPressed = false;
      }
    });
  };

  const formatQuery = (editor: CodeMirror.Editor, value: string) => {
    const cursor = editor.getCursor();
    if (isEnterPressed) {
      const previousLineValue = editor.getLine(cursor.line - 1);
      if (!previousLineValue) return;
      const previousLineTabSpaceCount = previousLineValue.match(/\t/g)?.length || 0;
      /* max only two tabspaces allowed */
      const tabspaceCount =
        previousLineTabSpaceCount === 2 || !/^(\t?[0-9]+(x|X)|#[\w\s]+)$/g.test(previousLineValue)
          ? previousLineTabSpaceCount
          : previousLineTabSpaceCount + 1;
      const computedTabSpace = '\t'.repeat(tabspaceCount);
      if (
        value.slice(-1) === '\n' &&
        (/^\t?([0-9]x|[0-9]round(s)?|#[a-z]+|#[\w\s]+)$/gi.test(previousLineValue) ||
          /^\t?[0-9]+(x|X)$/g.test(previousLineValue))
      ) {
        editor.replaceRange(computedTabSpace, cursor, cursor);
      } else if (/^[ ]+$/g.test(editor.getLine(cursor.line))) {
        editor.replaceRange(computedTabSpace, { ...cursor, ch: 0 }, cursor);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={10}>
        <UnControlledCodeMirror
          ref={codeMirrorRef}
          value={props.query || ''}
          options={{
            theme: 'material',
            autofocus: false,
            lineWrapping: true,
            extraKeys: {
              'Shift-Enter': () => {}
            },
            readOnly: props.readOnly
          }}
          onChange={(editor, __2, value) => {
            formatQuery(editor, value);
            setQuery(editor.getValue());
          }}
          {...props}
        />
        <div id="suggestions-container" ref={suggestionsContainerRef} />
      </Grid>
    </Grid>
  );
};

export default SWEditor;
