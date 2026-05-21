import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { Subscriber } from "../DragAndDropContext";
import { EventType } from "../types";
import useNotify from "./useNotify";

interface GhostDragProps {
  id: string;
  GhostComponent: ReactNode;
  commandOnMouseDown: (ghostDomRect: DOMRect, subscriber: Subscriber) => void;
  commandOnMouseMove?: (ghostDomRect: DOMRect, subscriber: Subscriber) => void;
}

export default function useGhostDrag({
  id,
  GhostComponent,
  commandOnMouseDown,
  commandOnMouseMove,
}: GhostDragProps) {
  const { notify } = useNotify();
  const ghostRef = useRef<HTMLDivElement | null>(null);
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
      if (ghostRef.current) {
        setDragStartPos({ x: e.clientX, y: e.clientY });
        const ghostBoundary = ghostRef.current.getBoundingClientRect();
        notify(EventType.DRAG, (subscriber) => {
          if (commandOnMouseMove) {
            commandOnMouseMove(ghostBoundary, subscriber);
          } else {
            subscriber?.detectCollision(ghostBoundary);
          }
        });
      }
    };

    const onDrop = () => {
      setIsDragging(false);
      setDragStartPos(null);
      if (ghostRef.current) {
        const boundRect = ghostRef.current.getBoundingClientRect();
        notify(EventType.DROP, (subscriber) =>
          commandOnMouseDown(boundRect, subscriber),
        );
      }
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

  return {
    onMouseDown,
    ghostPortal,
    ghostRef,
  };
}
