import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { Container, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router";

const Layout = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{ backgroundColor: theme.palette.canvas["100"], minHeight: "100vh" }}
    >
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
};

export default Layout;
