"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MoonPhaseWidgetProps {
  preview?: boolean;
}

const PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

type PhaseName = (typeof PHASE_NAMES)[number];

function getMoonPhaseData(date: Date) {
  // Known new moon reference: January 6, 2000 18:14 UTC
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058867;

  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const cycleProgress = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const phaseRatio = cycleProgress / synodicMonth; // 0 to 1

  // Illumination: 0 at new moon, 1 at full moon, back to 0
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phaseRatio)) / 2 * 100);

  // Phase index (8 phases)
  const phaseIndex = Math.floor(phaseRatio * 8) % 8;
  const phaseName: PhaseName = PHASE_NAMES[phaseIndex];

  // Calculate next full moon (phase ratio ~0.5)
  const daysToFull = phaseRatio <= 0.5
    ? (0.5 - phaseRatio) * synodicMonth
    : (1.5 - phaseRatio) * synodicMonth;
  const nextFullMoon = new Date(date.getTime() + daysToFull * 24 * 60 * 60 * 1000);

  // Days into the cycle
  const moonAge = Math.round(cycleProgress * 10) / 10;

  return { phaseName, phaseIndex, illumination, phaseRatio, nextFullMoon, moonAge };
}

function MoonVisual({ phaseRatio, size }: { phaseRatio: number; size: number }) {
  // Build a CSS-based moon using clip-path and overlays
  // phaseRatio: 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter
  const radius = size / 2;

  // Calculate the terminator position using the phase
  // We represent the shadow as an ellipse overlay
  const angle = phaseRatio * 2 * Math.PI;
  const shadowX = Math.cos(angle);

  // Determine shadow side and coverage
  const isWaxing = phaseRatio < 0.5;
  const illuminationFraction = (1 - Math.cos(2 * Math.PI * phaseRatio)) / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Moon glow */}
      <motion.div
        animate={{ boxShadow: [
          `0 0 ${size * 0.15}px ${size * 0.05}px rgba(56, 189, 248, 0.15)`,
          `0 0 ${size * 0.25}px ${size * 0.1}px rgba(56, 189, 248, 0.25)`,
          `0 0 ${size * 0.15}px ${size * 0.05}px rgba(56, 189, 248, 0.15)`,
        ] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
      />
      {/* Moon base (lit side) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 35%, #ece7de 0%, #a49d91 60%, #736d63 100%)",
        }}
      />
      {/* Shadow overlay using SVG for accurate terminator */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ width: size, height: size }}
      >
        <defs>
          <clipPath id={`moon-clip-${size}`}>
            <circle cx={radius} cy={radius} r={radius} />
          </clipPath>
        </defs>
        <g clipPath={`url(#moon-clip-${size})`}>
          {/* Shadow ellipse */}
          {phaseRatio < 0.5 ? (
            // Waxing: shadow on the left, shrinking
            <ellipse
              cx={radius}
              cy={radius}
              rx={Math.abs(shadowX) * radius}
              ry={radius}
              fill="#08080a"
              opacity={0.92}
              transform={shadowX < 0 ? `translate(${-radius + Math.abs(shadowX) * radius}, 0)` : undefined}
              style={shadowX >= 0 ? { transform: `translateX(${-radius + shadowX * radius}px)` } : undefined}
            />
          ) : (
            // Waning: shadow on the right, growing
            <ellipse
              cx={radius}
              cy={radius}
              rx={Math.abs(shadowX) * radius}
              ry={radius}
              fill="#08080a"
              opacity={0.92}
              style={{ transform: `translateX(${radius - Math.abs(shadowX) * radius}px)` }}
            />
          )}
          {/* Near new moon, cover everything */}
          {illuminationFraction < 0.03 && (
            <circle cx={radius} cy={radius} r={radius} fill="#08080a" opacity={0.92} />
          )}
        </g>
      </svg>
      {/* Subtle crater texture */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 25%, transparent 0%, transparent 8%, rgba(115,109,99,0.3) 9%, transparent 10%),
                       radial-gradient(circle at 60% 65%, transparent 0%, transparent 5%, rgba(115,109,99,0.2) 6%, transparent 7%),
                       radial-gradient(circle at 45% 50%, transparent 0%, transparent 12%, rgba(115,109,99,0.15) 13%, transparent 14%)`,
        }}
      />
    </div>
  );
}

export default function MoonPhaseWidget({ preview = false }: MoonPhaseWidgetProps) {
  const [phaseData, setPhaseData] = useState<ReturnType<typeof getMoonPhaseData> | null>(null);

  useEffect(() => {
    setPhaseData(getMoonPhaseData(new Date()));
  }, []);

  if (!phaseData) {
    return (
      <div className={`rounded-xl border border-[#26231f] bg-[#121214] ${preview ? "p-4" : "p-6"} animate-pulse`}>
        <div className="h-4 bg-[#26231f] rounded w-1/3 mb-3" />
        <div className="h-8 bg-[#26231f] rounded w-1/2 mb-4" />
        <div className={`${preview ? "h-16 w-16" : "h-32 w-32"} rounded-full bg-[#26231f] mx-auto`} />
      </div>
    );
  }

  const { phaseName, illumination, phaseRatio, nextFullMoon, moonAge } = phaseData;

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-[#26231f] bg-[#121214]/80 p-5 hover:border-[#ffb173]/30 transition-all"
      >
        <div className="flex items-center gap-4">
          <MoonVisual phaseRatio={phaseRatio} size={56} />
          <div className="flex-1 min-w-0">
            <p
              className="text-xs tracking-[0.3em] text-[#ffb173] mb-1 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Moon Phase
            </p>
            <h3
              className="text-lg font-bold text-white truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {phaseName}
            </h3>
            <p
              className="text-sm text-[#ece7de]/70 mt-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {illumination}% illuminated
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-lg border border-[#26231f] bg-[#121214]/80 p-8"
    >
      <p
        className="kicker mb-3"
        style={{ fontFamily: "var(--font-body)" }}
      >
        — Current Moon Phase —
      </p>
      <h2
        className="text-2xl md:text-3xl font-bold text-white mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {phaseName}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <MoonVisual phaseRatio={phaseRatio} size={160} />
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
              <p
                className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Illumination
              </p>
              <p
                className="text-2xl font-bold text-[#ffb173]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {illumination}%
              </p>
            </div>
            <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
              <p
                className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Moon Age
              </p>
              <p
                className="text-2xl font-bold text-[#ffb173]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {moonAge}d
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
            <p
              className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Next Full Moon
            </p>
            <p
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nextFullMoon.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Illumination bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs text-[#ece7de]/40 mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>New</span>
              <span>Full</span>
            </div>
            <div className="h-2 rounded-full bg-[#08080a] border border-[#26231f] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${illumination}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#ffb173]/60 to-[#ffb173]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
