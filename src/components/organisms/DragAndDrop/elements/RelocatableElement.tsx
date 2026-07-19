import { useEffect, useRef, type PropsWithChildren } from "react";
import type { SxProps, Theme } from "@mui/material";
import DraggableElement from "./DraggableElement";
import { EventType, type DragAndDropElement } from "../DragAndDrop.types";

interface IRelocatableElement<TValue> {
  id: string;
  sx?: SxProps<Theme>;
  handleCancellation?: () => void;
  onCreated?: DragAndDropElement<TValue>["onCreated"];
}

const RelocatableElement = <TValue,>({
  id,
  sx,
  handleCancellation = () => {},
  onCreated,
  children,
}: PropsWithChildren<IRelocatableElement<TValue>>) => {
  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      onCreated?.(handleCancellation);
    }
  }, [onCreated, handleCancellation]);

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
