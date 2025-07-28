/**
 * Rocky CRM Theme Colors
 * Light theme only with brand colors #F0EAE3 and #000000
 */

// Base colors from client requirements
export const BASE_COLORS = {
  cream: "#F0EAE3",
  black: "#000000",
  white: "#FFFFFF",
};

// Extended color palette based on your brand colors
export const COLORS = {
  // Primary brand colors (cream variations)
  primary: {
    50: "#FEFCFA", // Lightest cream
    100: "#F0EAE3", // Main cream color
    200: "#E6D9CF",
    300: "#DCC8BB",
    400: "#D2B7A7",
    500: "#C8A693",
    600: "#B8956A",
    700: "#A8845A",
    800: "#987349",
    900: "#886239",
  },

  // Secondary colors (black/gray variations)
  secondary: {
    50: "#F9F9F9",
    100: "#F0F0F0",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#000000", // Main black color
  },

  // Semantic colors
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
  },

  // Neutral colors
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A",
  },
};

// Single light theme configuration with your brand colors
export const THEME = {
  background: BASE_COLORS.white, // #FFFFFF
  surface: BASE_COLORS.cream, // #F0EAE3
  primary: BASE_COLORS.cream, // #F0EAE3
  secondary: BASE_COLORS.black, // #000000
  text: {
    primary: BASE_COLORS.black, // #000000
    secondary: COLORS.secondary[700], // #404040
    muted: COLORS.secondary[500], // #737373
  },
  border: COLORS.secondary[200], // #E5E5E5
  shadow: "rgba(0, 0, 0, 0.1)",
};
