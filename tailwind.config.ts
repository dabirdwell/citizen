import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        guardianDot: {
          "0%, 80%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "guardian-dot": "guardianDot 1.4s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: {
          850: "#1a1f2e",
          925: "#111520",
          950: "#0c0f18",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        gold: {
          400: "#e8b960",
          500: "#d4a047",
          600: "#b8862e",
        },
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
          300: "#d4b896",
          400: "#b89a78",
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
