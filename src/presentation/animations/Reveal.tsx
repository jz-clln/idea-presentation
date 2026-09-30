"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function Reveal(props: EntranceOptions) {
  return <Entrance preset="reveal" {...props} />;
}
