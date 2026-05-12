import {
  useCallback,
  useEffect,
  useState,
  type MouseEventHandler,
  type RefObject,
} from "react";

interface GhostDragProps {
  elementRef?: RefObject<HTMLElement | null>;
}

export default function useGhostDrag({ elementRef }: GhostDragProps) {
  const [drag, setDrag] = useState<{
    x: number;
    y: number;
    rect?: DOMRect;
  } | null>(null);

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.preventDefault();
      if (!elementRef?.current) return;
      const rect = elementRef?.current.getBoundingClientRect();
      setDrag({ x: e.clientX, y: e.clientY, rect });
    },
    [elementRef],
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

  return { onMouseDown, drag };
}
