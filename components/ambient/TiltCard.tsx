"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  maxTilt?: number;
  /** rgba colour of the cursor spotlight */
  glow?: string;
}

/**
 * Perspective tilt + cursor-following spotlight wrapper.
 * Wraps existing cards without changing their content — the wrapper
 * only adds a 3D tilt response and a soft radial highlight that
 * follows the pointer.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  glow = "rgba(255,177,115,0.14)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 160, damping: 22 });
  const springY = useSpring(py, { stiffness: 160, damping: 22 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    px.set(fx);
    py.set(fy);
    el.style.setProperty("--mx", `${fx * 100}%`);
    el.style.setProperty("--my", `${fy * 100}%`);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setEnabled(true)}
        onMouseLeave={() => {
          setEnabled(false);
          handleLeave();
        }}
        className={`spotlight-surface h-full ${className}`}
        style={{
          rotateX: enabled ? rotateX : 0,
          rotateY: enabled ? rotateY : 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ["--spot" as string]: glow,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
