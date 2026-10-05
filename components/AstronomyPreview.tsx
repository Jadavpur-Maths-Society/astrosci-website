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
      <CometLine className="absolute top-0 left-0 right-0" color="#38bdf8" />

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
              className="text-xs tracking-[0.4em] text-[#38bdf8] mb-2 uppercase"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
            >
              — Astronomy Tools —
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              LIVE SKY DATA
            </h2>
          </div>
          <Link href="/astronomy">
            <motion.span
              className="text-xs sm:text-sm text-[#38bdf8] border border-[#38bdf8]/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full hover:bg-[#38bdf8]/10 transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
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
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(56,189,248,0.12)] rounded-2xl"
          >
            <MoonPhaseWidget preview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(56,189,248,0.12)] rounded-2xl"
          >
            <ISSTrackerWidget preview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(56,189,248,0.12)] rounded-2xl"
          >
            <AstronomicalCalendarWidget preview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
