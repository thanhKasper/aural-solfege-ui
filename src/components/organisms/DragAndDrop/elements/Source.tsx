import { useCallback, useEffect, type PropsWithChildren } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { RelocatableContentRenderer } from "./types";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { DropEventPayload } from "../events";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: () => void;
  renderRelocatableContent?: RelocatableContentRenderer;
}

const Source = ({ children, onBeforeRelocatableCreated }: SourceProps) => {
  const { showGhostComponent } = useDragAndDrop();
  const { dispatch } = useEventBus();

  const handleMouseRelease = useCallback(() => {
    dispatch<DropEventPayload>(DRAG_AND_DROP_EVENT.ELEMENT_DROP, {
      dropCallback: onBeforeRelocatableCreated,
    });
  }, [dispatch, onBeforeRelocatableCreated]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseRelease);
    return () => {
      window.removeEventListener("mouseup", handleMouseRelease);
    };
  }, [handleMouseRelease]);

  return (
    <div onMouseDown={(e) => showGhostComponent(children, e.currentTarget)}>
      {children}
    </div>
  );
};

export default Source;
