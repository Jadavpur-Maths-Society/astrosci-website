"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BlackHole from "@/components/ambient/BlackHole";
import { siteConfig } from "@/config/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

const meta = [
  { label: "Observatory", value: "22.4996° N, 88.3716° E" },
  { label: "Meetings", value: "Fridays · 18:00 IST" },
  { label: "Sections", value: "Gallery · POTW · Magazine" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-20 pt-32"
      style={{
        background:
          "radial-gradient(120% 90% at 76% 40%, rgba(255,122,41,0.075) 0%, rgba(8,8,10,0) 56%), linear-gradient(180deg, #08080a 0%, #070708 70%, #050506 100%)",
      }}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
        {/* ── Left: the statement ─────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 bg-[#ff7a29]" aria-hidden />
            <span className="kicker">
              {siteConfig.university} &nbsp;·&nbsp; Astronomy &amp; Astrophysics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="font-display text-[clamp(3.1rem,7.6vw,6.1rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#f6f2ea]"
          >
            AstroSci
            <span className="ml-3 align-top font-mono text-[0.9rem] font-normal tracking-[0.3em] text-[#6a655c]">
              CLUB
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            className="serif-accent mt-6 max-w-xl text-[1.35rem] leading-snug text-[#b9b3a7] md:text-[1.6rem]"
          >
            We point instruments at the dark, and write down what we see.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[#736d63]"
          >
            A student-run astronomy society — astrophotography, observation nights,
            orbital mechanics and everything in between. Open to anyone willing to
            look up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/auth?tab=signup" className="btn-ember">
              Join the club
              <span aria-hidden>↗</span>
            </Link>
            <Link href="/events" className="btn-quiet">
              Upcoming events
            </Link>
          </motion.div>

          {/* instrument read-out strip */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-3"
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="kicker mb-2">{item.label}</dt>
                <dd className="mono-data text-[0.7rem] uppercase text-[#b9b3a7]">
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Right: one black hole, rendered live ────────────── */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="plate-frame relative aspect-square border border-white/[0.07] bg-[#040405]">
            <BlackHole />
            <span className="plate-corner" aria-hidden />

            {/* centre crosshair */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/20"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/20"
            />

            {/* plate vignette so the square dissolves into the page */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 130px 46px #08080a" }}
            />

            <span className="mono-data pointer-events-none absolute bottom-3 left-3 text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c]">
              Schwarzschild · r<sub>s</sub> = 1
            </span>
          </div>

          <figcaption className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="mono-data text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c]">
              Null geodesics integrated per pixel
            </span>
            <span className="mono-data flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c]">
              <span className="h-1 w-1 animate-pulse bg-[#ff7a29]" aria-hidden />
              Live
            </span>
          </figcaption>
        </motion.figure>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="kicker text-[0.58rem]">Scroll</span>
        <span className="relative block h-10 w-px bg-white/12" aria-hidden>
          <span className="astro-wheel-dot absolute -left-px top-0 h-2 w-px bg-[#ff7a29]" />
        </span>
      </motion.div>
    </section>
  );
}
