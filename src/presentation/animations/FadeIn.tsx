"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function FadeIn(props: EntranceOptions) {
  return <Entrance preset="fade" {...props} />;
}
