import { useRef, type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";
import { DropElement } from "@/services/dragAndDrop/DropElement";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: <T>(next: (payload: T) => void) => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = ({
  children,
  onBeforeRelocatableCreated,
  renderRelocatableContent,
}: SourceProps) => {
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

  const handleSuccessDrop = (containerId?: string) => {
    targetedContainerRef.current = containerId;
    onBeforeRelocatableCreated?.(handleNext);
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
