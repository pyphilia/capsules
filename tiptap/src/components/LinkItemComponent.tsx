import { Node, NodeViewProps, NodeViewWrapper } from '@tiptap/react';

// import type { LinkItemOptions } from './LinkItem';

// import { mergeRight } from 'ramda';
// import { Resizable } from 're-resizable';

// import Menu from '../Image/Menu';

const EmbedComponent = ({
  node,
  editor,
  //   getPos,
  //   updateAttributes,
  //   deleteNode,
}: NodeViewProps) => {
  //   const { figheight, figwidth, align } = node.attrs;
  //   const { view } = editor;
  //   let height = figheight;
  //   let width = figwidth;

  //   const handleResize = (_event, _direction, ref) => {
  //     height = ref.offsetHeight;
  //     width = ref.offsetWidth;
  //     view.dispatch(
  //       view.state.tr.setNodeMarkup(
  //         getPos(),
  //         undefined,
  //         mergeRight(node.attrs, {
  //           figheight: height,
  //           figwidth: width,
  //           height,
  //           width,
  //         }),
  //       ),
  //     );
  //     editor.commands.focus();
  //   };

  if (node.attrs.layout === 'iframe') {
    return (
      <NodeViewWrapper
        className={`neeto-editor__video-wrapper neeto-editor__video--${'left'}`}
      >
        {/* <Resizable
        lockAspectRatio
        className="neeto-editor__video-iframe"
        size={{ height, width }}
        onResizeStop={handleResize}
      > */}
        {/* align, */}
        {/* <Menu {...{ deleteNode, editor, updateAttributes }} /> */}
        <button
          onClick={() => {
            editor.commands.updateType('button');
          }}
        >
          change type to button
        </button>
        {/* width="100%"  */}
        <iframe title="iframe title" {...node.attrs} />
        {/* </Resizable> */}
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      className={`neeto-editor__video-wrapper neeto-editor__video--${'left'}`}
    >
      <button
        onClick={() => {
          editor.commands.updateType('iframe');
        }}
      >
        change type to iframe
      </button>
      <a href={node.attrs.src}>mylink</a>;
    </NodeViewWrapper>
  );
};

export default EmbedComponent;
