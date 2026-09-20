import type { RelocatableContentRenderer } from "./types";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface RelocatableProps {
  children: RelocatableContentRenderer;
}

const Relocatable = ({ children }: RelocatableProps) => {
  const { showGhostComponent } = useDragAndDrop();

  const remove = () => {};
  const update = () => {};
  const moveUp = () => {};
  const moveDown = () => {};

  const renderedComponent = children({ remove, update, moveUp, moveDown });
  return (
    <div onMouseDown={(e) => showGhostComponent(e.currentTarget)}>
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
