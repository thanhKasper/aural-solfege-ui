import { Box } from "@mui/material";
import useGhostDrag from "./hooks/useDrag";
import { useRef } from "react";

interface SourceElementProps {
  id: string;
  label?: string;
}

const SourceElement = ({ id, label }: SourceElementProps) => {
  const sourceElementRef = useRef<HTMLDivElement>(null);
  const { ghostPortal, onMouseDown } = useGhostDrag({
    id,
    elementRef: sourceElementRef,
    GhostComponent: <Box sx={{ padding: 2, border: "1px solid black", opacity: 0.7 }}>{label || id}</Box>,
  });
  return (
    <>
      <Box
        ref={sourceElementRef}
        sx={{ padding: 2, border: "1px solid black", cursor: "grab" }}
        onMouseDown={onMouseDown}
      >
        {label || id}
      </Box>
      {ghostPortal}
    </>
  );
};

export default SourceElement;
