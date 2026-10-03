import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { DropEventPayload } from "../events";
import { useDragAndDrop } from "./useDragAndDrop";

const DRAG_THRESHOLD_PX = 4;

type Press = { pointerId: number; x: number; y: number; element: HTMLElement };

type DraggableOptions = {
  onSuccessDrop?: DropEventPayload["dropCallback"];
  shouldHideSelf?: boolean;
};

export const useDraggable = ({
  onSuccessDrop,
  shouldHideSelf = false,
}: DraggableOptions = {}) => {
  const { startDrag, moveDrag, endDrag, cancelDrag } = useDragAndDrop();
  const pressRef = useRef<Press | null>(null);
  const draggingRef = useRef(false);
  const justDraggedRef = useRef(false);
  const [hideComponent, setHideComponent] = useState(false);

  const reset = () => {
    pressRef.current = null;
    draggingRef.current = false;
    setHideComponent(false);
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    justDraggedRef.current = false;
    pressRef.current = {
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      element: e.currentTarget,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const press = pressRef.current;
    if (!press || e.pointerId !== press.pointerId) return;

    if (!draggingRef.current) {
      // Button was released outside the element before the drag started.
      if ((e.buttons & 1) === 0) return reset();
      const distance = Math.hypot(e.clientX - press.x, e.clientY - press.y);
      if (distance < DRAG_THRESHOLD_PX) return;

      draggingRef.current = true;
      // Capture only once dragging, so a plain click still reaches inner buttons.
      press.element.setPointerCapture(e.pointerId);
      startDrag({
        element: press.element,
        pointer: { x: press.x, y: press.y },
      });
      if (shouldHideSelf) setHideComponent(true);
    }

    moveDrag(e.clientX, e.clientY);
  };

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerId !== pressRef.current?.pointerId) return;
    if (draggingRef.current) {
      justDraggedRef.current = true;
      endDrag(onSuccessDrop);
    }
    reset();
  };

  // Also fires after a normal pointerup releases capture; state is already reset by then.
  const onPointerCancel = () => {
    if (draggingRef.current) cancelDrag();
    reset();
  };

  // After a drag the browser fires click on the capturing element; swallow it.
  const onClickCapture = (e: MouseEvent<HTMLElement>) => {
    if (!justDraggedRef.current) return;
    justDraggedRef.current = false;
    e.stopPropagation();
    e.preventDefault();
  };

  const draggableProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture: onPointerCancel,
    onClickCapture,
    style: { touchAction: "none" } as const,
  };

  // Only present when requested, so callers that spread the result onto a DOM node
  // (e.g. Source, which never hides) don't leak a stray prop onto the element.
  return (
    shouldHideSelf ? { ...draggableProps, hideComponent } : draggableProps
  ) as typeof draggableProps & { hideComponent?: boolean };
};
