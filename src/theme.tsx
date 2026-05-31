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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.surface[300],
          ".Mui-disabled": {
            backgroundColor: theme.palette.grey[100],
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
            borderWidth: 1.5,
            borderRadius: 0,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.dark,
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
        }),
      },
      defaultProps: {
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1.5"
              y="1.5"
              width="17"
              height="17"
              rx="0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ),
        checkedIcon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1.5"
              y="1.5"
              width="17"
              height="17"
              rx="0"
              fill="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M5 10.5l3.5 3.5 6.5-7"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xxl",
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          paddingTop: 32,
          paddingBottom: 32,
          paddingLeft: 64,
          paddingRight: 64,
          flexGrow: 1,
        },
      },
      variants: [
        {
          props: {
            maxWidth: "xxl",
          },
          style: {
            maxWidth: "2000px",
          },
        },
      ],
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.surface[300],
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
