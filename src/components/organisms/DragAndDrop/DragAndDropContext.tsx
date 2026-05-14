import { createContext, type RefObject } from "react";

export interface DragState {
  id: string;
  x: number;
  y: number;
  ghostRect: DOMRect | null;
}

export interface Observer {
  id: string;
  type: "drag" | "drop";
  ref: RefObject<HTMLElement | null>;
  callback: (dragState: DragState | null) => void;
}

export interface IDragAndDropContext {
  dragState: DragState | null;
  subscribe: (
    id: string,
    type: "drag" | "drop",
    ref: RefObject<HTMLElement | null>,
    callback: (dragState: DragState | null) => void
  ) => void;
  unsubscribe: (id: string) => void;
  notify: (dragState: DragState | null) => void;
  isColliding: (dropRef: RefObject<HTMLElement | null>) => boolean;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  dragState: null,
  subscribe: () => {},
  unsubscribe: () => {},
  notify: () => {},
  isColliding: () => false,
});

export default DragAndDropContext;
