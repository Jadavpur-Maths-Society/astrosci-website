"use client";
import { motion } from "framer-motion";

export default function MagazinePreview() {
  return (
    <section id="magazine" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #08080a 0%, #0a0a0c 50%, #08080a 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff7a29]/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff7a29]/6 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="kicker mb-3" style={{ fontFamily: "var(--font-body)" }}>
            — Publication —
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>NEBULA DIGEST</h2>
          <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Our flagship astronomy magazine, published each semester
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Magazine Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 bg-[#ff7a29]/20 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div
                className="relative rounded-lg overflow-hidden border border-[#ff7a29]/30 group-hover:border-[#ff7a29]/60 transition-all duration-500 cursor-pointer"
                style={{ aspectRatio: "3/4", background: "linear-gradient(135deg, #08080a 0%, #1a0a3e 40%, #0a0a0b 100%)" }}
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
                <div className="absolute top-1/4 right-1/4 w-32 h-32">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff7a29]/60 via-[#241a12] to-[#17130f] shadow-[0_0_40px_rgba(255,122,41,0.4)]" />
                </div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#ffb173]/10 rounded-full blur-[60px]" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <p className="text-[#ffb173] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-body)" }}>AstroSci Club · JU</p>
                    <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>NEBULA<br />DIGEST</h3>
                  </div>
                  <div>
                    <div className="h-px w-full bg-gradient-to-r from-[#ff7a29] to-[#e08b2e] mb-3 opacity-60" />
                    <p className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>VOL. 7</p>
                    <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: "var(--font-body)" }}>Spring 2025 Edition</p>
                    <p className="text-[#a78bfa] text-sm mt-3 font-medium leading-snug" style={{ fontFamily: "var(--font-body)" }}>
                      &ldquo;The Dark Energy<br />Conundrum&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-sm bg-[#ff7a29]/20 border border-[#ff7a29]/40">
                  <span className="text-[#a78bfa] text-xs font-bold tracking-widest" style={{ fontFamily: "var(--font-body)" }}>NEW ISSUE</span>
                </div>
                <span className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-body)" }}>Released · March 2025</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Nebula Digest<br />
                <span className="text-[#ff7a29]">Vol. 7</span> — Spring 2025
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Explore the cosmos through our latest edition — featuring in-depth articles on dark energy cosmology,
                our members&apos; best astrophotography, and a special interview with ISRO scientists.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: "The Dark Energy Conundrum", tag: "Cover Story" },
                { title: "JU Members' Best Shots of 2025", tag: "Astrophotography" },
                { title: "Interview: Scientists at ISRO", tag: "Exclusive" },
                { title: "Beginner's Guide to Starhopping", tag: "Tutorial" },
              ].map(({ title, tag }) => (
                <div key={title} className="flex items-center gap-3 py-2 border-b border-white/5">
                  <span className="w-1 h-4 rounded-full bg-[#ff7a29]" />
                  <span className="text-sm text-gray-300 flex-1" style={{ fontFamily: "var(--font-body)" }}>{title}</span>
                  <span className="text-xs text-[#ff7a29] bg-[#ff7a29]/10 px-2 py-0.5 rounded-sm" style={{ fontFamily: "var(--font-body)" }}>{tag}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <motion.button
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#ff7a29] to-[#e2600f] text-white text-sm font-semibold shadow-[0_0_25px_rgba(255,122,41,0.4)] hover:shadow-[0_0_40px_rgba(255,122,41,0.6)] transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                ↓ Download Free
              </motion.button>
              <motion.button
                className="px-5 py-3 rounded-lg border border-white/10 text-gray-400 text-sm hover:border-white/20 hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
                whileHover={{ scale: 1.03 }}
              >
                Archive →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
