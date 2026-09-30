"use client";
import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { cn } from "../utils";

interface StageInfo {
  scale: number;
  width: number;
  height: number;
}
const StageContext = createContext<StageInfo>({ scale: 1, width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
export const useStage = (): StageInfo => useContext(StageContext);

/**
 * Renders children on a fixed 1920×1080 canvas and scales it (uniformly) to fit its parent.
 * The canvas is centred and letterboxed, so layouts never reflow with the browser size.
 */
export function ScaledStage({ children, className }: { children: ReactNode; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = box.w && box.h ? Math.min(box.w / CANVAS_WIDTH, box.h / CANVAS_HEIGHT) : 0;
  const x = (box.w - CANVAS_WIDTH * scale) / 2;
  const y = (box.h - CANVAS_HEIGHT * scale) / 2;

  return (
    <div ref={boxRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transformOrigin: "0 0",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <StageContext.Provider value={{ scale, width: box.w, height: box.h }}>
          {children}
        </StageContext.Provider>
      </div>
    </div>
  );
}
