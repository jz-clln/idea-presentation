"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePresentation } from "../hooks/usePresentation";
import { cn, pad2 } from "../utils";
import { ScaledStage } from "./ScaledStage";
import { StaticSlide } from "./SlideStage";

/** G opens a grid of live miniatures. Click one to jump to it; G or Esc closes. */
export function SlideNavigator() {
  const { isNavigatorOpen, closeNavigator, slides, currentSlide, goTo } = usePresentation();
  const currentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isNavigatorOpen) currentRef.current?.scrollIntoView({ block: "center" });
  }, [isNavigatorOpen]);

  return (
    <AnimatePresence>
      {isNavigatorOpen && (
        <motion.div
          role="dialog"
          aria-label="Slide overview"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeNavigator}
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 p-10 md:grid-cols-3 xl:grid-cols-4">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                ref={i === currentSlide ? currentRef : undefined}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                  closeNavigator();
                }}
                className="group text-left outline-none"
              >
                <div
                  className={cn(
                    "aspect-video w-full overflow-hidden rounded-lg ring-2 transition",
                    i === currentSlide ? "ring-white" : "ring-white/10 group-hover:ring-white/50",
                  )}
                >
                  <ScaledStage>
                    <StaticSlide index={i} definition={slide} />
                  </ScaledStage>
                </div>
                <div className="mt-3 flex items-baseline gap-3 font-body text-sm text-white/80">
                  <span className="tabular-nums text-white/40">{pad2(i + 1)}</span>
                  {slide.title}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
