"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ambient/SectionHeading";
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
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#ff7a29]/5 rounded-full blur-[120px] astro-drift-b" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="03"
          eyebrow="Featured observations"
          title="Picture of the Week"
          description="One remarkable view, selected from the community each week."
          action={(
            <Link href="/potw" className="section-action group">
              <span>Explore the collection</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3" aria-label="Loading featured photographs">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-white/10 bg-[#0c0c0e]">
                <div className="w-full bg-[radial-gradient(ellipse_at_55%_40%,rgba(255,122,41,0.12),transparent_42%)]" style={{ aspectRatio: "16/10" }} />
                <div className="space-y-3 border-t border-white/10 p-5">
                  <div className="h-3 w-1/4 bg-[#1a1917]" />
                  <div className="h-4 w-3/4 bg-[#1a1917]" />
                  <div className="h-3 w-1/2 bg-[#1a1917]" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-panel plate-frame px-6 py-14 text-center md:py-16"
          >
            <span className="kicker kicker-ember">Signal sought</span>
            <p className="mt-3 font-display text-xl text-[#f6f2ea]">The next featured observation is on its way.</p>
            <p className="mt-2 text-sm text-[#736d63]">Explore the gallery for more views from our members.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {items.map((item, i) => (
              <TiltCard key={item.id} className="h-full" glow="rgba(255,122,41,0.2)">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.72, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative block h-full w-full overflow-hidden border border-white/10 bg-[#08080a] text-left transition-colors duration-500 hover:border-[#ffb173]/50 disabled:cursor-default"
                  onClick={() => item.image_url && setFullscreenItem(item)}
                  disabled={!item.image_url}
                  aria-label={item.image_url ? `Open featured photograph: ${item.title}` : undefined}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title || "Featured astronomical photograph"}
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="home-image-placeholder h-full w-full" style={{ background: defaultGradient }} aria-hidden="true" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 border border-[#ffb173]/35 bg-[#08080a]/45 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#ffb173] backdrop-blur-sm">
                      Weekly selection · 0{i + 1}
                    </span>
                    <span className="shine-sweep" aria-hidden="true" />
                  </div>
                  <div className="relative border-t border-white/10 p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="kicker text-[#ffb173]">{item.photographer || "AstroSci member"}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ffb173] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-[#f6f2ea]">{item.title}</h3>
                    <p className="mono-data mt-3 text-[0.58rem] uppercase tracking-[0.14em] text-[#6a655c]">
                      {new Date(item.week_date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </motion.button>
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
