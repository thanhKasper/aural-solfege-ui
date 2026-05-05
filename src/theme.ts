import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    surface: Palette["primary"];
  }

  interface PaletteOptions {
    surface?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#748DAE",
        },
        secondary: {
          main: "#9ECAD6",
          light: "#C8E6EE",
          dark: "#87BECD",
        },
        surface: {
          main: "#FFEAEA",
          400: "#FFF5F5",
          300: "#FFFAFA",
        },
      },
    },
  },
});

export default theme;
