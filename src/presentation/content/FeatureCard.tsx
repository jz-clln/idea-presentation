import type { ReactNode } from "react";
import { cn } from "../utils";

interface FeatureCardProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: "surface" | "primary" | "accent";
  className?: string;
}

const tones = {
  surface: "bg-p-surface text-p-fg",
  primary: "bg-p-primary text-p-primary-fg",
  accent: "bg-p-accent text-p-primary",
} as const;

/** With a description it is a full card; without one it becomes a compact chip. */
export function FeatureCard({ icon, title, description, tone = "surface", className }: FeatureCardProps) {
  const compact = !description;
  return (
    <div
      className={cn(
        "flex rounded-card shadow-card",
        compact ? "items-center gap-6 px-10 py-7" : "flex-col gap-8 p-12",
        tones[tone],
        className,
      )}
    >
      {icon && <div className={cn("shrink-0 [&>svg]:h-full [&>svg]:w-full", compact ? "h-12 w-12" : "h-16 w-16")}>{icon}</div>}
      <div>
        <div className={cn("font-display font-medium tracking-[-0.01em]", compact ? "text-[44px]" : "text-[56px]")}>{title}</div>
        {description && <div className="mt-4 text-body leading-[1.35] opacity-70">{description}</div>}
      </div>
    </div>
  );
}
