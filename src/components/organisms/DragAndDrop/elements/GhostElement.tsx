import { Box } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";

interface GhostElementProps {
  view?: ReactNode;
}

export const GhostElement = ({ view }: GhostElementProps) => {
  const { hideGhostComponent } = useContext(DragAndDropContext);
  const ghostComponentRef = useRef<HTMLElement | undefined>(undefined);
  const { dispatch } = useEventBus<DRAG_AND_DROP_EVENT>();

  const handleMouseHold = () => {
    console.log("Mouse down, rendering ghost element");
  };

  const handleMouseMove = useCallback(() => {
    const boundClientRect = ghostComponentRef.current?.getBoundingClientRect();
    if (boundClientRect) {
      dispatch(DRAG_AND_DROP_EVENT.ELEMENT_MOVE, boundClientRect);
    }
  }, [dispatch]);

  const handleMouseRelease = useCallback(() => {
    console.log("Mouse up");
    hideGhostComponent();
  }, [hideGhostComponent]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseHold);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseRelease);
    return () => {
      console.log("Clean up registered event listener");
      window.removeEventListener("mousedown", handleMouseHold);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseRelease);
    };
  }, [handleMouseRelease, handleMouseMove]);

  return <Box ref={ghostComponentRef}>{view}</Box>;
};
