import { FadeIn, MetricCard, SectionTitle, Slide, Stagger } from "@/presentation";

export default function ProblemSlide() {
  return (
    <Slide
      transition="slide-left"
      notes={`
        Walk left to right. The 30% is the number people remember.
        Ask the room who has waited on a truck that never came.
        Figures in this sample deck are fictional.
      `}
    >
      <div className="flex h-full flex-col">
        <FadeIn>
          <SectionTitle className="max-w-[1300px]">Good harvests rot on the road.</SectionTitle>
        </FadeIn>
        <Stagger start={0.2} delay={0.2} className="mt-auto grid h-[520px] grid-cols-3 gap-10">
          <MetricCard tone="primary" value="30%" label="of what is picked never reaches a buyer" />
          <MetricCard value="5" label="handoffs between the farm gate and the shelf" />
          <MetricCard value="48h" label="typical wait for a truck in peak season" />
        </Stagger>
      </div>
    </Slide>
  );
}
