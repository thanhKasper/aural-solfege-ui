import {
  createContext,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";

interface DragAndDropContextProps {
  setGhost: Dispatch<SetStateAction<ReactNode>>;
  containersRef?: RefObject<Map<string, any[]>>;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  setGhost: () => {},
});
