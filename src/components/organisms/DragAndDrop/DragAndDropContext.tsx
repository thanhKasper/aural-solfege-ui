import { createContext, type RefObject } from "react";

export interface DragState {
  x: number;
  y: number;
  postAction: "create" | "updatePosition";
  isDrop: boolean;
  ghostRect: DOMRect | null;
  sourceId?: string;
}

export interface Observer {
  id: string;
  ref: RefObject<HTMLElement | null>;
  callback: (dragState: DragState | null) => void;
}

export interface IDragAndDropContext {
  subscribe: (observer: Observer) => void;
  unsubscribe: (id: string) => void;
  updatePosition: (dragState: DragState | null) => void;
  checkCollision: (dropRef: RefObject<HTMLElement | null>) => boolean;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  subscribe: () => {},
  unsubscribe: () => {},
  updatePosition: () => {},
  checkCollision: () => false,
});

export default DragAndDropContext;
