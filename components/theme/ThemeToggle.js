"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, themes, setTheme, mounted } = useTheme();

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`w-10 h-6 bg-gray-200 rounded-full animate-pulse ${className}`}
      />
    );
  }

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "cream":
        return "🎨";
      default:
        return "🎨";
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "cream":
        return "Cream";
      default:
        return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Simple Toggle Button */}
      <button
        onClick={() => {
          const currentIndex = themes.indexOf(theme);
          const nextIndex = (currentIndex + 1) % themes.length;
          setTheme(themes[nextIndex]);
        }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white hover:bg-gray-50"
        title={`Switch to ${getThemeLabel(
          themes[(themes.indexOf(theme) + 1) % themes.length]
        )}`}
      >
        <span className="text-lg">{getThemeIcon(theme)}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {getThemeLabel(theme)}
        </span>
      </button>
    </div>
  );
}

// Dropdown version for more options
export function ThemeDropdown({ className = "" }) {
  const { theme, themes, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-24 h-8 bg-gray-200 rounded animate-pulse ${className}`}
      />
    );
  }

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "cream":
        return "🎨";
      default:
        return "🎨";
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "cream":
        return "Cream";
      default:
        return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {getThemeIcon(themeName)} {getThemeLabel(themeName)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
