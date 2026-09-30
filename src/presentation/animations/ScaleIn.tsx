"use client";
import { Entrance, type EntranceOptions } from "./Entrance";

export function ScaleIn(props: EntranceOptions) {
  return <Entrance preset="scale" {...props} />;
}
