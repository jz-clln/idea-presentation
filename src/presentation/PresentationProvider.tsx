"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PresentationConfig, SlideDefinition, SlideMeta } from "./types";
import { clamp } from "./utils";

export interface PresentationTimer {
  isRunning: boolean;
  getElapsed: () => number;
  toggle: () => void;
  reset: () => void;
}

export interface PresentationApi {
  config: PresentationConfig;
  slides: SlideDefinition[];
  /** False until the initial slide has been read from the URL (avoids a flash of slide 1). */
  ready: boolean;

  /** Zero-based index of the visible slide. */
  currentSlide: number;
  /** One-based, for display. */
  slideNumber: number;
  totalSlides: number;
  previousSlide: number | null;
  nextSlide: number | null;
  current: SlideDefinition;
  isFirst: boolean;
  isLast: boolean;
  /** 1 when the last move was forward, -1 when backward. */
  direction: 1 | -1;

  isFullscreen: boolean;
  isPresenterMode: boolean;
  isNavigatorOpen: boolean;
  isDevMode: boolean;
  isPointerActive: boolean;

  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  first: () => void;
  last: () => void;

  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: () => Promise<void>;
  togglePresenter: () => void;
  exitPresenter: () => void;
  toggleNavigator: () => void;
  closeNavigator: () => void;
  toggleDevMode: () => void;
  setPointerActive: (active: boolean) => void;

  /** Notes/tone that slides register when they render. */
  meta: Record<number, SlideMeta>;
  registerMeta: (index: number, meta: SlideMeta) => void;
  timer: PresentationTimer;
}

export const PresentationContext = createContext<PresentationApi | null>(null);

interface ProviderProps {
  slides: SlideDefinition[];
  config: PresentationConfig;
  children: ReactNode;
}

function readSlideFromUrl(total: number): number | null {
  const raw = new URLSearchParams(window.location.search).get("slide");
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? clamp(n - 1, 0, total - 1) : null;
}

export function PresentationProvider({ slides, config, children }: ProviderProps) {
  const total = slides.length;
  const [ready, setReady] = useState(false);
  const [nav, setNav] = useState<{ current: number; direction: 1 | -1 }>({
    current: 0,
    direction: 1,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPresenterMode, setIsPresenterMode] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isPointerActive, setPointerActive] = useState(false);
  const [meta, setMeta] = useState<Record<number, SlideMeta>>({});
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<{ elapsed: number; startedAt: number | null }>({
    elapsed: 0,
    startedAt: null,
  });

  /* ---------- initial slide + URL sync ---------- */
  useEffect(() => {
    const fromUrl = readSlideFromUrl(total);
    if (fromUrl !== null) setNav({ current: fromUrl, direction: 1 });
    if (timerRef.current.startedAt === null) {
      timerRef.current.startedAt = Date.now();
      setTimerRunning(true);
    }
    setReady(true);

    const onPop = () => {
      const s = readSlideFromUrl(total);
      if (s === null) return;
      setNav((prev) => (prev.current === s ? prev : { current: s, direction: s > prev.current ? 1 : -1 }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [total]);

  const currentIndex = nav.current;
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    const value = String(currentIndex + 1);
    if (url.searchParams.get("slide") === value) return;
    url.searchParams.set("slide", value);
    const method = config.urlHistory === "push" ? "pushState" : "replaceState";
    window.history[method](window.history.state, "", url);
  }, [ready, currentIndex, config.urlHistory]);

  /* ---------- navigation ---------- */
  const goTo = useCallback(
    (index: number) =>
      setNav((prev) => {
        const target = clamp(index, 0, total - 1);
        if (target === prev.current) return prev;
        return { current: target, direction: target > prev.current ? 1 : -1 };
      }),
    [total],
  );
  const next = useCallback(
    () =>
      setNav((prev) =>
        prev.current >= total - 1 ? prev : { current: prev.current + 1, direction: 1 },
      ),
    [total],
  );
  const previous = useCallback(
    () =>
      setNav((prev) => (prev.current <= 0 ? prev : { current: prev.current - 1, direction: -1 })),
    [],
  );
  const first = useCallback(() => goTo(0), [goTo]);
  const last = useCallback(() => goTo(total - 1), [goTo, total]);

  /* ---------- fullscreen ---------- */
  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch (error) {
      console.warn("[presentation] Fullscreen request was denied.", error);
    }
  }, []);
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch (error) {
      console.warn("[presentation] Could not exit fullscreen.", error);
    }
  }, []);
  const toggleFullscreen = useCallback(
    () => (document.fullscreenElement ? exitFullscreen() : enterFullscreen()),
    [enterFullscreen, exitFullscreen],
  );

  /* ---------- UI modes ---------- */
  const togglePresenter = useCallback(() => {
    if (config.presenterMode) setIsPresenterMode((v) => !v);
  }, [config.presenterMode]);
  const exitPresenter = useCallback(() => setIsPresenterMode(false), []);
  const toggleNavigator = useCallback(() => setIsNavigatorOpen((v) => !v), []);
  const closeNavigator = useCallback(() => setIsNavigatorOpen(false), []);
  const toggleDevMode = useCallback(() => {
    if (config.devTools) setIsDevMode((v) => !v);
  }, [config.devTools]);

  /* ---------- slide metadata (notes, tone) ---------- */
  const registerMeta = useCallback((index: number, next: SlideMeta) => {
    setMeta((prev) => {
      const existing = prev[index];
      if (existing && existing.notes === next.notes && existing.tone === next.tone) return prev;
      return { ...prev, [index]: next };
    });
  }, []);

  /* ---------- timer ---------- */
  const timer = useMemo<PresentationTimer>(
    () => ({
      isRunning: timerRunning,
      getElapsed: () => {
        const t = timerRef.current;
        return t.elapsed + (t.startedAt === null ? 0 : Date.now() - t.startedAt);
      },
      toggle: () => {
        const t = timerRef.current;
        if (t.startedAt === null) {
          t.startedAt = Date.now();
          setTimerRunning(true);
        } else {
          t.elapsed += Date.now() - t.startedAt;
          t.startedAt = null;
          setTimerRunning(false);
        }
      },
      reset: () => {
        timerRef.current = { elapsed: 0, startedAt: Date.now() };
        setTimerRunning(true);
      },
    }),
    [timerRunning],
  );

  const api = useMemo<PresentationApi>(() => {
    const current = nav.current;
    const definition = slides[current] as SlideDefinition;
    return {
      config,
      slides,
      ready,
      currentSlide: current,
      slideNumber: current + 1,
      totalSlides: total,
      previousSlide: current > 0 ? current - 1 : null,
      nextSlide: current < total - 1 ? current + 1 : null,
      current: definition,
      isFirst: current === 0,
      isLast: current === total - 1,
      direction: nav.direction,
      isFullscreen,
      isPresenterMode,
      isNavigatorOpen,
      isDevMode,
      isPointerActive,
      next,
      previous,
      goTo,
      first,
      last,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      togglePresenter,
      exitPresenter,
      toggleNavigator,
      closeNavigator,
      toggleDevMode,
      setPointerActive,
      meta,
      registerMeta,
      timer,
    };
  }, [
    config, slides, ready, nav, total, isFullscreen, isPresenterMode, isNavigatorOpen, isDevMode,
    isPointerActive, next, previous, goTo, first, last, enterFullscreen, exitFullscreen,
    toggleFullscreen, togglePresenter, exitPresenter, toggleNavigator, closeNavigator,
    toggleDevMode, meta, registerMeta, timer,
  ]);

  return <PresentationContext.Provider value={api}>{children}</PresentationContext.Provider>;
}
