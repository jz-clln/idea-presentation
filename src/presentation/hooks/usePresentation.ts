"use client";
import { useContext } from "react";
import { PresentationContext, type PresentationApi } from "../PresentationProvider";

/** Access navigation, fullscreen, presenter state and more from any component. */
export function usePresentation(): PresentationApi {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used inside <PresentationProvider>.");
  return ctx;
}
