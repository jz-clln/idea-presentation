"use client";
import { createElement, type Attributes, type ComponentType, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  AnimatedNumber, AnimatedTitle, BodyText, FadeIn, ImageFrame, SectionTitle, Slide, SlideLeft, SlideUp, Stagger, Subtitle,
} from "@/presentation";
import type { SlideDefinition } from "@/presentation";
import { FarmNode, LoadBadge } from "@/presentation/components/rova";
import { cn } from "@/presentation/utils";

const IMG = "/presentation/images/";
const grid = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;
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
 * Every direct child of the body is either `shrink-0` (chain, footer) or
 * `min-h-0 flex-1` (main content), so nothing can push into its neighbour.
 */
function Frame({ title, notes, children }: Base & { children: ReactNode }) {
  return (
    <Slide notes={notes}>
      <div className="flex h-full min-h-0 flex-col gap-10">
        <FadeIn className="shrink-0">
          <SectionTitle className="max-w-[1500px] !text-[72px]">{title}</SectionTitle>
        </FadeIn>
        {children}
      </div>
    </Slide>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <Stagger start={0.5} delay={0.12} preset="fade" itemClassName="" className="flex flex-col gap-4 text-[36px]">
      {items.map((i) => (
        <div key={i} className="flex items-start gap-4 leading-[1.25]">
          <span className="mt-[0.55em] h-3 w-3 shrink-0 rounded-full bg-p-accent" />
          {i}
        </div>
      ))}
    </Stagger>
  );
}

function Chain({ steps }: { steps: string[] }) {
  return (
    <Stagger start={0.8} delay={0.25} preset="fade" itemClassName="" className="flex shrink-0 flex-wrap items-center gap-4">
      {steps.flatMap((s, i) => [
        <span
          key={s}
          className={cn(
            "rounded-full px-8 py-4 font-display text-[34px] font-medium",
            i === steps.length - 1 ? "bg-p-primary text-p-primary-fg" : "bg-p-surface shadow-card",
          )}
        >
          {s}
        </span>,
        ...(i < steps.length - 1 ? [<ArrowRight key={`a${i}`} className="h-9 w-9 shrink-0 text-p-primary" strokeWidth={1.6} />] : []),
      ])}
    </Stagger>
  );
}

function Foot({ children, delay = 1.8 }: { children: ReactNode; delay?: number }) {
  return (
    <FadeIn delay={delay} className="shrink-0">
      <BodyText className="max-w-[1500px] text-p-fg">{children}</BodyText>
    </FadeIn>
  );
}

/** Opening slide: name, one-line promise, journey image. */
export function Hero({ notes }: { notes: string }) {
  return (
    <Slide notes={notes}>
      <div className="flex h-full min-h-0 flex-col justify-between">
        <div className="shrink-0">
          <div className="flex items-center gap-8">
            <FadeIn><ImageFrame src={IMG + "logo.png"} fit="contain" radius="none" className="h-[132px] w-[132px]" /></FadeIn>
            <AnimatedTitle size="title" delay={0.2}>ROVA</AnimatedTitle>
          </div>
          <FadeIn delay={0.9}>
            <Subtitle className="mt-6 max-w-[1400px] text-p-fg">Shared freight for agricultural supply</Subtitle>
          </FadeIn>
          <FadeIn delay={1.3}>
            <div className="mt-4 font-display text-[40px] text-p-primary">Move fresh goods better together.</div>
          </FadeIn>
        </div>
        <SlideUp delay={0.6} distance={80} className="h-[400px] shrink-0">
          <ImageFrame src={IMG + "journey.png"} radius="large" position="center 42%" shadow className="h-full w-full" />
        </SlideUp>
      </div>
    </Slide>
  );
}

/** Title + short list (max 4) on the left, optional image on the right, optional chain and footer below. */
export function Bullets({ title, notes, lead, items = [], chain, sub, image }: Base & {
  lead?: string; items?: string[]; chain?: string[]; sub?: string; image?: string;
}) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {lead && <FadeIn delay={0.3}><div className="font-display text-[48px] leading-[1.1] text-p-primary">{lead}</div></FadeIn>}
          {items.length > 0 && <List items={items} />}
        </div>
        {image && (
          <SlideLeft delay={0.4} className="h-full w-[520px] shrink-0">
            <ImageFrame src={IMG + image} radius="large" className="h-full w-full" />
          </SlideLeft>
        )}
      </div>
      {chain && <Chain steps={chain} />}
      {sub && <Foot>{sub}</Foot>}
    </Frame>
  );
}

/** The "3 farms, 1 buyer" picture. Farms sit side by side unless a list is shown next to them. */
export function Tally({ title, notes, need, farms, chain, foot, items }: Base & {
  need: string; farms: Array<[string, string]>; chain?: string[]; foot?: string; items?: string[];
}) {
  const cols = items ? "grid-cols-1" : farms.length > 3 ? grid[2] : farms.length === 2 ? grid[2] : grid[3];
  return (
    <Frame title={title} notes={notes}>
      <FadeIn delay={0.2} className="flex shrink-0 items-center gap-6 text-subtitle text-p-muted">
        Buyer needs <LoadBadge amount={need} tone="primary" />
      </FadeIn>
      <div className="flex min-h-0 flex-1 items-start gap-16">
        <Stagger start={0.6} delay={0.35} preset="slide-right" itemClassName="" className={cn("grid min-w-0 flex-1 gap-6", cols)}>
          {farms.map(([n, l]) => <FarmNode key={n} name={n} load={l} />)}
        </Stagger>
        {items && <div className="w-[600px] shrink-0"><List items={items} /></div>}
      </div>
      {chain && <Chain steps={chain} />}
      {foot && <Foot>{foot}</Foot>}
    </Frame>
  );
}

export interface Card { t: string; d?: string; hl?: boolean }

/** One row of 2 to 4 cards. Cards size to their content, so text can never spill out of a box. */
export function Cards({ title, notes, cards, n = 3, foot }: Base & { cards: Card[]; n?: N; foot?: string }) {
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
              {c.d && <div className="text-[32px] leading-[1.3] opacity-80">{c.d}</div>}
            </div>
          ))}
        </Stagger>
      </div>
      {foot && <Foot>{foot}</Foot>}
    </Frame>
  );
}

/** Numbered steps in a single row (3 or 4). Only use for real sequences. */
export function Flow({ title, notes, steps, n = 4, foot }: Base & { steps: Array<[string, string?]>; n?: N; foot?: string }) {
  return (
    <Frame title={title} notes={notes}>
      <div className="flex min-h-0 flex-1 items-center">
        <Stagger start={0.4} delay={0.4} preset="slide-right" distance={40} itemClassName="" className={cn("grid w-full gap-x-12", grid[n])}>
          {steps.map(([t, d], i) => (
            <div key={t}>
              <div className="font-display text-[72px] font-medium leading-none text-p-primary">{i + 1}</div>
              <div className="mt-4 text-[40px] font-semibold leading-[1.15]">{t}</div>
              {d && <div className="mt-3 text-[30px] leading-[1.3] text-p-muted">{d}</div>}
            </div>
          ))}
        </Stagger>
      </div>
      {foot && <Foot>{foot}</Foot>}
    </Frame>
  );
}

/** Closing slide: the whole story in one equation. */
export function Closing({ notes }: { notes: string }) {
  return (
    <Slide background="var(--p-primary)" tone="dark" notes={notes}>
      <div className="flex h-full min-h-0 flex-col justify-between text-p-primary-fg">
        <FadeIn className="flex shrink-0 items-center gap-8">
          <ImageFrame src={IMG + "logo.png"} fit="contain" radius="medium" className="h-[128px] w-[128px] shrink-0 bg-white" />
          <div className="font-display text-[56px] font-medium leading-tight">Move fresh goods<br />better together.</div>
        </FadeIn>
        <div className="shrink-0">
          <FadeIn delay={0.6} className="font-display text-[112px] font-medium leading-none tracking-[-0.03em]">
            300 + 250 + 450 = <AnimatedNumber to={1000} suffix=" kg" delay={1.2} />
          </FadeIn>
          <FadeIn delay={2}><Subtitle className="mt-6 text-p-accent">One order. One truck. One delivery.</Subtitle></FadeIn>
        </div>
        <FadeIn delay={3} className="max-w-[1400px] shrink-0 font-display text-[48px] leading-[1.15]">
          Rova does not add trucks or farms. It helps the ones that already exist work together.
        </FadeIn>
      </div>
    </Slide>
  );
}