import { Editor, Element, Transforms } from 'slate';

// Define our own custom set of helpers.
export const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : 'code' },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },

  addLinkItem(editor) {
    Transforms.insertNodes(
      editor,
      {
        type: 'linkItem',
        text: 'A new string of text.',
        url: 'https://graasp.org',
        layout: 'iframe',
      },
      {
        at: editor.selection,
      },
    );

    // Transforms.insertNodes(
    //   editor,
    //   { type: 'linkItem' },
    //   { at: [0, 1] },
    //   // { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    // );
  },

  setLinkLayout(editor, newType: 'iframe' | 'button') {
    const selectedNode =
      editor.selection && Editor.node(editor, editor.selection.focus);
    Transforms.setNodes(
      editor,
      {
        layout: newType,
      },
      {
        at: selectedNode[1],
      },
    );
  },
};
