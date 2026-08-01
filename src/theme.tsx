import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    canvas: Palette["primary"];
    structure: Palette["primary"];
    sage: Palette["primary"];
    accent: Palette["primary"];
    ink: Palette["primary"];
  }

  interface PaletteOptions {
    canvas?: PaletteOptions["primary"];
    structure?: PaletteOptions["primary"];
    sage?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
    ink?: PaletteOptions["primary"];
  }

  interface SimplePaletteColorOptions {
    600?: string;
    500?: string;
    400?: string;
    300?: string;
    200?: string;
    100?: string;
    50?: string;
  }
  interface PaletteColor {
    600?: string;
    500?: string;
    400?: string;
    300?: string;
    200?: string;
    100?: string;
    50?: string;
  }

  interface TypographyVariants {
    code: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    xxl: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
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
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.structure[100],
          boxShadow: "none",
          borderBottomColor: theme.palette.structure[300],
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }),
      },
    },
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
        root: ({ theme }) => ({
          textTransform: "none",
          backgroundColor: theme.palette.accent[300],
        }),
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
          backgroundColor: theme.palette.canvas[100],
          ".Mui-disabled": {
            backgroundColor: theme.palette.grey[100],
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.canvas[300],
            borderWidth: 1.5,
            borderRadius: 0,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.canvas[400],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.canvas[400],
          },

          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.canvas[400],
            backgroundColor: theme.palette.canvas[200],
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.canvas[300],
          "&.Mui-checked": {
            color: theme.palette.canvas[400],
          },
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
          backgroundColor: theme.palette.canvas[50],
        }),
      },
    },
  },
  typography: {
    fontFamily: "'Be Vietnam Pro', sans-serif", // default/body face

    // Display — rare, page-level hero only
    h1: {
      fontFamily: "'Lora', serif",
      fontWeight: 500,
      fontSize: "2rem", // 32px
      lineHeight: 1.15, // 38px
      color: "ink.300", // ink-300
    },

    // H1 — exercise/section titles
    h2: {
      fontFamily: "'Lora', serif",
      fontWeight: 500,
      fontSize: "1.5rem", // 24px
      lineHeight: 1.2, // ~29px
      color: "#3C3A36",
    },

    // H2 — card/panel headings, modal titles
    h3: {
      fontFamily: "'Lora', serif",
      fontWeight: 500,
      fontSize: "1.125rem", // 18px
      lineHeight: 1.3, // ~24px
      color: "#3C3A36",
    },

    // Nav / eyebrow label
    overline: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      fontWeight: 600,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.33, // 16px
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#3C3A36",
    },

    // Body — default reading text
    body1: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      fontWeight: 400,
      fontSize: "0.9375rem", // 15px
      lineHeight: 1.6, // 24px
      color: "#3C3A36",
    },

    // Body small — list items, secondary copy
    body2: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      fontWeight: 400,
      fontSize: "0.8125rem", // 13px
      lineHeight: 1.54, // 20px
      color: "#6B6862", // ink-100
    },

    // Button label
    button: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      fontWeight: 600,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.43, // 20px
      textTransform: "none", // MUI defaults buttons to uppercase — override this
    },

    // Caption — repurposed for secondary/disabled hints
    caption: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      fontWeight: 400,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.5,
      color: "#ABA8A1", // ink-50
    },

    code: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.33, // 16px
      letterSpacing: "0.02em",
      color: "#A85F3E", // accent-500-ish, adjust per selected state
    },
  },

  colorSchemes: {
    light: {
      palette: {
        canvas: {
          50: "#FEFDFB",
          100: "#FAF7F1",
          200: "#F0EAE0",
          300: "#E4DBCC",
          400: "#D3C7B3",
        },
        structure: {
          50: "#F7F2E9",
          100: "#EFE6D8",
          200: "#E0D3BC",
          300: "#CBB897",
          400: "#B39D75",
        },
        ink: {
          50: "#ABA8A1",
          100: "#6B6862",
          200: "#55524C",
          300: "#3C3A36",
          400: "#262521",
        },
        accent: {
          50: "#FBF0EA",
          100: "#F3E2D6",
          200: "#E8C4AC",
          300: "#C97B5A",
          400: "#B56A49",
          500: "#8A4A32",
          600: "#5F3120",
        },
        sage: {
          50: "#F0F3EF",
          100: "#DCE3DC",
          200: "#B4C2B6",
          300: "#8A9A8B",
          400: "#6B7C6D",
          500: "#4E5E51",
        },
      },
    },
  },
});

export default theme;
