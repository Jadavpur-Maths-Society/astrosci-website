"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { siteConfig } from "@/config/siteConfig";
import CometLine from "@/components/ambient/CometLine";
import TiltCard from "@/components/ambient/TiltCard";

const plans = [
  {
    name: "Free",
    description: "Basic access to club resources and events",
    features: ["Event notifications", "Gallery access", "Community forum"],
    color: "#b8430a",
    tier: "free",
  },
  {
    name: "Monthly Subscriber",
    description: "Enhanced benefits with monthly renewal",
    features: ["All Free features", "Magazine downloads", "Priority registration", "Workshop access"],
    color: "#c9c3b8",
    tier: "monthly",
  },
  {
    name: "Annual Subscriber",
    description: "Full access with annual commitment",
    features: ["All Monthly features", "Exclusive content", "Mentorship program", "Certificate of membership"],
    color: "#FCD34D",
    tier: "annual",
  },
];

export default function MembershipCards() {
  const [currentPlan, setCurrentPlan] = useState<string>("");

  useEffect(() => {
    async function fetchPlan() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("plan")
            .eq("id", user.id)
            .single();
          if (data?.plan) setCurrentPlan(data.plan);
        }
      } catch {
        // Supabase fetch failed silently
      }
    }
    fetchPlan();
  }, []);

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p
            className="kicker mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            — Plans —
          </p>
          <h2
            className="section-title leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Membership
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const isActive =
              currentPlan.toLowerCase() === plan.name.toLowerCase();
            const tierStyles =
              plan.tier === "annual"
                ? {
                    border: "border-[#FCD34D]/60 shadow-[0_0_30px_rgba(255,157,61,0.2)]",
                    badge: "bg-gradient-to-r from-[#FCD34D] to-[#ff9d3d] text-[#16161a]",
                  }
                : plan.tier === "monthly"
                  ? {
                      border: "border-[#c9c3b8]/60 shadow-[0_0_24px_rgba(201,195,184,0.15)]",
                      badge: "bg-gradient-to-r from-[#ece7de] to-[#a49d91] text-[#16161a]",
                    }
                  : {
                      border: "border-[#b8430a]/60 shadow-[0_0_20px_rgba(184,67,10,0.15)]",
                      badge: "bg-gradient-to-r from-[#b8430a] to-[#78350F] text-white",
                    };

            return (
              <TiltCard key={plan.name} className="rounded-lg" glow={`${plan.color}24`}>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl border bg-[#0b0b0d]/80 backdrop-blur-sm p-6 transition-all h-full ${tierStyles.border}`}
              >
                {plan.tier === "annual" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${tierStyles.badge}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Best Value
                    </span>
                  </div>
                )}

                {isActive && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-2 py-1 rounded-sm bg-[#ffb173]/20 border border-[#ffb173]/40 text-[#ffb173] text-xs"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Active
                    </span>
                  </div>
                )}

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ color: plan.color }}>
                    <path d="M12 2L9.5 8.5H3L8 12.5L6 19L12 15.5L18 19L16 12.5L21 8.5H14.5L12 2Z" />
                  </svg>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-gray-500 text-xs mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {plan.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span style={{ color: plan.color }}>✓</span>
                      <span
                        className="text-gray-400 text-xs"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href={`mailto:${siteConfig.email}`}
                  className="block w-full py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: `${plan.color}15`,
                    border: `1px solid ${plan.color}40`,
                    color: plan.color,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Admins
                </motion.a>
              </motion.div>
              </TiltCard>
            );
          })}
        </div>

        {/* Donation / Sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link href="/support">
            <motion.span
              className="px-5 sm:px-6 py-3 rounded-sm border border-[#ffb173]/30 text-[#ffb173] text-xs sm:text-sm hover:bg-[#ffb173]/10 transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.05 }}
            >
              Join as Sponsor
            </motion.span>
          </Link>
          <Link href="/support">
            <motion.span
              className="px-5 sm:px-6 py-3 rounded-sm bg-gradient-to-r from-[#FBBF24] to-[#ff9d3d] text-white text-xs sm:text-sm shadow-[0_0_24px_rgba(255,122,41,0.28)] hover:shadow-[0_0_36px_rgba(255,122,41,0.42)] transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
              animate={{
                boxShadow: [
                  "0 0 18px rgba(234,92,11,0.22)",
                  "0 0 28px rgba(234,92,11,0.42)",
                  "0 0 18px rgba(234,92,11,0.22)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              Support Us
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
