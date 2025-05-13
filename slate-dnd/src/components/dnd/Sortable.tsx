import React from 'react'

import { toPx } from "../withNodeId";
import {
    useSortable,
  } from "@dnd-kit/sortable";

  const Sortable = ({ sortable, children }) => {
    return (
      <div
        className="sortable"
        {...sortable.attributes}
        ref={sortable.setNodeRef}
        style={{
          transition: sortable.transition,
          "--translate-y": toPx(sortable.transform?.y),
          pointerEvents: sortable.isSorting ? "none" : undefined,
          opacity: sortable.isDragging ? 0 : 1
        }}
      >
        {children}
      </div>
    );
  };

export const SortableElement = ({ attributes, element, children, renderElement }) => {
  const sortable = useSortable({ id: element.id });

  return (
    <div {...attributes}>
      <Sortable sortable={sortable}>
        <button contentEditable={false} {...sortable.listeners}>
          ⠿
        </button>
        <div>{renderElement({ element, children })}</div>
      </Sortable>
    </div>
  );
};
