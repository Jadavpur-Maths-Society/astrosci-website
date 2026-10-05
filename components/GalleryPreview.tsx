"use client";
import { motion } from "framer-motion";

const galleryItems = [
  { title: "Orion Nebula", photographer: "Priya Sen", gradient: "radial-gradient(ellipse at 40% 50%, #b8430a 0%, #17130f 40%, #08080a 100%)", glow: "#ff8f4d", tag: "Nebula" },
  { title: "Andromeda Galaxy", photographer: "Arjun Bose", gradient: "radial-gradient(ellipse at 60% 40%, #5a3611 0%, #1a1207 50%, #08080a 100%)", glow: "#f0a461", tag: "Galaxy" },
  { title: "Saturn Transit", photographer: "Sneha Das", gradient: "radial-gradient(ellipse at 50% 60%, #6b3a12 0%, #3b1a09 50%, #08080a 100%)", glow: "#ff9d3d", tag: "Planets" },
  { title: "Milky Way Core", photographer: "Ravi Chatterjee", gradient: "radial-gradient(ellipse at 50% 40%, #241a12 0%, #3a1e0f 30%, #08080a 80%)", glow: "#ff7a29", tag: "Milky Way" },
  { title: "Lunar Eclipse", photographer: "Mita Roy", gradient: "radial-gradient(ellipse at 45% 45%, #5b2318 0%, #2b1310 50%, #08080a 100%)", glow: "#e5533d", tag: "Moon" },
  { title: "Pleiades Cluster", photographer: "Dibya Ghosh", gradient: "radial-gradient(ellipse at 55% 40%, #2a1c0e 0%, #2c1d0e 40%, #08080a 100%)", glow: "#ffb173", tag: "Star Cluster" },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="py-24 px-6 relative overflow-hidden bg-[#08080a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb173]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4"
        >
          <div>
            <p className="kicker mb-3" style={{ fontFamily: "var(--font-body)" }}>
              — Astrophotography —
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>GALLERY PREVIEW</h2>
            <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>Shot by our members, from our campus</p>
          </div>
          <motion.a
            href="#gallery"
            className="text-sm text-[#ffb173] border-b border-[#ffb173]/40 hover:border-[#ffb173] transition-colors pb-1 whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)" }}
            whileHover={{ x: 4 }}
          >
            Open Full Gallery →
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative rounded-lg overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-400"
              style={{ aspectRatio: i === 0 || i === 3 ? "1/1" : "4/3" }}
            >
              <div className="w-full h-full relative" style={{ background: item.gradient }}>
                {[...Array(25)].map((_, j) => (
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
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-3xl opacity-50"
                  style={{ background: item.glow }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>{item.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>by {item.photographer}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-sm border"
                      style={{ fontFamily: "var(--font-body)", color: item.glow, borderColor: `${item.glow}40`, background: `${item.glow}15` }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Static tag */}
              <div className="absolute top-3 right-3 opacity-100 group-hover:opacity-0 transition-opacity">
                <span
                  className="text-xs px-2 py-0.5 rounded-sm border bg-black/40 backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-body)", color: item.glow, borderColor: `${item.glow}30` }}
                >
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.button
            className="px-6 py-3 sm:px-10 sm:py-4 rounded-sm border border-[#ffb173]/30 text-[#ffb173] text-xs sm:text-sm font-medium hover:bg-[#ffb173]/10 hover:border-[#ffb173]/60 hover:shadow-[0_0_30px_rgba(255,177,115,0.2)] transition-all duration-300"
            style={{ fontFamily: "var(--font-display)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View All 200+ Photos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
