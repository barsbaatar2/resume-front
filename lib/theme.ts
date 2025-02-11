import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const baseTheme = createTheme({
  typography: {
    fontFamily: "Manrope, Arial, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f8f9fa",
    },
    grey: {
      50: "#F8F9FA",
      100: "#F3F4F6",
      200: "#E5E7EB",
      600: "#4B5563",
      900: "#111827",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
})

export const theme = responsiveFontSizes(baseTheme)

export const breakpointValues = {
  xs: theme.breakpoints.values.xs,
  sm: theme.breakpoints.values.sm,
  md: theme.breakpoints.values.md,
  lg: theme.breakpoints.values.lg,
  xl: theme.breakpoints.values.xl,
}

