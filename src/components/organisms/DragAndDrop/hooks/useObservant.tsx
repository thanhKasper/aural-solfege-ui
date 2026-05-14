import { useContext, useEffect, useRef, type RefObject } from "react";
import DragAndDropContext, { type DragState } from "../DragAndDropContext";

export default function useObservant(
  id: string,
  type: "drag" | "drop",
  ref: RefObject<HTMLElement | null>,
) {
  const { subscribe, unsubscribe, isColliding } =
    useContext(DragAndDropContext);
  const callbackRef = useRef<(dragState: DragState | null) => void>(() => {});

  useEffect(() => {
    subscribe(id, type, ref, callbackRef.current);
    return () => {
      unsubscribe(id);
    };
  }, [id, type, ref, subscribe, unsubscribe]);

  return {
    setCallback: (cb: (dragState: DragState | null) => void) => {
      callbackRef.current = cb;
    },
    isColliding: isColliding(ref),
  };
}
