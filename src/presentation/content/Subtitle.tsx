import { cn } from "../utils";
import type { TextProps } from "./Title";

export function Subtitle({ children, className, as: Tag = "p" }: TextProps) {
  return (
    <Tag className={cn("m-0 max-w-[1100px] text-subtitle font-normal leading-[1.25] tracking-[-0.01em] text-p-muted", className)}>
      {children}
    </Tag>
  );
}
