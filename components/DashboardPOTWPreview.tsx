"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";
import CometLine from "@/components/ambient/CometLine";
import TiltCard from "@/components/ambient/TiltCard";

interface POTWItem {
  id: string;
  image_url: string;
  title: string;
  photographer: string;
  description: string;
  week_date: string;
}

export default function DashboardPOTWPreview() {
  const [items, setItems] = useState<POTWItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenItem, setFullscreenItem] = useState<POTWItem | null>(null);

  useEffect(() => {
    async function fetchPOTW() {
      try {
        const { data } = await supabase
          .from("potw")
          .select("id, image_url, title, photographer, description, week_date")
          .order("week_date", { ascending: false })
          .limit(3);
        console.log("potw", data);
        if (data) setItems(data);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchPOTW();
  }, []);

  const defaultGradient = "radial-gradient(ellipse at 50% 50%, #241a12 0%, #08080a 100%)";

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#ff7a29]/5 rounded-full blur-[120px] astro-drift-b" />

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
              — Featured Shots —
            </p>
            <h2
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Picture of the Week
            </h2>
          </div>
          <Link href="/potw">
            <motion.span
              className="link-rule mono-data text-[0.66rem] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.05 }}
            >
              View All →
            </motion.span>
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-[#ff7a29]/20 bg-[#0b0b0d]/80 animate-pulse">
                <div className="w-full bg-[#121214]" style={{ aspectRatio: "16/10" }} />
                <div className="p-4">
                  <div className="h-4 bg-[#121214] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#121214] rounded w-1/2 mb-1" />
                  <div className="h-3 bg-[#121214] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center">
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No featured photos yet — check back soon!
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <TiltCard key={item.id} className="rounded-lg" glow="rgba(255,122,41,0.2)">
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-lg overflow-hidden border border-[#ff7a29]/20 bg-[#0b0b0d]/80 backdrop-blur-sm hover:border-[#ff7a29]/50 transition-all cursor-pointer h-full"
              onClick={() => item.image_url && setFullscreenItem(item)}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: defaultGradient }}>
                    {[...Array(30)].map((_, j) => (
                      <div
                        key={j}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${Math.random() * 2 + 0.5}px`,
                          height: `${Math.random() * 2 + 0.5}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.7 + 0.3,
                        }}
                      />
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#ff7a29]/30 blur-2xl" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2 py-1 rounded-sm bg-[#ffb173]/20 border border-[#ffb173]/40 text-[#ffb173] text-xs backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    ★ POTW
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="text-white font-bold text-sm mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#ffb173] text-xs"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  📸 {item.photographer}
                </p>
                <p
                  className="text-gray-500 text-xs mt-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {new Date(item.week_date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="shine-sweep" aria-hidden />
            </motion.div>
            </TiltCard>
          ))}
        </div>
        )}
      </div>
      <FullscreenImageViewer
        src={fullscreenItem?.image_url ?? ""}
        alt={fullscreenItem?.title ?? ""}
        caption={fullscreenItem?.title}
        subCaption={fullscreenItem ? `📸 ${fullscreenItem.photographer}` : undefined}
        isOpen={!!fullscreenItem}
        onClose={() => setFullscreenItem(null)}
      />
    </section>
  );
}
