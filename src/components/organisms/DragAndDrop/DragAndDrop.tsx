import { useState, type PropsWithChildren, type ReactNode } from "react";
import { GhostElement } from "./elements/GhostElement";
import { Box } from "@mui/material";
import { DragAndDropContext } from "./DragAndDropContextV2";

const DragAndDrop = ({ children }: PropsWithChildren) => {
  const [ghostComponent, setGhostComponent] = useState<ReactNode | undefined>(
    undefined,
  );

  const showGhostComponent = (
    element: HTMLElement,
    onSuccessDrop?: () => void,
  ) => {
    setGhostComponent(
      <GhostElement element={element} onSuccessDrop={onSuccessDrop} />,
    );
  };

  const hideGhostComponent = () => {
    setGhostComponent(undefined);
  };

  return (
    <DragAndDropContext.Provider
      value={{ showGhostComponent, hideGhostComponent }}
    >
      <Box style={{ userSelect: "none" }}>
        {children}
        {ghostComponent}
      </Box>
    </DragAndDropContext.Provider>
  );
};

export default DragAndDrop;
