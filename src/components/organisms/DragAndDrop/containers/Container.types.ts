import type { ReactNode } from "react";

export interface DragAndDropElement {
  id: string;
  render: (args: {
    onCreated: () => void;
    onRemoved: () => void;
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}
