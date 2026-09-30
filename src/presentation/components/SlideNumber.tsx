"use client";
import { usePresentation } from "../hooks/usePresentation";
import { pad2 } from "../utils";
import { useChromeColor } from "./ProgressBar";

export function SlideNumber() {
  const { slideNumber, totalSlides } = usePresentation();
  const color = useChromeColor();
  return (
    <div
      className="pointer-events-none absolute bottom-[40px] right-[64px] z-50 text-label tabular-nums tracking-wide opacity-60 transition-colors duration-500"
      style={{ color }}
    >
      {pad2(slideNumber)} / {pad2(totalSlides)}
    </div>
  );
}
