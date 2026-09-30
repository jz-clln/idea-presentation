"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function SlideRight(props: EntranceOptions) {
  return <Entrance preset="slide-right" {...props} />;
}
