import { useMemo, useRef, useState, type PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { GhostElement } from "../elements/GhostElement";
import { DragAndDropContext, type DragSession } from "./DragAndDropContext";

const DragAndDrop = ({ children }: PropsWithChildren) => {
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(
    null,
  );
  const sessionRef = useRef<DragSession | null>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const value = useMemo(
    () => ({
      sessionRef,
      ghostRef,
      setDraggedElement,
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
