import type { ReactNode } from "react";
import { cn } from "../utils";

/** Wordmark with a small default mark. Pass `mark` to use your own SVG. */
export function Logo({
  name, mark, size = 48, className,
}: { name: string; mark?: ReactNode; size?: number; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-[0.4em] font-display font-medium tracking-[-0.02em]", className)} style={{ fontSize: size }}>
      {mark ?? (
        <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" aria-hidden>
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" />
          <path d="M12 30c8-2 10-12 24-12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="36" cy="18" r="4" fill="currentColor" />
        </svg>
      )}
      <span>{name}</span>
    </div>
  );
}
