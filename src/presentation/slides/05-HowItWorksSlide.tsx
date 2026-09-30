"use client";
import { motion } from "framer-motion";
import { FadeIn, SectionTitle, Slide, Stagger, useIsStatic } from "@/presentation";
import { useEntranceDelay } from "@/presentation/runtime";

const steps = [
  { n: "01", title: "Post a request", text: "The farmer lists the harvest, weight, and pickup window." },
  { n: "02", title: "Get matched", text: "ROVA pairs it with a buyer and the nearest available truck." },
  { n: "03", title: "Deliver", text: "Track the move, confirm drop-off, and get paid the same day." },
];

export default function HowItWorksSlide() {
  const isStatic = useIsStatic();
  const delay = useEntranceDelay(0.5);
  return (
    <Slide
      transition="slide-left"
      notes={`
        This is a real sequence, so the numbers earn their place.
        Step 3 is the one farmers care about: same-day payment.
      `}
    >
      <div className="flex h-full flex-col">
        <FadeIn>
          <SectionTitle>Harvest to delivery in three steps.</SectionTitle>
        </FadeIn>

        <div className="relative mt-auto">
          <motion.div
            className="absolute left-0 right-0 top-[72px] h-[2px] origin-left bg-p-primary/25"
            initial={isStatic ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
          />
          <Stagger start={0.5} delay={0.5} preset="slide-up" className="relative grid grid-cols-3 gap-16">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="inline-block bg-p-bg pr-8 font-display text-[144px] font-medium leading-none tracking-[-0.04em] text-p-primary">
                  {s.n}
                </div>
                <div className="mt-10 font-display text-[60px] font-medium tracking-[-0.02em]">{s.title}</div>
                <div className="mt-4 max-w-[480px] text-body leading-[1.35] text-p-muted">{s.text}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Slide>
  );
}
