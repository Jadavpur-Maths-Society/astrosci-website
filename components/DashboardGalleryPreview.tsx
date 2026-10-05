"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
        console.log("gallery", data);
        if (data) setItems(data);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

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
              — Astrophotography —
            </p>
            <h2
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GALLERY
            </h2>
          </div>
          <Link href="/gallery">
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
              <div key={i} className="rounded-lg overflow-hidden border border-white/10 animate-pulse" style={{ aspectRatio: "4/3" }}>
                <div className="w-full h-full bg-[#121214]" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center">
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No gallery images yet — check back soon!
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <TiltCard key={item.id} className="rounded-lg" glow="rgba(255,177,115,0.18)">
              <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative rounded-lg overflow-hidden cursor-pointer border border-white/10 hover:border-[#ffb173]/30 transition-all h-full"
              style={{ aspectRatio: "4/3" }}
              onClick={() => item.image_url && setFullscreenItem(item)}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, #241a12 0%, #08080a 100%)" }}>
                  {[...Array(20)].map((_, j) => (
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
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <span className="shine-sweep" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p
                  className="text-white text-sm font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
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
