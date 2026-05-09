import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    surface: Palette["primary"];
  }

  interface PaletteOptions {
    surface?: PaletteOptions["primary"];
  }

  interface SimplePaletteColorOptions {
    400?: string;
    300?: string;
  }
  interface PaletteColor {
    400?: string;
    300?: string;
  }

  interface BreakpointOverrides {
    xxl: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    xs: true;
    xxs: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { fontSize: "xs" },
              style: {
                fontSize: "12px",
              },
            },
            {
              props: { fontSize: "xxs" },
              style: {
                fontSize: "8px",
              },
            },
          ],
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xxl",
        disableGutters: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up("xxl")]: {
            maxWidth: "2000px",
          },
          paddingTop: 32,
          paddingBottom: 32,
          paddingLeft: 64,
          paddingRight: 64,
          flexGrow: 1,
        }),
      },
    },
  },
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
