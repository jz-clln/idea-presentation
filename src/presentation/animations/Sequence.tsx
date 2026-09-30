"use client";
import type { ReactNode } from "react";
import { useContext } from "react";
import { SequenceContext } from "../runtime";

/**
 * Timeline offset. Every animation inside starts `at` seconds later (nesting adds up).
 * Renders no DOM of its own, so it never affects layout.
 *
 *   <Sequence at={0.4}><FadeIn><Subtitle/></FadeIn></Sequence>
 */
export function Sequence({ at, children }: { at: number; children: ReactNode }) {
  const parent = useContext(SequenceContext);
  return <SequenceContext.Provider value={parent + at}>{children}</SequenceContext.Provider>;
}
