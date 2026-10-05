"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface KenBurnsNebulaProps {
  /** remote deep-space imagery (NASA / public domain) */
  src: string;
  /** final resting opacity of the layer */
  opacity?: number;
  /** which slow drift path to take */
  drift?: "a" | "b";
  className?: string;
}

/**
 * Slow Ken-Burns style drift of a real deep-space photograph
 * (NASA imagery, public domain). Fades in on mount and quietly
 * removes itself if the remote asset cannot be loaded, so the
 * gradient/canvas backdrop always remains intact.
 */
export default function KenBurnsNebula({
  src,
  opacity = 0.28,
  drift = "a",
  className = "",
}: KenBurnsNebulaProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 2.8, ease: "easeOut" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${drift === "a" ? "kb-drift-a" : "kb-drift-b"}`}
        style={{ filter: "saturate(1.15) brightness(0.95)" }}
      />
      {/* fade edges into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,6,23,0.75) 78%, #020617 100%)",
        }}
      />
    </motion.div>
  );
}
