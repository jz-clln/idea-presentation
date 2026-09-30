"use client";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SAFE_X, SAFE_Y } from "../constants";
import { usePresentation } from "../hooks/usePresentation";
import { useStage } from "./ScaledStage";

/** Toggle with D (development only by default). Shows safe margins and canvas details. */
export function DevOverlay() {
  const { slideNumber, totalSlides, current } = usePresentation();
  const { scale, width, height } = useStage();
  return (
    <div className="pointer-events-none absolute inset-0 z-[90] font-mono">
      <div
        className="absolute border-2 border-dashed border-fuchsia-500/70"
        style={{ left: SAFE_X, right: SAFE_X, top: SAFE_Y, bottom: SAFE_Y }}
      />
      <div className="absolute left-6 top-6 rounded-md bg-black/80 px-5 py-3 text-[22px] leading-snug text-fuchsia-200">
        <div>
          slide {slideNumber}/{totalSlides} · {current.id}
        </div>
        <div>
          canvas {CANVAS_WIDTH}×{CANVAS_HEIGHT} · viewport {Math.round(width)}×{Math.round(height)} · scale{" "}
          {scale.toFixed(3)}
        </div>
        <div>
          safe x={SAFE_X} y={SAFE_Y}
        </div>
      </div>
    </div>
  );
}
