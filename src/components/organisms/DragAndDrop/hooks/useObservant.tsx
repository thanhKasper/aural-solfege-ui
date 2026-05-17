import { useContext, useEffect, type RefObject } from "react";
import DragAndDropContext, { type DragState } from "../DragAndDropContext";

interface UseObservantProps {
  id: string;
  ref: RefObject<HTMLElement | null>;
  createElement: (dragState: DragState | null) => void;
  updatePosition: (dragState: DragState | null) => void;
  callback?: (dragState: DragState | null) => void;
}

export default function useObservant({
  id,
  ref,
  callback,
  createElement,
  updatePosition,
}: UseObservantProps) {
  const { subscribe, unsubscribe, checkCollision } =
    useContext(DragAndDropContext);

  useEffect(() => {
    subscribe({
      id,
      ref,
      callback,
      createRelocatableElement: createElement,
      updateRelocatableElementPosition: updatePosition,
    });
    return () => {
      unsubscribe(id);
    };
  }, [
    id,
    ref,
    subscribe,
    unsubscribe,
    callback,
    createElement,
    updatePosition,
  ]);

  return {
    checkCollision,
  };
}
