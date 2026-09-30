"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function BlurIn(props: EntranceOptions) {
  return <Entrance preset="blur" {...props} />;
}
