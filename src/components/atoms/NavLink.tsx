import { styled } from "@mui/material/styles";
import { Link, type LinkProps } from "react-router";

interface NavLinkProps extends LinkProps {
  isActive: boolean;
}

export const NavLink = styled(Link)<NavLinkProps>(({ theme, isActive }) => ({
  ...theme.typography.overline,
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  cursor: "pointer",
  position: "relative",

  ":hover": {
    backgroundColor: theme.palette.structure["200"],
  },

  "&::after": isActive
    ? {
        position: "absolute",
        bottom: 0,
        left: 0,
        content: "''",
        width: "100%",
        height: 4,
        backgroundColor: theme.palette.accent[300],
      }
    : {},
}));
