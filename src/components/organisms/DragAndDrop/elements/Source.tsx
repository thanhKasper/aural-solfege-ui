import { useRef, type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";
import { DropElement } from "@/services/dragAndDrop/DropElement";

interface SourceProps<T> extends PropsWithChildren {
  onBeforeRelocatableCreated?: (
    position: number,
    next: (payload: T) => void,
  ) => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = <T,>({
  children,
  onBeforeRelocatableCreated,
  renderRelocatableContent,
}: SourceProps<T>) => {
  const { showGhostComponent, addElement } = useDragAndDrop();
  const targetedContainerRef = useRef<string | undefined>(undefined);

  const handleNext = <T,>(payload: T) => {
    const dropElement = new DropElement(
      payload,
      renderRelocatableContent ?? (() => <></>),
    );
    if (targetedContainerRef.current) {
      addElement(targetedContainerRef.current, dropElement);
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
