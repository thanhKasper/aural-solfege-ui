import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Subscriber } from "../DragAndDropContext";
import { EventType } from "../types";
import useNotify from "./useNotify";

interface GhostDragProps {
  commandOnMouseUp: (ghostDomRect: DOMRect, subscriber: Subscriber) => void;
  commandOnMouseMove?: (ghostDomRect: DOMRect, subscriber: Subscriber) => void;
}

export default function useGhostDrag({
  commandOnMouseUp,
  commandOnMouseMove,
}: GhostDragProps) {
  const { notify } = useNotify();
  const [ghostHTML, setGhostHTML] = useState<string>("");
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isMouseHold = useRef<boolean>(false);
  const allowedToDrag = useRef<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const timeoutKey = useRef<number | null>(null);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseHold.current && !allowedToDrag.current) {
        if (timeoutKey.current) {
          clearTimeout(timeoutKey.current);
          timeoutKey.current = null;
          isMouseHold.current = false;
        }
        allowedToDrag.current = false;
      }

      if (ghostRef.current) {
        if (isMouseHold.current && allowedToDrag.current) {
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
      }
    },
    [commandOnMouseMove, notify],
  );

  const onDrop = useCallback(() => {
    isMouseHold.current = false;
    allowedToDrag.current = false;
    if (!isMouseHold.current) {
      if (timeoutKey.current) {
        clearTimeout(timeoutKey.current);
        timeoutKey.current = null;
      }
    }
    setIsDragging(false);
    setDragStartPos(null);
    window.removeEventListener("mousemove", onMove);
    if (ghostRef.current) {
      const boundRect = ghostRef.current.getBoundingClientRect();
      notify(EventType.DROP, (subscriber) =>
        commandOnMouseUp(boundRect, subscriber),
      );
    }
  }, [commandOnMouseUp, notify, onMove]);

  const onMouseDown = useCallback(
    (
      e: MouseEvent,
      ghostHTMLView: string,
      customMouseDown?: (e: MouseEvent) => void,
    ) => {
      e.preventDefault();
      isMouseHold.current = true;
      timeoutKey.current = setTimeout(() => {
        setIsDragging(true);
        allowedToDrag.current = true;
        setDragStartPos({ x: e.clientX, y: e.clientY });
        customMouseDown?.(e);
        setGhostHTML(ghostHTMLView);
      }, 100);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    },
    [onMove, onDrop],
  );

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
          dangerouslySetInnerHTML={{ __html: ghostHTML }}
        />,
        document.body,
      )
    : null;

  return {
    onMouseDown,
    ghostPortal,
    ghostRef,
  };
}
