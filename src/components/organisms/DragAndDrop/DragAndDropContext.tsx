import { createContext, type RefObject } from "react";
import type { EventType } from "./types";
import type { DragAndDropElement } from "./containers/Container.types";

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
    callbacks: Omit<DragAndDropElement, "id">,
  ) => void;
  updateRelocatableElementPosition: (
    elementId: string,
    domRect: DOMRect,
  ) => void;
  detectCollision: (domRect: DOMRect) => void;
  indicateDropPosition: (elementId: string, domRect: DOMRect) => void;
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
