import { useRef, type PropsWithChildren, type ReactNode } from "react";
import useGhostDrag from "./hooks/useDrag";

interface IDraggableElementProps {
  id: string;
  onMouseDown?: (e: MouseEvent, base: (e: MouseEvent) => void) => void;
  GhostComponent: ReactNode;
}

const DraggableElement = ({
  id,
  children,
  onMouseDown = (e, base) => base(e),
  GhostComponent,
}: PropsWithChildren<IDraggableElementProps>) => {
  const draggableElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown: baseMouseDown } = useGhostDrag({
    id,
    elementRef: draggableElementRef,
    GhostComponent,
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
