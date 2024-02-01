import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "480px",
        xxs: "350px",
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true }), require("tailwindcss-animate")],
};
export default config;
