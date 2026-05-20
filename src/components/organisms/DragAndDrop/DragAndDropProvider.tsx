import {
  useCallback,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
import DragAndDropContext, {
  type DragState,
  type Subscriber,
  type TAction,
} from "./DragAndDropContext";
import { EventType } from "./types";

function rectsOverlap(rectA: DOMRect, rectB: DOMRect): boolean {
  return !(
    rectA.right < rectB.left ||
    rectA.left > rectB.right ||
    rectA.bottom < rectB.top ||
    rectA.top > rectB.bottom
  );
}

const DragAndDropProvider = ({ children }: PropsWithChildren) => {
  const dragStateRef = useRef<DragState | null>(null);
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

  const isColliding = useCallback(
    (observantRef: RefObject<HTMLElement | null>): boolean => {
      if (!dragStateRef.current?.ghostRect || !observantRef.current)
        return false;
      const dropRect = observantRef.current.getBoundingClientRect();
      return rectsOverlap(dragStateRef.current.ghostRect, dropRect);
    },
    [],
  );

  return (
    <DragAndDropContext.Provider
      value={{
        subscribe,
        unsubscribe,
        notify,
        checkCollision: isColliding,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
