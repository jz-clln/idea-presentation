"use client";
import { motion } from "framer-motion";
import { useEntranceDelay, useIsStatic } from "../../runtime";
import { presentationTheme } from "../../theme";

interface TruckArtProps {
  className?: string;
  /** 0-1: how much of the cargo bay is filled. */
  fill?: number;
  delay?: number;
  body?: string;
  cargo?: string;
}

/** Box truck drawn in the ROVA palette. The cargo bay fills up to `fill`. */
export function TruckArt({ className, fill = 1, delay = 0, body = "var(--p-primary)", cargo = "var(--p-accent)" }: TruckArtProps) {
  const isStatic = useIsStatic();
  const d = useEntranceDelay(delay);
  return (
    <svg viewBox="0 0 320 150" className={className} fill="none" aria-hidden>
      <rect x="4" y="10" width="208" height="100" rx="12" fill={body} />
      <rect x="16" y="22" width="184" height="76" rx="8" fill="rgba(247,246,242,.18)" />
      <motion.rect
        x="16" y="22" height="76" rx="8" fill={cargo}
        initial={isStatic ? false : { width: 0 }}
        animate={{ width: 184 * fill }}
        transition={{ duration: 1.2, delay: d, ease: presentationTheme.motion.ease }}
      />
      <path d="M220 40h52c6 0 10 3 14 8l22 28c3 4 4 6 4 11v23h-92z" fill={body} />
      <path d="M232 52h34l20 26h-54z" fill="var(--p-bg)" opacity=".85" />
      {[70, 262].map((x) => (
        <g key={x}>
          <circle cx={x} cy="118" r="22" fill="#151515" />
          <circle cx={x} cy="118" r="9" fill="var(--p-bg)" />
        </g>
      ))}
    </svg>
  );
}

/** Sunrise over hazy mountains and rolling rice terraces. Fills its (relative) parent. */
export function Landscape({ dark = false }: { dark?: boolean }) {
  const isStatic = useIsStatic();
  const sky = dark ? ["#18392B", "#2b5a44"] : ["#F7F6F2", "#F1DFC2"];
  const drift = isStatic ? undefined : { x: [0, -28] };
  const driftT = { duration: 14, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const };
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="rova-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#rova-sky)" />
      <motion.circle
        cx="1280" cy="560" r="150" fill="#F2C98A" opacity={dark ? 0.3 : 0.6}
        initial={isStatic ? false : { cy: 660 }} animate={{ cy: 560 }}
        transition={{ duration: 2.6, ease: "easeOut" }}
      />
      <path d="M-40 650 L220 470 L400 590 L640 430 L900 610 L1180 480 L1500 620 L1720 500 L1960 620 V1080 H-40Z" fill="#A9C8A5" opacity={dark ? 0.25 : 0.45} />
      <motion.g animate={drift} transition={driftT}>
        <path d="M-40 730 C260 640 520 640 800 720 S1400 800 1960 690 V1080 H-40Z" fill="#A9C8A5" />
        <path d="M-40 840 C300 760 620 780 960 850 S1560 890 1960 800 V1080 H-40Z" fill="#7FA57F" />
        <g stroke="#F7F6F2" strokeOpacity=".28" strokeWidth="3" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M-40 ${880 + i * 22} C300 ${820 + i * 24} 620 ${840 + i * 24} 960 ${900 + i * 20} S1560 ${930 + i * 18} 1960 ${850 + i * 20}`} />
          ))}
        </g>
      </motion.g>
      <path d="M-40 990 C400 940 900 980 1300 970 S1700 940 1960 960 V1080 H-40Z" fill="#18392B" />
    </svg>
  );
}
