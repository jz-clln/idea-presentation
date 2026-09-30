"use client";
import { AnimatePresence } from "framer-motion";
import { usePresentation } from "../hooks/usePresentation";
import { SlideRuntimeContext } from "../runtime";
import type { SlideDefinition } from "../types";
import { SlideErrorBoundary } from "./SlideErrorBoundary";

/** Live, animated rendering of the current slide. Remounting on navigation replays animations. */
export function SlideStage() {
  const { currentSlide, direction, slides } = usePresentation();
  const definition = slides[currentSlide];
  if (!definition) return null;
  return (
    <div className="absolute inset-0 isolate">
      <AnimatePresence custom={direction}>
        <LiveSlide key={definition.id} index={currentSlide} definition={definition} />
      </AnimatePresence>
    </div>
  );
}

function LiveSlide({ index, definition }: { index: number; definition: SlideDefinition }) {
  const Component = definition.component;
  return (
    <SlideRuntimeContext.Provider value={{ mode: "live", index, enterOffset: 0 }}>
      <SlideErrorBoundary title={definition.title}>
        <Component />
      </SlideErrorBoundary>
    </SlideRuntimeContext.Provider>
  );
}

/** Non-animated, final-state rendering for thumbnails and the next-slide preview. */
export function StaticSlide({ index, definition }: { index: number; definition: SlideDefinition }) {
  const Component = definition.component;
  return (
    <SlideRuntimeContext.Provider value={{ mode: "static", index, enterOffset: 0 }}>
      <SlideErrorBoundary title={definition.title}>
        <div className="pointer-events-none absolute inset-0">
          <Component />
        </div>
      </SlideErrorBoundary>
    </SlideRuntimeContext.Provider>
  );
}
