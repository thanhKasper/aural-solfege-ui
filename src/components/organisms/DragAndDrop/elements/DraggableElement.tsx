import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";
import { useRef, type PropsWithChildren, type ReactNode } from "react";
import type { TAction } from "../actions";
import useGhostDrag from "../hooks/useDrag";

interface IDraggableElementProps {
  id: string;
  onMouseDown?: (e: MouseEvent, base: (e: MouseEvent) => void) => void;
  GhostComponent: ReactNode;
  onDrop: TAction;
  sx?: SxProps<Theme>;
}

const DraggableElement = ({
  id,
  children,
  onMouseDown = (e, base) => base(e),
  GhostComponent,
  onDrop,
  sx,
}: PropsWithChildren<IDraggableElementProps>) => {
  const draggableElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown: baseMouseDown } = useGhostDrag({
    id,
    elementRef: draggableElementRef,
    GhostComponent,
    commandOnMouseDown: onDrop,
  });

  return (
    <>
      <Box
        ref={draggableElementRef}
        onMouseDown={(e) => onMouseDown?.(e.nativeEvent, baseMouseDown)}
        sx={sx}
      >
        {children}
      </Box>
      {ghostPortal}
    </>
  );
};

export default DraggableElement;
