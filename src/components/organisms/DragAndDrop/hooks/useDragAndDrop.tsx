import { useContext } from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";

export const useDragAndDrop = () => {
  const ctx = useContext(DragAndDropContext);
  if (!ctx) {
    throw Error("useDragAndDrop is used outside of the drag and drop context");
  }

  return ctx;
};
