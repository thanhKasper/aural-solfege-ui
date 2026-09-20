import type { Container } from "@/services/dragAndDrop/Container";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";

interface DragAndDropContextProps {
  setGhost: Dispatch<SetStateAction<ReactNode>>;
  containersRef?: RefObject<Map<string, Container>>;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  setGhost: () => {},
});
