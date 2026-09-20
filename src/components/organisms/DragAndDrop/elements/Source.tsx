import { useCallback, type PropsWithChildren } from "react";

import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface SourceProps extends PropsWithChildren {
  /**
   * Called with the drop position when the source is dropped inside a supported container.
   * The parent owns the element list, so it decides what element to create and how to add it.
   */
  onBeforeRelocatableCreated?: (position: number) => void;
}

const Source = ({ children, onBeforeRelocatableCreated }: SourceProps) => {
  const { showGhostComponent } = useDragAndDrop();

  const handleSuccessDrop = useCallback(
    (dropPosition: number) => {
      onBeforeRelocatableCreated?.(dropPosition);
    },
    [onBeforeRelocatableCreated],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a")) {
      return;
    }
    showGhostComponent(e.currentTarget, handleSuccessDrop);
  };

  return <div onMouseDown={handleMouseDown}>{children}</div>;
};

export default Source;