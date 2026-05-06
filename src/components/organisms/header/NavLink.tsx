import { Link, type LinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface NavLinkProps extends LinkProps {
  isActive: boolean;
}

export const NavLink = styled(Link)<NavLinkProps>(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  color: isActive ? "#fff" : "#000",
  fontFamily: theme.typography.h5.fontFamily,
  textDecoration: "none",
  paddingLeft: 16,
  paddingRight: 16,
  cursor: "pointer",
  backgroundColor: isActive ? theme.palette.primary.main : "inherit",
  position: "relative",
  ...(!isActive && {
    ":hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
  "&::after": isActive
    ? {
        position: "absolute",
        bottom: 0,
        left: 0,
        content: "''",
        width: "100%",
        height: 4,
        backgroundColor: theme.palette.surface.main,
      }
    : {},
}));
