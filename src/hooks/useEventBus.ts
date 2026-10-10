import { EventObserver } from "@/services/eventObserver/eventObserver";
import { useCallback } from "react";

const eventBus = EventObserver.init();

export const useEventBus = <Event extends string>() => {
  const register = useCallback(
    <TEventPayload>(
      eventName: Event,
      handler: (payload: TEventPayload) => void,
    ) => {
      const id = eventBus.subscribe(eventName, handler);
      return () => eventBus.unsubscribe(id);
    },
    [],
  );

  const dispatchEvent = useCallback(
    <TEventPayload>(eventName: Event, payload: TEventPayload) => {
      eventBus.dispatch(eventName, payload);
    },
    [],
  );

  return { register, dispatch: dispatchEvent };
};
