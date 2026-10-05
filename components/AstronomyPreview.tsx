"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import MoonPhaseWidget from "@/components/MoonPhaseWidget";
import ISSTrackerWidget from "@/components/ISSTrackerWidget";
import AstronomicalCalendarWidget from "@/components/AstronomicalCalendarWidget";
import CometLine from "@/components/ambient/CometLine";

export default function AstronomyPreview() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <CometLine className="absolute top-0 left-0 right-0" color="#ffb173" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <p
              className="kicker mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Astronomy Tools —
            </p>
            <h2
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LIVE SKY DATA
            </h2>
          </div>
          <Link href="/astronomy">
            <motion.span
              className="link-rule mono-data text-[0.66rem] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.05 }}
            >
              Explore Astronomy Tools →
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -6 }}
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(255,177,115,0.12)] rounded-lg"
          >
            <MoonPhaseWidget preview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(255,177,115,0.12)] rounded-lg"
          >
            <ISSTrackerWidget preview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(255,177,115,0.12)] rounded-lg"
          >
            <AstronomicalCalendarWidget preview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
