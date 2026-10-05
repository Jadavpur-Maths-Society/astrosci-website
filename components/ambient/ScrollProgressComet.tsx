"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * A thin comet trail pinned to the top of the viewport that tracks
 * scroll progress — the glowing "head" of the comet leads the way.
 */
export default function ScrollProgressComet() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  const headLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.008], [0, 1]);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[3px] pointer-events-none">
      {/* trail */}
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.7) 30%, #38bdf8 75%, #a5f3fc 100%)",
          opacity: 0.9,
        }}
      />
      {/* comet head */}
      <motion.div
        className="absolute top-1/2 w-3 h-3 rounded-full"
        style={{
          left: headLeft,
          x: "-50%",
          y: "-50%",
          background: "#a5f3fc",
          boxShadow:
            "0 0 8px 2px rgba(165,243,252,0.85), 0 0 22px 6px rgba(56,189,248,0.45)",
          opacity: headOpacity,
        }}
      />
    </div>
  );
}
