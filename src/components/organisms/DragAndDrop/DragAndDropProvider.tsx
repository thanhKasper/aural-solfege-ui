import { useCallback, useRef, type PropsWithChildren } from "react";
import DragAndDropContext, { type Subscriber } from "./DragAndDropContext";
import { EventType } from "./types";

const DragAndDropProvider = ({ children }: PropsWithChildren) => {
  const topics = useRef<Map<EventType, Subscriber<any>[]>>(new Map());

  const subscribe = useCallback(
    <Payload,>(eventType: EventType, subscriber: Subscriber<Payload>) => {
      if (!topics.current.has(eventType)) {
        topics.current.set(eventType, []);
      }

      const filteredSubscribers =
        topics.current
          .get(eventType)
          ?.filter(
            (registeredSubscriber) => subscriber.id !== registeredSubscriber.id,
          ) ?? [];

      topics.current.set(eventType, [...filteredSubscribers, subscriber]);
    },
    [],
  );

  const unsubscribe = useCallback(
    <Payload,>(eventType: EventType, subscriber: Subscriber<Payload>) => {
      const subscribers = topics.current.get(eventType);
      if (subscribers) {
        topics.current.set(
          eventType,
          subscribers.filter((s) => s !== subscriber),
        );
      }
    },
    [],
  );

  const notify = useCallback(
    <Payload,>(eventType: EventType, payload: Payload) => {
      const subscribers = topics.current.get(eventType);
      if (subscribers) {
        subscribers.forEach((subscriber) => subscriber.handleEvent(payload));
      }
    },
    [],
  );

  return (
    <DragAndDropContext.Provider
      value={{
        subscribe,
        unsubscribe,
        notify,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
