import { createContext, type ReactNode } from "react";

interface DragAndDropContextProps {
  showGhostComponent: (
    view: ReactNode,
    bindingComponentRef: HTMLElement,
    onSuccessDrop?: () => void,
  ) => void;
  hideGhostComponent: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  showGhostComponent: () => {},
  hideGhostComponent: () => {},
});
