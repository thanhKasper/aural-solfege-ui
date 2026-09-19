import { Box } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DragAndDropContext } from "../DragAndDropContextV2";
import { useEventBus } from "@/hooks/useEventBus";
import { DRAG_AND_DROP_EVENT } from "../constants";
import type { DropEventPayload } from "../events";

interface GhostElementProps {
  element: HTMLElement;
  onSuccessDrop?: () => void;
}

type Coordination = {
  x: number;
  y: number;
};

export const GhostElement = ({
  element,
  onSuccessDrop,
}: GhostElementProps) => {
  const { hideGhostComponent } = useContext(DragAndDropContext);
  const { dispatch } = useEventBus<DRAG_AND_DROP_EVENT>();
  const [coordination, setCoordination] = useState<Coordination>({
    x: 0,
    y: 0,
  });
  const grabOffsetRef = useRef<Coordination>({ x: 0, y: 0 });
  const ghostRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const rect = element.getBoundingClientRect();
    if (ghostRef.current) {
      ghostRef.current.style.width = `${rect.width}px`;
      ghostRef.current.style.height = `${rect.height}px`;
    }

    const contentNode = contentRef.current;
    if (!contentNode) return;
    const clonedView = element.cloneNode(true) as HTMLElement;
    contentNode.appendChild(clonedView);
    return () => {
      clonedView.remove();
    };
  }, [element]);

  const handleMouseHold = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (!element.contains(target)) return;

      const bindingRect = element.getBoundingClientRect();
      grabOffsetRef.current = {
        x: e.clientX - bindingRect.x,
        y: e.clientY - bindingRect.y,
      };

      setCoordination({
        x: bindingRect.x,
        y: bindingRect.y,
      });
    },
    [element],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setCoordination({
        x: e.clientX - grabOffsetRef.current.x,
        y: e.clientY - grabOffsetRef.current.y,
      });

      dispatch(DRAG_AND_DROP_EVENT.ELEMENT_MOVE, element);
    },
    [dispatch, element],
  );

  const handleMouseRelease = useCallback(() => {
    if (!ghostRef.current) return;
    dispatch<DropEventPayload>(DRAG_AND_DROP_EVENT.ELEMENT_DROP, {
      dropCallback: onSuccessDrop,
      componentDomRect: ghostRef.current.getBoundingClientRect(),
    });
    hideGhostComponent();
  }, [hideGhostComponent, dispatch, onSuccessDrop]);

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
      ref={ghostRef}
      sx={{ position: "fixed", top: coordination.y, left: coordination.x }}
    >
      <div ref={contentRef} />
    </Box>
  );
};
