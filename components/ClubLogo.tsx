"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

type ClubLogoProps = {
  /** Rendered width/height in px. */
  size?: number;
  className?: string;
  /** Soft ember drop-glow behind the mark. */
  glow?: boolean;
  /** Gentle infinite float (y bob). */
  float?: boolean;
  /** Playful tilt + scale on hover. */
  spinOnHover?: boolean;
  /** Orbit ring with a satellite dot around the mark. */
  ring?: boolean;
  alt?: string;
  eager?: boolean;
};

/**
 * ClubLogo — the single animated club mark used everywhere
 * (navbar, footer, hero badge, …).
 *
 * Loads the official Supabase-hosted PNG and silently falls back to the
 * bundled SVG if the remote file is unreachable.
 */
export default function ClubLogo({
  size = 32,
  className = "",
  glow = false,
  float = false,
  spinOnHover = false,
  ring = false,
  alt = "AstroSci Club logo",
  eager = false,
}: ClubLogoProps) {
  const [src, setSrc] = useState(siteConfig.assets.logo);
  const [errored, setErrored] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex shrink-0 items-center justify-center ${float ? "logo-float" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={false}
    >
      {/* orbit ring */}
      {ring && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-white/15"
          style={{ inset: -Math.max(6, size * 0.18) }}
        >
          <span className="astro-spin-slow absolute inset-0">
            <span
              className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff7a29]"
              style={{ boxShadow: "0 0 10px 2px rgba(255,122,41,0.8)" }}
            />
          </span>
        </span>
      )}

      {/* halo */}
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: -size * 0.28,
            background:
              "radial-gradient(circle, rgba(255,122,41,0.28) 0%, rgba(255,122,41,0.08) 55%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          if (!errored) {
            setErrored(true);
            setSrc(siteConfig.assets.logoFallback);
          }
        }}
        whileHover={
          spinOnHover
            ? { rotate: [0, -8, 6, 0], scale: 1.08 }
            : { scale: 1.06 }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full object-contain"
        style={
          glow
            ? { filter: "drop-shadow(0 0 10px rgba(255,122,41,0.45))" }
            : undefined
        }
      />
    </motion.span>
  );
}
