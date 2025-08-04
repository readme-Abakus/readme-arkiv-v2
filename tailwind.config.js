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
              100: "#ffdcdc",
              200: "#f18888",
              300: "#e9494a",
              400: "#e52d2e",
              500: "#e21617",
              600: "#c81917",
              700: "#b21c17",
              800: "#730202",
              900: "#400101",
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
            // focus: "#BEF264",
          },
        },
        light: {
          colors: {
            primary: {
              100: "#ffdcdc",
              200: "#f18888",
              300: "#e9494a",
              400: "#e52d2e",
              500: "#e21617",
              600: "#c81917",
              700: "#b21c17",
              800: "#730202",
              900: "#400101",
              DEFAULT: "#C81917",
              foreground: "FFFFFF",
            },
            // focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
