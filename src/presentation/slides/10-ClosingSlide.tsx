import { AnimatedTitle, FadeIn, Logo, ScaleIn, Slide } from "@/presentation";

export default function ClosingSlide() {
  return (
    <Slide
      transition="fade"
      background="var(--p-primary)"
      tone="dark"
      grain={0.05}
      notes={`
        Say the closing line, then stop talking.
        Leave the QR code up for questions. Replace it with your real link.
      `}
    >
      <div className="flex h-full flex-col justify-between text-p-primary-fg">
        <FadeIn>
          <Logo name="ROVA" size={52} />
        </FadeIn>

        <div className="flex items-end justify-between gap-20">
          <div>
            <AnimatedTitle size="title" delay={0.1} className="max-w-[1150px] text-p-primary-fg">
              Every harvest deserves a road to market.
            </AnimatedTitle>
            <FadeIn delay={1.1}>
              <div className="mt-14 text-subtitle text-p-accent">Join the pilot at rova.example</div>
            </FadeIn>
          </div>
          <ScaleIn delay={1.3} className="shrink-0">
            <div className="flex h-[280px] w-[280px] items-center justify-center rounded-[24px] border-2 border-dashed border-p-primary-fg/40 text-caption text-p-primary-fg/60">
              QR code
            </div>
          </ScaleIn>
        </div>
      </div>
    </Slide>
  );
}
