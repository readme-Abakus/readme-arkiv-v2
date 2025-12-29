// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            foreground: "#999",
            background: "#1a1919",
            content1: "#1a1919",
            primary: {
              50: "#220000",
              100: "#400101",
              200: "#730202",
              300: "#b21c17",
              400: "#c81917",
              500: "#e21617",
              600: "#e52d2e",
              700: "#e9494a",
              800: "#f18888",
              900: "#ffdcdc",
              DEFAULT: "#C81917",
              foreground: "#FFFFFF",
            },
            danger: {
              50: "#220000",
              100: "#400101",
              200: "#730202",
              300: "#b21c17",
              400: "#c81917",
              500: "#e21617",
              600: "#e52d2e",
              700: "#e9494a",
              800: "#f18888",
              900: "#ffdcdc",
              DEFAULT: "#C81917",
              foreground: "#FFFFFF",
            },
          },
        },
        light: {
          colors: {
            primary: {
              50: "#ffdcdc",
              100: "#f18888",
              200: "#e9494a",
              300: "#e52d2e",
              400: "#e21617",
              500: "#c81917",
              600: "#b21c17",
              700: "#730202",
              800: "#400101",
              900: "#220000",
              DEFAULT: "#C81917",
              foreground: "#FFFFFF",
            },
            danger: {
              50: "#ffdcdc",
              100: "#f18888",
              200: "#e9494a",
              300: "#e52d2e",
              400: "#e21617",
              500: "#c81917",
              600: "#b21c17",
              700: "#730202",
              800: "#400101",
              900: "#220000",
              DEFAULT: "#C81917",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
