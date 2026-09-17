import { Container } from "@/services/dragAndDrop/Container";
import type { DropElement } from "@/services/dragAndDrop/DropElement";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface VerticalStackedContainerProps {
  dropElements?: DropElement[];
}

const VerticalStackedContainer = ({
  dropElements = [],
}: VerticalStackedContainerProps) => {
  const containerRef = useRef<Container>(new Container(dropElements));

  useEffect(() => {
    containerRef.current.updateElements(dropElements);
  }, [dropElements]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "500px",
        border: "1px dashed black",
        alignSelf: "stretch",
        // backgroundColor: containerCollision ? "canvas.200" : "transparent",
        // borderColor: containerCollision ? "accent.300" : "canvas.400",
        borderWidth: 2,
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    >
      {dropElements.map((element) => {
        const renderedComponent = element.render();
        return renderedComponent;
      })}
    </Box>
  );
};

export default VerticalStackedContainer;
