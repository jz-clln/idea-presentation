"use client";
import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../runtime";
import { presentationTheme } from "../theme";

export type EntrancePreset =
  | "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "blur" | "reveal";

export interface EntranceOptions {
  children?: ReactNode;
  /** Seconds, relative to when the slide has mostly finished transitioning in. */
  delay?: number;
  /** Seconds. Defaults to theme.motion.duration. */
  duration?: number;
  /** Logical px travelled by slide entrances. Defaults to theme.motion.distance. */
  distance?: number;
  className?: string;
  style?: CSSProperties;
}

const hidden = (preset: EntrancePreset, d: number): TargetAndTransition => {
  switch (preset) {
    case "slide-up": return { opacity: 0, y: d };
    case "slide-down": return { opacity: 0, y: -d };
    case "slide-left": return { opacity: 0, x: d };   // travels leftwards, enters from the right
    case "slide-right": return { opacity: 0, x: -d }; // travels rightwards, enters from the left
    case "scale": return { opacity: 0, scale: 0.9 };
    case "blur": return { opacity: 0, filter: "blur(18px)" };
    case "reveal": return { clipPath: "inset(0% 100% 0% 0%)" };
    default: return { opacity: 0 };
  }
};

const visible: Record<EntrancePreset, TargetAndTransition> = {
  fade: { opacity: 1 },
  "slide-up": { opacity: 1, y: 0 },
  "slide-down": { opacity: 1, y: 0 },
  "slide-left": { opacity: 1, x: 0 },
  "slide-right": { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, filter: "blur(0px)" },
  reveal: { clipPath: "inset(0% 0% 0% 0%)" },
};

/**
 * Base for every entrance animation. Slides unmount when you leave them, so remounting on
 * return replays the animation. Static renders (thumbnails) skip straight to the end state.
 */
export function Entrance({
  preset, children, delay = 0, duration, distance, className, style,
}: EntranceOptions & { preset: EntrancePreset }) {
  const reduced = useReducedMotion();
  const isStatic = useIsStatic();
  const totalDelay = useEntranceDelay(delay);

  const from = reduced ? { opacity: 0 } : hidden(preset, distance ?? presentationTheme.motion.distance);
  const to = reduced ? { opacity: 1 } : visible[preset];

  return (
    <motion.div
      className={className}
      style={style}
      initial={isStatic ? false : from}
      animate={to}
      transition={{
        duration: reduced ? 0.2 : (duration ?? presentationTheme.motion.duration),
        delay: totalDelay,
        ease: presentationTheme.motion.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
