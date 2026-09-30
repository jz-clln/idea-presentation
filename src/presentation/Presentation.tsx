"use client";
import { useRef } from "react";
import { DevOverlay } from "./components/DevOverlay";
import { NavZones } from "./components/NavZones";
import { Pointer } from "./components/Pointer";
import { PresenterView } from "./components/PresenterView";
import { ProgressBar } from "./components/ProgressBar";
import { ScaledStage } from "./components/ScaledStage";
import { SlideNavigator } from "./components/SlideNavigator";
import { SlideNumber } from "./components/SlideNumber";
import { SlideStage } from "./components/SlideStage";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { usePresentation } from "./hooks/usePresentation";
import { useSwipe } from "./hooks/useSwipe";
import { PresentationProvider } from "./PresentationProvider";
import { presentationConfig as defaultConfig } from "./presentation.config";
import { slides as defaultSlides } from "./slides";
import { presentationTheme, themeToCssVars } from "./theme";
import type { PresentationConfig, SlideDefinition } from "./types";

const themeVars = themeToCssVars(presentationTheme);

interface PresentationProps {
  /** Defaults to ./slides. Pass your own to render a different deck. */
  slides?: SlideDefinition[];
  /** Defaults to ./presentation.config.ts. */
  config?: PresentationConfig;
}

/** Drop this on a page. With no props it shows the default deck. */
export function Presentation({ slides = defaultSlides, config = defaultConfig }: PresentationProps) {
  return (
    <PresentationProvider slides={slides} config={config}>
      <Shell />
    </PresentationProvider>
  );
}

function Shell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const p = usePresentation();
  useKeyboardNavigation();
  useSwipe(rootRef, {
    enabled: p.config.swipeNavigation && !p.isPresenterMode,
    onSwipeLeft: p.next,
    onSwipeRight: p.previous,
  });

  const audience = !p.isPresenterMode;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ ...themeVars, touchAction: "pan-y", cursor: p.isPointerActive ? "none" : undefined }}
    >
      {p.ready && audience && (
        <>
          <ScaledStage>
            <SlideStage />
            {p.config.showProgress && <ProgressBar />}
            {p.config.showSlideNumbers && <SlideNumber />}
            {p.isDevMode && <DevOverlay />}
          </ScaledStage>
          {p.config.clickNavigation && <NavZones />}
        </>
      )}
      {p.ready && p.isPresenterMode && <PresenterView />}
      <SlideNavigator />
      <Pointer />
    </div>
  );
}
