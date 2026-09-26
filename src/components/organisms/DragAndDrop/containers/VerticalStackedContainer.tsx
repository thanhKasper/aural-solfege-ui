import { useEventBus } from "@/hooks/useEventBus";
import type { DropElementData } from "@/services/dragAndDrop/types";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DRAG_AND_DROP_EVENT } from "../constants";
import { type MoveEventPayload, type DropEventPayload } from "../events";
import checkCollision from "../utils/checkCollision";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface VerticalStackedContainerProps {
  dropElements?: DropElementData[];
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
  const containerIdRef = useRef<string>(`container-${crypto.randomUUID()}`);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [containerCollision, setContainerCollision] = useState(false);
  const { register } = useEventBus();
  const { addContainer } = useDragAndDrop();

  useEffect(() => {
    addContainer(containerIdRef.current);
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
          dropCallback?.(dropElements.length, containerIdRef.current);
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
      {dropElements.map((element) => (
        <div key={element.id}>
          {element.render({
            moveDown: () => {},
            moveUp: () => {},
            remove: () => {},
            update: () => {},
          })}
        </div>
      ))}
    </Box>
  );
};

export default VerticalStackedContainer;
