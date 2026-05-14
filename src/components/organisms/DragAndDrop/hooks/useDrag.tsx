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

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.preventDefault();
      if (!elementRef?.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setIsDragging(true);
      notify({
        id,
        x: e.clientX,
        y: e.clientY,
        ghostRect: rect,
      });
    },
    [elementRef, id, notify]
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      if (ghostRef.current) {
        ghostRef.current.style.left = `${e.clientX}px`;
        ghostRef.current.style.top = `${e.clientY}px`;
        const ghostRect = ghostRef.current.getBoundingClientRect();
        notify({
          id,
          x: e.clientX,
          y: e.clientY,
          ghostRect,
        });
      }
    };

    const onUp = () => {
      setIsDragging(false);
      notify(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, id, notify]);

  const ghostPortal = isDragging
    ? createPortal(
        <div
          ref={ghostRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
          }}
        >
          {GhostComponent}
        </div>,
        document.body
      )
    : null;

  return { onMouseDown, ghostPortal };
}
