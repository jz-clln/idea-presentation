import type { ElementType, ReactNode } from "react";
import { cn } from "../utils";

export interface TextProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

const sizes = {
  hero: "text-hero leading-[0.9] tracking-[-0.035em]",
  title: "text-title leading-[0.98] tracking-[-0.03em]",
  section: "text-section leading-[1.02] tracking-[-0.025em]",
} as const;

export type TitleSize = keyof typeof sizes;

/** Very large display heading. Use `size` to step down: hero → title → section. */
export function Title({
  children, className, as: Tag = "h1", size = "title",
}: TextProps & { size?: TitleSize }) {
  return (
    <Tag className={cn("m-0 font-display font-medium text-p-fg", sizes[size], className)}>{children}</Tag>
  );
}
