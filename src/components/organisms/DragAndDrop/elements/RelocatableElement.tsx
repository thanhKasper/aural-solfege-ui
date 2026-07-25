import { useEffect, useRef, type PropsWithChildren } from "react";
import type { SxProps, Theme } from "@mui/material";
import DraggableElement from "./DraggableElement";
import { EventType } from "../DragAndDrop.types";

interface IRelocatableElement {
  id: string;
  sx?: SxProps<Theme>;
  onCreated?: () => void;
}

const RelocatableElement = ({
  id,
  sx,
  onCreated,
  children,
}: PropsWithChildren<IRelocatableElement>) => {
  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      onCreated?.();
    }
  }, [onCreated]);

  return (
    <DraggableElement
      onMove={(currentPosition, sendEvent) => {
        sendEvent(EventType.DRAG, {
          draggingElement: currentPosition,
          sourceId: id,
        });
      }}
      onMouseDown={(currentPosition, sendEvent) => {
        sendEvent(EventType.DRAG, {
          draggingElement: currentPosition,
          sourceId: id,
        });
      }}
      onDrop={(dropPosition, sendEvent) => {
        sendEvent(EventType.CHANGE_POSITION, {
          sourceId: id,
          dropPosition,
        });
      }}
      sx={sx}
    >
      {children}
    </DraggableElement>
  );
};

export default RelocatableElement;
