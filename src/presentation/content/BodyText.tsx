import { cn } from "../utils";
import type { TextProps } from "./Title";

export function BodyText({ children, className, as: Tag = "p" }: TextProps) {
  return (
    <Tag className={cn("m-0 max-w-[880px] text-body leading-[1.4] text-p-muted", className)}>{children}</Tag>
  );
}
