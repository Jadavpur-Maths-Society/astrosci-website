"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";
import { supabase } from "@/lib/supabaseClient";

interface ClubEvent {
  id: string;
  title: string;
  event_date: string;
  description: string;
  location: string;
  poster_url: string;
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<ClubEvent[]>([]);
  const [past, setPast] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenEvent, setFullscreenEvent] = useState<ClubEvent | null>(null);

  const defaultGradient = "radial-gradient(ellipse at 50% 50%, #241a12 0%, #08080a 100%)";

  useEffect(() => {
    async function fetchEvents() {
      try {
        const now = new Date().toISOString();

        const { data: upcomingData } = await supabase
          .from("club_events")
          .select("*")
          .gte("event_date", now)
          .order("event_date", { ascending: true });

        const { data: pastData } = await supabase
          .from("club_events")
          .select("*")
          .lt("event_date", now)
          .order("event_date", { ascending: false });

        console.log("events", upcomingData, pastData);
        if (upcomingData) setUpcoming(upcomingData);
        if (pastData) setPast(pastData);
      } catch {
        // Supabase fetch failed silently
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  function renderEventCard(event: ClubEvent, i: number) {
    return (
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        whileHover={{ y: -4 }}
        className="group rounded-lg overflow-hidden border border-white/10 bg-[#0b0b0d]/80 backdrop-blur-sm hover:border-[#ff7a29]/40 transition-all"
      >
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ aspectRatio: "16/9" }}
          onClick={() => event.poster_url && setFullscreenEvent(event)}
        >
          {event.poster_url ? (
            <img
              src={event.poster_url}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full" style={{ background: defaultGradient }}>
              {[...Array(20)].map((_, j) => (
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
            </div>
          )}
        </div>
        <div className="p-5">
          <h3
            className="text-white font-bold text-base mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {event.title}
          </h3>
          <p
            className="text-[#ffb173] text-xs mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {new Date(event.event_date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" · "}
            📍 {event.location}
          </p>
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {event.description}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
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
              — Club Activities —
            </p>
            <h1
              className="section-title leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EVENTS
            </h1>
          </motion.div>

          {/* Upcoming */}
          <div className="mb-16">
            <h2
              className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#ffb173] animate-pulse" />
              Upcoming Events
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-white/10 bg-[#0b0b0d]/80 animate-pulse">
                    <div className="w-full bg-[#121214]" style={{ aspectRatio: "16/9" }} />
                    <div className="p-5">
                      <div className="h-4 bg-[#121214] rounded w-3/4 mb-2" />
                      <div className="h-3 bg-[#121214] rounded w-1/2 mb-2" />
                      <div className="h-3 bg-[#121214] rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center">
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  No upcoming events — stay tuned!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcoming.map((event, i) => renderEventCard(event, i))}
              </div>
            )}
          </div>

          {/* Past */}
          <div>
            <h2
              className="text-xl font-bold text-gray-400 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Past Events
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-white/10 bg-[#0b0b0d]/80 animate-pulse">
                    <div className="w-full bg-[#121214]" style={{ aspectRatio: "16/9" }} />
                    <div className="p-5">
                      <div className="h-4 bg-[#121214] rounded w-3/4 mb-2" />
                      <div className="h-3 bg-[#121214] rounded w-1/2 mb-2" />
                      <div className="h-3 bg-[#121214] rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : past.length === 0 ? (
              <div className="rounded-lg border border-white/10 bg-[#0b0b0d]/60 py-16 text-center opacity-80">
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  No past events yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
                {past.map((event, i) => renderEventCard(event, i))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <FullscreenImageViewer
        src={fullscreenEvent?.poster_url ?? ""}
        alt={fullscreenEvent?.title ?? ""}
        caption={fullscreenEvent?.title}
        subCaption={
          fullscreenEvent
            ? `${new Date(fullscreenEvent.event_date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} · 📍 ${fullscreenEvent.location}`
            : undefined
        }
        isOpen={!!fullscreenEvent}
        onClose={() => setFullscreenEvent(null)}
      />
    </main>
  );
}
