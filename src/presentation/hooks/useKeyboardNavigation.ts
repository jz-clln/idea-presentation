"use client";
import { useEffect } from "react";
import { usePresentation } from "./usePresentation";

const isTextEntry = (t: EventTarget | null): boolean => {
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
};
const isButtonLike = (t: EventTarget | null): boolean =>
  t instanceof HTMLElement && ["BUTTON", "A", "SUMMARY"].includes(t.tagName);

export function useKeyboardNavigation(): void {
  const p = usePresentation();
  const {
    config, next, previous, first, last, toggleFullscreen, togglePresenter, toggleNavigator,
    closeNavigator, exitPresenter, toggleDevMode, setPointerActive, isNavigatorOpen, isPresenterMode,
  } = p;

  useEffect(() => {
    if (!config.keyboardNavigation) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTextEntry(e.target)) return;
      const key = e.key.toLowerCase();

      // Enter/Space on a focused button should activate that button, not change slides.
      if ((e.key === "Enter" || e.key === " ") && isButtonLike(e.target)) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          return next();
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          return previous();
        case " ":
          e.preventDefault();
          return e.shiftKey ? previous() : next();
        case "Enter":
          e.preventDefault();
          return isNavigatorOpen ? closeNavigator() : next();
        case "Home":
          e.preventDefault();
          return first();
        case "End":
          e.preventDefault();
          return last();
        case "Escape":
          if (isNavigatorOpen) return closeNavigator();
          if (isPresenterMode) return exitPresenter();
          return; // Browsers exit fullscreen on their own.
      }

      if (e.repeat) return;
      if (key === "f") void toggleFullscreen();
      else if (key === "p") togglePresenter();
      else if (key === "g") toggleNavigator();
      else if (key === "d") toggleDevMode();
      else if (key === "l") setPointerActive(true);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "l") setPointerActive(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [
    config.keyboardNavigation, next, previous, first, last, toggleFullscreen, togglePresenter,
    toggleNavigator, closeNavigator, exitPresenter, toggleDevMode, setPointerActive,
    isNavigatorOpen, isPresenterMode,
  ]);
}
