import type { ReactNode } from "react";

export interface DragAndDropElement {
  id: string;
  onCreated?: (cancelCreation: () => void) => void;
  onRemoved?: (cancelRemoval: () => void) => void;
  render: (args: {
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}
