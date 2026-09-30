import { BodyText, FadeIn, SectionTitle, Slide } from "@/presentation";

export default function Content() {
  return (
    <Slide transition="slide-left" notes={`Replace with what to say.`}>
      <div className="flex h-full flex-col justify-center gap-12">
        <FadeIn><SectionTitle>One idea per slide.</SectionTitle></FadeIn>
        <FadeIn delay={0.3}><BodyText>Duplicate this file, edit it, and register it in slides/index.ts.</BodyText></FadeIn>
      </div>
    </Slide>
  );
}
