"use client";
import { Check } from "lucide-react";
import { FadeIn } from "../../animations";

/** A phone screen, cropped by the bottom edge of the slide on purpose. */
export function PhoneMock() {
  return (
    <div className="h-[1120px] w-[560px] rounded-[84px] bg-p-primary p-[18px] shadow-lift">
      <div className="flex h-full flex-col gap-7 rounded-[68px] bg-p-bg px-11 pt-20 font-body text-p-fg">
        <div className="font-display text-[56px] font-medium tracking-[-0.02em]">New request</div>

        <div className="rounded-[28px] bg-p-surface p-9 shadow-card">
          <div className="text-caption text-p-muted">Harvest</div>
          <div className="mt-1 text-[40px] font-medium">Tomatoes, 2.4 t</div>
          <div className="mt-6 h-px bg-p-border" />
          <div className="mt-6 text-caption text-p-muted">Route</div>
          <div className="mt-1 text-[32px]">Tagaytay to Divisoria</div>
          <div className="mt-6 text-caption text-p-muted">Pickup</div>
          <div className="mt-1 text-[32px]">Tomorrow, 5:00 AM</div>
        </div>

        <FadeIn delay={1.1} className="rounded-[28px] bg-p-accent p-9 text-p-primary">
          <div className="flex items-center gap-3 text-caption font-medium">
            <Check size={26} strokeWidth={2.5} /> Matched
          </div>
          <div className="mt-3 text-[38px] font-medium">Reyes Trucking</div>
          <div className="mt-1 text-[28px] opacity-80">Arrives in 2 h 10 min</div>
        </FadeIn>

        <FadeIn delay={1.5}>
          <div className="rounded-full bg-p-primary py-7 text-center text-[32px] font-medium text-p-primary-fg">
            Confirm pickup
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
