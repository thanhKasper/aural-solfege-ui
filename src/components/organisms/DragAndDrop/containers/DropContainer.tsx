import { Box, type SxProps, type Theme } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
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

export type TElementPosition = { elementId: string; position: number };

interface DropContainerProps {
  id: string;
  placeholderSx?: SxProps<Theme>;
  onElementPositionChange?: (updatedElements: TElementPosition[]) => void;
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

  const { subscribe } = useObservant(id);

  const indicateDropPosition = useCallback(
    (sourceId: string, domRect: DOMRect) => {
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
        const itemRef = itemRefs.current.get(itemId);
        if (itemId === sourceId) {
          continue;
        }
        if (isDragAbove(domRect, itemRef)) {
          insertIndex = i;
          break;
        }
      }
      setPlaceholderIndex(insertIndex);
    },
    [draggableElements],
  );

  const detectCollision = (draggingElementDomRect: DOMRect) => {
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
  };

  const updateRelocatableElementPosition = useCallback(
    (sourceId: string) => {
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
      }
      setPlaceholderIndex(null);
      setDraggingItem(null);
      setDraggedElementHeight(undefined);
      setContainerCollision(false);
    },
    [placeholderIndex],
  );

  const createRelocatableElement = (
    dropPosition: DOMRect,
    callbacks: Omit<DragAndDropElement, "id">,
  ) => {
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
  };

  // Register event on first mounted
  useEffect(() => {
    subscribe(
      EventType.DRAG,
      ({
        draggingElement,
        sourceId,
      }: {
        sourceId?: string;
        draggingElement: DOMRect;
      }) => {
        detectCollision(draggingElement);
        if (sourceId) {
          indicateDropPosition(sourceId, draggingElement);
        }
      },
    );

    subscribe(
      EventType.DROP,
      ({
        dropPosition,
        callbacks,
      }: {
        dropPosition: DOMRect;
        callbacks: DragAndDropElement;
      }) => {
        createRelocatableElement(dropPosition, callbacks);
      },
    );

    subscribe(
      EventType.CHANGE_POSITION,
      ({ sourceId }: { sourceId: string }) => {
        updateRelocatableElementPosition(sourceId);
      },
    );
  }, [subscribe, indicateDropPosition, updateRelocatableElementPosition]);

  const updateElementPosition = useEffectEvent(
    (draggableElements: DragAndDropElement[]) => {
      onElementPositionChange?.(
        draggableElements.map((element, idx) => ({
          elementId: element.id,
          position: idx,
        })),
      );
    },
  );

  /**
   * As long as the draggableElements is updated, it means there is a position change happening
   * across elements inside the drop container
   */
  useEffect(() => {
    updateElementPosition(draggableElements);
  }, [draggableElements]);

  const handleRemoveElement = (elementId: string) => {
    setDraggableElements((old) =>
      old.filter((element) => element.id !== elementId),
    );
  };

  const placeholderSxResolved: SxProps<Theme> = {
    height: draggedElementHeight ?? 40,
    borderRadius: 1,
    bgcolor: "secondary.light",
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
        backgroundColor: containerCollision ? "secondary.light" : "transparent",
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
                display: draggingItem === element.id ? "none" : "block",
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
