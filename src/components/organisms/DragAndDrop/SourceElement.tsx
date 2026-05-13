import { Box } from "@mui/material";
import useGhostDrag from "./hooks/useDrag";
import { useRef } from "react";

const SourceElement = ({ id }: { id: string }) => {
  const sourceElementRef = useRef(null);
  const { ghostPortal, onMouseDown } = useGhostDrag({
    elementRef: sourceElementRef,
    GhostComponent: <SourceElement id={id} />,
  });
  return (
    <>
      <Box
        ref={sourceElementRef}
        sx={{ padding: 2, border: "1px solid black" }}
        onMouseDown={onMouseDown}
      >{`SourceElement ${id}`}</Box>
      {ghostPortal}
    </>
  );
};

export default SourceElement;
