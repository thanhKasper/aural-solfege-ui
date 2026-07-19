import type { ReactNode } from "react";

export enum EventType {
  DRAG = "DRAG",
  DROP = "DROP",
  CHANGE_POSITION = "CHANGE_POSITION",
  CONSTRUCT_ELEMENT = "CONSTRUCT_ELEMENT",
  RENDER_ELEMENT = "RENDER_ELEMENT",
}

export interface DragAndDropElement<TValue> {
  id: string;
  value?: TValue;
  onCreated?: (cancelCreation: () => void) => void;
  onRemoved?: (cancelRemoval: () => void) => void;
  render: (args: {
    value?: TValue;
    relocatableElementId: string;
    currentPosition: number;
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}

export type TElementPosition = { elementId: string; position: number };

export interface DragAndDropContainerProps<TValue> {
  id: string;
  elements: TValue[];
  onElementPositionChange?: (updatedElements: TElementPosition[]) => void;
}
