import type { PresentationConfig } from "./types";

export const presentationConfig: PresentationConfig = {
  title: "ROVA — Seed Pitch",
  aspectRatio: "16:9",
  showProgress: true,
  progressStyle: "bar",
  showSlideNumbers: true,
  defaultTransition: "fade",
  transitionDuration: 0.55,
  keyboardNavigation: true,
  swipeNavigation: true,
  clickNavigation: true,
  presenterMode: true,
  devTools: process.env.NODE_ENV !== "production",
  urlHistory: "replace",
};
