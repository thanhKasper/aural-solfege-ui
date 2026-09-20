import { useContext } from "react";
import { DragAndDropContext } from "../providers/DragAndDropContextV2";
import { GhostElement } from "../elements/GhostElement";

export const useDragAndDrop = () => {
  const ctx = useContext(DragAndDropContext);
  if (!ctx) {
    throw Error("useDragAndDrop is used outside of the drag and drop context");
  }

  const { setGhost } = ctx;

  const showGhostComponent = (
    element: HTMLElement,
    onSuccessDrop?: () => void,
  ) => {
    setGhost(<GhostElement element={element} onSuccessDrop={onSuccessDrop} />);
  };

  const hideGhostComponent = () => {
    setGhost(undefined);
  };

  return {
    showGhostComponent,
    hideGhostComponent,
  };
};
