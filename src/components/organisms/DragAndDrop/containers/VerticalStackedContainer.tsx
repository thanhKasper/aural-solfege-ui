import { useEventBus } from "@/hooks/useEventBus";
import { Box } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { DRAG_AND_DROP_EVENT } from "../constants";
import { type DropEventPayload } from "../events";
import checkCollision from "../utils/checkCollision";
import Relocatable from "../elements/Relocatable";
import Placeholder from "../elements/Placeholder";
import { ContainerProvider, type DragMoveHandler } from "./ContainerContext";
import type { ElementRect } from "./useContainerContext";
import type { RelocatableContentRenderer } from "../elements/types";

interface VerticalStackedContainerProps<T = unknown> {
  dropElements?: T[];
  // Stable identity for an element; falls back to its index.
  getKey?: (element: T) => string;
  renderContent: (element: T) => RelocatableContentRenderer | undefined;
}

function isCollidingWithContainer(
  elementRect: DOMRect,
  containerElement: HTMLDivElement | null,
): boolean {
  if (!containerElement) return false;
  return checkCollision(elementRect, containerElement.getBoundingClientRect());
}

const VerticalStackedContainer = <T,>({
  dropElements = [],
  getKey,
  renderContent,
}: VerticalStackedContainerProps<T>) => {
  const containerIdRef = useRef<string>(`container-${crypto.randomUUID()}`);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const rectsRef = useRef(new Map<string, ElementRect>());
  const [containerCollision, setContainerCollision] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [draggedHeight, setDraggedHeight] = useState<number>();
  const { register } = useEventBus();

  // The drop listener is registered once, so it reads these through refs.
  const dropIndexRef = useRef<number | null>(null);
  const elementCountRef = useRef(dropElements.length);
  useEffect(() => {
    elementCountRef.current = dropElements.length;
  });

  const updateDropIndex = (next: number | null) => {
    dropIndexRef.current = next;
    setDropIndex(next);
  };

  const handleDragMove: DragMoveHandler = (dragged, elementRects) => {
    const container = containerElementRef.current?.getBoundingClientRect();
    const colliding =
      !!container &&
      checkCollision(
        dragged,
        new DOMRect(0, 0, container.width, container.height),
      );
    setContainerCollision(colliding);
    setDraggedHeight(dragged.height);
    if (!colliding) return updateDropIndex(null);

    // The dragged item goes before the first slot whose midpoint is below its top edge.
    const ordered = [...elementRects.values()].sort(
      (a, b) => a.position - b.position,
    );
    const hit = ordered.find(
      ({ rect }) => dragged.top < rect.top + rect.height / 2,
    );
    updateDropIndex(hit ? hit.position : elementCountRef.current);
  };

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
          dropCallback?.(
            dropIndexRef.current ?? elementCountRef.current,
            containerIdRef.current,
          );
        }
        setContainerCollision(false);
        updateDropIndex(null);
      },
    );
  }, [register]);

  return (
    <ContainerProvider
      rectsRef={rectsRef}
      containerRef={containerElementRef}
      onDragMove={handleDragMove}
    >
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
        {dropElements.map((element, idx) => {
          const RelocatableContent = renderContent(element);
          if (!RelocatableContent) {
            return;
          }

          const elementKey = getKey?.(element) ?? String(idx);

          // The placeholder comes first so that Relocatable keeps the same slot
          // (and is not remounted mid-drag) when the placeholder appears.
          return (
            <Fragment key={elementKey}>
              {idx === dropIndex && <Placeholder height={draggedHeight} />}
              <Relocatable
                elementKey={elementKey}
                position={idx}
                value={element}
              >
                {(actions) => <RelocatableContent {...actions} />}
              </Relocatable>
            </Fragment>
          );
        })}
        {dropIndex === dropElements.length && (
          <Placeholder height={draggedHeight} />
        )}
      </Box>
    </ContainerProvider>
  );
};

export default VerticalStackedContainer;
