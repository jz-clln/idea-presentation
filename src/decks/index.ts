import type { PresentationConfig, SlideDefinition } from "@/presentation/types";
import { rovaConfig } from "./rova/config";
import { slides as rovaSlides } from "./rova/slides";
import { starterConfig } from "./starter/config";
import { slides as starterSlides } from "./starter/slides";

export interface Deck {
  /** Used in the URL: /presentation?deck=rova */
  id: string;
  title: string;
  slides: SlideDefinition[];
  config: PresentationConfig;
}

/** Every deck you can switch between. The first one opens by default. Order = [ and ] order. */
export const decks: Deck[] = [
  { id: "rova", title: "ROVA — Pitch", slides: rovaSlides, config: rovaConfig },
  { id: "starter", title: "Starter deck", slides: starterSlides, config: starterConfig },
];
