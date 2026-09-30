import type { Config } from "tailwindcss";

/**
 * All presentation tokens are CSS variables emitted from src/presentation/theme.ts.
 * Edit the theme file, never these mappings.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        p: {
          bg: "var(--p-bg)",
          fg: "var(--p-fg)",
          muted: "var(--p-muted)",
          primary: "var(--p-primary)",
          "primary-fg": "var(--p-primary-fg)",
          accent: "var(--p-accent)",
          surface: "var(--p-surface)",
          border: "var(--p-border)",
        },
      },
      fontFamily: {
        display: ["var(--p-font-display)"],
        body: ["var(--p-font-body)"],
      },
      fontSize: {
        hero: "var(--p-size-hero)",
        title: "var(--p-size-title)",
        section: "var(--p-size-section)",
        subtitle: "var(--p-size-subtitle)",
        body: "var(--p-size-body)",
        caption: "var(--p-size-caption)",
        label: "var(--p-size-label)",
      },
      borderRadius: { card: "var(--p-radius-card)", small: "var(--p-radius-small)" },
      boxShadow: { card: "var(--p-shadow-card)", lift: "var(--p-shadow-lift)" },
    },
  },
  plugins: [],
};
export default config;
