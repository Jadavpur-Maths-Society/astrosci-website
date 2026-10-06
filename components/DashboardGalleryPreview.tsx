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

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  created_at: string;
}

export default function DashboardGalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenItem, setFullscreenItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data } = await supabase
          .from("gallery")
          .select("id, image_url, caption, created_at")
          .order("created_at", { ascending: false })
          .limit(3);
        if (data) setItems(data);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ffb173" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="02"
          eyebrow="Astrophotography"
          title="GALLERY"
          action={(
            <Link href="/gallery" className="section-action group">
              <span>View all frames</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3" aria-label="Loading gallery">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-white/10 bg-[#0c0c0e]" style={{ aspectRatio: "4/3" }}>
                <div className="h-full w-full bg-[radial-gradient(ellipse_at_65%_35%,rgba(255,122,41,0.12),transparent_42%)]" />
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
            <span className="kicker kicker-ember">Archive transmission</span>
            <p className="mt-3 font-display text-xl text-[#f6f2ea]">The next frame is waiting to be captured.</p>
            <p className="mt-2 text-sm text-[#736d63]">New observations from the club will appear here.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {items.map((item, i) => (
              <TiltCard key={item.id} className="h-full" glow="rgba(255,177,115,0.18)">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.72, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative block h-full w-full overflow-hidden border border-white/10 bg-[#08080a] text-left transition-colors duration-500 hover:border-[#ffb173]/50 disabled:cursor-default"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => item.image_url && setFullscreenItem(item)}
                  disabled={!item.image_url}
                  aria-label={item.image_url ? `Open photograph: ${item.caption || "Untitled observation"}` : undefined}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.caption || "Astronomical observation"}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="home-image-placeholder h-full w-full" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/95 via-[#050506]/12 to-[#050506]/15" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-[#08080a]/15 px-4 py-3 backdrop-blur-[2px]">
                    <span className="mono-data text-[0.55rem] uppercase tracking-[0.18em] text-white/65">Field frame / 0{i + 1}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#ffb173] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="kicker mb-2 text-white/55">AstroSci · Jadavpur</p>
                    <p className="font-display text-base font-semibold leading-snug text-white md:text-lg">
                      {item.caption || "Untitled observation"}
                    </p>
                  </div>
                  <span className="shine-sweep" aria-hidden="true" />
                </motion.button>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
      <FullscreenImageViewer
        src={fullscreenItem?.image_url ?? ""}
        alt={fullscreenItem?.caption ?? ""}
        caption={fullscreenItem?.caption}
        isOpen={!!fullscreenItem}
        onClose={() => setFullscreenItem(null)}
      />
    </section>
  );
}
