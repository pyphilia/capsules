import { useReadOnly, useSlate } from 'slate-react';

import { CustomEditor } from '../CustomEditor';

// Define a React component renderer for our code blocks.
export const LinkItem = (props) => {
  const editor = useSlate();
  const isReadOnly = useReadOnly();

  const newType = props.leaf.layout === 'iframe' ? 'button' : 'iframe';

  if (props.leaf.layout === 'button') {
    return (
      <>
        (
        {!isReadOnly && (
          <button
            style={{ background: 'red' }}
            onClick={() => CustomEditor.setLinkLayout(editor, newType)}
          >
            toggle
          </button>
        )}
        )<a href={props.leaf.url}>mylink</a>
      </>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {!isReadOnly && (
        <button
          style={{ background: 'red' }}
          onClick={() => CustomEditor.setLinkLayout(editor, newType)}
        >
          toggle
        </button>
      )}
      <iframe src={props.leaf.url} width="100%" />
    </div>
  );
};
