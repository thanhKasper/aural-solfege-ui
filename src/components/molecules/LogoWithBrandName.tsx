import { Box } from "@mui/material";
import BrandLogo from "../atoms/Logo";
import BrandName from "../atoms/BrandName";

interface LogoWithBrandName {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hasBrandName?: boolean;
}

const LogoWithBrandName = ({
  size,
  hasBrandName = true,
}: LogoWithBrandName) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <BrandLogo size={size} />
      {hasBrandName && <BrandName size={size} />}
    </Box>
  );
};

export default LogoWithBrandName;
