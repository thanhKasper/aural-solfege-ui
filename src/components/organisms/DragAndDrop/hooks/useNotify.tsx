import { useContext } from "react";
import DragAndDropContext from "../DragAndDropContext";

export default function useNotify() {
  const dndCtx = useContext(DragAndDropContext);

  return {
    notify: dndCtx.notify,
    isColliding: dndCtx.checkCollision,
  };
}
