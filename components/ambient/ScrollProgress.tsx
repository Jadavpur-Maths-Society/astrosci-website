"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A single hairline of progress at the very top of the viewport.
 * No comet head, no glow — just enough to know where you are.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.35,
  });

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-px pointer-events-none">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX, background: "#ff7a29", opacity: 0.75 }}
      />
    </div>
  );
}
