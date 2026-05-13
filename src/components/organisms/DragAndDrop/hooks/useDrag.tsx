import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

interface GhostDragProps {
  elementRef?: RefObject<HTMLElement | null>;
  GhostComponent: ReactNode;
}

export default function useGhostDrag({
  elementRef,
  GhostComponent,
}: GhostDragProps) {
  const [drag, setDrag] = useState<{
    x: number;
    y: number;
    rect?: DOMRect;
  } | null>(null);

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.preventDefault();
      if (!elementRef?.current) return;
      console.log("drag event");
      const rect = elementRef?.current.getBoundingClientRect();
      setDrag({ x: e.clientX, y: e.clientY, rect });
      createPortal(GhostComponent, document.body);
      console.log("Create ghost component");
    },
    [elementRef, GhostComponent],
  );

  useEffect(() => {
    if (!drag) return;

    const onMove = (e: MouseEvent) =>
      setDrag((d) => d && { ...d, x: e.clientX, y: e.clientY });

    const onUp = () => setDrag(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag]);

  const ghostPortal = drag
    ? createPortal(
        <div
          style={{
            position: "fixed",
            left: drag.x,
            top: drag.y,
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

  return { onMouseDown, ghostPortal   };
}
