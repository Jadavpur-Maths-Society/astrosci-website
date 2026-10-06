"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ambient/SectionHeading";
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
      className="relative overflow-hidden px-6 py-20 md:py-24"
      style={{ background: "linear-gradient(180deg, #08080a 0%, #0a0a0c 50%, #08080a 100%)" }}
    >
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="04"
          eyebrow="Club publication"
          title="LATEST MAGAZINE"
          description="Ideas, images and investigations gathered in one field journal."
          action={(
            <Link href="/magazine" className="section-action group">
              <span>Browse every issue</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        />

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
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-panel plate-frame px-6 py-14 text-center md:py-16"
          >
            <span className="kicker kicker-ember">Issue in development</span>
            <p className="mt-3 font-display text-xl text-[#f6f2ea]">A new field journal is taking shape.</p>
            <p className="mt-2 text-sm text-[#736d63]">Past issues and stories from the club live in the magazine archive.</p>
          </motion.div>
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
            initial={{ opacity: 0, y: 24, rotateY: -7 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -6, rotateY: -2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="group mx-auto max-w-xs"
            style={{ perspective: 1000 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-[#ff7a29]/14 blur-2xl opacity-40 transition-all duration-700 group-hover:opacity-100" />
              <div
                className="relative cursor-pointer overflow-hidden border border-[#ff7a29]/30 transition-colors duration-500 group-hover:border-[#ffb173]/70"
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
                    className="relative h-full w-full overflow-hidden"
                    style={{ background: "radial-gradient(ellipse at 70% 28%, rgba(255,122,41,0.22), transparent 36%), linear-gradient(145deg, #17110e 0%, #09090a 68%, #050506 100%)" }}
                  >
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(1px 1px at 18% 22%, #f6f2ea 50%, transparent 100%), radial-gradient(1px 1px at 70% 14%, #ffb173 50%, transparent 100%), radial-gradient(1px 1px at 48% 59%, #f6f2ea 50%, transparent 100%), radial-gradient(1px 1px at 86% 76%, #f6f2ea 50%, transparent 100%)", backgroundSize: "150px 150px" }} />
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
            <div className="mt-3 flex flex-wrap gap-3">
              {magazine.pdf_url && magazine.pdf_url !== "#" ? (
                <motion.a
                  href={magazine.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ember group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                  Download issue
                </motion.a>
              ) : (
                <span className="btn-quiet cursor-not-allowed opacity-60" aria-disabled="true">
                  PDF coming soon
                </span>
              )}
              <Link href="/magazine" className="btn-quiet group">
                Browse archive
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
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
