"use client";
import { motion } from "framer-motion";

interface CometLineProps {
  color?: string;
  className?: string;
}

/**
 * A hairline section divider with a small comet sweeping across it
 * whenever it scrolls into view. Drop-in replacement for the static
 * `h-px` gradient lines that separate sections.
 */
export default function CometLine({
  color = "#38bdf8",
  className = "",
}: CometLineProps) {
  return (
    <div
      aria-hidden
      className={`relative h-px w-full ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${color}2e, transparent)`,
      }}
    >
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 h-[3px] w-28 rounded-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color})`,
          boxShadow: `0 0 14px ${color}aa, 0 0 34px ${color}44`,
        }}
        initial={{ left: "-14%", opacity: 0 }}
        whileInView={{ left: "106%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.3, 1] }}
      />
    </div>
  );
}
