import { Box } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";

interface GhostElementProps {
  view?: ReactNode;
}

export const GhostElement = ({ view }: GhostElementProps) => {
  const { hideGhostComponent } = useContext(DragAndDropContext);
  const ghostComponentRef = useRef<HTMLElement | undefined>(undefined);

  const handleMouseDown = () => {
    console.log("Mouse down, rendering ghost element");
  };

  const handleMouseMove = () => {
    console.log("Mouse move");
  };

  const handleMouseUp = useCallback(() => {
    console.log("Mouse up");
    hideGhostComponent();
  }, [hideGhostComponent]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      console.log("Clean up registered event listener");
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return <Box ref={ghostComponentRef}>{view}</Box>;
};
