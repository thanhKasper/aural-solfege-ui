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
  typography: {
    h1: {
      fontFamily: "Domine, serif",
    },
    h2: {
      fontFamily: "Domine, serif",
    },
    h3: {
      fontFamily: "Domine, serif",
    },
    h4: {
      fontFamily: "Domine, serif",
    },
    h5: {
      fontFamily: "Domine, serif",
    },
    h6: {
      fontFamily: "Domine, serif",
    },
  },
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
