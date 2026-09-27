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
  const draggable = useDraggable();

  const renderedComponent = children({
    value,
    remove: onRemove,
    moveDown: onMoveDown,
    moveUp: onMoveUp,
  });
  return (
    <div {...draggable}>{renderedComponent}</div>
  );
};

export default Relocatable;
