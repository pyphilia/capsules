/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { JSX, ReactNode } from 'react';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import type {
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

type LinkItemComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  loadingComponent?: JSX.Element | string;
  nodeKey: NodeKey;
  onError?: (error: string) => void;
  onLoad?: () => void;
  url: string;
  layout: string;
}>;

export function LinkItemComponent({
  className,
  format,
  nodeKey,
  // onError,
  // onLoad,
  url,
  layout,
}: LinkItemComponentProps) {
  // const [isTweetLoading, setIsTweetLoading] = useState(false);

  // const createTweet = useCallback(async () => {
  //   try {
  //     // @ts-expect-error Twitter is attached to the window.
  //     await window.twttr.widgets.createTweet(tweetID, containerRef.current);

  //     // setIsTweetLoading(false);
  //     isTwitterScriptLoading = false;

  //     if (onLoad) {
  //       onLoad();
  //     }
  //   } catch (error) {
  //     if (onError) {
  //       onError(String(error));
  //     }
  //   }
  // }, [onError, onLoad, tweetID]);

  // useEffect(() => {
  //   if (tweetID !== previousTweetIDRef.current) {
  //     // setIsTweetLoading(true);

  //     if (isTwitterScriptLoading) {
  //       const script = document.createElement('script');
  //       script.src = WIDGET_SCRIPT_URL;
  //       script.async = true;
  //       document.body?.appendChild(script);
  //       script.onload = createTweet;
  //       if (onError) {
  //         script.onerror = onError as OnErrorEventHandler;
  //       }
  //     } else {
  //       createTweet();
  //     }

  //     if (previousTweetIDRef) {
  //       previousTweetIDRef.current = tweetID;
  //     }
  //   }
  // }, [createTweet, onError, tweetID]);
  if (layout === 'iframe') {
    return (
      // margin for move handle
      <div style={{ marginLeft: 40 }}>
        <BlockWithAlignableContents
          className={className}
          format={format}
          nodeKey={nodeKey}
        >
          <iframe
            style={{ display: 'inline-block', width: '100%' }}
            src={url}
            title="mytitle"
          />
        </BlockWithAlignableContents>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: 40 }}>
      <BlockWithAlignableContents
        className={className}
        format={format}
        nodeKey={nodeKey}
      >
        <a href={url}>my link</a>
      </BlockWithAlignableContents>
    </div>
  );
}

export type SerializedLinkItemNode = Spread<
  {
    url: string;
    layout: string;
    type: 'linkItem';
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

export class LinkItemNode extends DecoratorBlockNode {
  __id: string;
  __url: string;
  __layout: string;

  static getType(): string {
    return 'linkItem';
  }

  static clone(node: LinkItemNode): LinkItemNode {
    return new LinkItemNode(node.__url, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedLinkItemNode): LinkItemNode {
    const node = $createLinkItemNode({
      url: serializedNode.url,
      layout: serializedNode.layout,
    });
    node.setFormat(serializedNode.format);
    return node;
  }

  // cannot use object in first parameter because of collab
  constructor(url: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__url = url;
    this.__layout = 'iframe';
    // this.__layout = params.layout;
  }

  // static importDOM(): DOMConversionMap<HTMLDivElement> | null {
  //   return {
  //     div: (domNode: HTMLDivElement) => {
  //       if (!domNode.hasAttribute('data-lexical-link-item-id')) {
  //         return null;
  //       }
  //       return {
  //         conversion: convertTweetElement,
  //         priority: 2,
  //       };
  //     },
  //   };
  // }

  getLayout(): string {
    return this.__layout;
  }

  getUrl(): string {
    return this.__url;
  }

  exportJSON(): SerializedLinkItemNode {
    // console.log(this.__layout);
    return {
      ...super.exportJSON(),
      type: 'linkItem',
      version: 1,
      url: this.getUrl(),
      layout: this.getLayout(),
    };
  }
  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.setAttribute('data-lexical-link-item-id', this.__id);
    return { element };
  }

  changeLayout(editor, layout: string) {
    editor.update(() => {
      const writable = this.getWritable();
      writable.__layout = layout;
    });
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };

    let menu: ReactNode = undefined;
    if (editor.isEditable()) {
      const newType = this.__layout === 'iframe' ? 'button' : 'iframe';
      menu = (
        <button
          onClick={() => {
            this.changeLayout(editor, newType);
          }}
        >
          toggle to {newType}
        </button>
      );
    }

    return (
      <>
        {menu}
        <LinkItemComponent
          className={className}
          format={this.__format}
          loadingComponent="Loading..."
          nodeKey={this.getKey()}
          url={this.__url}
          layout={this.__layout}
        />
      </>
    );
  }
}

export function $createLinkItemNode(params: {
  url: string;
  layout: string;
}): LinkItemNode {
  return new LinkItemNode(params.url);
}

export function $isLinkItemNode(
  node: LinkItemNode | LexicalNode | null | undefined,
): node is LinkItemNode {
  return node instanceof LinkItemNode;
}
