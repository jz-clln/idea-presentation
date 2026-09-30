import { AnimatedTitle, Badge, FadeIn, Slide, SlideLeft, Subtitle } from "@/presentation";
import { RouteVisual } from "./parts/RouteVisual";

export default function TitleSlide() {
  return (
    <Slide
      transition="fade"
      grain
      notes={`
        Open with the name and one sentence. Do not explain the product yet.
        Point at the route on the right: farm, hub, market. That is the whole company.
        About 20 seconds.
      `}
    >
      <div className="absolute inset-y-0 right-0 w-[760px]">
        <SlideLeft distance={220} delay={0.5} duration={1.1} className="h-full">
          <RouteVisual />
        </SlideLeft>
      </div>

      <div className="flex h-full max-w-[1000px] flex-col justify-center gap-14">
        <FadeIn>
          <Badge dot>Seed round · 2026</Badge>
        </FadeIn>
        <AnimatedTitle delay={0.15}>ROVA</AnimatedTitle>
        <FadeIn delay={0.8}>
          <Subtitle>One network for farmers, buyers, and the trucks between them.</Subtitle>
        </FadeIn>
      </div>
    </Slide>
  );
}
