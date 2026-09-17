import { type PropsWithChildren } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: () => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = ({ children }: SourceProps) => {
  const { showGhostComponent } = useDragAndDrop();

  return (
    <div onMouseDown={(e) => showGhostComponent(children, e.currentTarget)}>
      {children}
    </div>
  );
};

export default Source;
