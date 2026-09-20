import {
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { Box } from "@mui/material";
import { DragAndDropContext } from "./DragAndDropContextV2";

const DragAndDrop = ({ children }: PropsWithChildren) => {
  const [ghostComponent, setGhostComponent] = useState<ReactNode | undefined>(
    undefined,
  );

  return (
    <DragAndDropContext.Provider value={{ setGhost: setGhostComponent }}>
      <Box style={{ userSelect: "none" }}>
        {children}
        {ghostComponent}
      </Box>
    </DragAndDropContext.Provider>
  );
};

export default DragAndDrop;