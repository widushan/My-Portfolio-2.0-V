import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#12b259", deep: "#0a8540", text: "rgb(var(--brand-text) / <alpha-value>)", soft: "rgb(var(--brand-soft) / <alpha-value>)" },
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontSize: {
        title: ["clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)", { lineHeight: "1.12" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        lead: ["1.1875rem", { lineHeight: "1.75" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
