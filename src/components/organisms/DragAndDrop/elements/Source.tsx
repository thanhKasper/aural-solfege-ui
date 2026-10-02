import { useRef, type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useDraggable } from "../hooks/useDraggable";

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
  const { addElement } = useDragAndDrop();
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

  const draggable = useDraggable({ onSuccessDrop: handleSuccessDrop });

  return <div {...draggable}>{children}</div>;
};

export default Source;
