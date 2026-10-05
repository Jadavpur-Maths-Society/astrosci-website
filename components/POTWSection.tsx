"use client";
import { motion } from "framer-motion";

export default function POTWSection() {
  return (
    <section id="potw" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#08080a]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb173]/30 to-transparent" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#ffb173]/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="kicker mb-3" style={{ fontFamily: "var(--font-body)" }}>
            — Photo of the Week —
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            POTW
          </h2>
          <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Featured astrophotography from our community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-lg overflow-hidden border border-[#ffb173]/20 bg-[#0b0b0d]/80 backdrop-blur-sm group">
            {/* Image area */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16/9",
                background: "radial-gradient(ellipse at 40% 50%, #17130f 0%, #08080a 40%, #08080a 100%)",
              }}
            >
              {/* Decorative stars */}
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 2.5 + 0.5}px`,
                    height: `${Math.random() * 2.5 + 0.5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
              {/* Nebula glow */}
              <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#ff7a29]/30 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#ffb173]/15 rounded-full blur-[60px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff7a29]/60 via-[#241a12] to-[#17130f] shadow-[0_0_60px_rgba(255,122,41,0.5)]" />
              </div>

              {/* POTW badge */}
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1.5 rounded-sm bg-[#ffb173]/20 border border-[#ffb173]/40 backdrop-blur-sm">
                  <span className="text-[#ffb173] text-xs font-bold tracking-widest" style={{ fontFamily: "var(--font-body)" }}>
                    ★ POTW
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    The Carina Nebula
                  </h3>
                  <p className="text-[#ffb173] text-sm" style={{ fontFamily: "var(--font-body)" }}>
                    📸 Photographed by Anika Mukherjee
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-sm bg-[#ff7a29]/15 border border-[#ff7a29]/30 text-[#a78bfa] text-xs" style={{ fontFamily: "var(--font-body)" }}>
                    Nebula
                  </span>
                  <span className="px-3 py-1 rounded-sm bg-[#ffb173]/15 border border-[#ffb173]/30 text-[#ffb173] text-xs" style={{ fontFamily: "var(--font-body)" }}>
                    Deep Sky
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                A breathtaking capture of the Carina Nebula, one of the largest and brightest nebulae in the sky.
                Shot from the JU campus observatory using a 10-inch Dobsonian telescope with a DSLR adapter.
                This image was created by stacking 120 frames during a clear moonless night.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#gallery"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-sm bg-gradient-to-r from-[#ffb173]/20 to-[#ff7a29]/20 border border-[#ffb173]/40 text-[#ffb173] text-sm font-medium hover:from-[#ffb173]/30 hover:to-[#ff7a29]/30 hover:shadow-[0_0_30px_rgba(255,177,115,0.3)] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Gallery →
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
