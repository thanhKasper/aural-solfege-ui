import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Stack>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
};

export default Layout;
