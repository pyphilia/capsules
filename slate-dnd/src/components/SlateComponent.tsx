import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Descendant, Transforms, createEditor } from 'slate';
// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate';
import {
  DefaultElement,
  Editable,
  ReactEditor,
  Slate,
  withReact,
} from 'slate-react';

import { CustomEditor } from './CustomEditor';
import { renderLeaf } from './Leaf';
import { SortableElement } from './dnd/Sortable';
import { CodeElement } from './elements/CodeElement';
import { onKeyDown } from './onKeyDown';
import './styles.css';
import { load, save } from './utils';
import { withNodeId } from './withNodeId';

export type CustomEditorType = BaseEditor & ReactEditor;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type CodeBlockElement = {
  type: 'code';
  level: number;
  children: CustomText[];
};

export type LinkItemElement = {
  type: 'linkItem';
  url: string;
  layout: 'iframe' | 'button';
  text: string; // hack
};

export type CustomElement = ParagraphElement | HeadingElement | LinkItemElement;

export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText | CodeBlockElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const useEditor = () =>
  useMemo(() => withNodeId(withReact(createEditor())), []);

const renderElementContent = (props) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export default function App() {
  const editor = useEditor();
  const [value, setValue] = useState(load());
  const [activeId, setActiveId] = useState(null);
  const activeElement = editor.children.find((x) => x.id === activeId);

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const handleDragStart = (event) => {
    if (event.active) {
      clearSelection();
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event) => {
    const overId = event.over?.id;
    const overIndex = editor.children.findIndex((x) => x.id === overId);

    if (overId !== activeId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => node.id === activeId,
        to: [overIndex],
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const renderElement = useCallback((props) => {
    console.log('Element', props);
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    return isTopLevel ? (
      <SortableElement {...props} renderElement={renderElementContent} />
    ) : (
      renderElementContent(props)
    );
  }, []);

  const items = useMemo(
    () => editor.children.map((element) => element.id),
    [editor.children],
  );

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(value) => {
        save(editor, value);
      }}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.addLinkItem(editor);
          }}
        >
          Link Item
        </button>
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown(editor)}
          />
        </SortableContext>
        {createPortal(
          <DragOverlay adjustScale={false}>
            {activeElement && <DragOverlayContent element={activeElement} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </Slate>
  );
}

const DragOverlayContent = ({ element }) => {
  const editor = useEditor();
  const [value] = useState<Descendant[]>([JSON.parse(JSON.stringify(element))]); // clone

  return (
    <div className="drag-overlay">
      <button>⠿</button>
      <Slate editor={editor} initialValue={value}>
        <Editable
          readOnly={true}
          renderLeaf={renderLeaf}
          renderElement={renderElementContent}
        />
      </Slate>
    </div>
  );
};
