import { type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";
// import { DropElement } from "@/services/dragAndDrop/DropElement";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: <T>(next: (payload: T) => void) => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = ({
  children,
  onBeforeRelocatableCreated,
  // renderRelocatableContent,
}: SourceProps) => {
  const { showGhostComponent } = useDragAndDrop();

  const handleNext = () => {
    // const dropElement = new DropElement(
    //   payload,
    //   renderRelocatableContent ?? (() => <></>),
    // );
  };

  const handleSuccessDrop = () => {
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
