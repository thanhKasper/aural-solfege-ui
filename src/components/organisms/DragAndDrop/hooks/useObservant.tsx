import { useContext } from "react";
import DragAndDropContext from "../DragAndDropContext";
import type { EventType } from "../types";

export default function useObservant(subscriberId: string) {
  const { subscribe } = useContext(DragAndDropContext);

  return {
    subscribe: <Payload,>(
      eventType: EventType,
      eventHandler: (payload: Payload) => void,
    ) => {
      subscribe(eventType, {
        id: subscriberId,
        handleEvent: eventHandler,
      });
    },
  };
}
