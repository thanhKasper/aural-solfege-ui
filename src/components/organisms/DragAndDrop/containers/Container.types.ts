import type { ReactNode } from "react";

export interface DragAndDropElement {
  id: string;
  render: (args: {
    onCreated: (callback: () => void) => void;
    onRemoved: (callback: () => void) => void;
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}
