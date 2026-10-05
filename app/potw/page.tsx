"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";
import { supabase } from "@/lib/supabaseClient";

interface POTWItem {
  id: string;
  image_url: string;
  title: string;
  photographer: string;
  description: string;
  week_date: string;
}

export default function POTWPage() {
  const [items, setItems] = useState<POTWItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenItem, setFullscreenItem] = useState<POTWItem | null>(null);

  const defaultGradient = "radial-gradient(ellipse at 50% 50%, #241a12 0%, #08080a 100%)";

  useEffect(() => {
    async function fetchPOTW() {
      try {
        const { data } = await supabase
          .from("potw")
          .select("*")
          .order("week_date", { ascending: false });
        console.log("potw", data);
        if (data) setItems(data);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchPOTW();
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
              — Photo of the Week —
            </p>
            <h1
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              POTW ARCHIVE
            </h1>
            <p
              className="text-gray-500 text-sm mt-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              All previous Picture of the Week winners
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-[#ff7a29]/20 bg-[#0b0b0d]/80 animate-pulse">
                  <div className="w-full bg-[#121214]" style={{ aspectRatio: "16/10" }} />
                  <div className="p-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-lg overflow-hidden border border-[#ff7a29]/20 bg-[#0b0b0d]/80 backdrop-blur-sm hover:border-[#ff7a29]/50 transition-all"
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "16/10" }}
                  onClick={() => item.image_url && setFullscreenItem(item)}
                >
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
                <div className="p-5">
                  <h3
                    className="text-white font-bold text-base mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#ffb173] text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    📸 {item.photographer}
                  </p>
                  <p
                    className="text-gray-500 text-xs mt-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {new Date(item.week_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
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
        alt={fullscreenItem?.title ?? ""}
        caption={fullscreenItem?.title}
        subCaption={
          fullscreenItem
            ? `📸 ${fullscreenItem.photographer}`
            : undefined
        }
        isOpen={!!fullscreenItem}
        onClose={() => setFullscreenItem(null)}
      />
    </main>
    </AuthGuard>
  );
}
