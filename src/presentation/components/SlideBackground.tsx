"use client";
import { Video } from "../content/Video";

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

export interface SlideBackgroundProps {
  /** Any CSS background: color, gradient, var(--p-primary)... */
  background?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  /** 0–1 black overlay, useful for legibility on photos and video. */
  overlay?: number;
  /** true for subtle grain, or a 0–1 strength. */
  grain?: boolean | number;
}

export function SlideBackground({
  background, backgroundImage, backgroundVideo, overlay, grain,
}: SlideBackgroundProps) {
  const grainOpacity = grain === true ? 0.07 : typeof grain === "number" ? grain : 0;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0" style={{ background: background ?? "var(--p-bg)" }} />
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {backgroundVideo && <Video src={backgroundVideo} className="absolute inset-0" />}
      {overlay ? <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlay})` }} /> : null}
      {grainOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: grainOpacity, mixBlendMode: "multiply" }}
        />
      )}
    </div>
  );
}
