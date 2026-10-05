"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";
import { supabase } from "@/lib/supabaseClient";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  created_at: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenItem, setFullscreenItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });
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
    <AuthGuard>
    <main className="relative min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p
              className="kicker mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Astrophotography —
            </p>
            <h1
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GALLERY
            </h1>
            <p
              className="text-gray-500 text-sm mt-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Stunning shots captured by our members
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-white/10 bg-[#0b0b0d]/80 animate-pulse">
                  <div className="w-full bg-[#121214]" style={{ aspectRatio: "4/3" }} />
                  <div className="p-4">
                    <div className="h-4 bg-[#121214] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#121214] rounded w-1/2" />
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
                No gallery images yet — check back soon!
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-[#ffb173]/40 bg-[#0b0b0d]/80 backdrop-blur-sm transition-all"
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
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
                </div>
                <div className="p-4">
                  <h3
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.caption}
                  </h3>
                  <p
                    className="text-gray-500 text-xs mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {new Date(item.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>
      <Footer />
      <FullscreenImageViewer
        src={fullscreenItem?.image_url ?? ""}
        alt={fullscreenItem?.caption ?? ""}
        caption={fullscreenItem?.caption}
        subCaption={
          fullscreenItem
            ? new Date(fullscreenItem.created_at).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : undefined
        }
        isOpen={!!fullscreenItem}
        onClose={() => setFullscreenItem(null)}
      />
    </main>
    </AuthGuard>
  );
}
