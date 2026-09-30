import { FadeIn, Reveal, SectionTitle, Slide, Stagger } from "@/presentation";

const milestones = [
  { when: "Q4 2026", title: "Batangas pilot", text: "200 farms and 40 trucks on the network." },
  { when: "2027", title: "Luzon", text: "Every major wet market in reach." },
  { when: "2028", title: "Visayas", text: "Launch buyer financing." },
  { when: "2029", title: "Nationwide", text: "10,000 farms moving produce weekly." },
];

export default function RoadmapSlide() {
  return (
    <Slide
      transition="reveal"
      notes={`
        Only the next 12 months matter. The rest shows direction.
        Ask for pilot partners in Batangas.
      `}
    >
      <div className="flex h-full flex-col">
        <FadeIn>
          <SectionTitle>Start in Batangas. End nationwide.</SectionTitle>
        </FadeIn>
        <div className="relative mt-auto">
          <Reveal delay={0.4} duration={1.6} className="absolute left-0 right-0 top-[143px]">
            <div className="h-[2px] bg-p-primary/30" />
          </Reveal>
          <Stagger start={0.5} delay={0.35} className="grid grid-cols-4 gap-12" itemClassName="">
            {milestones.map((m, i) => (
              <div key={m.when}>
                <div className="h-[110px] font-display text-[76px] font-medium leading-none tracking-[-0.03em]">{m.when}</div>
                <div className={`mt-[10px] h-9 w-9 rounded-full ${i === 0 ? "bg-p-primary" : "bg-p-bg ring-[3px] ring-p-primary"}`} />
                <div className="mt-10 text-[44px] font-medium">{m.title}</div>
                <div className="mt-3 max-w-[340px] text-caption leading-[1.4] text-p-muted">{m.text}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Slide>
  );
}
