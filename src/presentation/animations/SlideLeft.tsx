"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function SlideLeft(props: EntranceOptions) {
  return <Entrance preset="slide-left" {...props} />;
}
