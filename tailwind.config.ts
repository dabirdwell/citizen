import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        civic: {
          blue: "#1e3a5f",
          "blue-light": "#2a5a8f",
        },
        guardian: {
          amber: "#d4a047",
          "amber-light": "#e8b960",
        },
        ae: {
          silver: "#7a8fa6",
          blue: "#4a6fa5",
        },
        warm: {
          50: "#fdf8f0",
          100: "#f5e6d3",
          200: "#e8d0b3",
          800: "#2a1f14",
          900: "#1a130d",
          950: "#0f0b07",
        },
      },
    },
  },
  plugins: [],
};
export default config;
