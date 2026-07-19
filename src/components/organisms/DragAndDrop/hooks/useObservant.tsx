import { useCallback, useContext } from "react";
import DragAndDropContext from "../DragAndDropContext";
import type { EventType } from "../DragAndDrop.types";

export default function useObservant(subscriberId: string) {
  const { subscribe: globalSubscribe } = useContext(DragAndDropContext);

  const subscribe = useCallback(
    <Payload,>(
      eventType: EventType,
      eventHandler: (payload: Payload) => void,
    ) => {
      globalSubscribe(eventType, {
        id: subscriberId,
        handleEvent: eventHandler,
      });
    },
    [globalSubscribe, subscriberId],
  );

  return {
    subscribe,
  };
}
