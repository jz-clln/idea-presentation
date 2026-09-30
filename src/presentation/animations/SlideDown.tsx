"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function SlideDown(props: EntranceOptions) {
  return <Entrance preset="slide-down" {...props} />;
}
