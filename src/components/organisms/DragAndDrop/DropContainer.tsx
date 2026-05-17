import { Box, type SxProps, type Theme } from "@mui/material";
import React, { useRef, useState } from "react";
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
  placeholderSx?: SxProps<Theme>;
}

const DropContainer = ({ id, placeholderSx }: DropContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [containerCollision, setContainerCollision] = useState<boolean>(false);
  const [draggableElements, setDraggableElements] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [draggedElementHeight, setDraggedElementHeight] = useState<
    number | undefined
  >(undefined);
  const { checkCollision } = useObservant({
    id,
    ref: containerRef as React.RefObject<HTMLElement | null>,
    callback: (dragState) => {
      if (dragState?.action === "create") {
        if (checkCollision(containerRef)) {
          setContainerCollision(true);
          if (dragState?.isDrop) {
            setDraggableElements((old) => [...old, crypto.randomUUID()]);
            setContainerCollision(false);
          }
        } else {
          setContainerCollision(false);
        }
      } else if (dragState?.action === "updatePosition") {
        const sourceId = dragState.sourceId;
        if (!sourceId) return;

        if (!checkCollision(containerRef)) {
          setPlaceholderIndex(null);
          setDraggingItem(null);
          return;
        }

        setDraggingItem(sourceId);

        const el = itemRefs.current.get(sourceId);
        console.log(el?.getBoundingClientRect().height);
        if (el) {
          const elementHeight = el.getBoundingClientRect().height;
          if (elementHeight > 0)
            setDraggedElementHeight(el.getBoundingClientRect().height);
        }

        if (dragState.isDrop) {
          if (placeholderIndex !== null) {
            setDraggableElements((old) => {
              const sourceIndex = old.indexOf(sourceId);
              if (sourceIndex === -1) return old;
              const adjustedIndex =
                placeholderIndex > sourceIndex
                  ? placeholderIndex - 1
                  : placeholderIndex;
              if (adjustedIndex === sourceIndex) return old;
              const copy = [...old];
              const [movedItem] = copy.splice(sourceIndex, 1);
              copy.splice(adjustedIndex, 0, movedItem);
              return copy;
            });
          }
          setPlaceholderIndex(null);
          setDraggingItem(null);
          setDraggedElementHeight(undefined);
          return;
        }

        let insertIndex = draggableElements.length;
        for (let i = 0; i < draggableElements.length; i++) {
          const itemId = draggableElements[i];
          if (itemId === sourceId) continue;
          if (isDragAbove(dragState, itemRefs.current.get(itemId))) {
            insertIndex = i;
            break;
          }
        }
        setPlaceholderIndex(insertIndex);
      }
    },
  });

  const placeholderSxResolved: SxProps<Theme> = {
    height: draggedElementHeight ?? 40,
    mx: 2,
    borderRadius: 1,
    bgcolor: "primary.main",
    opacity: 0.6,
    transition: "all 0.2s ease",
    ...placeholderSx,
  };

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
      {draggableElements.map((value, index) => {
        return (
          <React.Fragment key={value}>
            {placeholderIndex === index && <Box sx={placeholderSxResolved} />}
            <div
              ref={(el) => {
                itemRefs.current.set(value, el);
              }}
              style={{
                opacity: draggingItem === value ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            >
              <RelocatableElement id={value}>{value}</RelocatableElement>
            </div>
          </React.Fragment>
        );
      })}
      {placeholderIndex === draggableElements.length && (
        <Box sx={placeholderSxResolved} />
      )}
    </Box>
  );
};

export default DropContainer;
