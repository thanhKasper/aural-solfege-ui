import { useCallback } from "react";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { DropEventPayload, MoveEventPayload } from "../events";
import { getPreviewNode } from "../utils/getPreviewNode";
import { useDragAndDropContext } from "../providers/DragAndDropContext";

export type DragStart = {
  element: HTMLElement;
  pointer: { x: number; y: number };
};

export const useDragAndDrop = () => {
  const { sessionRef, ghostRef, setDraggedElement } = useDragAndDropContext();
  const { dispatch } = useEventBus<DRAG_AND_DROP_EVENT>();

  const startDrag = useCallback(
    ({ element, pointer }: DragStart) => {
      const rect = getPreviewNode(element).getBoundingClientRect();
      sessionRef.current = {
        offset: { x: pointer.x - rect.left, y: pointer.y - rect.top },
        position: { x: rect.left, y: rect.top },
        // Measured here, before the dragged element hides itself and collapses.
        size: { width: rect.width, height: rect.height },
      };
      setDraggedElement(element);
    },
    [sessionRef, setDraggedElement],
  );

  const moveDrag = useCallback(
    (x: number, y: number) => {
      const session = sessionRef.current;
      if (!session) return;
      session.position = { x: x - session.offset.x, y: y - session.offset.y };

      // The ghost mounts one render after startDrag and reads session.position itself.
      const ghost = ghostRef.current;
      if (!ghost) return;
      ghost.style.transform = `translate(${session.position.x}px, ${session.position.y}px)`;
      dispatch<MoveEventPayload>(DRAG_AND_DROP_EVENT.ELEMENT_MOVE, {
        element: ghost.getBoundingClientRect(),
      });
    },
    [sessionRef, ghostRef, dispatch],
  );

  const finishDrag = useCallback(
    (dropCallback?: DropEventPayload["dropCallback"]) => {
      const session = sessionRef.current;
      const ghost = ghostRef.current;
      if (session && ghost) {
        dispatch<DropEventPayload>(DRAG_AND_DROP_EVENT.ELEMENT_DROP, {
          // A cancel still dispatches, without a callback, so containers clear their highlight.
          dropCallback,
          componentDomRect: ghost.getBoundingClientRect(),
        });
      }
      sessionRef.current = null;
      setDraggedElement(null);
    },
    [sessionRef, ghostRef, setDraggedElement, dispatch],
  );

  const endDrag = useCallback(
    (onSuccessDrop?: DropEventPayload["dropCallback"]) =>
      finishDrag(onSuccessDrop),
    [finishDrag],
  );
  const cancelDrag = useCallback(() => finishDrag(), [finishDrag]);

  return {
    startDrag,
    moveDrag,
    endDrag,
    cancelDrag,
  };
};
