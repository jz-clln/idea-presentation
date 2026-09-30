"use client";
import { usePresentation } from "../hooks/usePresentation";
import { pad2 } from "../utils";
import { PresenterControls, PresenterTimer } from "./PresenterControls";
import { ScaledStage } from "./ScaledStage";
import { SlideStage, StaticSlide } from "./SlideStage";

/** Speaker view: current slide, next slide, notes, counter and timer. Never shown to the audience. */
export function PresenterView() {
  const { slides, current, currentSlide, nextSlide, slideNumber, totalSlides, meta } = usePresentation();
  const notes = meta[currentSlide]?.notes;
  const upcoming = nextSlide === null ? null : slides[nextSlide];

  return (
    <div className="absolute inset-0 grid grid-cols-[minmax(0,1fr)_minmax(340px,30%)] gap-6 bg-[#121212] p-6 font-body text-white">
      <div className="flex min-h-0 min-w-0 flex-col gap-4">
        <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-black">
          <ScaledStage>
            <SlideStage />
          </ScaledStage>
        </div>
        <PresenterControls />
      </div>

      <aside className="flex min-h-0 min-w-0 flex-col gap-5">
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-white/40">Next</div>
          <div className="aspect-video w-full overflow-hidden rounded-md bg-black ring-1 ring-white/15">
            {upcoming && nextSlide !== null ? (
              <ScaledStage>
                <StaticSlide index={nextSlide} definition={upcoming} />
              </ScaledStage>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                End of presentation
              </div>
            )}
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-lg font-medium">{current.title}</div>
          <div className="tabular-nums text-white/60">
            Slide {pad2(slideNumber)} / {pad2(totalSlides)}
          </div>
        </div>

        <PresenterTimer />

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 text-xs uppercase tracking-widest text-white/40">Speaker notes</div>
          <div className="min-h-0 flex-1 overflow-y-auto whitespace-pre-line text-[22px] leading-relaxed text-white/90">
            {notes || <span className="text-white/30">No notes for this slide.</span>}
          </div>
        </div>
      </aside>
    </div>
  );
}
