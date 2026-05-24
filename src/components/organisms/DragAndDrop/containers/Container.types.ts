import type { ReactNode } from "react";

export interface DragAndDropElement {
  id: string;
  onCreated?: () => void;
  onRemoved?: () => void;
  render: (args: {
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}
