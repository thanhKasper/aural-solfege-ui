import { useEventBus } from "@/hooks/useEventBus";
import { Box, type SxProps, type Theme } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { TElementPosition } from "../DragAndDrop.types";
import type { DropEventPayload, MoveEventPayload } from "../events";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import checkCollision from "../utils/checkCollision";

interface VerticalStackedContainerProps<TValue extends { id: string }> {
  id: string;
  elements: TElementPosition<TValue>[];
  onElementPositionChange?: (
    updatedElements: TElementPosition<TValue>[],
  ) => void;
  renderElement: (value: TValue) => ReactNode;
}

function isCollidingWithContainer(
  elementRect: DOMRect,
  containerElement: HTMLDivElement | null,
): boolean {
  if (!containerElement) return false;
  return checkCollision(elementRect, containerElement.getBoundingClientRect());
}

const VerticalStackedContainer = <TValue extends { id: string }>({
  id,
  elements,
  onElementPositionChange,
  renderElement,
}: VerticalStackedContainerProps<TValue>) => {
  const containerElementRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [containerCollision, setContainerCollision] = useState(false);
  const [draggingElementId, setDraggingElementId] = useState<string | null>(
    null,
  );
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [draggedElementHeight, setDraggedElementHeight] = useState<
    number | undefined
  >(undefined);

  const { register } = useEventBus();
  const { showGhostComponent } = useDragAndDrop();

  const sortedElements = useMemo(
    () => [...elements].sort((a, b) => a.position - b.position),
    [elements],
  );

  const computeDropPosition = useCallback(
    (elementRect: DOMRect) => {
      let insertIndex = sortedElements.length;
      const items = [...itemRefs.current.entries()];
      for (let i = 0; i < items.length; i++) {
        const item = items[i][1];
        if (!item) continue;
        const rect = item.getBoundingClientRect();
        if (elementRect.y < rect.top) {
          insertIndex = i;
          break;
        }
      }
      return insertIndex;
    },
    [sortedElements.length],
  );

  const reorderElements = useCallback(
    (elementId: string, dropPosition: number) => {
      const sourceIndex = sortedElements.findIndex(
        (el) => el.value.id === elementId,
      );
      if (sourceIndex === -1) return;

      const copy = [...sortedElements];
      const [movedElement] = copy.splice(sourceIndex, 1);
      copy.splice(Math.min(dropPosition, copy.length), 0, movedElement);

      onElementPositionChange?.(
        copy.map((el, index) => ({ value: el.value, position: index })),
      );
    },
    [sortedElements, onElementPositionChange],
  );

  const resetDragState = useCallback(() => {
    setDraggingElementId(null);
    setPlaceholderIndex(null);
    setDraggedElementHeight(undefined);
    setContainerCollision(false);
  }, []);

  const handleItemMouseDown = useCallback(
    (elementId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a")) {
        return;
      }
      const element = itemRefs.current.get(elementId);
      const height = element?.getBoundingClientRect().height ?? 40;
      setDraggingElementId(elementId);
      setDraggedElementHeight(height);
      setPlaceholderIndex(
        computeDropPosition(e.currentTarget.getBoundingClientRect()),
      );
      showGhostComponent(e.currentTarget, (dropPosition) => {
        reorderElements(elementId, dropPosition);
      });
    },
    [showGhostComponent, computeDropPosition, reorderElements],
  );

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
          const dropPosition = computeDropPosition(componentDomRect);
          dropCallback?.(dropPosition, id);
        }
        resetDragState();
      },
    );
    register<MoveEventPayload>(
      DRAG_AND_DROP_EVENT.ELEMENT_MOVE,
      ({ element }) => {
        const collision = isCollidingWithContainer(
          element,
          containerElementRef.current,
        );
        setContainerCollision(collision);
        setPlaceholderIndex(collision ? computeDropPosition(element) : null);
      },
    );
  }, [register, id, computeDropPosition, resetDragState]);

  const placeholderSx: SxProps<Theme> = {
    height: draggedElementHeight ?? 40,
    borderRadius: 1,
    opacity: 0.6,
    transition: "all 0.2s ease",
    bgcolor: "canvas.400",
  };

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
      {sortedElements.map((element, index) => {
        const elementId = element.value.id;
        return (
          <React.Fragment key={elementId}>
            {placeholderIndex === index && <Box sx={placeholderSx} />}
            <div
              ref={(el) => {
                itemRefs.current.set(elementId, el);
              }}
              style={{
                display: draggingElementId === elementId ? "none" : "block",
                cursor: "grab",
                transition: "opacity 0.15s",
              }}
              onMouseDown={handleItemMouseDown(elementId)}
            >
              {renderElement(element.value)}
            </div>
          </React.Fragment>
        );
      })}
      {placeholderIndex === sortedElements.length && (
        <Box sx={placeholderSx} />
      )}
    </Box>
  );
};

export default VerticalStackedContainer;