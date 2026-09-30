import type { ReactNode } from "react";
import { cn } from "../utils";

/** Small pill label. `dot` adds a status dot. */
export function Badge({
  children, dot = false, tone = "outline", className,
}: { children: ReactNode; dot?: boolean; tone?: "outline" | "primary" | "accent" | "light"; className?: string }) {
  const tones = {
    outline: "border border-p-border text-p-fg",
    primary: "bg-p-primary text-p-primary-fg",
    accent: "bg-p-accent text-p-primary",
    light: "border border-white/25 text-p-primary-fg",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-4 rounded-full px-8 py-4 text-caption font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-3 w-3 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
}
