"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ambient/SectionHeading";
import { supabase } from "@/lib/supabaseClient";
import CometLine from "@/components/ambient/CometLine";

interface AstronomyEvent {
  id: string;
  title: string;
  event_date: string;
  description: string;
  location: string;
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

export default function AstronomyCalendar() {
  const [events, setEvents] = useState<AstronomyEvent[]>([]);
  const [nearestEvent, setNearestEvent] = useState<AstronomyEvent | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      let fetched = false;

      // Try fetching from the astronomy-events API first
      try {
        const res = await fetch("/api/astronomy-events");
        if (res.ok) {
          const json = await res.json();
          if (json.events && json.events.length > 0) {
            // Filter to events this month
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const monthEvents = json.events.filter((e: AstronomyEvent) => {
              const d = new Date(e.event_date);
              return d >= startOfMonth && d <= endOfMonth;
            });
            if (monthEvents.length > 0) {
              setEvents(monthEvents);
              const upcoming = monthEvents.find((e: AstronomyEvent) => new Date(e.event_date) > now);
              if (upcoming) setNearestEvent(upcoming);
              fetched = true;
            }
          }
        }
      } catch {
        // API fetch failed, will try Supabase
      }

      // Fallback to Supabase if API returned no events for this month
      if (!fetched) {
        try {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

          const { data } = await supabase
            .from("astronomy_events")
            .select("*")
            .gte("event_date", startOfMonth)
            .lte("event_date", endOfMonth)
            .order("event_date", { ascending: true });

          if (data && data.length > 0) {
            setEvents(data);
            const upcoming = data.find((e) => new Date(e.event_date) > now);
            if (upcoming) setNearestEvent(upcoming);
          }
        } catch {
          // Supabase fetch failed silently
        }
      }

      setLoading(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!nearestEvent) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(nearestEvent.event_date));
    }, 1000);
    setCountdown(getCountdown(nearestEvent.event_date));
    return () => clearInterval(interval);
  }, [nearestEvent]);

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute top-0 left-0 right-0" color="#ffb173" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#ffb173]/3 rounded-full blur-[100px] astro-drift-a" />

      <div className="max-w-content mx-auto relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Celestial events"
          title="ASTRONOMY CALENDAR"
          description="The month's sky, indexed for your next clear night."
        />

        {loading ? (
          <>
            <div className="rounded-lg border border-[#ffb173]/20 bg-[#0b0b0d]/80 backdrop-blur-sm p-6 mb-8 animate-pulse">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="w-full">
                  <div className="h-3 bg-[#121214] rounded w-1/4 mb-2" />
                  <div className="h-5 bg-[#121214] rounded w-1/2 mb-2" />
                  <div className="h-3 bg-[#121214] rounded w-1/3" />
                </div>
                <div className="flex items-center gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-14 h-14 rounded-lg bg-[#121214]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 p-5 animate-pulse">
                  <div className="h-3 bg-[#121214] rounded w-1/3 mb-3" />
                  <div className="h-4 bg-[#121214] rounded w-2/3 mb-2" />
                  <div className="h-3 bg-[#121214] rounded w-full" />
                </div>
              ))}
            </div>
          </>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-panel plate-frame px-6 py-14 text-center md:py-16"
          >
            <span className="kicker kicker-ember">Quiet skies</span>
            <p className="mt-3 font-display text-xl text-[#f6f2ea]">No major events are on the calendar this month.</p>
            <p className="mt-2 text-sm text-[#736d63]">Keep an eye on the horizon; the next good night is never far away.</p>
          </motion.div>
        ) : (
          <>
        {/* Nearest Event Countdown */}
        {nearestEvent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="home-panel plate-frame mb-8 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb173] animate-pulse" />
                <span
                  className="text-[#ffb173] text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Next Astronomical Event
                </span>
              </div>
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {nearestEvent.title}
              </h3>
              <p
                className="text-gray-400 text-sm mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {nearestEvent.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { val: countdown.days, label: "D" },
                { val: countdown.hours, label: "H" },
                { val: countdown.minutes, label: "M" },
                { val: countdown.seconds, label: "S" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center border border-[#ffb173]/25 bg-[#08080a]/75">
                    <motion.span
                      key={`${t.label}-${t.val}`}
                      initial={{ opacity: 0.25, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mono-data text-lg text-[#f6f2ea]"
                    >
                      {String(t.val).padStart(2, "0")}
                    </motion.span>
                  </div>
                  <span
                    className="text-[10px] text-gray-500 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        )}

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.slice(0, 3).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="home-panel p-5"
            >
              <p
                className="text-[#ffb173] text-xs mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {new Date(event.event_date).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h4
                className="text-white font-bold text-sm mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {event.title}
              </h4>
              <p
                className="text-gray-500 text-xs"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
          </>
        )}
      </div>
    </section>
  );
}
