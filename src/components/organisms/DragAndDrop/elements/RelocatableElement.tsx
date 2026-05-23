import { useEffect, useState, type PropsWithChildren } from "react";
import type { SxProps, Theme } from "@mui/material";
import DraggableElement from "./DraggableElement";

interface IRelocatableElement {
  id: string;
  sx?: SxProps<Theme>;
}

const RelocatableElement = ({
  id,
  sx,
  children,
}: PropsWithChildren<IRelocatableElement>) => {
  const [shouldShowElement, setShouldShowElement] = useState<boolean>(true);

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
