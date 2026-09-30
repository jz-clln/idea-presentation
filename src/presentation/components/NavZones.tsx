"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePresentation } from "../hooks/usePresentation";

/** Invisible click targets on the outer edges; a faint chevron appears on hover only. */
export function NavZones() {
  const { next, previous, isFirst, isLast } = usePresentation();
  const zone =
    "group fixed inset-y-0 z-30 flex w-[7%] items-center text-white/0 transition-colors hover:text-white/40";
  return (
    <>
      {!isFirst && (
        <div className={`${zone} left-0 cursor-w-resize justify-start pl-4`} onClick={previous} aria-hidden>
          <ChevronLeft size={40} strokeWidth={1.5} />
        </div>
      )}
      {!isLast && (
        <div className={`${zone} right-0 cursor-e-resize justify-end pr-4`} onClick={next} aria-hidden>
          <ChevronRight size={40} strokeWidth={1.5} />
        </div>
      )}
    </>
  );
}
