"use client";
import { useEffect, type RefObject } from "react";

interface SwipeOptions {
  enabled: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum horizontal travel in CSS px. */
  threshold?: number;
}

/** Horizontal swipe detection that ignores taps, slow drags and mostly-vertical gestures. */
export function useSwipe(ref: RefObject<HTMLElement | null>, opts: SwipeOptions): void {
  const { enabled, onSwipeLeft, onSwipeRight, threshold = 70 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let sx = 0, sy = 0, st = 0, tracking = false;

    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return void (tracking = false);
      const t = e.touches[0];
      if (!t) return;
      sx = t.clientX; sy = t.clientY; st = Date.now(); tracking = true;
    };
    const end = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Date.now() - st > 800) return;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) onSwipeLeft(); else onSwipeRight();
    };

    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", end, { passive: true });
    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchend", end);
    };
  }, [ref, enabled, onSwipeLeft, onSwipeRight, threshold]);
}
