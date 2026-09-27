import { useMemo, useRef, useState, type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { GhostElement } from "../elements/GhostElement";
import { DragAndDropContext, type DragSession } from "./DragAndDropContextV2";

const DragAndDrop = ({ children }: PropsWithChildren) => {
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(
    null,
  );
  const sessionRef = useRef<DragSession | null>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const containersMap = useRef<Map<string, any[]>>(new Map());

  const value = useMemo(
    () => ({
      sessionRef,
      ghostRef,
      setDraggedElement,
      containersRef: containersMap,
    }),
    [],
  );

  return (
    <DragAndDropContext.Provider value={value}>
      <Box style={{ userSelect: "none" }}>
        {children}
        {draggedElement && <GhostElement element={draggedElement} />}
      </Box>
    </DragAndDropContext.Provider>
  );
};

export default DragAndDrop;
