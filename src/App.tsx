import { RouterProvider } from "react-router";
import router from "@/router";
import { useEffect } from "react";
import { authenticationService } from "./services/authentication";

function App() {
  useEffect(() => {
    if (authenticationService.didInitialize) {
      return;
    }
    authenticationService
      .init({
        onLoad: "login-required",
      })
      .then(() => {
        console.log("Successfully log in");
      })
      .catch((err) => {
        console.error("Fail to initialize Keycloak", err);
      });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
