import { AppBar, Stack } from "@mui/material";
import { useState } from "react";
import { NavLink } from "./NavLink";

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
        sx={{ justifyContent: "space-between", paddingX: 16, height: 64 }}
      >
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
