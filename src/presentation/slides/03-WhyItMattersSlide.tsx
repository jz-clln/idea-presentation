import { AnimatedNumber, BlurIn, ImageFrame, Slide, SlideLeft, Subtitle } from "@/presentation";

export default function WhyItMattersSlide() {
  return (
    <Slide
      transition="blur"
      background="var(--p-primary)"
      tone="dark"
      notes={`
        Let the number count up before you speak.
        Then: this is income, not just food. Farmers absorb the loss.
      `}
    >
      <div className="flex h-full items-center justify-between gap-24">
        <div className="text-p-primary-fg">
          <div className="font-display text-[340px] font-medium leading-[0.9] tracking-[-0.05em]">
            <AnimatedNumber to={68} prefix="₱" suffix="B" duration={1.8} />
          </div>
          <BlurIn delay={1.2}>
            <Subtitle className="mt-10 max-w-[820px] text-p-primary-fg/75">
              of produce is lost every year, and farmers carry most of it.
            </Subtitle>
          </BlurIn>
        </div>
        <SlideLeft delay={0.3} distance={120} className="h-[860px] w-[560px] shrink-0">
          <ImageFrame src="/presentation/images/field.svg" alt="Rows of crops at dusk" radius="large" className="h-full w-full" />
        </SlideLeft>
      </div>
    </Slide>
  );
}
