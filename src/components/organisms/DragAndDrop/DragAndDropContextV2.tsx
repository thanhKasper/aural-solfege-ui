import { createContext, type ReactNode, type RefObject } from "react";

interface DragAndDropContextProps {
  showGhostComponent: (
    view: ReactNode,
    bindingComponentRef: RefObject<HTMLElement | null>,
  ) => void;
  hideGhostComponent: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  showGhostComponent: () => {},
  hideGhostComponent: () => {},
});
