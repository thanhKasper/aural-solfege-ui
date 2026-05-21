import { createContext, type ReactNode, type RefObject } from "react";
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
  createRelocatableElement: (
    dropPosition: DOMRect,
    render: () => ReactNode,
  ) => void;
  updateRelocatableElementPosition: (dragState: DragState | null) => void;
  detectCollision: (domRect: DOMRect) => void;
  callback?: (dragState: DragState | null) => void;
}

export interface IDragAndDropContext {
  subscribe: (eventType: EventType, subscriber: Subscriber) => void;
  unsubscribe: (eventType: EventType, subscriber: Subscriber) => void;
  notify: (eventType: EventType, action: TAction) => void;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  subscribe: () => {},
  unsubscribe: () => {},
  notify: () => {},
});

export default DragAndDropContext;
