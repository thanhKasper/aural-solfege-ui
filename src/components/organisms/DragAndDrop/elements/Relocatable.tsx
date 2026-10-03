import { useLayoutEffect, useRef } from "react";
import type { RelocatableContentRenderer } from "./types";
import { useDraggable } from "../hooks/useDraggable";
import { useContainerContext } from "../containers/useContainerContext";
import Placeholder from "./Placeholder";

interface RelocatableProps {
  children: RelocatableContentRenderer;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  value: unknown;
  elementKey: string;
  position: number;
  showPlaceholder?: boolean;
  placeholderHeight?: number;
}

const Relocatable = ({
  children,
  onRemove = () => {},
  onMoveDown = () => {},
  onMoveUp = () => {},
  value,
  elementKey,
  position,
  showPlaceholder = false,
  placeholderHeight,
}: RelocatableProps) => {
  const { hideComponent, ...draggable } = useDraggable({
    shouldHideSelf: true,
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
    <>
      {showPlaceholder && <Placeholder height={placeholderHeight} />}
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
    </>
  );
};

export default Relocatable;
