import type { RelocatableContentRenderer } from "./types";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface RelocatableProps {
  children: RelocatableContentRenderer;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const Relocatable = ({
  children,
  onRemove = () => {},
  onMoveDown = () => {},
  onMoveUp = () => {},
}: RelocatableProps) => {
  const { showGhostComponent } = useDragAndDrop();

  const renderedComponent = children({
    remove: onRemove,
    moveDown: onMoveDown,
    moveUp: onMoveUp,
  });
  return (
    <div onMouseDown={(e) => showGhostComponent(e.currentTarget)}>
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
