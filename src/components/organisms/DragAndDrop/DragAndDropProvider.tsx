import {
  useCallback,
  useRef,
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
  // const [dragState, setDragState] = useState<DragState | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const observersRef = useRef<Map<string, Observer>>(new Map());

  const subscribe = useCallback(({ id, ref, callback }: Observer) => {
    observersRef.current.set(id, { id, ref, callback });
  }, []);

  const unsubscribe = useCallback((id: string) => {
    observersRef.current.delete(id);
  }, []);

  const notify = useCallback((newDragState: DragState | null) => {
    dragStateRef.current = newDragState;
    observersRef.current.forEach((observer) => {
      observer.callback(newDragState);
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
        updatePosition: notify,
        checkCollision: isColliding,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
