"use client";
import { motion } from "framer-motion";

function MoonWidget() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-lg border border-[#ff7a29]/20 bg-[#0b0b0d]/80 p-6 hover:border-[#ff7a29]/50 hover:shadow-[0_0_40px_rgba(255,122,41,0.15)] transition-all duration-400 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-[#ffb173] animate-pulse" />
        <p className="text-xs text-gray-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>Live Data</p>
      </div>
      <div className="flex flex-col items-center gap-4 mb-5">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-[#ff7a29]/10 blur-xl" />
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden"
            style={{ background: "radial-gradient(circle at 35% 35%, #d9d3c8, #736d63, #3a3630)" }}
          >
            <div className="absolute top-6 left-8 w-4 h-4 rounded-full bg-black/20" />
            <div className="absolute bottom-8 right-6 w-3 h-3 rounded-full bg-black/15" />
            <div className="absolute top-12 right-8 w-2 h-2 rounded-full bg-black/20" />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(8,8,10,0.7) 70%)" }}
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Waxing Gibbous</p>
          <p className="text-[#ffb173] text-sm mt-1" style={{ fontFamily: "var(--font-body)" }}>78% Illuminated</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Moonrise</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>14:32 IST</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Moonset</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>03:18 IST</p>
        </div>
      </div>
      <h3 className="text-center text-lg font-bold text-white mt-4" style={{ fontFamily: "var(--font-display)" }}>Moon Phase</h3>
    </motion.div>
  );
}

function ISSWidget() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-lg border border-[#ffb173]/20 bg-[#0b0b0d]/80 p-6 hover:border-[#ffb173]/50 hover:shadow-[0_0_40px_rgba(255,177,115,0.15)] transition-all duration-400 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-[#ffb173] animate-ping absolute" />
        <div className="w-2 h-2 rounded-full bg-[#ffb173]" />
        <p className="text-xs text-gray-500 tracking-widest uppercase ml-3" style={{ fontFamily: "var(--font-body)" }}>Tracking Active</p>
      </div>
      <div
        className="w-full h-32 rounded-lg mb-4 relative overflow-hidden border border-[#ffb173]/10"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #051a2e 0%, #08080a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(255,177,115,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,177,115,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 border border-[#ffb173]/30 rounded-full" style={{ transform: "translate(-50%, -50%) rotate(-30deg)" }} />
        <div className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full bg-[#ffb173] shadow-[0_0_10px_#ffb173]" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
        <div className="absolute bottom-2 left-3 text-[#ffb173]/50 text-[9px]" style={{ fontFamily: "var(--font-body)" }}>LIVE ORBIT TRACKER</div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Altitude</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>408 km</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Speed</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>27,600 km/h</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Over</p>
          <p className="text-[#ffb173] text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>Indian Ocean</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Next Pass</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>21:14 IST</p>
        </div>
      </div>
      <h3 className="text-center text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>ISS Tracker</h3>
    </motion.div>
  );
}

function MeteorWidget() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-lg border border-[#ff9d3d]/20 bg-[#0b0b0d]/80 p-6 hover:border-[#ff9d3d]/50 hover:shadow-[0_0_40px_rgba(255,157,61,0.15)] transition-all duration-400 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-[#ff9d3d]" />
        <p className="text-xs text-gray-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>Upcoming Event</p>
      </div>
      <div
        className="w-full h-28 rounded-lg mb-4 relative overflow-hidden border border-[#ff9d3d]/10 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0a0800 0%, #08080a 100%)" }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-[#ff9d3d] to-transparent rounded-full opacity-70"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 60}%`,
              transform: `rotate(${-30 + Math.random() * 20}deg)`,
            }}
          />
        ))}
        <span className="text-4xl relative z-10">☄️</span>
      </div>
      <div className="text-center mb-4">
        <p className="text-white font-bold text-xl mb-1" style={{ fontFamily: "var(--font-display)" }}>ETA AQUARIIDS</p>
        <p className="text-[#ff9d3d] text-sm" style={{ fontFamily: "var(--font-body)" }}>Peak: May 6, 2025</p>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>Rate</p>
          <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>~50/hour</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1" style={{ fontFamily: "var(--font-body)" }}>In</p>
          <p className="text-[#ff9d3d] text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>29 days</p>
        </div>
      </div>
      <h3 className="text-center text-lg font-bold text-white mt-4" style={{ fontFamily: "var(--font-display)" }}>Meteor Shower</h3>
    </motion.div>
  );
}

export default function WidgetSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#08080a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff7a29]/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#ff7a29]/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="kicker mb-3" style={{ fontFamily: "var(--font-body)" }}>
            — Observatory Dashboard —
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            LIVE ASTRONOMY WIDGETS
          </h2>
          <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Real-time space data for the curious astronomer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[MoonWidget, ISSWidget, MeteorWidget].map((Widget, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Widget />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
