import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import useNotify from "./useNotify";
import type { DragState } from "../DragAndDropContext";

interface GhostDragProps {
  id: string;
  elementRef?: RefObject<HTMLElement | null>;
  GhostComponent: ReactNode;
  actionType: DragState["action"];
}

export default function useGhostDrag({
  id,
  elementRef,
  GhostComponent,
  actionType,
}: GhostDragProps) {
  const { notify } = useNotify();
  const ghostRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!elementRef?.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setDragStartPos({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
      notify({
        action: actionType,
        isDrop: false,
        x: e.clientX,
        y: e.clientY,
        ghostRect: rect,
        sourceId: id,
      });
    },
    [elementRef, notify, actionType, id],
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      if (ghostRef.current) {
        ghostRef.current.style.left = `${e.clientX}px`;
        ghostRef.current.style.top = `${e.clientY}px`;
        const ghostRect = ghostRef.current.getBoundingClientRect();
        notify({
          action: actionType,
          isDrop: false,
          x: e.clientX,
          y: e.clientY,
          ghostRect,
          sourceId: id,
        });
      }
    };

    const onDrop = (e: MouseEvent) => {
      if (ghostRef.current) {
        setIsDragging(false);
        setDragStartPos(null);
        notify({
          action: actionType,
          isDrop: true,
          x: e.clientX,
          y: e.clientY,
          ghostRect: ghostRef.current.getBoundingClientRect(),
          sourceId: id,
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [isDragging, id, notify, actionType]);

  const ghostPortal = isDragging
    ? createPortal(
        <div
          ref={ghostRef}
          style={{
            position: "fixed",
            left: dragStartPos?.x,
            top: dragStartPos?.y,
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
          }}
        >
          {GhostComponent}
        </div>,
        document.body,
      )
    : null;

  return { onMouseDown, ghostPortal };
}
