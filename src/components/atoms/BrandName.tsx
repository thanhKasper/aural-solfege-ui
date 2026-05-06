import { Typography, useTheme } from "@mui/material";

const BrandName = () => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontFamily: "Elsie Swash Caps, serif",
        fontSize: theme.typography.h5.fontSize,
      }}
    >
      Aural Solfege
    </Typography>
  );
};

export default BrandName;
