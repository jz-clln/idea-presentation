import type { PresentationConfig, SlideDefinition } from "@/presentation/types";
import { omitConfig } from "./omit/config";
import { slides as omitSlides } from "./omit/slides";
import { rovaConfig } from "./rova/config";
import { slides as rovaSlides } from "./rova/slides";

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
  { id: "omit", title: "Omit — Pitch", slides: omitSlides, config: omitConfig },
];