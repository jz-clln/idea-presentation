"use client";
import { motion } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../../runtime";
import { presentationTheme } from "../../theme";

interface AnimatedRouteProps {
  from: [number, number];
  to: [number, number];
  delay?: number;
  /** Seconds to draw the line. */
  duration?: number;
  /** Vertical bend of the curve in svg units. */
  curve?: number;
  /** Move a small truck along the route once it is drawn. */
  truck?: boolean;
  truckDuration?: number;
  color?: string;
}

/** Draws itself from `from` to `to`, optionally followed by a truck. Use inside an <svg>. */
export function AnimatedRoute({
  from, to, delay = 0, duration = 1.2, curve = 0, truck = false, truckDuration = 3, color = "var(--p-primary)",
}: AnimatedRouteProps) {
  const isStatic = useIsStatic();
  const d0 = useEntranceDelay(delay);
  const [fx, fy] = from;
  const [tx, ty] = to;
  const mx = (fx + tx) / 2;
  const d = `M${fx} ${fy} C ${mx} ${fy + curve}, ${mx} ${ty - curve}, ${tx} ${ty}`;
  const glyph = (
    <g transform="scale(1.5) translate(-30 -30)">
      <rect width="42" height="28" rx="4" fill={color} />
      <path d="M44 8h14l8 10v10H44z" fill={color} />
      <circle cx="12" cy="30" r="6" fill="#151515" />
      <circle cx="54" cy="30" r="6" fill="#151515" />
    </g>
  );
  const start = d0 + duration;
  return (
    <g>
      <motion.path
        d={d} stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"
        initial={isStatic ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration, delay: d0, ease: presentationTheme.motion.ease }}
      />
      <motion.circle
        cx={tx} cy={ty} r="10" fill={color}
        initial={isStatic ? false : { opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: start - 0.2, duration: 0.3 }}
      />
      {truck && isStatic && <g transform={`translate(${tx} ${ty})`}>{glyph}</g>}
      {truck && !isStatic && (
        <g opacity="0">
          <set attributeName="opacity" to="1" begin={`${start}s`} fill="freeze" />
          <animateMotion path={d} begin={`${start}s`} dur={`${truckDuration}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
          {glyph}
        </g>
      )}
    </g>
  );
}
