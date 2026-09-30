"use client";
import { useEffect, useRef } from "react";
import { usePresentation } from "../hooks/usePresentation";

/** Hold L to show a red laser dot that follows the mouse. */
export function Pointer() {
  const { isPointerActive } = usePresentation();
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const place = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
    };
    const move = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      place();
    };
    window.addEventListener("pointermove", move, { passive: true });
    place();
    return () => window.removeEventListener("pointermove", move);
  }, [isPointerActive]);

  if (!isPointerActive) return null;
  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[14px] -mt-[14px] h-7 w-7 rounded-full"
      style={{
        background: "radial-gradient(circle, #ff3b30 0 35%, rgba(255,59,48,0.45) 60%, rgba(255,59,48,0) 72%)",
        boxShadow: "0 0 18px 4px rgba(255,59,48,0.45)",
      }}
    />
  );
}
