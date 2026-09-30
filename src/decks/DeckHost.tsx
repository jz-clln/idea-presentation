"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Presentation } from "@/presentation/Presentation";
import { decks } from "./index";

const isTextEntry = (t: EventTarget | null): boolean =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

/** Shows one deck at a time. ] = next deck, [ = previous deck. Also reads ?deck=<id>. */
export function DeckHost() {
  const [index, setIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const indexRef = useRef(0);
  const timer = useRef<number | null>(null);

  const switchTo = useCallback((i: number) => {
    const deck = decks[i];
    if (!deck) return;
    indexRef.current = i;
    setIndex(i);
    const url = new URL(window.location.href);
    url.searchParams.set("deck", deck.id);
    url.searchParams.delete("slide"); // a new deck starts at slide 1
    window.history.replaceState(window.history.state, "", url);
    setToast(`${deck.title}  ·  ${i + 1}/${decks.length}`);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 1800);
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("deck");
    const i = Math.max(0, decks.findIndex((d) => d.id === id));
    indexRef.current = i;
    setIndex(i);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || isTextEntry(e.target)) return;
      const n = decks.length;
      if (n < 2) return;
      if (e.key === "]") switchTo((indexRef.current + 1) % n);
      else if (e.key === "[") switchTo((indexRef.current - 1 + n) % n);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [switchTo]);

  const deck = index === null ? null : decks[index];
  if (!deck) return <div className="fixed inset-0 bg-black" />;

  return (
    <>
      {/* key remounts the presentation, so each deck starts fresh at slide 1 */}
      <Presentation key={deck.id} slides={deck.slides} config={deck.config} />
      {toast && (
        <div className="pointer-events-none fixed left-1/2 top-6 z-[200] -translate-x-1/2 rounded-full bg-black/80 px-6 py-3 font-body text-lg text-white">
          {toast}
        </div>
      )}
    </>
  );
}
