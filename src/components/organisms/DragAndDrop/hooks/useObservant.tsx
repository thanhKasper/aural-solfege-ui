import { useContext, useEffect, useRef, type RefObject } from "react";
import DragAndDropContext, { type DragState } from "../DragAndDropContext";

interface UseObservantProps {
  id: string;
  ref: RefObject<HTMLElement | null>;
  callback: (dragState: DragState | null) => void;
}

export default function useObservant({ id, ref, callback }: UseObservantProps) {
  const { subscribe, unsubscribe, checkCollision } =
    useContext(DragAndDropContext);
  const callbackRef = useRef<(dragState: DragState | null) => void>(callback);

  useEffect(() => {
    subscribe({ id, ref, callback: callbackRef.current });
    return () => {
      unsubscribe(id);
    };
  }, [id, ref, subscribe, unsubscribe, callback]);

  return {
    setCallback: (cb: (dragState: DragState | null) => void) => {
      callbackRef.current = cb;
    },
    checkCollision,
  };
}
