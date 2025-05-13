import { nanoid } from 'nanoid';
import { Element } from 'slate';

export const makeNodeId = () => nanoid(16);

export const assignIdRecursively = (node) => {
  if (Element.isElement(node)) {
    node.id = makeNodeId();
    node.children.forEach(assignIdRecursively);
  }
};

export const withNodeId = (editor) => {
  const { apply } = editor;

  editor.apply = (operation) => {
    if (operation.type === 'insert_node') {
      assignIdRecursively(operation.node);
      return apply(operation);
    }

    if (operation.type === 'split_node') {
      operation.properties.id = makeNodeId();
      return apply(operation);
    }

    return apply(operation);
  };

  return editor;
};


export const initialValue= [
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: "Interval (music)"
      }
    ]
  },
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text:
          "In music theory, an interval is a difference in pitch between two sounds. An interval may be described as horizontal, linear, or melodic if it refers to successively sounding tones, such as two adjacent pitches in a melody, and vertical or harmonic if it pertains to simultaneously sounding tones, such as in a chord."
      }
    ]
  },
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: "Sort these intervals using Drag and Drop:"
      }
    ]
  },
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: "0. Perfect unison"
      }
    ]
  },
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: "9. Major sixth"
      }
    ]
  }, 
];
export const toPx = (value) => (value ? `${Math.round(value)}px` : undefined);
