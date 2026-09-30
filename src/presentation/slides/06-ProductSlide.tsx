import { BodyText, FadeIn, SectionTitle, Slide, SlideUp } from "@/presentation";
import { PhoneMock } from "./parts/PhoneMock";

export default function ProductSlide() {
  return (
    <Slide
      transition="slide-up"
      background="var(--p-accent)"
      notes={`
        Show, do not narrate. Tell the story of one request: tomatoes, Tagaytay to Divisoria.
        The match card appears on its own after about a second.
      `}
    >
      <div className="absolute right-[190px] top-[130px]">
        <SlideUp distance={260} duration={1.1} delay={0.2}>
          <PhoneMock />
        </SlideUp>
      </div>
      <div className="flex h-full max-w-[860px] flex-col justify-center">
        <FadeIn>
          <SectionTitle>Built for a phone in a field.</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.4}>
          <BodyText className="mt-12 text-p-primary/80">
            No dashboards. A request takes under a minute and works on a weak signal.
          </BodyText>
        </FadeIn>
      </div>
    </Slide>
  );
}
