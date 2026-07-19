import { createContext } from "react";
import type { EventType } from "./DragAndDrop.types";

export interface Subscriber<Payload> {
  id: string;
  handleEvent: (eventPayload: Payload) => void;
}

export interface IDragAndDropContext {
  subscribe: <Payload>(
    eventType: EventType,
    subscriber: Subscriber<Payload>,
  ) => void;
  unsubscribe: <Payload>(
    eventType: EventType,
    subscriber: Subscriber<Payload>,
  ) => void;
  notify: <Payload>(eventType: EventType, payload: Payload) => void;
}

const DragAndDropContext = createContext<IDragAndDropContext>({
  subscribe: () => {},
  unsubscribe: () => {},
  notify: () => {},
});

export default DragAndDropContext;
