"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * HeroVideoBackground — cinematic black-hole loop behind the hero.
 *
 * Fades in once the video can play, stays out of the way of screen
 * readers and input, and gracefully disappears for reduced-motion
 * users or if the file fails to load (the gradient underneath shows).
 */
export default function HeroVideoBackground() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (reduced || failed) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="hero-video-zoom h-full w-full object-cover transition-opacity duration-[2200ms] ease-out"
        style={{ opacity: ready ? 0.5 : 0 }}
        src={siteConfig.assets.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      {/* readability veils — keep type legible over the footage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.45) 38%, rgba(8,8,10,0.78) 100%), radial-gradient(110% 80% at 50% 45%, rgba(8,8,10,0) 40%, rgba(8,8,10,0.65) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#08080a]/90 to-transparent" />
    </div>
  );
}
