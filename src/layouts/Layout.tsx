import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import { Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router";

const Layout = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{ backgroundColor: theme.palette.surface["300"], minHeight: "100vh" }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
