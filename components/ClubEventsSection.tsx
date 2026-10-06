"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ambient/SectionHeading";
import { supabase } from "@/lib/supabaseClient";
import CometLine from "@/components/ambient/CometLine";

interface ClubEvent {
  id: string;
  title: string;
  event_date: string;
  description: string;
  location: string;
  poster_url: string;
}

function getCountdown(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ClubEventsSection() {
  const [nextEvent, setNextEvent] = useState<ClubEvent | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);
  const [posterExpanded, setPosterExpanded] = useState(false);

  const defaultGradient = "radial-gradient(ellipse at 50% 50%, #241a12 0%, #08080a 100%)";

  useEffect(() => {
    async function fetchNextEvent() {
      try {
        const { data } = await supabase
          .from("club_events")
          .select("*")
          .gte("event_date", new Date().toISOString())
          .order("event_date", { ascending: true })
          .limit(1)
          .single();
        if (data) setNextEvent(data);
      } catch {
        // fetch failed silently
      }
      setLoading(false);
    }
    fetchNextEvent();
  }, []);

  useEffect(() => {
    if (!nextEvent) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(nextEvent.event_date));
    }, 1000);
    setCountdown(getCountdown(nextEvent.event_date));
    return () => clearInterval(interval);
  }, [nextEvent]);

  const eventDateObj = nextEvent ? new Date(nextEvent.event_date) : null;
  const isExpired = eventDateObj ? eventDateObj.getTime() <= Date.now() : false;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ff7a29" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#ff7a29]/5 rounded-full blur-[100px] astro-drift-b" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="07"
          eyebrow="Club activities"
          title="CLUB EVENTS"
          description="Field sessions, talks and nights spent under the stars."
          action={(
            <Link href="/events" className="section-action group">
              <span>See the full schedule</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        />

        {/* Loading skeleton */}
        {loading ? (
          <div className="rounded-lg border border-[#ff7a29]/20 bg-[#0b0b0d]/80 backdrop-blur-sm p-6 md:p-8 animate-pulse">
            <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
              <div className="w-full rounded-lg bg-[#121214]" style={{ aspectRatio: "3/4" }} />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="flex-1 w-full">
                    <div className="h-3 bg-[#121214] rounded w-1/4 mb-3" />
                    <div className="h-6 bg-[#121214] rounded w-2/3 mb-3" />
                    <div className="h-3 bg-[#121214] rounded w-1/3 mb-2" />
                    <div className="h-3 bg-[#121214] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#121214] rounded w-1/2" />
                  </div>
                  <div className="h-10 bg-[#121214] rounded w-32 shrink-0" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-[#121214]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : !nextEvent ? (
          <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center">
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No upcoming events — stay tuned!
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="home-panel"
          >
            <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
              {/* Event Poster */}
              <div
                className="relative overflow-hidden bg-[#08080a] border-r border-[#ff7a29]/10 cursor-pointer group"
                style={{ aspectRatio: "3/4", minHeight: "280px" }}
                onClick={() => setPosterExpanded(true)}
              >
                {nextEvent.poster_url ? (
                  <>
                    <img
                      src={nextEvent.poster_url}
                      alt={`${nextEvent.title} poster`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span
                        className="text-white text-xs bg-[#ff7a29]/80 px-3 py-1 rounded-sm"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Click to enlarge
                      </span>
                    </div>
                    <span className="shine-sweep" aria-hidden />
                  </>
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center" style={{ background: defaultGradient }}>
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
                    <span className="text-[#ffb173]/40 text-3xl">🔭</span>
                  </div>
                )}
              </div>

              {/* Event Details + Countdown */}
              <div className="flex flex-col gap-6 p-6 md:p-8">
                {/* Title & metadata */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffb173] animate-pulse" />
                      <span
                        className="text-[#ffb173] text-xs tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {isExpired ? "Recent Event" : "Next Club Event"}
                      </span>
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {nextEvent.title}
                    </h3>
                    <div className="flex items-start gap-1.5 mb-2">
                      <span className="text-sm mt-0.5">📍</span>
                      <p
                        className="text-gray-300 text-sm"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {nextEvent.location}
                      </p>
                    </div>
                    {nextEvent.description && (
                      <p
                        className="text-gray-400 text-sm leading-relaxed mt-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {nextEvent.description}
                      </p>
                    )}
                  </div>

                  {/* Date badge */}
                  <div className="shrink-0 border border-[#ff7a29]/20 bg-[#121214]/65 px-4 py-3 text-left md:text-right">
                    <p
                      className="text-gray-500 text-xs mb-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Event Date
                    </p>
                    <p
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {new Date(nextEvent.event_date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p
                      className="text-[#ffb173] text-xs mt-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {new Date(nextEvent.event_date).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      IST
                    </p>
                  </div>
                </div>

                {/* Countdown */}
                <div>
                  <p
                    className="text-xs text-gray-600 uppercase tracking-widest mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {isExpired ? "Event has passed" : "Countdown"}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                    {[
                      { val: countdown.days, label: "Days" },
                      { val: countdown.hours, label: "Hours" },
                      { val: countdown.minutes, label: "Min" },
                      { val: countdown.seconds, label: "Sec" },
                    ].map((t, i) => (
                      <div key={t.label} className="flex items-center gap-3 md:gap-4">
                        <div className="text-center">
                          <div className="flex h-16 w-16 items-center justify-center border border-[#ff7a29]/25 bg-gradient-to-b from-[#ff7a29]/[0.11] to-[#08080a] md:h-20 md:w-20">
                            <motion.span
                              key={t.val}
                              initial={{ opacity: 0.5, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-2xl md:text-3xl font-black text-white"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {String(t.val).padStart(2, "0")}
                            </motion.span>
                          </div>
                          <span
                            className="text-xs text-gray-500 mt-1 block"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {t.label}
                          </span>
                        </div>
                        {i < 3 && (
                          <span className="text-2xl font-light text-[#ff7a29] -mt-4">:</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  <Link href="/events" className="btn-quiet group">
                    View event details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Poster lightbox */}
      {posterExpanded && nextEvent?.poster_url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setPosterExpanded(false)}
        >
          <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={nextEvent.poster_url}
            alt={nextEvent.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-light transition-colors"
            onClick={() => setPosterExpanded(false)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  );
}
