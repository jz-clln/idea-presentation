"use client";
import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../runtime";

interface AnimatedNumberProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}

/** Counts up when its slide becomes active. Renders the final value in thumbnails. */
export function AnimatedNumber({
  from = 0, to, prefix = "", suffix = "", duration = 1.5, delay = 0, decimals = 0, className,
}: AnimatedNumberProps) {
  const reduced = useReducedMotion();
  const isStatic = useIsStatic();
  const totalDelay = useEntranceDelay(delay);
  const value = useMotionValue(isStatic || reduced ? to : from);
  const text = useTransform(value, (v) =>
    `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  );

  useEffect(() => {
    if (isStatic || reduced) {
      value.set(to);
      return;
    }
    value.set(from);
    const controls = animate(value, to, { duration, delay: totalDelay, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isStatic, reduced, from, to, duration, totalDelay, value]);

  return <motion.span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>{text}</motion.span>;
}
