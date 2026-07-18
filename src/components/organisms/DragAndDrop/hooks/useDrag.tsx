import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { EventType } from "../types";
import useNotify from "./useNotify";
import { useTheme } from "@mui/material";

export interface GhostDragProps {
  commandOnMouseUp: (
    ghostDomRect: DOMRect,
    sendEvent: ReturnType<typeof useNotify>["notify"],
  ) => void;
  commandOnMouseMove?: (
    ghostDomRect: DOMRect,
    sendEvent: ReturnType<typeof useNotify>["notify"],
  ) => void;
  commandOnMouseDown?: (
    ghostDomRect: DOMRect,
    sendEvent: ReturnType<typeof useNotify>["notify"],
  ) => void;
}

export default function useGhostDrag({
  commandOnMouseUp,
  commandOnMouseDown,
}: GhostDragProps) {
  const theme = useTheme();
  const { notify } = useNotify();
  const [ghostHTML, setGhostHTML] = useState<{
    htmlString: string;
    style: {
      width: number;
      height: number;
      backgroundColor?: string;
    };
  }>({
    htmlString: "",
    style: {
      width: 0,
      height: 0,
      backgroundColor: theme.palette.canvas[200],
    },
  });

  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [shouldNotifyStart, setShouldNotifyStart] = useState<MouseEvent | null>(
    null,
  );
  const isMouseHold = useRef<boolean>(false);
  const allowedToDrag = useRef<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const deviationRef = useRef<{ xDev: number; yDev: number }>({
    xDev: 0,
    yDev: 0,
  });
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
          setDragStartPos({
            x: e.clientX - deviationRef.current.xDev,
            y: e.clientY - deviationRef.current.yDev,
          });
          const ghostBoundary = ghostRef.current.getBoundingClientRect();
          notify(EventType.DRAG, ghostBoundary);
        }
      }
    },
    [notify],
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
      commandOnMouseUp(boundRect, notify);
    }
  }, [commandOnMouseUp, notify, onMove]);

  const onMouseDown = useCallback(
    (e: MouseEvent, ghostElementRef: RefObject<HTMLElement | null>) => {
      e.preventDefault();
      isMouseHold.current = true;
      timeoutKey.current = setTimeout(() => {
        setIsDragging(true);
        allowedToDrag.current = true;
        setDragStartPos({ x: e.clientX, y: e.clientY });
        if (ghostElementRef.current) {
          const ghostElement = ghostElementRef.current;
          const ghostElementRect = ghostElement.getBoundingClientRect();
          deviationRef.current = {
            xDev: e.clientX - ghostElementRect.x,
            yDev: e.clientY - ghostElementRect.y,
          };
          setGhostHTML((old) => ({
            htmlString: ghostElement.innerHTML,
            style: {
              ...old.style,
              height: ghostElementRect.height,
              width: ghostElementRect.width,
            },
          }));
          setDragStartPos({
            x: ghostElementRect.x,
            y: ghostElementRect.y,
          });
        }
        setShouldNotifyStart(e);
      }, 100);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    },
    [onMove, onDrop],
  );

  useLayoutEffect(() => {
    if (shouldNotifyStart && ghostRef.current) {
      const boundRect = ghostRef.current.getBoundingClientRect();
      commandOnMouseDown?.(boundRect, notify);
      setShouldNotifyStart(null);
    }
  }, [shouldNotifyStart, commandOnMouseDown, notify]);

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
            ...ghostHTML.style,
          }}
          dangerouslySetInnerHTML={{ __html: ghostHTML.htmlString }}
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
