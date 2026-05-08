import LogoWithBrandName from "@/components/molecules/LogoWithBrandName";
import { AppBar, Box, Stack } from "@mui/material";
import { useLocation } from "react-router";
import { NavLink } from "./NavLink";

enum NAVIGATION_ENDPOINT {
  EXERCISES = "EXERCISES",
  OVERVIEW = "OVERVIEW",
}

const URL_PATH = {
  [NAVIGATION_ENDPOINT.EXERCISES]: "/exercises",
  [NAVIGATION_ENDPOINT.OVERVIEW]: "/",
};

export const Header = () => {
  const location = useLocation();

  const isPathActive = (selectedPath: string): boolean => {
    return (location.pathname + "/").includes(selectedPath + "/");
  };

  return (
    <AppBar color="secondary" position="static">
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
          }}
        >
          <LogoWithBrandName size="lg" hasBrandName />
        </Box>
        <Stack direction={"row"}>
          <NavLink
            isActive={isPathActive(URL_PATH[NAVIGATION_ENDPOINT.OVERVIEW])}
            href={URL_PATH[NAVIGATION_ENDPOINT.OVERVIEW]}
          >
            Overview
          </NavLink>
          <NavLink
            isActive={isPathActive(URL_PATH[NAVIGATION_ENDPOINT.EXERCISES])}
            href={URL_PATH[NAVIGATION_ENDPOINT.EXERCISES]}
          >
            Exercises
          </NavLink>
        </Stack>
        <Stack direction={"row"}>
          <NavLink isActive={false}>Sound Configuration</NavLink>
        </Stack>
      </Stack>
    </AppBar>
  );
};
