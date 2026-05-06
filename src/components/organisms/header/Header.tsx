import { AppBar, Box, Stack } from "@mui/material";
import { useState } from "react";
import { NavLink } from "./NavLink";
import BrandLogo from "@/components/atoms/Logo";
import BrandName from "@/components/atoms/BrandName";

enum NAVIGATION_ENDPOINT {
  EXERCISES = "EXERCISES",
  OVERVIEW = "OVERVIEW",
}

export const Header = () => {
  const [activeNav, setActiveNav] = useState<NAVIGATION_ENDPOINT>(
    NAVIGATION_ENDPOINT.EXERCISES,
  );
  return (
    <AppBar color="secondary">
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          paddingX: 16,
          height: 64,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BrandLogo size="lg" />
          <BrandName />
        </Box>
        <Stack direction={"row"}>
          <NavLink isActive={false}>Overview</NavLink>
          <NavLink isActive={true}>Exercises</NavLink>
        </Stack>
        <Stack direction={"row"}>
          <NavLink isActive={false}>Sound Configuration</NavLink>
        </Stack>
      </Stack>
    </AppBar>
  );
};
