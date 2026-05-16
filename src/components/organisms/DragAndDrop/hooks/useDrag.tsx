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

interface GhostDragProps {
  id: string;
  elementRef?: RefObject<HTMLElement | null>;
  GhostComponent: ReactNode;
}

export default function useGhostDrag({
  id,
  elementRef,
  GhostComponent,
}: GhostDragProps) {
  const { notify } = useNotify();
  const ghostRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!elementRef?.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setIsDragging(true);
      notify({
        isDrop: false,
        x: e.clientX,
        y: e.clientY,
        ghostRect: rect,
      });
    },
    [elementRef, notify],
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      if (ghostRef.current) {
        ghostRef.current.style.left = `${e.clientX}px`;
        ghostRef.current.style.top = `${e.clientY}px`;
        const ghostRect = ghostRef.current.getBoundingClientRect();
        notify({
          isDrop: false,
          x: e.clientX,
          y: e.clientY,
          ghostRect,
        });
      }
    };

    const onDrop = (e: MouseEvent) => {
      if (ghostRef.current) {
        setIsDragging(false);
        notify({
          isDrop: true,
          x: e.clientX,
          y: e.clientY,
          ghostRect: ghostRef.current.getBoundingClientRect(),
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [isDragging, id, notify]);

  const ghostPortal = isDragging
    ? createPortal(
        <div
          ref={ghostRef}
          style={{
            position: "fixed",
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
