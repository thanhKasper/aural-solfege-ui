import { useContext, useRef, type ReactNode, type RefObject } from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";

type RelocatableActions = {
  remove: () => void;
  update: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

interface RelocatableProps {
  children: (actions: RelocatableActions) => ReactNode;
}

const Relocatable = ({ children }: RelocatableProps) => {
  const { showGhostComponent } = useContext(DragAndDropContext);
  const relocatableRef = useRef<HTMLElement | null>(null);

  const remove = () => {};
  const update = () => {};
  const moveUp = () => {};
  const moveDown = () => {};

  const renderedComponent = children({ remove, update, moveUp, moveDown });
  return (
    <div
      ref={relocatableRef as RefObject<HTMLDivElement>}
      onMouseDown={() => showGhostComponent(renderedComponent, relocatableRef)}
    >
      {renderedComponent}
    </div>
  );
};

export default Relocatable;
