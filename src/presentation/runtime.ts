"use client";
import { createContext, useContext } from "react";

export interface SlideRuntime {
  /** "live" plays entrance animations; "static" renders the final state (thumbnails, previews). */
  mode: "live" | "static";
  index: number;
  /** Seconds to wait before element animations begin, so they follow the slide transition. */
  enterOffset: number;
}

export const SlideRuntimeContext = createContext<SlideRuntime>({
  mode: "static",
  index: 0,
  enterOffset: 0,
});

/** Extra delay contributed by enclosing <Sequence> blocks. */
export const SequenceContext = createContext(0);

export const useSlideRuntime = (): SlideRuntime => useContext(SlideRuntimeContext);
export const useIsStatic = (): boolean => useSlideRuntime().mode === "static";

/** Total delay (seconds) for an element that asked for `delay`. Zero in static mode. */
export function useEntranceDelay(delay = 0): number {
  const rt = useSlideRuntime();
  const seq = useContext(SequenceContext);
  return rt.mode === "live" ? rt.enterOffset + seq + delay : 0;
}
