import type { CSSProperties } from "react";
import { SAFE_X, SAFE_Y } from "./constants";

/**
 * The single source of truth for how a presentation looks.
 * Every value is exposed to Tailwind and components as a CSS variable.
 * Sizes are logical px on the 1920×1080 canvas.
 */
export const presentationTheme = {
  colors: {
    background: "#F7F6F2",
    foreground: "#151515",
    muted: "#5F625C",
    primary: "#18392B",
    primaryForeground: "#F7F6F2",
    accent: "#A9C8A5",
    surface: "#FFFFFF",
    border: "rgba(21, 21, 21, 0.12)",
  },
  typography: {
    display: '"Fraunces Variable", "Iowan Old Style", Georgia, serif',
    body: '"Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
    sizes: { hero: 240, title: 132, section: 104, subtitle: 44, body: 34, caption: 26, label: 22 },
  },
  spacing: { safeX: SAFE_X, safeY: SAFE_Y, gap: 40 },
  radius: { card: 28, small: 16, pill: 9999 },
  shadows: {
    card: "0 1px 2px rgba(24, 57, 43, 0.06), 0 30px 60px -30px rgba(24, 57, 43, 0.28)",
    lift: "0 2px 4px rgba(24, 57, 43, 0.08), 0 50px 100px -30px rgba(24, 57, 43, 0.4)",
  },
  motion: {
    /** Seconds */
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    stagger: 0.15,
    /** Logical px travelled by slide/scale entrances */
    distance: 48,
  },
};

export type PresentationTheme = typeof presentationTheme;

export function themeToCssVars(theme: PresentationTheme = presentationTheme): CSSProperties {
  const { colors, typography, radius, shadows } = theme;
  const vars: Record<string, string> = {
    "--p-bg": colors.background,
    "--p-fg": colors.foreground,
    "--p-muted": colors.muted,
    "--p-primary": colors.primary,
    "--p-primary-fg": colors.primaryForeground,
    "--p-accent": colors.accent,
    "--p-surface": colors.surface,
    "--p-border": colors.border,
    "--p-font-display": typography.display,
    "--p-font-body": typography.body,
    "--p-radius-card": `${radius.card}px`,
    "--p-radius-small": `${radius.small}px`,
    "--p-radius-pill": `${radius.pill}px`,
    "--p-shadow-card": shadows.card,
    "--p-shadow-lift": shadows.lift,
  };
  for (const [name, px] of Object.entries(typography.sizes)) vars[`--p-size-${name}`] = `${px}px`;
  return vars as unknown as CSSProperties;
}
