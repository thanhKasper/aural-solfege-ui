import { createContext, type RefObject } from "react";
import type { EventType } from "./types";

export interface DragState {
  x: number;
  y: number;
  command: TAction;
  isDrop: boolean;
  ghostRect: DOMRect | null;
  sourceId?: string;
}

export type TAction = (subscriber: Subscriber) => void;

export interface Subscriber {
  id: string;
  ref: RefObject<HTMLElement | null>;
  createRelocatableElement: (dragState: DragState | null) => void;
  updateRelocatableElementPosition: (dragState: DragState | null) => void;
  callback?: (dragState: DragState | null) => void;
}

export interface IDragAndDropContext {
  subscribe: (eventType: EventType, subscriber: Subscriber) => void;
  unsubscribe: (eventType: EventType, subscriber: Subscriber) => void;
  notify: (eventType: EventType, action: TAction) => void;
  checkCollision: (dropRef: RefObject<HTMLElement | null>) => boolean;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  subscribe: () => {},
  unsubscribe: () => {},
  notify: () => {},
  checkCollision: () => false,
});

export default DragAndDropContext;
