import { Box } from "@mui/material";
import { useRef, useEffect, useCallback } from "react";
import useObservant from "./hooks/useObservant";
import { type DragState } from "./DragAndDropContext";

interface DropContainerProps {
  id: string;
  onDrop?: (dragState: DragState) => void;
}

const DropContainer = ({ id, onDrop }: DropContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCallback, isColliding } = useObservant(
    id,
    "drop",
    containerRef as React.RefObject<HTMLElement | null>
  );

  const handleDragState = useCallback(
    (dragState: DragState | null) => {
      if (dragState && isColliding && onDrop) {
        onDrop(dragState);
      }
    },
    [isColliding, onDrop]
  );

  useEffect(() => {
    setCallback(handleDragState);
  }, [setCallback, handleDragState]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "500px",
        border: "1px dashed black",
        alignSelf: "stretch",
        backgroundColor: isColliding ? "rgba(0, 123, 255, 0.1)" : "transparent",
        borderColor: isColliding ? "blue" : "black",
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    />
  );
};

export default DropContainer;
