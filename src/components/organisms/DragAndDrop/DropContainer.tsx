import { Box } from "@mui/material";
import { useRef, useState } from "react";
import useObservant from "./hooks/useObservant";
import RelocatableElement from "./RelocatableElement";

interface DropContainerProps {
  id: string;
}

const DropContainer = ({ id }: DropContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerCollision, setContainerCollision] = useState<boolean>(false);
  const [draggableElements, setDraggableElements] = useState<string[]>([]);
  const { checkCollision } = useObservant({
    id,
    ref: containerRef as React.RefObject<HTMLElement | null>,
    callback: (dragState) => {
      if (dragState?.postAction === "create") {
        if (checkCollision(containerRef)) {
          setContainerCollision(true);
          if (dragState?.isDrop) {
            setDraggableElements((old) => [...old, crypto.randomUUID()]);
            setContainerCollision(false);
          }
        } else {
          setContainerCollision(false);
        }
      }
    },
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "500px",
        border: "1px dashed black",
        alignSelf: "stretch",
        backgroundColor: containerCollision
          ? "rgba(0, 123, 255, 0.1)"
          : "transparent",
        borderColor: containerCollision ? "blue" : "black",
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    >
      {draggableElements.map((value, id) => (
        <RelocatableElement key={id} id={String(id)}>
          {value}
        </RelocatableElement>
      ))}
    </Box>
  );
};

export default DropContainer;
