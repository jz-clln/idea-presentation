import { BarRow, BodyText, ChartContainer, FadeIn, SectionTitle, Slide, SlideLeft } from "@/presentation";

export default function BusinessModelSlide() {
  return (
    <Slide
      transition="slide-left"
      notes={`
        We earn when goods move: a small fee per match.
        Subscriptions and financing come later. Do not go deeper than this bar chart.
      `}
    >
      <div className="flex h-full items-center justify-between gap-24">
        <div className="max-w-[760px]">
          <FadeIn>
            <SectionTitle>We earn when produce moves.</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.3}>
            <BodyText className="mt-12">A small fee on every match, then services around it.</BodyText>
          </FadeIn>
        </div>
        <SlideLeft delay={0.3} className="w-[860px] shrink-0">
          <ChartContainer title="Year-three revenue mix" caption="Illustrative projection">
            <div className="flex flex-col gap-12">
              <BarRow label="Match fees" value={62} delay={0.6} />
              <BarRow label="Buyer subscriptions" value={24} delay={0.9} tone="accent" />
              <BarRow label="Logistics financing" value={14} delay={1.2} tone="accent" />
            </div>
          </ChartContainer>
        </SlideLeft>
      </div>
    </Slide>
  );
}
