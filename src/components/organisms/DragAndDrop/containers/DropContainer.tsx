import { Box, type SxProps, type Theme } from "@mui/material";
import React, { useRef, useState } from "react";
import useObservant from "../hooks/useObservant";
import RelocatableElement from "../elements/RelocatableElement";
import { EventType } from "../types";
import checkCollision from "../utils/checkCollision";
import type { DragAndDropElement } from "./Container.types";

function isDragAbove(
  draggingPosition: DOMRect,
  element: HTMLElement | null | undefined,
): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const centerY = rect.top;
  return draggingPosition.y < centerY;
}

interface DropContainerProps {
  id: string;
  placeholderSx?: SxProps<Theme>;
  onElementPositionChange?: (newPosition: number, elementId: string) => void;
}

const DropContainer = ({
  id,
  placeholderSx,
  onElementPositionChange,
}: DropContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [containerCollision, setContainerCollision] = useState<boolean>(false);
  const [draggableElements, setDraggableElements] = useState<
    DragAndDropElement[]
  >([]);
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [draggedElementHeight, setDraggedElementHeight] = useState<
    number | undefined
  >(undefined);

  useObservant([EventType.DROP, EventType.DRAG], {
    id,
    ref: containerRef,
    createRelocatableElement: (dropPosition, callbacks) => {
      if (containerRef.current) {
        const containerDomRect = containerRef.current.getBoundingClientRect();
        if (checkCollision(dropPosition, containerDomRect)) {
          setDraggableElements((old) => [
            ...old,
            { id: crypto.randomUUID(), ...callbacks },
          ]);
          setContainerCollision(false);
        }
      }
    },
    updateRelocatableElementPosition: (sourceId) => {
      if (placeholderIndex !== null) {
        let adjustedIndex: number | null = null;
        let focusedElement: DragAndDropElement | undefined;
        setDraggableElements((old) => {
          focusedElement = old.find((el) => el.id === sourceId);
          const focusedElementIndex = old.findIndex((el) => el.id === sourceId);
          if (!focusedElement) return old;
          adjustedIndex =
            placeholderIndex > focusedElementIndex
              ? placeholderIndex - 1
              : placeholderIndex;
          if (adjustedIndex === focusedElementIndex) return old;
          const copy = [...old];
          const [movedItem] = copy.splice(focusedElementIndex, 1);
          copy.splice(adjustedIndex, 0, movedItem);
          return copy;
        });
        if (adjustedIndex && focusedElement) {
          onElementPositionChange?.(adjustedIndex, focusedElement.id);
        }
      }
      setPlaceholderIndex(null);
      setDraggingItem(null);
      setDraggedElementHeight(undefined);
    },
    detectCollision: (draggingElementDomRect) => {
      if (containerRef.current) {
        if (
          checkCollision(
            draggingElementDomRect,
            containerRef.current?.getBoundingClientRect(),
          )
        ) {
          setContainerCollision(true);
        } else {
          setContainerCollision(false);
        }
      }
    },
    indicateDropPosition: (sourceId, domRect) => {
      setDraggingItem(sourceId);
      const el = itemRefs.current.get(sourceId);
      if (el) {
        const elementHeight = el.getBoundingClientRect().height;
        if (elementHeight > 0)
          setDraggedElementHeight(el.getBoundingClientRect().height);
      }
      let insertIndex = draggableElements.length;
      for (let i = 0; i < draggableElements.length; i++) {
        const itemId = draggableElements[i].id;
        if (itemId === sourceId) continue;
        if (isDragAbove(domRect, itemRefs.current.get(itemId))) {
          insertIndex = i;
          break;
        }
      }
      setPlaceholderIndex(insertIndex);
    },
  });

  const handleRemoveElement = (elementId: string) => {
    setDraggableElements((old) =>
      old.filter((element) => element.id !== elementId),
    );
  };

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
        minHeight: "500px",
        border: "1px dashed black",
        alignSelf: "stretch",
        backgroundColor: containerCollision
          ? "rgba(0, 123, 255, 0.1)"
          : "transparent",
        borderColor: containerCollision ? "blue" : "black",
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    >
      {draggableElements.map((element, index) => {
        return (
          <React.Fragment key={element.id}>
            {placeholderIndex === index && <Box sx={placeholderSxResolved} />}
            <div
              ref={(el) => {
                itemRefs.current.set(element.id, el);
              }}
              style={{
                opacity: draggingItem === element.id ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            >
              <RelocatableElement
                id={element.id}
                onCreated={element.onCreated}
                handleCancellation={() => handleRemoveElement(element.id)}
              >
                {element.render({
                  relocatableElementId: element.id,
                  currentPosition: index,
                  moveDown: () => {},
                  moveUp: () => {},
                  removeSelf: () => {
                    handleRemoveElement(element.id);
                  },
                })}
              </RelocatableElement>
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
