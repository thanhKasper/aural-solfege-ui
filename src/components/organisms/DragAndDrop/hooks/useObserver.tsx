import { useContext } from "react";
import DragAndDropContext from "../DragAndDropContext";

export const useObserver = () => {
  const dndCtx = useContext(DragAndDropContext);
  return { dragState: dndCtx.dragState, notify: dndCtx.notify };
};
