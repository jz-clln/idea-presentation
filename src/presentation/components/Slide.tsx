"use client";
import { useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SAFE_X, SAFE_Y } from "../constants";
import { usePresentation } from "../hooks/usePresentation";
import { SlideRuntimeContext } from "../runtime";
import { presentationTheme } from "../theme";
import { resolveTransition } from "../transitions";
import type { Tone, TransitionInput } from "../types";
import { cn, dedent } from "../utils";
import { SlideBackground, type SlideBackgroundProps } from "./SlideBackground";

export interface SlideProps extends SlideBackgroundProps {
  children?: ReactNode;
  /** Named ("fade", "slide-left"...) or { type, direction, duration }. Defaults to config. */
  transition?: TransitionInput;
  /** Speaker notes shown in presenter mode. */
  notes?: string;
  /** "dark" for dark backgrounds so progress and slide numbers stay legible. */
  tone?: Tone;
  /** Apply the safe-area padding (default true). Disable for full-bleed layouts. */
  padded?: boolean;
  className?: string;
  style?: CSSProperties;
}

let mountCounter = 0;

export function Slide({
  children, transition, notes, tone = "light", padded = true, className, style,
  background, backgroundImage, backgroundVideo, overlay, grain,
}: SlideProps) {
  const { config, direction, registerMeta } = usePresentation();
  const runtime = useContext(SlideRuntimeContext);
  const reduced = useReducedMotion();
  // Newer slides paint above older (exiting) ones, whichever direction we navigate.
  const [order] = useState(() => ++mountCounter);

  const resolved = useMemo(
    () => resolveTransition(transition, config.defaultTransition, config.transitionDuration, !!reduced),
    [transition, config.defaultTransition, config.transitionDuration, reduced],
  );

  const cleanNotes = dedent(notes);
  useEffect(() => {
    registerMeta(runtime.index, { notes: cleanNotes, tone });
  }, [registerMeta, runtime.index, cleanNotes, tone]);

  const nested = useMemo(
    () => ({ ...runtime, enterOffset: runtime.mode === "live" ? resolved.duration * 0.6 : 0 }),
    [runtime, resolved.duration],
  );

  const inner = (
    <SlideRuntimeContext.Provider value={nested}>
      <SlideBackground
        background={background}
        backgroundImage={backgroundImage}
        backgroundVideo={backgroundVideo}
        overlay={overlay}
        grain={grain}
      />
      <div
        className={cn("relative h-full w-full", className)}
        style={{ ...(padded ? { padding: `${SAFE_Y}px ${SAFE_X}px` } : null), ...style }}
      >
        {children}
      </div>
    </SlideRuntimeContext.Provider>
  );

  const base = "absolute inset-0 overflow-hidden font-body text-p-fg";

  if (runtime.mode === "static") return <div className={base}>{inner}</div>;

  return (
    <motion.div
      className={base}
      style={{ zIndex: order }}
      variants={resolved.variants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: resolved.duration, ease: presentationTheme.motion.ease }}
    >
      {inner}
    </motion.div>
  );
}
