"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type Variants,
} from "framer-motion";
import BlackHole from "@/components/ambient/BlackHole";
import HeroVideoBackground from "@/components/ambient/HeroVideoBackground";
import ClubLogo from "@/components/ClubLogo";
import { siteConfig } from "@/config/siteConfig";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const meta = [
  { label: "Observatory", value: "22.4996° N, 88.3716° E" },
  { label: "Meetings", value: "Fridays · 18:00 IST" },
  { label: "Sections", value: "Gallery · POTW · Magazine" },
];

const ticker = [
  "Observation Nights",
  "Astrophotography",
  "Orbital Mechanics",
  "Radio Astronomy",
  "Eclipses & Transits",
  "Messier Marathons",
  "Rocketry 101",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const letterRow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -55 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── mouse parallax for the instrument plate ── */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const plateX = useTransform(sx, [0, 1], [12, -12]);
  const plateY = useTransform(sy, [0, 1], [9, -9]);
  const tiltX = useTransform(sy, [0, 1], [3.5, -3.5]);
  const tiltY = useTransform(sx, [0, 1], [-4.5, 4.5]);

  /* ── scroll drift — content floats up and away ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const plateScrollY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08080a 0%, #070708 70%, #050506 100%)" }}
    >
      {/* cinematic black-hole footage */}
      <HeroVideoBackground />

      {/* warm ember wash over the footage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 76% 40%, rgba(255,122,41,0.075) 0%, rgba(8,8,10,0) 56%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-content flex-1 grid-cols-1 items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20"
      >
        {/* ── Left: the statement ─────────────────────────────── */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* mission-patch row */}
          <motion.div variants={fadeUp} className="mb-7 flex items-center gap-4">
            <ClubLogo size={54} glow ring float eager />
            <span className="h-10 w-px bg-white/10" aria-hidden />
            <span>
              <span className="kicker block">
                {siteConfig.university}
              </span>
              <span className="kicker kicker-ember mt-1.5 block">
                Astronomy &amp; Astrophysics
              </span>
            </span>
          </motion.div>

          {/* staggered display type */}
          <motion.h1
            variants={letterRow}
            className="font-display text-[clamp(3.1rem,7.6vw,6.1rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#f6f2ea]"
            style={{ perspective: 600 }}
          >
            <span className="sr-only">AstroSci Club</span>
            <span aria-hidden className="inline-flex">
              {"AstroSci".split("").map((ch, i) => (
                <motion.span key={i} variants={letter} className="inline-block">
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              variants={fadeUp}
              className="ml-3 align-top font-mono text-[0.9rem] font-normal tracking-[0.3em] text-[#6a655c]"
            >
              CLUB
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="serif-accent mt-6 max-w-xl text-[1.35rem] leading-snug text-[#b9b3a7] md:text-[1.6rem]"
          >
            We point instruments at the dark, and write down what we see.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[#736d63]"
          >
            A student-run astronomy society — astrophotography, observation nights,
            orbital mechanics and everything in between. Open to anyone willing to
            look up.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/auth?tab=signup" className="btn-ember group">
                Join the club
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </Link>
            </motion.span>
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/events" className="btn-quiet group">
                Upcoming events
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.span>
          </motion.div>

          {/* instrument read-out strip */}
          <motion.dl
            variants={fadeUp}
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
        </motion.div>

        {/* ── Right: one black hole, rendered live ────────────── */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          style={{ y: plateScrollY }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* rotating ember halo behind the plate */}
          <span
            aria-hidden
            className="halo-conic pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-2xl"
          />

          <motion.div
            style={{ x: plateX, y: plateY, rotateX: tiltX, rotateY: tiltY }}
            className="relative"
          >
            <div className="plate-frame plate-breathe relative aspect-square border border-white/[0.07] bg-[#040405]">
              <BlackHole />
              <span className="plate-corner" aria-hidden />
              <span className="shine-sweep" aria-hidden />

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
              <span className="mono-data pointer-events-none absolute right-3 top-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c]">
                <span className="h-1 w-1 animate-pulse rounded-full bg-[#ff7a29]" aria-hidden />
                Live
              </span>
            </div>

            {/* floating mission-patch badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -right-3 -top-6 flex items-center gap-2.5 border border-white/10 bg-[#0b0b0d]/90 py-2 pl-2 pr-4 backdrop-blur-md sm:-right-6"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(255,122,41,0.12)" }}
            >
              <ClubLogo size={34} glow spinOnHover />
              <span className="leading-tight">
                <span className="mono-data block text-[0.6rem] uppercase tracking-[0.2em] text-[#f6f2ea]">
                  AstroSci
                </span>
                <span className="mono-data block text-[0.55rem] uppercase tracking-[0.2em] text-[#6a655c]">
                  Est · JU
                </span>
              </span>
            </motion.div>
          </motion.div>

          <figcaption className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="mono-data text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c]">
              Null geodesics integrated per pixel
            </span>
            <span className="mono-data hidden items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-[#6a655c] sm:flex">
              <span className="astro-twinkle inline-block h-1 w-1 rounded-full bg-[#ffb173]" aria-hidden />
              Drag-free · WebGL
            </span>
          </figcaption>
        </motion.figure>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pointer-events-none absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="kicker text-[0.58rem]">Scroll</span>
        <span className="relative block h-10 w-px bg-white/12" aria-hidden>
          <span className="astro-wheel-dot absolute -left-px top-0 h-2 w-px bg-[#ff7a29]" />
        </span>
      </motion.div>

      {/* orbit ticker */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 bg-black/45 py-2.5 backdrop-blur-sm">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {ticker.map((item) => (
                <span
                  key={item}
                  className="mono-data flex items-center text-[0.62rem] uppercase tracking-[0.24em] text-[#6a655c]"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[0.55rem] text-[#ff7a29]" aria-hidden>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
