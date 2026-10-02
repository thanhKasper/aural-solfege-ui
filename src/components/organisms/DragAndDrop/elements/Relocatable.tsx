import type { RelocatableContentRenderer } from "./types";
import { useDraggable } from "../hooks/useDraggable";

interface RelocatableProps {
  children: RelocatableContentRenderer;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  value: unknown;
}

const Relocatable = ({
  children,
  onRemove = () => {},
  onMoveDown = () => {},
  onMoveUp = () => {},
  value,
}: RelocatableProps) => {
  const { hideComponent, ...draggable } = useDraggable({ shouldHideSelf: true });

  const renderedComponent = children({
    value,
    remove: onRemove,
    moveDown: onMoveDown,
    moveUp: onMoveUp,
  });
  return (
    <div
      {...draggable}
      style={{ ...draggable.style, display: hideComponent ? "none" : undefined }}
    >
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
