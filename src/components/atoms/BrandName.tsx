import { Typography } from "@mui/material";

interface BrandNameProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const fontSize = {
  xs: 0,
  sm: 0,
  md: 16,
  lg: 32,
  xl: 40,
};

const BrandName = ({ size = "lg" }: BrandNameProps) => {
  const currentFontSize = fontSize[size];
  return (
    currentFontSize > 0 && (
      <Typography
        sx={{
          fontFamily: "Elsie Swash Caps, serif",
          fontSize: currentFontSize,
        }}
      >
        Aural Solfege
      </Typography>
    )
  );
};

export default BrandName;
