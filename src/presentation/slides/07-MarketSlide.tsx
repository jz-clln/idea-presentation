import { AnimatedNumber, FadeIn, MetricCard, SectionTitle, Slide, Stagger } from "@/presentation";

export default function MarketSlide() {
  return (
    <Slide
      transition="fade"
      notes={`
        Numbers count up as the slide arrives. Say each one once, slowly.
        Sample figures for demonstration only.
      `}
    >
      <div className="flex h-full flex-col">
        <FadeIn>
          <SectionTitle>A market that moves every day.</SectionTitle>
        </FadeIn>
        <Stagger start={0.3} delay={0.25} className="mt-auto grid grid-cols-3 gap-16" itemClassName="">
          <MetricCard variant="plain" value={<AnimatedNumber to={12} prefix="₱" suffix="B" delay={0.3} />} label="yearly freight spend on fresh produce" />
          <MetricCard variant="plain" value={<AnimatedNumber to={120} suffix="K+" delay={0.55} />} label="farms and buyers we can serve" />
          <MetricCard variant="plain" value={<AnimatedNumber to={23} suffix="%" delay={0.8} />} label="annual growth in online ordering" />
        </Stagger>
      </div>
    </Slide>
  );
}
