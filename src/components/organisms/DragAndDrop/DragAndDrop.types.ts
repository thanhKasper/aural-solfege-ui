import type { ReactNode } from "react";

export enum EventType {
  DRAG = "DRAG",
  DROP = "DROP",
  CHANGE_POSITION = "CHANGE_POSITION",
  CONSTRUCT_ELEMENT = "CONSTRUCT_ELEMENT",
  RENDER_ELEMENT = "RENDER_ELEMENT",
  REBUILD_ELEMENT = "REBUILD_ELEMENT",
}

export interface DragAndDropElement<TValue> {
  id: string; // id here is very important, ensure that new id is created only when the element is created, not because it rerenders.
  value: TValue;
  onCreated?: (elementId: string, position: number, value: TValue) => void;
  onRemoved?: (elementId: string, position: number, value: TValue) => void;
  render: (args: {
    value: TValue;
    relocatableElementId: string;
    currentPosition: number;
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}

export type TElementPosition<TValue> = { value: TValue; position: number };

export interface DragAndDropContainerProps<TValue> {
  id: string;
  elements: TValue[];
  onElementPositionChange?: (
    updatedElements: TElementPosition<TValue>[],
  ) => void;
}
