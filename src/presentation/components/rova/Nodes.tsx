"use client";
import { Sprout, Store } from "lucide-react";
import { cn } from "../../utils";
import { TruckArt } from "./Scenery";

export function LoadBadge({ amount, tone = "accent", className }: { amount: string; tone?: "accent" | "primary"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-6 py-3 font-display text-[40px] font-medium leading-none tabular-nums",
        tone === "accent" ? "bg-p-accent text-p-primary" : "bg-p-primary text-p-primary-fg",
        className,
      )}
    >
      {amount}
    </span>
  );
}

export function FarmNode({ name, load, className }: { name: string; load: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-6 rounded-card bg-p-surface px-9 py-7 shadow-card", className)}>
      <div className="flex items-center gap-5">
        <Sprout className="h-12 w-12 shrink-0 text-p-primary" strokeWidth={1.6} />
        <span className="font-display text-[46px] font-medium leading-none">{name}</span>
      </div>
      <LoadBadge amount={load} />
    </div>
  );
}

export function BuyerNode({ title = "Buyer", sub, className }: { title?: string; sub?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-6 rounded-card bg-p-primary px-9 py-8 text-p-primary-fg shadow-lift", className)}>
      <Store className="h-14 w-14 shrink-0" strokeWidth={1.5} />
      <div>
        <div className="font-display text-[50px] font-medium leading-none">{title}</div>
        {sub && <div className="mt-2 text-caption opacity-75">{sub}</div>}
      </div>
    </div>
  );
}

export function TruckNode({ load, label, fill = 1, delay = 0, className }: { load?: string; label?: string; fill?: number; delay?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <TruckArt className="w-full" fill={fill} delay={delay} />
      <div className="flex items-center gap-5">
        {load && <LoadBadge amount={load} tone="primary" />}
        {label && <span className="text-subtitle text-p-muted">{label}</span>}
      </div>
    </div>
  );
}
