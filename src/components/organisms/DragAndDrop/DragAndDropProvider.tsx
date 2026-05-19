import {
  useCallback,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
import DragAndDropContext, {
  type DragState,
  type Subscriber,
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
  const dragStateRef = useRef<DragState | null>(null);
  const observersRef = useRef<Map<string, Subscriber>>(new Map());

  const subscribe = useCallback(
    ({
      id,
      ref,
      createRelocatableElement,
      updateRelocatableElementPosition,
      callback,
    }: Subscriber) => {
      observersRef.current.set(id, {
        id,
        ref,
        createRelocatableElement,
        updateRelocatableElementPosition,
        callback,
      });
    },
    [],
  );

  const unsubscribe = useCallback((id: string) => {
    observersRef.current.delete(id);
  }, []);

  const notify = useCallback((newDragState: DragState | null) => {
    dragStateRef.current = newDragState;
    if (!newDragState) {
      return;
    }
    observersRef.current.forEach((observer) => {
      if (!dragStateRef.current) {
        return;
      }
      dragStateRef.current.command(observer, dragStateRef.current);
    });
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
        notify: notify,
        checkCollision: isColliding,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
