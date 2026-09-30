/**
 * Public API for slide authors:
 *   import { Slide, FadeIn, Stagger, Title } from "@/presentation";
 */
export { Slide } from "./components/Slide";
export type { SlideProps } from "./components/Slide";

export * from "./animations";

export { Title } from "./content/Title";
export { SectionTitle } from "./content/SectionTitle";
export { Subtitle } from "./content/Subtitle";
export { BodyText } from "./content/BodyText";
export { AnimatedTitle } from "./content/AnimatedTitle";
export { AnimatedNumber } from "./content/AnimatedNumber";
export { Quote } from "./content/Quote";
export { MetricCard } from "./content/MetricCard";
export { FeatureCard } from "./content/FeatureCard";
export { ImageFrame } from "./content/ImageFrame";
export { Badge } from "./content/Badge";
export { Logo } from "./content/Logo";
export { Video } from "./content/Video";
export { ChartContainer, BarRow } from "./content/ChartContainer";

export { usePresentation } from "./hooks/usePresentation";
export { useIsStatic } from "./runtime";
export { presentationTheme } from "./theme";
export { transitions } from "./transitions";
export { SAFE_X, SAFE_Y, CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";
export type { SlideDefinition, TransitionInput, TransitionName } from "./types";
