/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { cn } from "../utils";

interface ImageFrameProps {
  src: string;
  alt?: string;
  fit?: "cover" | "contain";
  /** CSS object-position, e.g. "center 30%". */
  position?: string;
  radius?: "none" | "small" | "medium" | "large" | "full";
  shadow?: boolean;
  mask?: "none" | "fade-bottom" | "fade-right" | "fade-left";
  /** Give the frame a size, e.g. "h-[640px] w-full". */
  className?: string;
}

const radii: Record<NonNullable<ImageFrameProps["radius"]>, string> = {
  none: "0px",
  small: "var(--p-radius-small)",
  medium: "var(--p-radius-card)",
  large: "48px",
  full: "9999px",
};
const masks: Record<NonNullable<ImageFrameProps["mask"]>, string | undefined> = {
  none: undefined,
  "fade-bottom": "linear-gradient(to bottom, #000 60%, transparent)",
  "fade-right": "linear-gradient(to right, #000 60%, transparent)",
  "fade-left": "linear-gradient(to left, #000 60%, transparent)",
};

/** Never distorts: images are always object-fit cover or contain inside a sized frame. */
export function ImageFrame({
  src, alt = "", fit = "cover", position = "center", radius = "medium", shadow = false, mask = "none", className,
}: ImageFrameProps) {
  const style: CSSProperties = { borderRadius: radii[radius], maskImage: masks[mask], WebkitMaskImage: masks[mask] };
  return (
    <div className={cn("relative overflow-hidden", shadow && "shadow-lift", className)} style={style}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
}
