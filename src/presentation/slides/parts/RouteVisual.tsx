"use client";
import { motion } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../../runtime";
import { presentationTheme } from "../../theme";

const LEG_1 = "M200 220 C 430 250, 590 380, 520 540";
const LEG_2 = "M520 540 C 470 710, 300 720, 260 860";

const nodes = [
  { x: 200, y: 220, label: "Farm", dx: 34, dy: 8 },
  { x: 520, y: 540, label: "Hub", dx: 34, dy: 8 },
  { x: 260, y: 860, label: "Market", dx: 34, dy: 8 },
];

/** A single route from field to market. The draw-on and the moving truck are the only motion. */
export function RouteVisual() {
  const isStatic = useIsStatic();
  const delay = useEntranceDelay(0.4);
  const draw = (extra: number) => ({
    initial: isStatic ? (false as const) : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.4, delay: delay + extra, ease: presentationTheme.motion.ease },
  });

  return (
    <svg viewBox="0 0 760 1080" className="h-full w-full" fill="none" aria-hidden>
      <rect width="760" height="1080" fill="var(--p-primary)" />
      {[120, 210, 300, 390].map((r, i) => (
        <circle key={r} cx="520" cy="540" r={r} stroke="var(--p-accent)" strokeOpacity={0.22 - i * 0.04} strokeWidth="2" />
      ))}
      <motion.path d={LEG_1} stroke="var(--p-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 18" {...draw(0)} />
      <motion.path d={LEG_2} stroke="var(--p-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 18" {...draw(0.9)} />
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={isStatic ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + i * 0.7 }}
        >
          <circle cx={n.x} cy={n.y} r="22" fill="var(--p-bg)" />
          <circle cx={n.x} cy={n.y} r="9" fill="var(--p-primary)" />
          <text x={n.x + n.dx + 8} y={n.y + n.dy} fill="var(--p-bg)" fontSize="30" fontFamily="var(--p-font-body)">
            {n.label}
          </text>
        </motion.g>
      ))}
      <circle r="13" fill="var(--p-bg)">
        <animateMotion dur="7s" begin="2.6s" repeatCount="indefinite" path={`${LEG_1} ${LEG_2.replace("M520 540", "")}`} />
      </circle>
    </svg>
  );
}
