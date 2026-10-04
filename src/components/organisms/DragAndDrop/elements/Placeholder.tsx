import { Box } from "@mui/material";

const Placeholder = ({ height }: { height?: number }) => (
  <Box
    sx={{
      height,
      border: "2px dashed",
      borderColor: "accent.300",
      backgroundColor: "canvas.200",
    }}
  />
);

export default Placeholder;
