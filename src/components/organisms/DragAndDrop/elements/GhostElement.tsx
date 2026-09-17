import { Box } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";

interface GhostElementProps {
  view: ReactNode;
  bindingComponentRef: RefObject<HTMLElement | null>;
}

type Coordination = {
  x: number;
  y: number;
};

export const GhostElement = ({
  view,
  bindingComponentRef,
}: GhostElementProps) => {
  const { hideGhostComponent } = useContext(DragAndDropContext);
  const ghostComponentRef = useRef<HTMLElement | undefined>(undefined);
  const { dispatch } = useEventBus<DRAG_AND_DROP_EVENT>();
  const [coordination, setCoordination] = useState<Coordination>({
    x: 0,
    y: 0,
  });
  const grabOffsetRef = useRef<Coordination>({ x: 0, y: 0 });

  const handleMouseHold = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (!bindingComponentRef.current?.contains(target)) return;

      const bindingRect = bindingComponentRef.current.getBoundingClientRect();
      grabOffsetRef.current = {
        x: e.clientX - bindingRect.x,
        y: e.clientY - bindingRect.y,
      };

      setCoordination({
        x: bindingRect.x,
        y: bindingRect.y,
      });
    },
    [bindingComponentRef],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setCoordination({
        x: e.clientX - grabOffsetRef.current.x,
        y: e.clientY - grabOffsetRef.current.y,
      });

      const boundClientRect =
        ghostComponentRef.current?.getBoundingClientRect();
      if (boundClientRect) {
        dispatch(DRAG_AND_DROP_EVENT.ELEMENT_MOVE, boundClientRect);
      }
    },
    [dispatch],
  );

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
  }, [handleMouseRelease, handleMouseMove, handleMouseHold]);

  return (
    <Box
      ref={ghostComponentRef}
      sx={{ position: "fixed", top: coordination.y, left: coordination.x }}
    >
      {view}
    </Box>
  );
};
