import { BodyText, FadeIn, SectionTitle, Slide } from "@/presentation";
import { Orbit } from "./parts/Orbit";

export default function SolutionSlide() {
  return (
    <Slide
      transition="zoom"
      notes={`
        One request in, one match out. ROVA sits between all three parties.
        Keep it to the idea: we replace five handoffs with one.
      `}
    >
      <div className="flex h-full items-center justify-between">
        <div className="max-w-[720px]">
          <FadeIn>
            <SectionTitle>One network. Every move.</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.3}>
            <BodyText className="mt-12">
              A farmer posts a harvest. ROVA finds the buyer and the truck in the same step.
            </BodyText>
          </FadeIn>
        </div>
        <Orbit />
      </div>
    </Slide>
  );
}
