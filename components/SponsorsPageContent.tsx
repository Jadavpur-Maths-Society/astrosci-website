"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Megaphone, ShoppingBag, Calendar, Trophy, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sponsorPlans = [
  {
    title: "Community Promotion",
    price: "₹599",
    period: "",
    description: "Promotion in AstroSci groups and website.",
    icon: Megaphone,
  },
  {
    title: "Merchandise Sponsor",
    price: "₹1,499",
    period: "/ year",
    description: "Promotion on AstroSci merchandise.",
    icon: ShoppingBag,
  },
  {
    title: "Event Host",
    price: "₹2,000",
    period: "",
    description: "Sponsor AstroSci events.",
    icon: Calendar,
  },
  {
    title: "Major Sponsor",
    price: "₹7,499",
    period: "",
    description: "Host Olympiads and major AstroSci programs.",
    icon: Trophy,
  },
];

export type VerifiedSponsor = { name: string; logo: string; website: string };

const sponsorTierStyles = [
  {
    label: "Bronze",
    card: "border-[#b8430a]/60 shadow-[0_0_22px_rgba(120,53,15,0.22)]",
    iconBg: "bg-gradient-to-br from-[#b8430a]/25 to-[#78350F]/25",
    iconColor: "text-[#ff9d3d]",
    priceColor: "#ff9d4d",
    button: "border-[#b8430a]/55 text-[#FBBF24] hover:bg-[#b8430a]/14",
  },
  {
    label: "Silver",
    card: "border-[#c9c3b8]/50 shadow-[0_0_24px_rgba(201,195,184,0.18)]",
    iconBg: "bg-gradient-to-br from-[#c9c3b8]/20 to-[#736d63]/20",
    iconColor: "text-[#d9d3c8]",
    priceColor: "#c9c3b8",
    button: "border-[#c9c3b8]/45 text-[#d9d3c8] hover:bg-[#c9c3b8]/10",
  },
  {
    label: "Platinum",
    card: "border-[#ece7de]/45 shadow-[0_0_24px_rgba(236,232,225,0.18)]",
    iconBg: "bg-gradient-to-br from-[#ece7de]/25 to-[#a49d91]/20",
    iconColor: "text-[#ece7de]",
    priceColor: "#ece7de",
    button: "border-[#ece7de]/50 text-[#ece7de] hover:bg-[#ece7de]/12",
  },
  {
    label: "Gold",
    card: "border-[#FCD34D]/50 shadow-[0_0_26px_rgba(255,157,61,0.2)]",
    iconBg: "bg-gradient-to-br from-[#FCD34D]/25 to-[#ff9d3d]/20",
    iconColor: "text-[#FCD34D]",
    priceColor: "#FCD34D",
    button: "border-[#FCD34D]/55 text-[#FCD34D] hover:bg-[#FCD34D]/12",
  },
];

const starParticles = [
  { left: "8%", top: "16%", delay: 0 },
  { left: "19%", top: "48%", delay: 0.6 },
  { left: "28%", top: "24%", delay: 1.2 },
  { left: "42%", top: "66%", delay: 0.8 },
  { left: "56%", top: "14%", delay: 1.6 },
  { left: "64%", top: "41%", delay: 0.3 },
  { left: "77%", top: "28%", delay: 1.8 },
  { left: "86%", top: "62%", delay: 0.9 },
  { left: "93%", top: "20%", delay: 1.4 },
];

export default function SponsorsPageContent({
  verifiedSponsors,
}: {
  verifiedSponsors: VerifiedSponsor[];
}) {
  return (
    <main className="relative min-h-screen bg-[#08080a]">
      <Navbar />

      <div className="relative z-20 pt-20">
        <div className="mx-auto max-w-4xl px-6">
          <Link href="/sponsors/status">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#e2600f]/40 bg-[#121214]/90 backdrop-blur-sm px-5 py-3 text-sm text-[#ffc48e] hover:bg-[#121214] hover:border-[#ffc48e]/60 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Award className="w-4 h-4" />
              Already applied for sponsorship? Check your status here!
            </motion.div>
          </Link>
        </div>
      </div>

      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, #0c0c0e 0%, #08080a 60%)" }} />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#e2600f]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#ffc48e]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          {starParticles.map((star, i) => (
            <motion.span
              key={`${star.left}-${star.top}-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/60"
              style={{ left: star.left, top: star.top }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p
              className="text-xs tracking-[0.4em] text-[#ffc48e] mb-4 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Sponsorship —
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-[#f6f2ea]">
                Support AstroSci Through{" "}
              </span>
              <span className="text-[#ff7a29]">Sponsorship</span>
            </h1>
            <p
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Partner with us to promote science, education, and exploration. Your brand reaches a passionate community of astronomers and space enthusiasts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Link href="/sponsors/payment">
              <motion.span
                className="inline-flex items-center gap-3 px-12 py-5 rounded-sm bg-gradient-to-r from-[#e2600f] to-[#ffc48e] text-white font-bold text-base tracking-wider shadow-[0_0_40px_rgba(226,96,15,0.4)] hover:shadow-[0_0_60px_rgba(255,196,142,0.6)] transition-all duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-display)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Award className="w-5 h-5" />
                JOIN AS SPONSOR
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
            <p className="text-xs tracking-[0.4em] text-[#ffc48e] mb-3 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              — Plans —
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Sponsorship Plans
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorPlans.map((plan, i) => {
              const Icon = plan.icon;
              const tierStyle = sponsorTierStyles[i % sponsorTierStyles.length];
              return (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative group rounded-2xl border bg-[rgba(255,255,255,0.05)] backdrop-blur-md p-6 flex flex-col ${tierStyle.card}`}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className={`w-12 h-12 rounded-xl ${tierStyle.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${tierStyle.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {plan.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.22em] text-gray-300 mb-2">{tierStyle.label} Tier</p>
                    <div className="mb-3">
                      <span
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: tierStyle.priceColor }}
                      >
                        {plan.price}
                      </span>
                      {plan.period && <span className="text-sm text-gray-400 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: "var(--font-body)" }}>
                      {plan.description}
                    </p>
                    <Link href="/sponsors/payment">
                      <motion.span
                        className={`inline-flex items-center justify-center w-full py-3 rounded-full border font-semibold text-sm tracking-wider hover:shadow-[0_0_20px_rgba(234,92,11,0.3)] transition-all duration-300 cursor-pointer ${tierStyle.button}`}
                        style={{ fontFamily: "var(--font-display)" }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Become Sponsor
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
            <p className="text-xs tracking-[0.4em] text-[#ffc48e] mb-3 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              — Partners —
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Our Sponsors
            </h2>
          </motion.div>

          {verifiedSponsors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedSponsors.map((sponsor, i) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-white/15 bg-[rgba(255,255,255,0.05)] backdrop-blur-md p-6 text-center group shadow-[0_0_16px_rgba(255,196,142,0.14)]"
                >
                  <div className="w-20 h-20 rounded-full bg-[#e2600f]/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Award className="w-8 h-8 text-[#ffc48e]" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {sponsor.name}
                  </h3>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#ffc48e] hover:text-[#ffd7b0] transition-colors"
                    >
                      Visit Website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16 rounded-lg border border-[#e2600f]/20 bg-[#121214]/40"
            >
              <Award className="w-12 h-12 text-[#ffc48e]/60 mx-auto mb-4" />
              <p className="text-gray-300 text-base" style={{ fontFamily: "var(--font-body)" }}>
                Verified sponsors will appear here.
              </p>
              <p className="text-gray-500 text-sm mt-1">Be the first to sponsor AstroSci!</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
