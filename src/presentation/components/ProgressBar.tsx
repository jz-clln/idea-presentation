"use client";
import { motion } from "framer-motion";
import { usePresentation } from "../hooks/usePresentation";
import { presentationTheme } from "../theme";

export function useChromeColor(): string {
  const { meta, currentSlide } = usePresentation();
  return meta[currentSlide]?.tone === "dark" ? "var(--p-primary-fg)" : "var(--p-fg)";
}

/** Thin bar or dots along the bottom of the canvas. Optional via config.showProgress. */
export function ProgressBar() {
  const { currentSlide, totalSlides, config, goTo } = usePresentation();
  const color = useChromeColor();
  const t = { duration: 0.6, ease: presentationTheme.motion.ease };

  if (config.progressStyle === "dots") {
    return (
      <div
        className="absolute inset-x-0 bottom-[44px] z-50 flex justify-center gap-[14px] transition-colors duration-500"
        style={{ color }}
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="h-[10px] rounded-full bg-current transition-all duration-500"
            style={{ width: i === currentSlide ? 34 : 10, opacity: i === currentSlide ? 0.75 : 0.22 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-[6px] transition-colors duration-500"
      style={{ color }}
    >
      <div className="absolute inset-0 bg-current opacity-10" />
      <motion.div
        className="h-full bg-current opacity-70"
        initial={false}
        animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        transition={t}
      />
    </div>
  );
}
