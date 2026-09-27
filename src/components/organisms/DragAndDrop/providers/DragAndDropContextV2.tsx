import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import type { DropEventPayload } from "../events";

export type DragSession = {
  offset: { x: number; y: number };
  position: { x: number; y: number };
  onSuccessDrop?: DropEventPayload["dropCallback"];
};

interface DragAndDropContextProps {
  sessionRef: RefObject<DragSession | null>;
  ghostRef: RefObject<HTMLDivElement | null>;
  setDraggedElement: Dispatch<SetStateAction<HTMLElement | null>>;
  containersRef?: RefObject<Map<string, any[]>>;
}

export const DragAndDropContext =
  createContext<DragAndDropContextProps | null>(null);

export const useDragAndDropContext = () => {
  const ctx = useContext(DragAndDropContext);
  if (!ctx) {
    throw Error("Drag and drop hooks must be used inside <DragAndDrop>");
  }
  return ctx;
};
