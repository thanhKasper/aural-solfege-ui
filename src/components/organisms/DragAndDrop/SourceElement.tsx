import { Box } from "@mui/material";
import useGhostDrag from "./hooks/useDrag";
import { useRef } from "react";

const SourceElement = ({ id }: { id: string }) => {
  const sourceElementRef = useRef(null);
  const { drag, onMouseDown } = useGhostDrag({ elementRef: sourceElementRef });
  return (
    <Box
      sx={{ padding: 2, border: "1px solid black" }}
      onMouseDown={onMouseDown}
    >{`SourceElement ${id}`}</Box>
  );
};

export default SourceElement;
