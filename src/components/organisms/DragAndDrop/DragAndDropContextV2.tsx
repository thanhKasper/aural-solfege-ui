import { createContext, type ReactNode } from "react";

interface DragAndDropContextProps {
  showGhostComponent: (view?: ReactNode) => void;
  hideGhostComponent: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  showGhostComponent: () => {},
  hideGhostComponent: () => {},
});
