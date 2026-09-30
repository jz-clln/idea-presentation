"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../runtime";
import { presentationTheme } from "../theme";
import { cn } from "../utils";
import { SlideUp } from "../animations/SlideUp";
import { Title, type TitleSize } from "./Title";

interface AnimatedTitleProps {
  children: React.ReactNode;
  size?: TitleSize;
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  className?: string;
}

/** Words rise out of a mask one by one. Pass a plain string; other children fall back to SlideUp. */
export function AnimatedTitle({
  children, size = "hero", delay = 0, stagger = 0.09, className,
}: AnimatedTitleProps) {
  const reduced = useReducedMotion();
  const isStatic = useIsStatic();
  const base = useEntranceDelay(delay);

  if (typeof children !== "string") {
    return (
      <SlideUp delay={delay}>
        <Title size={size} className={className}>{children}</Title>
      </SlideUp>
    );
  }

  const words = children.split(" ");
  return (
    <Title size={size} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={cn("inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]")}>
            <motion.span
              className="inline-block"
              initial={isStatic ? false : reduced ? { opacity: 0 } : { y: "115%" }}
              animate={reduced ? { opacity: 1 } : { y: "0%" }}
              transition={{
                duration: presentationTheme.motion.duration + 0.1,
                delay: base + i * stagger,
                ease: presentationTheme.motion.ease,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Title>
  );
}
