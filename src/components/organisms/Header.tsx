import LogoWithBrandName from "@/components/molecules/LogoWithBrandName";
import { AppBar, Box, Button, Container, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router";
import { NavLink } from "../atoms/NavLink";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { authenticationService } from "@/services/authentication";

export const Header = () => {
  const location = useLocation();

  const isPathActive = (selectedPath: string): boolean => {
    return (location.pathname + "/").includes(selectedPath + "/");
  };

  const handleLogout = () => {
    authenticationService.logout({
      redirectUri: window.location.origin + import.meta.env.BASE_URL,
    });
  };

  return (
    <AppBar color="secondary" position="static">
      <Container>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            // paddingX: 16,
            // height: 64,
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
              to={URL_PATH[NAVIGATION_ENDPOINT.OVERVIEW]}
            >
              Overview
            </NavLink>
            <NavLink
              isActive={isPathActive(URL_PATH[NAVIGATION_ENDPOINT.EXERCISES])}
              to={URL_PATH[NAVIGATION_ENDPOINT.EXERCISES]}
            >
              Exercises
            </NavLink>
          </Stack>
          <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
            <NavLink isActive={false} to="#">
              Sound Configuration
            </NavLink>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
