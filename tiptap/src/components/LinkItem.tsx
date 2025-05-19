import { Node, PasteRule, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import LinkItemComponent from './LinkItemComponent';

export interface LinkItemOptions {
  src: string;
  layout: string;
  //   HTMLAttributes: Record<string, unknown>[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkItemExtention: {
      /**
       * Comments will be added to the autocomplete.
       */
      setExternalVideo: (someProp: LinkItemOptions) => ReturnType;
      updateType: (layout: string) => ReturnType;
    };
  }
}

export const LinkItem = Node.create<LinkItemOptions>({
  name: 'linkItem', // A unique identifier for the Node
  group: 'block', // Belongs to the "block" group of extensions

  addMarks() {
    return { type: { default: 'iframe' } };
  },
  addAttributes() {
    return {
      src: { default: null },

      title: { default: null },
      layout: { default: 'iframe' },

      frameBorder: { default: '0' },

      allow: {
        default:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      },

      allowfullscreen: { default: 'allowfullscreen' },

      height: {
        default: 381,
        parseHTML: (element) => element.getAttribute('height'),
      },

      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width'),
      },
    };
  },
  //   HTMLAttributes,
  renderHTML({ node }) {
    const { height, width } = node.attrs;

    return [
      'div',
      {
        class: `neeto-editor__video-wrapper neeto-editor__video--${'left'}`,
      },
      [
        'div',
        {
          class: 'neeto-editor__video-iframe',
          style: `width: ${width}px; height: ${height}px;`,
        },
        [
          'iframe',
          //   mergeAttributes(this.options.HTMLAttributes, {
          //     ...HTMLAttributes,
          //   }),
        ],
      ],
    ];
  },
  parseHTML() {
    return [{ tag: 'iframe[src]' }];
  },
  addCommands() {
    return {
      setExternalVideo:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
      updateType:
        (layout) =>
        ({ commands }) => {
          return commands.updateAttributes('linkItem', { layout });
        },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(LinkItemComponent);
  },
  //   addPasteRules() {
  //     return [
  //       new PasteRule({
  //         find: COMBINED_REGEX,
  //         handler: ({ state, range, match }) => {
  //           state.tr.delete(range.from, range.to);
  //           state.tr.setSelection(
  //             TextSelection.create(state.doc, range.from + 1),
  //           );

  //           const validatedUrl = validateUrl(match[0]);
  //           if (validatedUrl) {
  //             const node = state.schema.nodes['embed'].create({
  //               src: validatedUrl,
  //             });
  //             state.tr.insert(range.from, node);
  //             state.tr.insert(
  //               range.from + node.nodeSize + 1,
  //               state.schema.nodes.paragraph.create(),
  //             );

  //             state.tr.setSelection(
  //               TextSelection.create(
  //                 state.tr.doc,
  //                 range.from + node.nodeSize + 1,
  //               ),
  //             );
  //           }
  //         },
  //       }),
  //     ];
  //   },
});
