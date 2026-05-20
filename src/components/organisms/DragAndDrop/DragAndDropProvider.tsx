import { useCallback, useRef, type PropsWithChildren } from "react";
import DragAndDropContext, {
  type Subscriber,
  type TAction,
} from "./DragAndDropContext";
import { EventType } from "./types";

const DragAndDropProvider = ({ children }: PropsWithChildren) => {
  const topics = useRef<Map<EventType, Subscriber[]>>(new Map());

  const subscribe = useCallback(
    (eventType: EventType, subscriber: Subscriber) => {
      if (!topics.current.has(eventType)) {
        topics.current.set(eventType, []);
      }
      topics.current.get(eventType)!.push(subscriber);
    },
    [],
  );

  const unsubscribe = useCallback(
    (eventType: EventType, subscriber: Subscriber) => {
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

  const notify = useCallback((eventType: EventType, action: TAction) => {
    const subscribers = topics.current.get(eventType);
    if (subscribers) {
      subscribers.forEach((subscriber) => action(subscriber));
    }
  }, []);

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
