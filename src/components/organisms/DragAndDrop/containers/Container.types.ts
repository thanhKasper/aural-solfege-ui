import type { ReactNode } from "react";

export interface DragAndDropElement {
  id: string;
  onCreated?: (cancelCreation: () => void) => void;
  onRemoved?: (cancelRemoval: () => void) => void;
  render: (args: {
    relocatableElementId: string;
    currentPosition: number;
    removeSelf: () => void;
    moveUp: () => void;
    moveDown: () => void;
  }) => ReactNode;
}
