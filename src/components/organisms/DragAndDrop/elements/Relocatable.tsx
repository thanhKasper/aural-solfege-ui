import { useContext } from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";
import type { RelocatableContentRenderer } from "./types";

interface RelocatableProps {
  children: RelocatableContentRenderer;
}

const Relocatable = ({ children }: RelocatableProps) => {
  const { showGhostComponent } = useContext(DragAndDropContext);

  const remove = () => {};
  const update = () => {};
  const moveUp = () => {};
  const moveDown = () => {};

  const renderedComponent = children({ remove, update, moveUp, moveDown });
  return (
    <div
      onMouseDown={(e) => showGhostComponent(e.currentTarget)}
    >
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
