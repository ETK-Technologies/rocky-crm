/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FEFCFA",
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
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 6px rgba(0, 0, 0, 0.07)",
        strong: "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
