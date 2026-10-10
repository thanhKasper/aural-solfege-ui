import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { MoveEventPayload } from "../events";
import { useDragAndDropContext } from "../providers/DragAndDropContext";
import { ContainerContext, type ElementRect } from "./useContainerContext";

export type DragMoveHandler = (
  // Both are relative to the container's top-left corner.
  draggedRect: DOMRect,
  elementRects: ReadonlyMap<string, ElementRect>,
) => void;

type ContainerProviderProps = PropsWithChildren<{
  rectsRef: RefObject<Map<string, ElementRect>>;
  containerRef: RefObject<HTMLElement | null>;
  onDragMove: DragMoveHandler;
}>;

export const ContainerProvider = ({
  rectsRef,
  containerRef,
  onDragMove,
  children,
}: ContainerProviderProps) => {
  const { sessionRef } = useDragAndDropContext();
  const { register: listen } = useEventBus<DRAG_AND_DROP_EVENT>();
  const elementsRef = useRef(
    new Map<string, { position: number; element: HTMLElement }>(),
  );

  // The listener below is registered once, so it reads the latest handler from a ref.
  const onDragMoveRef = useRef(onDragMove);
  useLayoutEffect(() => {
    onDragMoveRef.current = onDragMove;
  });

  const toContainerRect = useCallback(
    (rect: DOMRect) => {
      const origin = containerRef.current?.getBoundingClientRect();
      return new DOMRect(
        rect.x - (origin?.x ?? 0),
        rect.y - (origin?.y ?? 0),
        rect.width,
        rect.height,
      );
    },
    [containerRef],
  );

  // Records one element's current rect, relative to the container.
  // It does nothing while a drag is in progress, so the rects keep describing the
  // layout from before the drag. During a drag the dragged item is hidden and a
  // placeholder is inserted, which reflows the list; measuring then would make the
  // midpoints that decide `dropIndex` move under the pointer and flip back and forth.
  const measure = useCallback(
    (key: string, position: number, element: HTMLElement) => {
      if (sessionRef.current) return;
      rectsRef.current.set(key, {
        position,
        rect: toContainerRect(element.getBoundingClientRect()),
      });
    },
    [sessionRef, rectsRef, toContainerRect],
  );

  // Re-measures every registered element. This is needed because an element can
  // move without resizing (e.g. the item above it grows), and a ResizeObserver only
  // reports size changes, so that element's own observer would never fire and its
  // stored rect would silently go stale.
  const measureAll = useCallback(() => {
    elementsRef.current.forEach(({ position, element }, key) =>
      measure(key, position, element),
    );
  }, [measure]);

  const register = useCallback(
    (key: string, position: number, element: HTMLElement) => {
      elementsRef.current.set(key, { position, element });
      measure(key, position, element);
      // Fires once on observe (the initial measurement) and whenever this element
      // changes size while idle. It calls measureAll rather than measuring only this
      // element: when it grows, the elements below it move down without resizing, and
      // the container-level observer below cannot catch that either, because the
      // container has a minHeight and does not resize until its content exceeds it.
      const observer = new ResizeObserver(measureAll);
      observer.observe(element);
      return () => {
        observer.disconnect();
        elementsRef.current.delete(key);
        rectsRef.current.delete(key);
      };
    },
    [measure, measureAll, rectsRef],
  );

  // Children register in their layout effects, which run before React attaches the
  // container's own ref. Their first measurement therefore has no container origin
  // to subtract; re-measuring here, once the ref exists, corrects it.
  useLayoutEffect(() => {
    measureAll();
  }, [measureAll]);

  // Covers changes that move elements without resizing any of them, such as the
  // container's width changing and re-wrapping its content.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(measureAll);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, measureAll]);

  useEffect(() => {
    const unsubscribeMove = listen<MoveEventPayload>(
      DRAG_AND_DROP_EVENT.ELEMENT_MOVE,
      ({ element }) => {
        onDragMoveRef.current(toContainerRect(element), rectsRef.current);
      },
    );
    // After a drop the dragged item is shown again and the consumer may reorder the
    // list. The session is only cleared right after this event is dispatched, and
    // `measure` ignores calls while it exists, so wait a frame before re-measuring.
    const unsubscribeDrop = listen(DRAG_AND_DROP_EVENT.ELEMENT_DROP, () => {
      requestAnimationFrame(measureAll);
    });

    return () => {
      unsubscribeMove();
      unsubscribeDrop();
    };
  }, [listen, toContainerRect, rectsRef, measureAll]);

  const value = useMemo(() => ({ register }), [register]);

  return (
    <ContainerContext.Provider value={value}>
      {children}
    </ContainerContext.Provider>
  );
};
