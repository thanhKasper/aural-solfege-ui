import { useLayoutEffect, useRef } from "react";
import type { RelocatableContentRenderer } from "./types";
import type { DropEventPayload } from "../events";
import { useDraggable } from "../hooks/useDraggable";
import { useContainerContext } from "../containers/useContainerContext";

interface RelocatableProps {
  children: RelocatableContentRenderer;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  value: unknown;
  elementKey: string;
  position: number;
  onSuccessDrop?: DropEventPayload["dropCallback"];
}

const Relocatable = ({
  children,
  onRemove = () => {},
  onMoveDown = () => {},
  onMoveUp = () => {},
  value,
  elementKey,
  position,
  onSuccessDrop,
}: RelocatableProps) => {
  const { hideComponent, ...draggable } = useDraggable({
    shouldHideSelf: true,
    onSuccessDrop,
  });
  const container = useContainerContext();
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;
    return container.register(elementKey, position, elementRef.current);
  }, [container, elementKey, position]);

  const renderedComponent = children({
    value,
    remove: onRemove,
    moveDown: onMoveDown,
    moveUp: onMoveUp,
  });
  return (
    <div
      ref={elementRef}
      {...draggable}
      style={{
        ...draggable.style,
        display: hideComponent ? "none" : undefined,
      }}
    >
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
