import {
  useState,
  useRef,
  useCallback,
  type PropsWithChildren,
  type RefObject,
} from "react";
import DragAndDropContext, {
  type DragState,
  type Observer,
} from "./DragAndDropContext";

function rectsOverlap(rectA: DOMRect, rectB: DOMRect): boolean {
  return !(
    rectA.right < rectB.left ||
    rectA.left > rectB.right ||
    rectA.bottom < rectB.top ||
    rectA.top > rectB.bottom
  );
}

const DragAndDropProvider = ({ children }: PropsWithChildren) => {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const observersRef = useRef<Map<string, Observer>>(new Map());

  const subscribe = useCallback(
    (
      id: string,
      type: "drag" | "drop",
      ref: RefObject<HTMLElement | null>,
      callback: (dragState: DragState | null) => void,
    ) => {
      observersRef.current.set(id, { id, type, ref, callback });
    },
    [],
  );

  const unsubscribe = useCallback((id: string) => {
    observersRef.current.delete(id);
  }, []);

  const notify = useCallback((newDragState: DragState | null) => {
    setDragState(newDragState);
    observersRef.current.forEach((observer) => {
      observer.callback(newDragState);
    });
  }, []);

  const isColliding = useCallback(
    (dropRef: RefObject<HTMLElement | null>): boolean => {
      if (!dragState?.ghostRect || !dropRef.current) return false;
      const dropRect = dropRef.current.getBoundingClientRect();
      return rectsOverlap(dragState.ghostRect, dropRect);
    },
    [dragState],
  );

  return (
    <DragAndDropContext.Provider
      value={{ dragState, subscribe, unsubscribe, notify, isColliding }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
