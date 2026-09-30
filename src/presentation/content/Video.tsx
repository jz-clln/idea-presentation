"use client";
import { useEffect, useRef } from "react";
import { useSlideRuntime } from "../runtime";
import { cn } from "../utils";

interface VideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}

/** Plays only while its slide is on screen; pauses and releases on exit. */
export function Video({
  src, poster, autoplay = true, muted = true, loop = true, controls = false, fit = "cover", className,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { mode } = useSlideRuntime();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (mode === "live" && autoplay) video.play().catch(() => undefined);
    return () => video.pause();
  }, [mode, autoplay]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      preload={mode === "live" ? "auto" : "none"}
      className={cn("h-full w-full", className)}
      style={{ objectFit: fit }}
    />
  );
}
