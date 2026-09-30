import { AnimatedTitle, FadeIn, Slide, Subtitle } from "@/presentation";

export default function Title() {
  return (
    <Slide transition="fade" notes={`Replace with your opening line.`}>
      <div className="flex h-full flex-col justify-center gap-12">
        <AnimatedTitle>Your title</AnimatedTitle>
        <FadeIn delay={0.6}>
          <Subtitle>One line about what this deck is for.</Subtitle>
        </FadeIn>
      </div>
    </Slide>
  );
}
