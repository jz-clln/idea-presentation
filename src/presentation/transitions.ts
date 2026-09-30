import type { TargetAndTransition, Variants } from "framer-motion";
import type {
  TransitionDirection,
  TransitionInput,
  TransitionKind,
  TransitionName,
  TransitionSpec,
} from "./types";

/** Strongly typed registry of named slide transitions. */
export const transitions: Record<TransitionName, TransitionSpec> = {
  fade: { type: "fade" },
  "slide-left": { type: "slide", direction: "left" },
  "slide-right": { type: "slide", direction: "right" },
  "slide-up": { type: "slide", direction: "up" },
  zoom: { type: "zoom" },
  blur: { type: "blur" },
  scale: { type: "scale" },
  reveal: { type: "reveal" },
};

export const normalizeTransition = (input: TransitionInput): TransitionSpec =>
  typeof input === "string" ? transitions[input] : input;

const SLIDE_DISTANCE = 140;

const NEUTRAL: Record<string, number | string> = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
  clipPath: "inset(0% 0% 0% 0%)",
};

/**
 * The incoming slide is always painted above the outgoing one, and slides are opaque,
 * so exits only need a tiny movement to keep the outgoing slide alive during the transition.
 * `dir` is 1 when moving forward and -1 when moving back.
 */
function frames(
  type: TransitionKind,
  direction: TransitionDirection,
  dir: number,
): { enter: TargetAndTransition; exit: TargetAndTransition } {
  const hold = { opacity: 0.99 };
  switch (type) {
    case "slide": {
      const axis = direction === "left" || direction === "right" ? "x" : "y";
      const sign = direction === "left" || direction === "up" ? 1 : -1;
      const offset = sign * dir * SLIDE_DISTANCE;
      return { enter: { opacity: 0, [axis]: offset }, exit: { ...hold, [axis]: -offset * 0.3 } };
    }
    case "zoom":
      return {
        enter: { opacity: 0, scale: dir > 0 ? 0.9 : 1.08 },
        exit: { ...hold, scale: dir > 0 ? 1.06 : 0.94 },
      };
    case "scale":
      return { enter: { opacity: 0, scale: 0.96 }, exit: hold };
    case "blur":
      return { enter: { opacity: 0, filter: "blur(28px)" }, exit: { ...hold, filter: "blur(8px)" } };
    case "reveal":
      return {
        enter: { clipPath: dir > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
        exit: hold,
      };
    case "fade":
    default:
      return { enter: { opacity: 0 }, exit: hold };
  }
}

export interface ResolvedTransition {
  variants: Variants;
  duration: number;
}

const toDir = (custom: unknown): number => (custom === -1 ? -1 : 1);

export function resolveTransition(
  input: TransitionInput | undefined,
  fallback: TransitionInput,
  defaultDuration: number,
  reducedMotion: boolean,
): ResolvedTransition {
  const spec = normalizeTransition(input ?? fallback);
  const type: TransitionKind = reducedMotion ? "fade" : spec.type;
  const direction = spec.direction ?? "left";
  const duration = reducedMotion ? 0.2 : (spec.duration ?? defaultDuration);

  const variants: Variants = {
    enter: (custom: unknown) => frames(type, direction, toDir(custom)).enter,
    center: () => {
      const keys = Object.keys(frames(type, direction, 1).enter);
      return Object.fromEntries(keys.map((k) => [k, NEUTRAL[k] ?? 0]));
    },
    exit: (custom: unknown) => frames(type, direction, toDir(custom)).exit,
  };
  return { variants, duration };
}
