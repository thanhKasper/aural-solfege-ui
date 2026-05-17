import { Box } from "@mui/material";
import { useRef, useState } from "react";
import type { DragState } from "./DragAndDropContext";
import useObservant from "./hooks/useObservant";
import RelocatableElement from "./RelocatableElement";

function isDragAbove(
  dragState: DragState,
  element: HTMLElement | null | undefined,
): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const centerY = rect.top;
  return dragState.y < centerY;
}

interface DropContainerProps {
  id: string;
}

const DropContainer = ({ id }: DropContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
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
      } else if (dragState?.postAction === "updatePosition") {
        if (!checkCollision(containerRef)) {
          return;
        }
        const sourceId = dragState.sourceId;
        if (!sourceId) return;

        let insertIndex = draggableElements.length;
        for (let i = 0; i < draggableElements.length; i++) {
          const itemId = draggableElements[i];
          if (itemId === sourceId) continue;
          if (isDragAbove(dragState, itemRefs.current.get(itemId))) {
            insertIndex = i;
            break;
          }
        }

        setDraggableElements((old) => {
          const sourceIndex = old.indexOf(sourceId);
          if (sourceIndex === -1) return old;
          const adjustedIndex =
            insertIndex > sourceIndex ? insertIndex - 1 : insertIndex;
          if (adjustedIndex === sourceIndex) return old;
          const copy = [...old];
          const [movedItem] = copy.splice(sourceIndex, 1);
          copy.splice(adjustedIndex, 0, movedItem);
          return copy;
        });
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
      {draggableElements.map((value) => {
        return (
          <div
            key={value}
            ref={(el) => {
              itemRefs.current.set(value, el);
            }}
          >
            <RelocatableElement id={value}>{value}</RelocatableElement>
          </div>
        );
      })}
    </Box>
  );
};

export default DropContainer;
