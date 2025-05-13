import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';

import { LinkNode } from '@lexical/link';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { MyLinkButton } from './MyLinkButton';
import MyTweetButton from './MyTweetButton';
import { TweetNode } from './nodes/TweetNode';
import { LinkPlugin } from './plugins/LinkPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import './styles.css';
import { validateUrl } from './utils';

const ID = '1981e6f5-b4d6-4c8d-b36e-b6c36dded136';

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'editor-paragraph',
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

function Editor({ initialEditorState }) {
  console.log(initialEditorState);

  const [editorState, setEditorState] = useState();
  const hasLinkAttributes = true;

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [TweetNode, LinkNode],
    editorState: initialEditorState,
  };

  const onChange = async (editorState) => {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    console.log(editorStateJSON);
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));

    // SAVE
    const response = await fetch('http://localhost:3000/lexical/' + ID, {
      method: 'PATCH',
      body: JSON.stringify(editorStateJSON),
    });
    await response.json();
  };

  return (
    <div id="wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <MyTweetButton />
        <MyLinkButton />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-placeholder={'Enter some text...'}
              placeholder={<div>Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <LinkPlugin
          validateUrl={validateUrl}
          attributes={
            hasLinkAttributes
              ? {
                  rel: 'noopener noreferrer',
                  target: '_blank',
                }
              : undefined
          }
        />
        <TwitterPlugin />
        <MyOnChangePlugin onChange={onChange} />
        {/* <MyLoadPlugin /> */}
      </LexicalComposer>
    </div>
  );
}

// Loading wrapper to fetch data first
const LoadingEditor = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/lexical/' + ID, {
      method: 'GET',
    }).then(async (d) => {
      setResponse(await d.json());
      setHasLoaded(true);
    });
  }, []);

  if (hasLoaded) {
    return <Editor initialEditorState={response.data} />;
  }

  return <CircularProgress />;
};

export default LoadingEditor;
