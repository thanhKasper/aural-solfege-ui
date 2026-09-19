import { createContext } from "react";

interface DragAndDropContextProps {
  showGhostComponent: (
    element: HTMLElement,
    onSuccessDrop?: () => void,
  ) => void;
  hideGhostComponent: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  showGhostComponent: () => {},
  hideGhostComponent: () => {},
});
