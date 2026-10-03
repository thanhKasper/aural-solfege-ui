import { useLayoutEffect } from "react";
import { useDragAndDropContext } from "../providers/DragAndDropContextV2";
import { getPreviewNode } from "../utils/getPreviewNode";

export const GhostElement = ({ element }: { element: HTMLElement }) => {
  const { ghostRef, sessionRef } = useDragAndDropContext();

  // Before first paint, so the ghost appears at the grab point instead of (0,0).
  useLayoutEffect(() => {
    const ghost = ghostRef.current;
    const session = sessionRef.current;
    if (!ghost || !session) return;

    const preview = getPreviewNode(element);
    ghost.style.width = `${session.size.width}px`;
    ghost.style.height = `${session.size.height}px`;
    ghost.style.transform = `translate(${session.position.x}px, ${session.position.y}px)`;

    const clone = preview.cloneNode(true) as HTMLElement;
    ghost.appendChild(clone);
    return () => {
      clone.remove();
    };
  }, [element, ghostRef, sessionRef]);

  return (
    <div
      ref={ghostRef}
      style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}
    />
  );
};
