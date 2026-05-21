import { useEffect, useState, type PropsWithChildren } from "react";
import type { SxProps, Theme } from "@mui/material";
import DraggableElement from "./DraggableElement";

interface IRelocatableElement {
  id: string;
  sx?: SxProps<Theme>;
  onElementCreated?: () => void;
  onElementUnMounted?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const RelocatableElement = ({
  id,
  sx,
  children,
  onElementCreated,
  onElementUnMounted,
}: PropsWithChildren<IRelocatableElement>) => {
  const [shouldShowElement, setShouldShowElement] = useState<boolean>(true);

  const mouseUp = () => {
    setShouldShowElement(true);
  };

  useEffect(() => {
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  useEffect(() => {
    onElementCreated?.();
    return () => {
      onElementUnMounted?.();
    };
  });

  return (
    <DraggableElement
      id={id}
      onMouseDown={(e, baseOnMouseDown) => {
        baseOnMouseDown(e);
        setShouldShowElement(false);
      }}
      GhostComponent={children}
      onDrop={() => {}}
      sx={sx}
    >
      {shouldShowElement && children}
    </DraggableElement>
  );
};

export default RelocatableElement;
