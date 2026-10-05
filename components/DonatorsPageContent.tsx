"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Star, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type Donor = {
  id: string;
  name: string;
  avatar: string;
  amount: string;
  anonymous: boolean;
};

function DonorCard({
  donor,
  index,
  highlight,
}: {
  donor: Donor;
  index: number;
  highlight?: boolean;
}) {
  const isAnonymous = donor.anonymous;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`relative group rounded-2xl border bg-[#121214]/80 backdrop-blur-sm p-6 text-center ${
        highlight
          ? "border-[#ffc48e]/40 shadow-[0_0_30px_rgba(255,196,142,0.15)]"
          : "border-[#e2600f]/20"
      }`}
    >
      {highlight && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#ffc48e]/5 to-transparent pointer-events-none" />
      )}
      <div className="relative z-10">
        <div
          className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden ${
            highlight ? "ring-2 ring-[#ffc48e]/50" : ""
          }`}
        >
          {!isAnonymous && donor.avatar ? (
            <img src={donor.avatar} alt={donor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#e2600f] to-[#ffc48e] flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
          )}
        </div>
        <h3
          className="text-base font-bold text-white mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {isAnonymous ? "Anonymous Donor" : donor.name}
        </h3>
        <p className="text-sm text-[#ffc48e]">{donor.amount}</p>
        {highlight && (
          <Star className="w-4 h-4 text-[#ff9d3d] mx-auto mt-2 fill-[#ff9d3d]" />
        )}
      </div>
    </motion.div>
  );
}

export default function DonatorsPageContent({
  topDonors,
  allDonors,
}: {
  topDonors: Donor[];
  allDonors: Donor[];
}) {
  return (
    <main className="relative min-h-screen bg-[#08080a]">
      <Navbar />

      <div className="relative z-20 pt-20">
        <div className="mx-auto max-w-4xl px-6">
          <Link href="/donators/status">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#ffc48e]/30 bg-[#121214]/90 backdrop-blur-sm px-5 py-3 text-sm text-[#ffc48e] hover:bg-[#121214] hover:border-[#ffc48e]/60 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Heart className="w-4 h-4" />
              Already applied for donation? Check your status here!
            </motion.div>
          </Link>
        </div>
      </div>

      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, #0c0c0e 0%, #08080a 60%)" }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#e2600f]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ffc48e]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs tracking-[0.4em] text-[#ffc48e] mb-4 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Donations —
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#f6f2ea]">
                Support{" "}
              </span>
              <span className="text-[#ff7a29]">
                AstroSci
              </span>
            </h1>
            <p
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your contribution helps us promote science and education. Every donation brings us closer to inspiring the next generation of explorers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link href="/donators/payment">
              <motion.span
                className="inline-flex items-center gap-3 px-12 py-5 rounded-sm bg-gradient-to-r from-[#FBBF24] to-[#ff9d3d] text-white font-bold text-base tracking-wider shadow-[0_0_26px_rgba(234,92,11,0.32)] hover:shadow-[0_0_42px_rgba(234,92,11,0.5)] transition-all duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-display)" }}
                animate={{
                  boxShadow: [
                    "0 0 18px rgba(234,92,11,0.28)",
                    "0 0 32px rgba(234,92,11,0.46)",
                    "0 0 18px rgba(234,92,11,0.28)",
                  ],
                }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Heart className="w-5 h-5" />
                Support Us
              </motion.span>
            </Link>
          </motion.div>

        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs tracking-[0.4em] text-[#ffc48e] mb-3 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Top Supporters —
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Top Donors
            </h2>
          </motion.div>

          {topDonors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {topDonors.map((donor, i) => (
                <DonorCard key={donor.id} donor={donor} index={i} highlight />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-12 rounded-lg border border-[#e2600f]/20 bg-[#121214]/40"
            >
              <Star className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <p
                className="text-gray-300 text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Top supporters will be featured here.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs tracking-[0.4em] text-[#ffc48e] mb-3 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Wall of Gratitude —
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Donators
            </h2>
          </motion.div>

          {allDonors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {allDonors.map((donor, i) => (
                <DonorCard key={donor.id} donor={donor} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16 rounded-lg border border-[#e2600f]/20 bg-[#121214]/40"
            >
              <Heart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p
                className="text-gray-300 text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Verified donators will appear here.
              </p>
              <p className="text-gray-500 text-sm mt-1">Be the first to donate to AstroSci!</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
