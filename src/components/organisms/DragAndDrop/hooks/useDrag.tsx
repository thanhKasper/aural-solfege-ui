import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { TAction } from "../DragAndDropContext";
import { EventType } from "../types";
import useNotify from "./useNotify";

interface GhostDragProps {
  id: string;
  GhostComponent: ReactNode;
  commandOnMouseDown: TAction;
}

export default function useGhostDrag({
  id,
  GhostComponent,
  commandOnMouseDown,
}: GhostDragProps) {
  const { notify } = useNotify();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      setDragStartPos({ x: e.clientX, y: e.clientY });
    };

    const onDrop = () => {
      setIsDragging(false);
      setDragStartPos(null);
      notify(EventType.DROP, commandOnMouseDown);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [isDragging, id, notify, commandOnMouseDown]);

  const ghostPortal = isDragging
    ? createPortal(
        <div
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
