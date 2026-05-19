import { createContext, type RefObject } from "react";
import type { TAction } from "./actions";
import type { EventType } from "react-hook-form";

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
  subscribe: (event: EventType, subscriber: Subscriber) => void;
  unsubscribe: (event: EventType, id: string) => void;
  notify: (dragState: DragState | null) => void;
  checkCollision: (dropRef: RefObject<HTMLElement | null>) => boolean;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  subscribe: () => {},
  unsubscribe: () => {},
  notify: () => {},
  checkCollision: () => false,
});

export default DragAndDropContext;
