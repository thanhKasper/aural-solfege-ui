import { useRef, type PropsWithChildren, type ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import useGhostDrag from "./hooks/useDrag";
import type { DragState } from "./DragAndDropContext";

interface IDraggableElementProps {
  id: string;
  onMouseDown?: (e: MouseEvent, base: (e: MouseEvent) => void) => void;
  GhostComponent: ReactNode;
  onDropActionType: DragState["postAction"];
  sx?: SxProps<Theme>;
}

const DraggableElement = ({
  id,
  children,
  onMouseDown = (e, base) => base(e),
  GhostComponent,
  onDropActionType,
  sx,
}: PropsWithChildren<IDraggableElementProps>) => {
  const draggableElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown: baseMouseDown } = useGhostDrag({
    id,
    elementRef: draggableElementRef,
    GhostComponent,
    actionType: onDropActionType,
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
