import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface DragAndDropContextProps {
  setGhost: Dispatch<SetStateAction<ReactNode>>;
  // showGhostComponent: (
  //   element: HTMLElement,
  //   onSuccessDrop?: () => void,
  // ) => void;
  // hideGhostComponent: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  setGhost: () => {},
  // showGhostComponent: () => {},
  // hideGhostComponent: () => {},
});
