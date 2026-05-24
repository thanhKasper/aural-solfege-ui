import { useEffect, useRef, useState, type PropsWithChildren } from "react";
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
  const [shouldShowElement, setShouldShowElement] = useState<boolean>(true);
  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      onCreated?.(handleCancellation);
    }
  }, [onCreated, handleCancellation]);

  return (
    <DraggableElement
      onMouseDown={() => {
        setShouldShowElement(false);
      }}
      onMove={(dropPosition, subscriber) => {
        subscriber.indicateDropPosition(id, dropPosition);
      }}
      GhostComponent={children}
      onDrop={(dropPosition, subscriber) => {
        subscriber.updateRelocatableElementPosition(id, dropPosition);
        setShouldShowElement(true);
      }}
      sx={sx}
    >
      {shouldShowElement && children}
    </DraggableElement>
  );
};

export default RelocatableElement;
