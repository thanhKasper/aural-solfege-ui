import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";
import { useRef, type PropsWithChildren } from "react";
import type { Subscriber } from "../DragAndDropContext";
import useGhostDrag from "../hooks/useDrag";

interface IDraggableElementProps {
  onMouseDown?: (e: MouseEvent) => void;
  onDrop: (domRect: DOMRect, subscriber: Subscriber) => void;
  onMove?: (domRect: DOMRect, subscriber: Subscriber) => void;
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
          baseMouseDown(
            e.nativeEvent,
            draggableElementRef.current?.innerHTML ?? "",
            onMouseDown,
          );
        }}
        sx={{ cursor: "grab", ...sx }}
      >
        {children}
      </Box>
      {ghostPortal}
    </>
  );
};

export default DraggableElement;
