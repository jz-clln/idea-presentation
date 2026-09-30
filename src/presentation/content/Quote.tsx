import type { ReactNode } from "react";
import { cn } from "../utils";

export function Quote({
  children, author, role, className,
}: { children: ReactNode; author?: string; role?: string; className?: string }) {
  return (
    <figure className={cn("m-0 border-l-[8px] border-p-accent pl-14", className)}>
      <blockquote className="m-0 font-display text-[72px] font-normal leading-[1.1] tracking-[-0.02em]">{children}</blockquote>
      {author && (
        <figcaption className="mt-8 text-body text-p-muted">
          <span className="font-medium text-p-fg">{author}</span>
          {role ? `, ${role}` : null}
        </figcaption>
      )}
    </figure>
  );
}
