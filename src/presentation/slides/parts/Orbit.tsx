"use client";
import type { ReactNode } from "react";
import { Truck, ShoppingBasket, Sprout } from "lucide-react";
import { FadeIn, ScaleIn } from "../../animations";
import { FeatureCard } from "../../content/FeatureCard";
import { Logo } from "../../content/Logo";

const SIZE = 860;
const RADIUS = 330;

const satellites: Array<{ angle: number; title: string; icon: ReactNode }> = [
  { angle: -90, title: "Farmers", icon: <Sprout strokeWidth={1.6} /> },
  { angle: 30, title: "Buyers", icon: <ShoppingBasket strokeWidth={1.6} /> },
  { angle: 150, title: "Transporters", icon: <Truck strokeWidth={1.6} /> },
];

/** One core, three parties. Rings fade in first, then the core, then each party. */
export function Orbit() {
  const c = SIZE / 2;
  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <FadeIn duration={1.2} className="absolute inset-0">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" fill="none" aria-hidden>
          <circle cx={c} cy={c} r={RADIUS} stroke="var(--p-border)" strokeWidth="2" />
          <circle cx={c} cy={c} r={RADIUS - 150} stroke="var(--p-border)" strokeWidth="2" />
        </svg>
      </FadeIn>
      <ScaleIn delay={0.2} className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[150px]">
        <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full bg-p-primary text-p-primary-fg shadow-lift">
          <Logo name="ROVA" size={56} />
        </div>
      </ScaleIn>
      {satellites.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        return (
          <ScaleIn
            key={s.title}
            delay={0.6 + i * 0.25}
            className="absolute"
            style={{ left: c + RADIUS * Math.cos(rad), top: c + RADIUS * Math.sin(rad), translate: "-50% -50%" }}
          >
            <FeatureCard icon={s.icon} title={s.title} className="whitespace-nowrap" />
          </ScaleIn>
        );
      })}
    </div>
  );
}
