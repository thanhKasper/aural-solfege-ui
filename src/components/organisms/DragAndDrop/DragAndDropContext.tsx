import { createContext, type RefObject } from "react";
import type { TAction } from "./actions";

export interface DragState {
  x: number;
  y: number;
  command: TAction;
  isDrop: boolean;
  ghostRect: DOMRect | null;
  sourceId?: string;
}

export interface Subscriber {
  id: string;
  ref: RefObject<HTMLElement | null>;
  createRelocatableElement: (dragState: DragState | null) => void;
  updateRelocatableElementPosition: (dragState: DragState | null) => void;
  callback?: (dragState: DragState | null) => void;
}

export interface IDragAndDropContext {
  subscribe: (observer: Subscriber) => void;
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
