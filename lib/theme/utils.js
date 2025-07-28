/**
 * Theme utility functions
 * Helper functions for working with themes and colors
 */

import { COLORS, THEME_VARIANTS } from "./colors";

/**
 * Get a color from the theme palette
 * @param {string} colorPath - Path to color (e.g., 'primary.500', 'neutral.0')
 * @param {string} theme - Theme name (optional, uses CSS variables if not provided)
 * @returns {string} Color value
 */
export function getThemeColor(colorPath, theme = null) {
  if (theme && THEME_VARIANTS[theme]) {
    const [category, shade] = colorPath.split(".");
    return COLORS[category]?.[shade] || colorPath;
  }

  // Use CSS variable as fallback
  return `var(--theme-${colorPath.replace(".", "-")})`;
}

/**
 * Generate Tailwind classes for theme colors
 * @param {string} property - CSS property (bg, text, border, etc.)
 * @param {string} colorPath - Color path
 * @returns {string} Tailwind class
 */
export function getThemeClass(property, colorPath) {
  const [category, shade] = colorPath.split(".");
  return `${property}-${category}-${shade}`;
}

/**
 * Generate component-specific theme classes
 * @param {string} component - Component name
 * @param {string} variant - Variant name
 * @param {string} theme - Theme name
 * @returns {object} Class object
 */
export function getComponentTheme(
  component,
  variant = "default",
  theme = "light"
) {
  const themeConfig = COMPONENT_THEMES[component]?.[variant];
  if (!themeConfig) return {};

  const currentTheme = THEME_VARIANTS[theme];
  const result = {};

  Object.entries(themeConfig).forEach(([key, value]) => {
    if (typeof value === "function") {
      result[key] = value(currentTheme);
    } else {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Check if current theme is dark
 * @param {string} theme - Theme name
 * @returns {boolean}
 */
export function isDarkTheme(theme) {
  return theme === "dark";
}

/**
 * Get contrast color (black or white) for better readability
 * @param {string} backgroundColor - Background color hex
 * @returns {string} Contrast color
 */
export function getContrastColor(backgroundColor) {
  // Remove # if present
  const hex = backgroundColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? COLORS.secondary[900] : COLORS.neutral[0];
}

/**
 * Component-specific theme configurations
 */
export const COMPONENT_THEMES = {
  button: {
    primary: {
      background: (theme) => theme.primary,
      text: (theme) => theme.text.primary,
      hover: (theme) => theme.secondary,
      border: (theme) => theme.border,
    },
    secondary: {
      background: (theme) => theme.surface,
      text: (theme) => theme.text.secondary,
      hover: (theme) => theme.primary,
      border: (theme) => theme.border,
    },
    ghost: {
      background: "transparent",
      text: (theme) => theme.text.primary,
      hover: (theme) => theme.surface,
      border: "transparent",
    },
  },

  card: {
    default: {
      background: (theme) => theme.surface,
      text: (theme) => theme.text.primary,
      border: (theme) => theme.border,
      shadow: (theme) => theme.shadow,
    },
    elevated: {
      background: (theme) => theme.background,
      text: (theme) => theme.text.primary,
      border: (theme) => theme.border,
      shadow: (theme) => `0 4px 6px -1px ${theme.shadow}`,
    },
  },

  input: {
    default: {
      background: (theme) => theme.background,
      text: (theme) => theme.text.primary,
      border: (theme) => theme.border,
      placeholder: (theme) => theme.text.muted,
      focus: (theme) => theme.primary,
    },
  },

  navigation: {
    sidebar: {
      background: (theme) => theme.surface,
      text: (theme) => theme.text.primary,
      active: (theme) => theme.primary,
      hover: (theme) => theme.background,
    },
    navbar: {
      background: (theme) => theme.background,
      text: (theme) => theme.text.primary,
      border: (theme) => theme.border,
    },
  },
};

/**
 * Generate CSS-in-JS styles for components
 * @param {object} themeConfig - Theme configuration
 * @returns {object} CSS styles
 */
export function generateStyles(themeConfig) {
  const styles = {};

  Object.entries(themeConfig).forEach(([key, value]) => {
    switch (key) {
      case "background":
        styles.backgroundColor = value;
        break;
      case "text":
        styles.color = value;
        break;
      case "border":
        styles.borderColor = value;
        break;
      case "shadow":
        styles.boxShadow = value;
        break;
      default:
        styles[key] = value;
    }
  });

  return styles;
}
