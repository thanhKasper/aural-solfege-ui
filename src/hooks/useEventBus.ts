import { EventObserver } from "@/services/eventObserver/eventObserver";
import { useCallback, useEffect, useRef } from "react";

const eventBus = EventObserver.init();

export const useEventBus = <Event extends string>() => {
  const listenerIds = useRef<string[]>([]);

  const register = useCallback(
    <TEventPayload>(
      eventName: Event,
      handler: (payload: TEventPayload) => void,
    ) => {
      const id = eventBus.subscribe(eventName, handler);
      listenerIds.current.push(id);
      return id;
    },
    [],
  );

  const dispatchEvent = useCallback(
    <TEventPayload>(eventName: Event, payload: TEventPayload) => {
      eventBus.dispatch(eventName, payload);
    },
    [],
  );

  useEffect(() => {
    const ids = listenerIds.current;
    return () => {
      ids.map((listenerId) => {
        eventBus.unsubscribe(listenerId);
      });
    };
  }, []);

  return { register, dispatch: dispatchEvent };
};
