# Slidecraft

Code-first presentations that run in the browser. Write slides as React components; the engine handles navigation, transitions, fullscreen, presenter view, scaling, and notes. Think "Remotion for slides".

Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 · Framer Motion · Lucide.

## 1. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000/presentation. Other scripts: `npm run build`, `npm run typecheck`, `npm run lint`.

## 2. Create a slide

Add a file in `src/presentation/slides/`:

```tsx
import { Slide, FadeIn, SectionTitle, Stagger, MetricCard } from "@/presentation";

export default function GrowthSlide() {
  return (
    <Slide transition="fade" notes="Say the growth number slowly.">
      <FadeIn>
        <SectionTitle>Growth is compounding.</SectionTitle>
      </FadeIn>
      <Stagger className="mt-20 grid grid-cols-3 gap-10">
        <MetricCard value="3x" label="Requests per week" />
        <MetricCard value="40" label="Active trucks" />
        <MetricCard value="92%" label="On-time pickups" />
      </Stagger>
    </Slide>
  );
}
```

Slides are 1920×1080 logical pixels. Write sizes in plain px; the engine scales everything.
`<Slide>` adds safe-area padding (`SAFE_X` / `SAFE_Y` in `constants.ts`). Use `padded={false}` for full-bleed layouts.

## 3. Register it

`src/presentation/slides/index.ts` is the only registry. Order in the array is order on screen.

```ts
{ id: "growth", title: "Growth", component: GrowthSlide },
```

## 4. Animations

Every animation component accepts `delay`, `duration`, `distance`, `className`.

`FadeIn` `SlideUp` `SlideDown` `SlideLeft` `SlideRight` `ScaleIn` `BlurIn` `Reveal` `Stagger` `Sequence`
plus `AnimatedTitle` (words rise from a mask) and `AnimatedNumber` (count-up).

- `SlideLeft` travels leftwards (enters from the right); `SlideRight` is the mirror.
- `delay` is measured from the moment the slide has mostly finished transitioning in, so `delay={0}` never fights the transition.
- **Replay:** a slide unmounts when you leave it, so returning to it plays everything again.
- `Stagger` reveals children one by one. `delay` is the gap between children, `start` is the wait before the first. Put layout classes on `className`.
- `Sequence at={0.6}` shifts every animation inside it by 0.6 s and renders no DOM, so it never affects layout.
- `Reveal` is a clip-path wipe. Avoid it on elements with outer shadows.
- With `prefers-reduced-motion`, everything becomes a short fade.
- Thumbnails and the next-slide preview render the final state with no animation.

## 5. Transitions

Set per slide, or globally in `presentation.config.ts` (`defaultTransition`, `transitionDuration`).

```tsx
<Slide transition="zoom" />
<Slide transition={{ type: "slide", direction: "up", duration: 0.7 }} />
```

Names: `fade` `slide-left` `slide-right` `slide-up` `zoom` `blur` `scale` `reveal`. The registry lives in `transitions.ts` and is fully typed. Going backwards reverses the direction.

## 6. Speaker notes

```tsx
<Slide notes={`
  Explain the current workflow.
  Do not spend more than 45 seconds here.
`}>
```

Indentation is stripped. Notes appear in presenter mode (P) only.

## 7. Keyboard shortcuts

| Key | Action |
| --- | --- |
| → · Space · Enter · PageDown | Next slide |
| ← · Backspace · PageUp · Shift+Space | Previous slide |
| Home / End | First / last slide |
| F | Toggle fullscreen |
| P | Toggle presenter mode |
| G | Slide overview (click a slide to jump; G, Esc or Enter closes) |
| Esc | Close overview, then exit presenter mode |
| D | Dev overlay: safe margins, canvas size, slide id (development only) |
| Hold L | Red laser pointer follows the mouse |

Also: click the left/right edges, swipe on touch screens, and use `?slide=4` in the URL. Refreshing keeps your place. Shortcuts are ignored while typing in inputs.

## 8. Theme

Edit `src/presentation/theme.ts`: colors, fonts, type scale, spacing, radius, shadows, animation timing. Everything downstream reads these as CSS variables, so one edit restyles the whole deck. Behavior toggles (progress bar, slide numbers, default transition, URL history) live in `presentation.config.ts`.

Fonts are bundled through `@fontsource-variable` (no network requests at build time). To change them, install another `@fontsource-variable/*` package, import it in `src/app/layout.tsx`, and update `typography` in the theme.

## 9. Images and video

Put files in `public/presentation/images` and `public/presentation/videos`.

```tsx
<ImageFrame src="/presentation/images/product.png" fit="cover" radius="large" className="h-[700px] w-[560px]" />
<Video src="/presentation/videos/demo.mp4" autoplay muted loop className="h-[600px] w-full" />
<Slide backgroundImage="/presentation/images/farm.jpg" overlay={0.35} tone="dark" />
```

Video plays only while its slide is visible and pauses when you leave. Browsers only allow autoplay for muted video.
Backgrounds: `background` (any CSS color or gradient), `backgroundImage`, `backgroundVideo`, `overlay` (0–1), `grain`.
Set `tone="dark"` on dark slides so the progress bar and slide number stay readable.

## 10. Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel choose **Add New → Project** and import the repo. The Next.js preset needs no changes.
3. Deploy. Your deck is at `https://<project>.vercel.app/presentation`.

Or from the terminal: `npx vercel`. Nothing depends on local-only APIs.

## Project layout

```
src/
├── app/presentation/page.tsx      Route that mounts <Presentation />
└── presentation/
    ├── Presentation.tsx           Shell: stage, chrome, presenter, overview
    ├── PresentationProvider.tsx   Central state (slide, fullscreen, modes, timer, URL)
    ├── presentation.config.ts     Behavior options
    ├── theme.ts                   Design tokens
    ├── transitions.ts             Typed slide transitions
    ├── constants.ts               Canvas size and safe margins
    ├── slides/                    Your slides + index.ts registry
    ├── components/                Slide, ScaledStage, ProgressBar, PresenterView, SlideNavigator...
    ├── content/                   Title, MetricCard, ImageFrame, Video, AnimatedNumber...
    ├── animations/                FadeIn, SlideUp, Stagger, Sequence...
    └── hooks/                     usePresentation, useKeyboardNavigation, useSwipe
```

`usePresentation()` exposes `currentSlide, previousSlide, nextSlide, totalSlides, next, previous, goTo, isFullscreen, isPresenterMode, enterFullscreen, ...` for custom components.

## Notes

- The sample ROVA deck uses fictional numbers. Replace the contents of `slides/` and the registry to make it yours.
- A slide that throws shows its error (stack in dev, a plain message in production) instead of crashing the deck.
