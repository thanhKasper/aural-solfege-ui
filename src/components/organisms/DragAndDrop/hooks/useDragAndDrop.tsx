import { useCallback } from "react";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { DropEventPayload, MoveEventPayload } from "../events";
import { getPreviewNode } from "../utils/getPreviewNode";
import { useDragAndDropContext } from "../providers/DragAndDropContextV2";

export type DragStart = {
  element: HTMLElement;
  pointer: { x: number; y: number };
  onSuccessDrop?: DropEventPayload["dropCallback"];
};

export const useDragAndDrop = () => {
  const { sessionRef, ghostRef, setDraggedElement, containersRef } =
    useDragAndDropContext();
  const { dispatch } = useEventBus<DRAG_AND_DROP_EVENT>();

  const startDrag = useCallback(
    ({ element, pointer, onSuccessDrop }: DragStart) => {
      const rect = getPreviewNode(element).getBoundingClientRect();
      sessionRef.current = {
        offset: { x: pointer.x - rect.left, y: pointer.y - rect.top },
        position: { x: rect.left, y: rect.top },
        // Measured here, before the dragged element hides itself and collapses.
        size: { width: rect.width, height: rect.height },
        onSuccessDrop,
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
    (accepted: boolean) => {
      const session = sessionRef.current;
      const ghost = ghostRef.current;
      if (session && ghost) {
        dispatch<DropEventPayload>(DRAG_AND_DROP_EVENT.ELEMENT_DROP, {
          // A cancel still dispatches, without a callback, so containers clear their highlight.
          dropCallback: accepted ? session.onSuccessDrop : undefined,
          componentDomRect: ghost.getBoundingClientRect(),
        });
      }
      sessionRef.current = null;
      setDraggedElement(null);
    },
    [sessionRef, ghostRef, setDraggedElement, dispatch],
  );

  const endDrag = useCallback(() => finishDrag(true), [finishDrag]);
  const cancelDrag = useCallback(() => finishDrag(false), [finishDrag]);

  const addContainer = (containerId: string) => {
    if (!containersRef) return;

    const containers = containersRef.current;

    if (containers.has(containerId)) return;

    containers.set(containerId, []);
  };

  const addElement = <T,>(containerId: string, element: T) => {
    const elements = containersRef?.current?.get(containerId) as T[] | undefined;

    if (!elements) return;

    elements.push(element);
  };

  return {
    startDrag,
    moveDrag,
    endDrag,
    cancelDrag,
    addContainer,
    addElement,
  };
};
