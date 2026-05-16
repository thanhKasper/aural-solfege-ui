import { useRef, type PropsWithChildren, type ReactNode } from "react";
import useGhostDrag from "./hooks/useDrag";
import type { DragState } from "./DragAndDropContext";

interface IDraggableElementProps {
  id: string;
  onMouseDown?: (e: MouseEvent, base: (e: MouseEvent) => void) => void;
  GhostComponent: ReactNode;
  onDropActionType: DragState["postAction"];
}

const DraggableElement = ({
  id,
  children,
  onMouseDown = (e, base) => base(e),
  GhostComponent,
  onDropActionType,
}: PropsWithChildren<IDraggableElementProps>) => {
  const draggableElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown: baseMouseDown } = useGhostDrag({
    id,
    elementRef: draggableElementRef,
    GhostComponent,
    actionType: onDropActionType,
  });

  return (
    <>
      <div
        ref={draggableElementRef}
        onMouseDown={(e) => onMouseDown?.(e.nativeEvent, baseMouseDown)}
      >
        {children}
      </div>
      {ghostPortal}
    </>
  );
};

export default DraggableElement;
