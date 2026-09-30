import type { ComponentType } from "react";

export type TransitionName =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "zoom"
  | "blur"
  | "scale"
  | "reveal";

export type TransitionKind = "fade" | "slide" | "zoom" | "blur" | "scale" | "reveal";
export type TransitionDirection = "left" | "right" | "up" | "down";

export interface TransitionSpec {
  type: TransitionKind;
  /** Only used by type "slide". "left" means the new slide travels leftwards. */
  direction?: TransitionDirection;
  /** Seconds. Falls back to config.transitionDuration. */
  duration?: number;
}

export type TransitionInput = TransitionName | TransitionSpec;

/** "light" = dark UI chrome on a light slide, "dark" = light UI chrome on a dark slide. */
export type Tone = "light" | "dark";

export interface SlideDefinition {
  id: string;
  title: string;
  component: ComponentType;
}

export interface SlideMeta {
  notes: string;
  tone: Tone;
}

export interface PresentationConfig {
  title: string;
  /** The canvas is always 16:9 (1920×1080 logical px). */
  aspectRatio: "16:9";
  showProgress: boolean;
  progressStyle: "bar" | "dots";
  showSlideNumbers: boolean;
  defaultTransition: TransitionInput;
  /** Seconds. */
  transitionDuration: number;
  keyboardNavigation: boolean;
  swipeNavigation: boolean;
  /** Small clickable zones at the left and right edges. */
  clickNavigation: boolean;
  presenterMode: boolean;
  /** Enables the D shortcut (canvas size, safe margins, slide name). */
  devTools: boolean;
  /** "replace" keeps browser history clean, "push" makes Back/Forward step through slides. */
  urlHistory: "replace" | "push";
}
