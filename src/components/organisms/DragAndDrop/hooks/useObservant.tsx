import { useContext, useEffect } from "react";
import DragAndDropContext, { type Subscriber } from "../DragAndDropContext";
import type { EventType } from "../types";

export default function useObservant(
  events: EventType[],
  subscriber: Subscriber,
) {
  const { subscribe, unsubscribe } = useContext(DragAndDropContext);

  useEffect(() => {
    events.map((event) => subscribe(event, subscriber));
    return () => {
      events.map((event) => unsubscribe(event, subscriber));
    };
  }, [events, subscriber, subscribe, unsubscribe]);
}
