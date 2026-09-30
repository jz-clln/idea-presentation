import type { CSSProperties } from "react";

/**
 * Omit brand colors. These override the deck-wide --p-* tokens for Omit slides only,
 * so Rova keeps its green and Omit gets its own blue (taken from the logo and dashboard).
 */
export const OMIT_BG = "#F5F8FF";

export const omitTheme = {
  "--p-primary": "#1F5EFF",
  "--p-primary-fg": "#FFFFFF",
  "--p-accent": "#5B8DFF",
  "--p-surface": "#FFFFFF",
  "--p-fg": "#141922",
  "--p-muted": "#5B6473",
  color: "#141922",
} as CSSProperties;