import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

interface ScrollableProps {
  maxHeight: string;
}

const Scrollable = ({
  maxHeight,
  children,
}: PropsWithChildren<ScrollableProps>) => {
  return (
    <Box
      sx={{
        maxHeight,
        overflowY: "overlay",
        minWidth: "max-content",
      }}
    >
      {children}
    </Box>
  );
};

export default Scrollable;
