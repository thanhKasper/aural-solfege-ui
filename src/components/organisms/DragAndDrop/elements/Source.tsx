import { useRef, type PropsWithChildren, type RefObject } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: () => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = ({ children, onBeforeRelocatableCreated }: SourceProps) => {
  const { showGhostComponent } = useDragAndDrop();
  const sourceComponentRef = useRef<HTMLElement | null>(null);

  return (
    <div
      ref={sourceComponentRef as RefObject<HTMLDivElement>}
      onMouseDown={(e) =>
        showGhostComponent(
          children,
          e.currentTarget,
          onBeforeRelocatableCreated,
        )
      }
    >
      {children}
    </div>
  );
};

export default Source;
