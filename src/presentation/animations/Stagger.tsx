"use client";
import { Children, type ReactNode } from "react";
import { Entrance, type EntrancePreset } from "./Entrance";
import { presentationTheme } from "../theme";

interface StaggerProps {
  children: ReactNode;
  /** Seconds between each child. */
  delay?: number;
  /** Seconds before the first child. */
  start?: number;
  preset?: EntrancePreset;
  duration?: number;
  distance?: number;
  /** Layout classes for the container, e.g. "grid grid-cols-3 gap-10". */
  className?: string;
  /** Classes for each child wrapper. Defaults to "h-full" so grid items stretch. */
  itemClassName?: string;
}

/** Reveals its children one after another. Put your grid/flex layout on `className`. */
export function Stagger({
  children, delay = presentationTheme.motion.stagger, start = 0, preset = "slide-up",
  duration, distance, className, itemClassName = "h-full",
}: StaggerProps) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Entrance
          key={i}
          preset={preset}
          delay={start + i * delay}
          duration={duration}
          distance={distance}
          className={itemClassName}
        >
          {child}
        </Entrance>
      ))}
    </div>
  );
}
