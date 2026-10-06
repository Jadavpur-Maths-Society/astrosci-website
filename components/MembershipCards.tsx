"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ambient/SectionHeading";
import { supabase } from "@/lib/supabaseClient";
import { siteConfig } from "@/config/siteConfig";
import CometLine from "@/components/ambient/CometLine";
import TiltCard from "@/components/ambient/TiltCard";

const plans = [
  {
    name: "Free",
    description: "Basic access to club resources and events",
    features: ["Event notifications", "Gallery access", "Community forum"],
    color: "#c66a36",
    tier: "free",
  },
  {
    name: "Monthly Subscriber",
    description: "Enhanced benefits with monthly renewal",
    features: ["All Free features", "Magazine downloads", "Priority registration", "Workshop access"],
    color: "#ffb173",
    tier: "monthly",
  },
  {
    name: "Annual Subscriber",
    description: "Full access with annual commitment",
    features: ["All Monthly features", "Exclusive content", "Mentorship program", "Certificate of membership"],
    color: "#ff7a29",
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
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="08"
          eyebrow="Membership"
          title="FIND YOUR ORBIT"
          description="Start with curiosity. Stay for the community."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const isActive =
              currentPlan.toLowerCase() === plan.name.toLowerCase();
            const tierStyles =
              plan.tier === "annual"
                ? {
                    border: "border-[#ff7a29]/55 shadow-[0_0_34px_rgba(255,122,41,0.15)]",
                    badge: "border border-[#ff7a29]/45 bg-[#ff7a29]/15 text-[#ffb173]",
                  }
                : plan.tier === "monthly"
                  ? {
                      border: "border-[#ffb173]/35 shadow-[0_0_24px_rgba(255,177,115,0.08)]",
                      badge: "border border-[#ffb173]/35 bg-[#ffb173]/10 text-[#ffb173]",
                    }
                  : {
                      border: "border-white/10 shadow-[0_0_18px_rgba(0,0,0,0.2)]",
                      badge: "border border-white/10 bg-white/[0.04] text-[#948d81]",
                    };

            return (
              <TiltCard key={plan.name} className="h-full" glow={`${plan.color}24`}>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                data-tier={plan.tier}
                className={`home-panel relative h-full p-6 transition-all ${tierStyles.border}`}
              >
                {plan.tier === "annual" ? (
                  <div className="mb-4">
                    <span className={`px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] ${tierStyles.badge}`}>
                      Best value
                    </span>
                  </div>
                ) : (
                  <div aria-hidden="true" className="mb-4 h-[22px]" />
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
                  className="mb-4 flex h-10 w-10 items-center justify-center"
                  style={{ background: `${plan.color}14`, border: `1px solid ${plan.color}50` }}
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
                  className="block w-full py-3 text-center text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
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
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/support" className="btn-quiet group">
            Join as sponsor
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href="/support" className="btn-ember group">
            Support the club
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
