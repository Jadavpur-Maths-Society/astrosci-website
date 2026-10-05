"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ISSTrackerWidgetProps {
  preview?: boolean;
}

interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

let cachedData: { data: ISSPosition; fetchedAt: number } | null = null;
const CACHE_TTL = 5000; // 5 seconds

async function fetchISSPosition(): Promise<ISSPosition> {
  if (cachedData && Date.now() - cachedData.fetchedAt < CACHE_TTL) {
    return cachedData.data;
  }

  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", {
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`ISS API error: ${res.status}`);

  const json = await res.json();
  const position: ISSPosition = {
    latitude: json.latitude,
    longitude: json.longitude,
    altitude: json.altitude,
    velocity: json.velocity,
    timestamp: json.timestamp,
  };

  cachedData = { data: position, fetchedAt: Date.now() };
  return position;
}

function formatCoord(value: number, posLabel: string, negLabel: string): string {
  const dir = value >= 0 ? posLabel : negLabel;
  return `${Math.abs(value).toFixed(2)}° ${dir}`;
}

function ISSMap({ latitude, longitude }: { latitude: number; longitude: number }) {
  // Map lat/long to position on equirectangular projection
  // Longitude: -180 to 180 → 0 to 100%
  // Latitude: 90 to -90 → 0 to 100%
  const x = ((longitude + 180) / 360) * 100;
  const y = ((90 - latitude) / 180) * 100;

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-[#26231f]" style={{ aspectRatio: "2/1" }}>
      {/* Background gradient representing Earth */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #12100e 0%, #1a1410 25%, #141210 50%, #1a1410 75%, #12100e 100%)",
        }}
      />

      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((lat) => (
          <line
            key={`lat-${lat}`}
            x1={0}
            y1={90 - lat}
            x2={360}
            y2={90 - lat}
            stroke="#26231f"
            strokeWidth={lat === 0 ? 0.8 : 0.4}
            strokeDasharray={lat === 0 ? undefined : "4 4"}
          />
        ))}
        {/* Longitude lines */}
        {[-120, -60, 0, 60, 120].map((lon) => (
          <line
            key={`lon-${lon}`}
            x1={lon + 180}
            y1={0}
            x2={lon + 180}
            y2={180}
            stroke="#26231f"
            strokeWidth={lon === 0 ? 0.8 : 0.4}
            strokeDasharray={lon === 0 ? undefined : "4 4"}
          />
        ))}

        {/* Simplified continent outlines as filled regions */}
        {/* North America */}
        <path
          d="M55,35 L70,30 L85,32 L95,40 L100,50 L95,55 L85,60 L80,65 L70,60 L60,50 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
        {/* South America */}
        <path
          d="M90,80 L100,75 L105,80 L108,95 L105,110 L98,120 L90,115 L85,100 L87,90 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
        {/* Europe */}
        <path
          d="M170,35 L185,30 L195,32 L200,38 L195,45 L185,48 L175,45 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
        {/* Africa */}
        <path
          d="M175,55 L190,50 L200,55 L205,70 L200,90 L195,100 L185,105 L175,95 L170,80 L172,65 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
        {/* Asia */}
        <path
          d="M200,25 L230,20 L260,25 L280,30 L290,40 L280,50 L260,55 L240,50 L220,48 L210,45 L200,38 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
        {/* Australia */}
        <path
          d="M275,100 L295,95 L305,100 L305,110 L295,115 L280,112 Z"
          fill="#1a3a2a"
          opacity={0.4}
          stroke="#2a5a3a"
          strokeWidth={0.3}
        />
      </svg>

      {/* ISS Position */}
      <motion.div
        className="absolute z-10"
        style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute rounded-full border border-[#ffb173]/50"
          style={{ width: 24, height: 24, top: -8, left: -8 }}
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Dot */}
        <div className="w-2 h-2 rounded-full bg-[#ffb173] shadow-[0_0_8px_2px_rgba(255,177,115,0.6)]" />
      </motion.div>

      {/* Coordinate labels */}
      <div className="absolute bottom-2 left-2 text-[10px] text-[#ece7de]/40" style={{ fontFamily: "var(--font-mono)" }}>
        90°S
      </div>
      <div className="absolute top-2 left-2 text-[10px] text-[#ece7de]/40" style={{ fontFamily: "var(--font-mono)" }}>
        90°N
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] text-[#ece7de]/40" style={{ fontFamily: "var(--font-mono)" }}>
        180°E
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#ece7de]/40" style={{ fontFamily: "var(--font-mono)" }}>
        0°
      </div>
    </div>
  );
}

export default function ISSTrackerWidget({ preview = false }: ISSTrackerWidgetProps) {
  const [position, setPosition] = useState<ISSPosition | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPosition = useCallback(async () => {
    try {
      const pos = await fetchISSPosition();
      setPosition(pos);
      setError(false);
    } catch {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosition();
    const interval = setInterval(loadPosition, 5000);
    return () => clearInterval(interval);
  }, [loadPosition]);

  if (loading) {
    return (
      <div className={`rounded-xl border border-[#26231f] bg-[#121214] ${preview ? "p-4" : "p-6"} animate-pulse`}>
        <div className="h-4 bg-[#26231f] rounded w-1/3 mb-3" />
        <div className="h-6 bg-[#26231f] rounded w-2/3 mb-4" />
        {!preview && <div className="w-full bg-[#26231f] rounded-lg" style={{ aspectRatio: "2/1" }} />}
      </div>
    );
  }

  if (error && !position) {
    return (
      <div className={`rounded-xl border border-[#26231f] bg-[#121214] ${preview ? "p-4" : "p-6"}`}>
        <p
          className="text-xs tracking-[0.3em] text-[#ffb173] mb-1 uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ISS Tracker
        </p>
        <p
          className="text-sm text-[#ece7de]/50"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Unable to fetch ISS position. Retrying…
        </p>
      </div>
    );
  }

  if (!position) return null;

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-[#26231f] bg-[#121214]/80 p-5 hover:border-[#ffb173]/30 transition-all"
      >
        <div className="flex items-center gap-4">
          {/* Mini position indicator */}
          <div className="relative flex-shrink-0 w-14 h-14 rounded-lg bg-[#08080a]/60 border border-[#26231f] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              {/* Mini grid */}
              <svg className="w-full h-full" viewBox="0 0 56 56">
                <line x1={0} y1={28} x2={56} y2={28} stroke="#26231f" strokeWidth={0.5} />
                <line x1={28} y1={0} x2={28} y2={56} stroke="#26231f" strokeWidth={0.5} />
              </svg>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full bg-[#e08b2e] shadow-[0_0_6px_2px_rgba(224,139,46,0.5)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs tracking-[0.3em] text-[#ffb173] mb-1 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              ISS Location
            </p>
            <p
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatCoord(position.latitude, "N", "S")}
            </p>
            <p
              className="text-sm text-[#ece7de]/70"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatCoord(position.longitude, "E", "W")}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-lg border border-[#26231f] bg-[#121214]/80 p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className="kicker mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            — International Space Station —
          </p>
          <h2
            className="section-title leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ISS TRACKER
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#e08b2e]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            className="text-xs text-[#e08b2e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            LIVE
          </span>
        </div>
      </div>

      <ISSMap latitude={position.latitude} longitude={position.longitude} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
          <p
            className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Latitude
          </p>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatCoord(position.latitude, "N", "S")}
          </p>
        </div>
        <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
          <p
            className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Longitude
          </p>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatCoord(position.longitude, "E", "W")}
          </p>
        </div>
        <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
          <p
            className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Altitude
          </p>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {position.altitude.toFixed(1)} km
          </p>
        </div>
        <div className="rounded-lg bg-[#08080a]/60 border border-[#26231f] p-4">
          <p
            className="text-xs text-[#ece7de]/50 uppercase tracking-wider mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Velocity
          </p>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {position.velocity.toFixed(0)} km/h
          </p>
        </div>
      </div>

      {error && (
        <p
          className="text-xs text-yellow-500/70 mt-4 text-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Connection issue — showing last known position
        </p>
      )}
    </motion.div>
  );
}
