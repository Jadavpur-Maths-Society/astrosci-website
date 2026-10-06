"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ambient/SectionHeading";
import MoonPhaseWidget from "@/components/MoonPhaseWidget";
import ISSTrackerWidget from "@/components/ISSTrackerWidget";
import AstronomicalCalendarWidget from "@/components/AstronomicalCalendarWidget";
import CometLine from "@/components/ambient/CometLine";

export default function AstronomyPreview() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ffb173" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="06"
          eyebrow="Live instruments"
          title="LIVE SKY DATA"
          description="A live readout from Earth's orbit, the lunar cycle and the calendar above us."
          action={(
            <Link href="/astronomy" className="section-action group">
              <span>Explore all instruments</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        />

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
