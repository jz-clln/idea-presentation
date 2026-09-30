"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../runtime";
import { presentationTheme } from "../theme";
import { cn } from "../utils";

/** Neutral frame for any chart: title, caption, and room to draw. */
export function ChartContainer({
  title, caption, children, className,
}: { title?: ReactNode; caption?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-card border border-p-border bg-p-surface p-14", className)}>
      {title && <div className="mb-12 font-display text-[52px] font-medium tracking-[-0.02em]">{title}</div>}
      <div className="flex-1">{children}</div>
      {caption && <div className="mt-10 text-caption text-p-muted">{caption}</div>}
    </div>
  );
}

/** Horizontal bar that grows to `value` percent. */
export function BarRow({
  label, value, display, delay = 0, tone = "primary",
}: { label: ReactNode; value: number; display?: ReactNode; delay?: number; tone?: "primary" | "accent" }) {
  const isStatic = useIsStatic();
  const d = useEntranceDelay(delay);
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between text-body">
        <span>{label}</span>
        <span className="font-display text-[48px] font-medium tabular-nums">{display ?? `${value}%`}</span>
      </div>
      <div className="h-6 overflow-hidden rounded-full bg-p-border">
        <motion.div
          className={cn("h-full origin-left rounded-full", tone === "primary" ? "bg-p-primary" : "bg-p-accent")}
          style={{ width: `${value}%` }}
          initial={isStatic ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: d, ease: presentationTheme.motion.ease }}
        />
      </div>
    </div>
  );
}
