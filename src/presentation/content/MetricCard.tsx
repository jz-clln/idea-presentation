import type { ReactNode } from "react";
import { cn } from "../utils";

interface MetricCardProps {
  /** A string, or an <AnimatedNumber /> for a counting value. */
  value: ReactNode;
  label: ReactNode;
  /** "card" is a filled panel, "plain" is just type with a rule. */
  variant?: "card" | "plain";
  tone?: "surface" | "primary" | "accent";
  className?: string;
}

const tones = {
  surface: "bg-p-surface text-p-fg",
  primary: "bg-p-primary text-p-primary-fg",
  accent: "bg-p-accent text-p-primary",
} as const;

export function MetricCard({ value, label, variant = "card", tone = "surface", className }: MetricCardProps) {
  if (variant === "plain") {
    return (
      <div className={cn("border-l-2 border-p-border pl-12", className)}>
        <div className="font-display text-[200px] font-medium leading-none tracking-[-0.04em] text-p-primary">{value}</div>
        <div className="mt-8 max-w-[420px] text-subtitle leading-[1.2] text-p-muted">{label}</div>
      </div>
    );
  }
  return (
    <div className={cn("flex h-full flex-col justify-between rounded-card p-14 shadow-card", tones[tone], className)}>
      <div className="font-display text-[200px] font-medium leading-none tracking-[-0.04em]">{value}</div>
      <div className={cn("mt-12 text-subtitle leading-[1.2]", tone === "surface" ? "text-p-muted" : "opacity-80")}>{label}</div>
    </div>
  );
}
