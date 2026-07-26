import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";
import { useRef, type PropsWithChildren } from "react";
import useGhostDrag, { type GhostDragProps } from "../hooks/useDrag";

interface IDraggableElementProps {
  onMouseDown?: GhostDragProps["commandOnMouseDown"];
  onDrop: GhostDragProps["commandOnMouseUp"];
  onMove?: GhostDragProps["commandOnMouseMove"];
  sx?: SxProps<Theme>;
}

const DraggableElement = ({
  children,
  onMouseDown,
  onDrop,
  onMove,
  sx,
}: PropsWithChildren<IDraggableElementProps>) => {
  const draggableElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown: baseMouseDown } = useGhostDrag({
    commandOnMouseUp: onDrop,
    commandOnMouseMove: onMove,
    commandOnMouseDown: onMouseDown,
  });

  return (
    <>
      <Box
        ref={draggableElementRef}
        onMouseDown={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button, a")) {
            return;
          }
          baseMouseDown(e.nativeEvent, draggableElementRef);
        }}
        sx={{ cursor: "grab", backgroundColor: "inherit", ...sx }}
      >
        {children}
      </Box>
      {ghostPortal}
    </>
  );
};

export default DraggableElement;
