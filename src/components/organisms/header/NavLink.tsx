import { Link, type LinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface NavLinkProps extends LinkProps {
  isActive: boolean;
}

export const NavLink = styled(Link)<NavLinkProps>(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  color: isActive ? "#fff" : "#000",
  textDecoration: "none",
  paddingLeft: 16,
  paddingRight: 16,
  cursor: "pointer",
  backgroundColor: isActive ? theme.palette.primary.main : "inherit",
  ":hover": {},
}));
