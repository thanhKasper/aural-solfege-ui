import { useEventBus } from "@/hooks/useEventBus";
import { Container } from "@/services/dragAndDrop/Container";
import type { DropElement } from "@/services/dragAndDrop/DropElement";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DRAG_AND_DROP_EVENT } from "../constants";
import { type MoveEventPayload, type DropEventPayload } from "../events";
import checkCollision from "../utils/checkCollision";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface VerticalStackedContainerProps {
  dropElements?: DropElement[];
}

function isCollidingWithContainer(
  elementRect: DOMRect,
  containerElement: HTMLDivElement | null,
): boolean {
  if (!containerElement) return false;
  return checkCollision(elementRect, containerElement.getBoundingClientRect());
}

const VerticalStackedContainer = ({
  dropElements = [],
}: VerticalStackedContainerProps) => {
  const containerRef = useRef<Container>(new Container(dropElements));
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [containerCollision, setContainerCollision] = useState(false);
  const { register } = useEventBus();
  const { addContainer } = useDragAndDrop();

  useEffect(() => {
    containerRef.current.updateElements(dropElements);
  }, [dropElements]);

  useEffect(() => {
    addContainer(containerRef.current);
  }, [addContainer]);

  useEffect(() => {
    register<DropEventPayload>(
      DRAG_AND_DROP_EVENT.ELEMENT_DROP,
      ({ componentDomRect, dropCallback }) => {
        if (
          isCollidingWithContainer(
            componentDomRect,
            containerElementRef.current,
          )
        ) {
          dropCallback?.(dropElements.length, containerRef.current.id);
        }
        setContainerCollision(false);
      },
    );
    register<MoveEventPayload>(
      DRAG_AND_DROP_EVENT.ELEMENT_MOVE,
      ({ element }) => {
        setContainerCollision(
          isCollidingWithContainer(element, containerElementRef.current),
        );
      },
    );
  }, [register]);

  return (
    <Box
      ref={containerElementRef}
      sx={{
        width: "100%",
        minHeight: "500px",
        border: "1px dashed black",
        alignSelf: "stretch",
        backgroundColor: containerCollision ? "canvas.200" : "transparent",
        borderColor: containerCollision ? "accent.300" : "canvas.400",
        borderWidth: 2,
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    >
      {dropElements.map((element) => {
        const RelocatableComponent = element.render();
        return (
          <RelocatableComponent
            moveDown={() => {}}
            moveUp={() => {}}
            remove={() => {}}
            update={() => {}}
          />
        );
      })}
    </Box>
  );
};

export default VerticalStackedContainer;
