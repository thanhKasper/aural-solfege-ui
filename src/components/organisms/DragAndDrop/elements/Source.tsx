import { useRef, type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface SourceProps<T> extends PropsWithChildren {
  onBeforeRelocatableCreated?: (
    position: number,
    next: (payload: T) => void,
  ) => void;
}

const Source = <T,>({
  children,
  onBeforeRelocatableCreated,
}: SourceProps<T>) => {
  const { showGhostComponent, addElement } = useDragAndDrop();
  const targetedContainerRef = useRef<string | undefined>(undefined);

  const handleNext = <T,>(payload: T) => {
    if (targetedContainerRef.current) {
      addElement(targetedContainerRef.current, payload);
    }
  };

  const handleSuccessDrop = (dropPosition: number, containerId?: string) => {
    targetedContainerRef.current = containerId;
    onBeforeRelocatableCreated?.(dropPosition, handleNext);
  };

  return (
    <div
      onMouseDown={(e) =>
        showGhostComponent(e.currentTarget, handleSuccessDrop)
      }
    >
      {children}
    </div>
  );
};

export default Source;
