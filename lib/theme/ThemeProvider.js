"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { THEME_VARIANTS } from "./colors";

// Theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("rocky-crm-theme");
    if (savedTheme && THEME_VARIANTS[savedTheme]) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("rocky-crm-theme", theme);
      updateCSSVariables(theme);
    }
  }, [theme, mounted]);

  // Update CSS custom properties
  const updateCSSVariables = (themeName) => {
    const themeColors = THEME_VARIANTS[themeName];
    const root = document.documentElement;

    // Set CSS variables
    root.style.setProperty("--theme-background", themeColors.background);
    root.style.setProperty("--theme-surface", themeColors.surface);
    root.style.setProperty("--theme-primary", themeColors.primary);
    root.style.setProperty("--theme-secondary", themeColors.secondary);
    root.style.setProperty("--theme-text-primary", themeColors.text.primary);
    root.style.setProperty(
      "--theme-text-secondary",
      themeColors.text.secondary
    );
    root.style.setProperty("--theme-text-muted", themeColors.text.muted);
    root.style.setProperty("--theme-border", themeColors.border);
    root.style.setProperty("--theme-shadow", themeColors.shadow);

    // Set theme attribute for CSS selectors
    root.setAttribute("data-theme", themeName);
  };

  const toggleTheme = () => {
    const themes = Object.keys(THEME_VARIANTS);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const setSpecificTheme = (themeName) => {
    if (THEME_VARIANTS[themeName]) {
      setTheme(themeName);
    }
  };

  const value = {
    theme,
    themes: Object.keys(THEME_VARIANTS),
    colors: THEME_VARIANTS[theme],
    setTheme: setSpecificTheme,
    toggleTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Higher-order component for theme-aware components
export function withTheme(Component) {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}
