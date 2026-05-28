import { useEffect, useRef, type PropsWithChildren } from "react";
import type { SxProps, Theme } from "@mui/material";
import DraggableElement from "./DraggableElement";
import type { DragAndDropElement } from "../containers/Container.types";

interface IRelocatableElement {
  id: string;
  sx?: SxProps<Theme>;
  handleCancellation?: () => void;
  onCreated?: DragAndDropElement["onCreated"];
}

const RelocatableElement = ({
  id,
  sx,
  handleCancellation = () => {},
  onCreated,
  children,
}: PropsWithChildren<IRelocatableElement>) => {
  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      onCreated?.(handleCancellation);
    }
  }, [onCreated, handleCancellation]);

  return (
    <DraggableElement
      onMove={(dropPosition, subscriber) => {
        subscriber.indicateDropPosition(id, dropPosition);
      }}
      onMouseDown={(dropPosition, subscriber) => {
        subscriber.indicateDropPosition(id, dropPosition);
      }}
      onDrop={(dropPosition, subscriber) => {
        subscriber.updateRelocatableElementPosition(id, dropPosition);
      }}
      sx={sx}
    >
      {children}
    </DraggableElement>
  );
};

export default RelocatableElement;
