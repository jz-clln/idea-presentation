"use client";
import { createElement, type Attributes, type ComponentType, type ReactNode } from "react";
import { Check } from "lucide-react";
import { BodyText, FadeIn, ImageFrame, SectionTitle, Slide, SlideLeft, Stagger } from "@/presentation";
import type { SlideDefinition } from "@/presentation";
import { cn } from "@/presentation/utils";
import { OMIT_BG, omitTheme } from "../theme";

/** Put logo-omit.png and dashboard.png in public/presentation/images/ (logo-omit avoids clashing with the Rova logo.png). */
const IMG = "/presentation/images/";
const grid = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5" } as const;
type N = keyof typeof grid;
interface Base { title: string; notes: string }

/** Turns a template + data into a registry entry. */
export function slide<P extends object>(id: string, nav: string, C: ComponentType<P>, props: P): SlideDefinition {
  function Deck() {
    return createElement(C, props as Attributes & P);
  }
  return { id, title: nav, component: Deck };
}

/**
 * Shared layout: a title, then a body that takes the remaining height.
 * Every child of the body is either `shrink-0` (footer) or `min-h-0 flex-1` (main content),
 * so nothing can push into its neighbour.
 */
function Frame({ title, notes, children }: Base & { children: ReactNode }) {
  return (
    <Slide transition="slide-left" background={OMIT_BG} notes={notes}>
      <div style={omitTheme} className="flex h-full min-h-0 flex-col gap-10">
        <FadeIn className="shrink-0">
          <SectionTitle className="max-w-[1600px] !text-[72px]">{title}</SectionTitle>
        </FadeIn>
        {children}
      </div>
    </Slide>
  );
}

function Foot({ children, delay = 1.8 }: { children: ReactNode; delay?: number }) {
  return (
    <FadeIn delay={delay} className="shrink-0">
      <BodyText className="max-w-[1600px] text-p-fg">{children}</BodyText>
    </FadeIn>
  );
}

/**
 * logo-omit.png is a transparent square: the wordmark fills about 82% of the width but only 29% of the height.
 * The negative margins trim the empty space above, below and (optionally) to the left, so `size` is roughly
 * the wordmark's width / 0.82 and the layout only reserves the space the wordmark really uses.
 */
function Logo({ size, flushLeft }: { size: number; flushLeft?: boolean }) {
  const trim = (r: number) => Math.round(size * r);
  return (
    <div style={{ width: size, height: size, margin: `-${trim(0.36)}px 0 -${trim(0.34)}px ${flushLeft ? `-${trim(0.09)}px` : "0"}` }}>
      <ImageFrame src={IMG + "logo-omit.png"} fit="contain" radius="none" className="h-full w-full" />
    </div>
  );
}

function Chip({ children, small }: { children: ReactNode; small?: boolean }) {
  return (
    <span className={cn("rounded-full bg-p-surface font-display font-medium shadow-card", small ? "px-6 py-3 text-[32px]" : "px-8 py-4 text-[38px]")}>
      {children}
    </span>
  );
}

/** Slide 1: logo, tagline, one supporting line. */
export function Opening({ notes }: { notes: string }) {
  return (
    <Slide transition="fade" background={OMIT_BG} notes={notes}>
      <div style={omitTheme} className="flex h-full min-h-0 flex-col items-center justify-center gap-10 text-center">
        <FadeIn className="shrink-0"><Logo size={900} /></FadeIn>
        <FadeIn delay={0.6} className="shrink-0">
          <div className="font-display text-[68px] font-medium leading-[1.1] tracking-[-0.02em]">
            {"Share what they need."}<br />{"Omit what they don't."}
          </div>
        </FadeIn>
        <FadeIn delay={1.1} className="shrink-0">
          <div className="max-w-[1200px] text-[36px] leading-[1.3] text-p-muted">
            A privacy layer that removes unnecessary personal information before a document is shared.
          </div>
        </FadeIn>
      </div>
    </Slide>
  );
}

/** Slide 2: a lead sentence, a short two-column list, a closing line. */
export function Points({ title, notes, lead, items, foot }: Base & { lead: string; items: string[]; foot: string }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-10">
        <FadeIn delay={0.3}><div className="max-w-[1500px] font-display text-[48px] leading-[1.15] text-p-primary">{lead}</div></FadeIn>
        <Stagger start={0.6} delay={0.12} preset="fade" itemClassName="" className="grid grid-cols-2 gap-x-16 gap-y-4 text-[38px]">
          {items.map((i) => (
            <div key={i} className="flex items-start gap-4 leading-[1.25]">
              <span className="mt-[0.55em] h-3 w-3 shrink-0 rounded-full bg-p-accent" />
              {i}
            </div>
          ))}
        </Stagger>
      </div>
      <Foot>{foot}</Foot>
    </Frame>
  );
}

/** Slide 3: what the recipient needs vs. what they get today. Extras (after `extraFrom`) are flagged red. */
export function Compare({ title, notes, needTitle, need, gotTitle, got, extraFrom, foot }: Base & {
  needTitle: string; need: string[]; gotTitle: string; got: string[]; extraFrom: number; foot: string;
}) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center">
        <Stagger start={0.4} delay={0.3} className="grid w-full grid-cols-2 items-stretch gap-8">
          <div className="flex h-full flex-col gap-5 rounded-card bg-p-primary p-8 text-p-primary-fg shadow-card">
            <div className="font-display text-[42px] font-medium leading-[1.05]">{needTitle}</div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[32px] leading-[1.2]">
              {need.map((i) => (
                <li key={i} className="flex items-center gap-4"><Check className="h-8 w-8 shrink-0" strokeWidth={2.4} />{i}</li>
              ))}
            </ul>
          </div>
          <div className="flex h-full flex-col gap-5 rounded-card bg-p-surface p-8 shadow-card">
            <div className="font-display text-[42px] font-medium leading-[1.05]">{gotTitle}</div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[32px] leading-[1.2]">
              {got.map((i, idx) => (
                <li key={i} className={cn("flex items-center gap-4", idx >= extraFrom && "text-red-600")}>
                  <span className={cn("h-3 w-3 shrink-0 rounded-full", idx >= extraFrom ? "bg-red-600" : "bg-p-muted")} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Stagger>
      </div>
      <FadeIn delay={1.6} className="shrink-0">
        <div className="font-display text-[64px] font-medium leading-[1.05] tracking-[-0.02em] text-p-primary">{foot}</div>
      </FadeIn>
    </Frame>
  );
}

/** Slide 4: a real sequence, one row of 3 to 5 steps. */
export function Flow({ title, notes, steps, n = 4, foot }: Base & { steps: string[]; n?: N; foot?: string }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center">
        <Stagger start={0.4} delay={0.4} preset="slide-right" distance={40} itemClassName="" className={cn("grid w-full gap-x-10", grid[n])}>
          {steps.map((t, i) => (
            <div key={t}>
              <div className="font-display text-[72px] font-medium leading-none text-p-primary">{i + 1}</div>
              <div className={cn("mt-4 font-semibold leading-[1.15]", n >= 5 ? "text-[34px]" : "text-[40px]")}>{t}</div>
            </div>
          ))}
        </Stagger>
      </div>
      {foot && <Foot>{foot}</Foot>}
    </Frame>
  );
}

/** Slide 5: the dashboard is the slide. Three short callouts beside it. */
export function Product({ title, notes, callouts }: Base & { callouts: Array<{ t: string; d: string }> }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center gap-12">
        <SlideLeft delay={0.3} className="h-full shrink-0">
          <ImageFrame src={IMG + "dashboard.png"} fit="contain" radius="large" shadow className="aspect-[4/3] h-full" />
        </SlideLeft>
        <Stagger start={0.9} delay={0.35} preset="fade" itemClassName="" className="flex min-w-0 flex-1 flex-col gap-8">
          {callouts.map((c) => (
            <div key={c.t} className="border-l-4 border-p-primary pl-6">
              <div className="font-display text-[38px] font-medium leading-[1.1]">{c.t}</div>
              <div className="mt-2 text-[30px] leading-[1.25] text-p-muted">{c.d}</div>
            </div>
          ))}
        </Stagger>
      </div>
    </Frame>
  );
}

export interface Card { t: string; tag?: string; d?: string; hl?: boolean }

/** One row of 2 to 4 cards. Cards size to their content, so text can never spill out of a box. */
export function Cards({ title, notes, cards, n = 3, foot }: Base & { cards: Card[]; n?: 2 | 3 | 4; foot?: string }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center">
        <Stagger start={0.4} delay={0.15} className={cn("grid w-full items-stretch gap-6", grid[n])}>
          {cards.map((c) => (
            <div
              key={c.t}
              className={cn("flex h-full flex-col gap-4 rounded-card p-8 shadow-card", c.hl ? "bg-p-primary text-p-primary-fg" : "bg-p-surface")}
            >
              <div className="font-display text-[44px] font-medium leading-[1.05]">{c.t}</div>
              {c.tag && <div className={cn("text-[30px] font-semibold leading-[1.2]", !c.hl && "text-p-primary")}>{c.tag}</div>}
              {c.d && <div className="text-[32px] leading-[1.3] opacity-80">{c.d}</div>}
            </div>
          ))}
        </Stagger>
      </div>
      {foot && <Foot>{foot}</Foot>}
    </Frame>
  );
}

/** Slide 7: a cloud of short labels that wraps instead of overflowing. */
export function Chips({ title, notes, items, foot }: Base & { items: string[]; foot: string }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center">
        <Stagger start={0.4} delay={0.1} preset="fade" itemClassName="" className="flex flex-wrap gap-5">
          {items.map((i) => <Chip key={i}>{i}</Chip>)}
        </Stagger>
      </div>
      <Foot>{foot}</Foot>
    </Frame>
  );
}

/** Slide 10: logo, the "before and after" contrast, where Omit could sit, the tagline again. */
export function Vision({ notes, lines, chips, final }: { notes: string; lines: [string, string]; chips: string[]; final: string }) {
  return (
    <Slide transition="fade" background={OMIT_BG} notes={notes}>
      <div style={omitTheme} className="flex h-full min-h-0 flex-col justify-between">
        <FadeIn className="shrink-0"><Logo size={420} flushLeft /></FadeIn>
        <FadeIn delay={0.4} className="shrink-0">
          <div className="text-[52px] leading-[1.15] text-p-muted">{lines[0]}</div>
          <div className="mt-2 font-display text-[60px] font-medium leading-[1.1] text-p-fg">{lines[1]}</div>
        </FadeIn>
        <Stagger start={1.2} delay={0.15} preset="fade" itemClassName="" className="flex shrink-0 flex-wrap gap-4">
          {chips.map((c) => <Chip key={c} small>{c}</Chip>)}
        </Stagger>
        <FadeIn delay={2.4} className="shrink-0">
          <div className="font-display text-[72px] font-medium leading-[1.05] tracking-[-0.02em] text-p-primary">{final}</div>
        </FadeIn>
      </div>
    </Slide>
  );
}