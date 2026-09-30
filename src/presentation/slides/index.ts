import type { SlideDefinition } from "../types";
import TitleSlide from "./01-TitleSlide";
import ProblemSlide from "./02-ProblemSlide";
import WhyItMattersSlide from "./03-WhyItMattersSlide";
import SolutionSlide from "./04-SolutionSlide";
import HowItWorksSlide from "./05-HowItWorksSlide";
import ProductSlide from "./06-ProductSlide";
import MarketSlide from "./07-MarketSlide";
import BusinessModelSlide from "./08-BusinessModelSlide";
import RoadmapSlide from "./09-RoadmapSlide";
import ClosingSlide from "./10-ClosingSlide";

/** The deck. Reorder, add, or remove entries here; nothing else needs to change. */
export const slides: SlideDefinition[] = [
  { id: "title", title: "Introduction", component: TitleSlide },
  { id: "problem", title: "The problem", component: ProblemSlide },
  { id: "why-it-matters", title: "Why it matters", component: WhyItMattersSlide },
  { id: "solution", title: "The solution", component: SolutionSlide },
  { id: "how-it-works", title: "How it works", component: HowItWorksSlide },
  { id: "product", title: "Product", component: ProductSlide },
  { id: "market", title: "Market opportunity", component: MarketSlide },
  { id: "business-model", title: "Business model", component: BusinessModelSlide },
  { id: "roadmap", title: "Roadmap", component: RoadmapSlide },
  { id: "closing", title: "Closing", component: ClosingSlide },
];
