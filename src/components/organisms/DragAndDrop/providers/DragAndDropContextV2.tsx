import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface DragAndDropContextProps {
  setGhost: Dispatch<SetStateAction<ReactNode>>;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  setGhost: () => {},
});