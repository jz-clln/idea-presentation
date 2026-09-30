"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function SlideUp(props: EntranceOptions) {
  return <Entrance preset="slide-up" {...props} />;
}
