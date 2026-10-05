"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";
import CometLine from "@/components/ambient/CometLine";

interface Magazine {
  id: string;
  title: string;
  issue: string;
  cover_image: string;
  pdf_url: string;
  published_at: string;
}

export default function DashboardMagazinePreview() {
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    async function fetchMagazine() {
      try {
        const { data } = await supabase
          .from("magazines")
          .select("id, title, issue, cover_image, pdf_url, published_at")
          .order("published_at", { ascending: false })
          .limit(1)
          .single();
        if (data) setMagazine(data);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchMagazine();
  }, []);

  return (
    <section
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08080a 0%, #0a0a0c 50%, #08080a 100%)" }}
    >
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />

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
              — Publication —
            </p>
            <h2
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LATEST MAGAZINE
            </h2>
          </div>
          <Link href="/magazine">
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
          <div className="grid md:grid-cols-2 gap-8 items-center animate-pulse">
            <div className="mx-auto max-w-xs w-full">
              <div className="rounded-lg overflow-hidden border border-[#ff7a29]/20 bg-[#121214]" style={{ aspectRatio: "3/4" }} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-6 bg-[#121214] rounded w-3/4" />
              <div className="h-4 bg-[#121214] rounded w-1/3" />
              <div className="flex gap-3 mt-2">
                <div className="h-10 bg-[#121214] rounded-lg w-28" />
                <div className="h-10 bg-[#121214] rounded-lg w-28" />
              </div>
            </div>
          </div>
        ) : !magazine ? (
          <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center">
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No magazines published yet — check back soon!
            </p>
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Cover */}
          <motion.div
            className="group mx-auto max-w-xs"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-[#ff7a29]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div
                className="relative rounded-lg overflow-hidden border border-[#ff7a29]/30 group-hover:border-[#ff7a29]/60 transition-all duration-500 cursor-pointer"
                style={{ aspectRatio: "3/4" }}
                onClick={() => magazine.cover_image && setFullscreenOpen(true)}
              >
                {magazine.cover_image ? (
                  <img
                    src={magazine.cover_image}
                    alt={magazine.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full relative"
                    style={{ background: "linear-gradient(135deg, #08080a 0%, #1a0a3e 40%, #0a0a0b 100%)" }}
                  >
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${Math.random() * 2 + 0.5}px`,
                          height: `${Math.random() * 2 + 0.5}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.6 + 0.2,
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div>
                        <p
                          className="text-[#ffb173] text-xs tracking-[0.3em] uppercase mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          AstroSci Club · JU
                        </p>
                        <h3
                          className="text-xl font-black text-white leading-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {magazine.title}
                        </h3>
                      </div>
                      <div>
                        <div className="h-px w-full bg-gradient-to-r from-[#ff7a29] to-[#e08b2e] mb-3 opacity-60" />
                        <p
                          className="text-2xl font-black text-white"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {magazine.issue}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <span className="shine-sweep" aria-hidden />
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xl md:text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {magazine.title} — <span className="text-[#ff7a29]">{magazine.issue}</span>
            </h3>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {new Date(magazine.published_at).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
              })}
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {magazine.pdf_url && magazine.pdf_url !== "#" ? (
                <motion.a
                  href={magazine.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[#ff7a29] to-[#e2600f] text-white text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(255,122,41,0.4)] hover:shadow-[0_0_40px_rgba(255,122,41,0.6)] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ↓ Download
                </motion.a>
              ) : (
                <motion.button
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[#ff7a29] to-[#e2600f] text-white text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(255,122,41,0.4)] hover:shadow-[0_0_40px_rgba(255,122,41,0.6)] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ↓ Download
                </motion.button>
              )}
              <Link href="/magazine">
                <motion.span
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/10 text-gray-400 text-xs sm:text-sm hover:border-white/20 hover:text-white transition-all duration-300 inline-block cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={{ scale: 1.03 }}
                >
                  View All →
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
        )}
      </div>
      {magazine && (
        <FullscreenImageViewer
          src={magazine.cover_image ?? ""}
          alt={magazine.title}
          caption={magazine.title}
          subCaption={magazine.issue}
          isOpen={fullscreenOpen}
          onClose={() => setFullscreenOpen(false)}
        />
      )}
    </section>
  );
}
