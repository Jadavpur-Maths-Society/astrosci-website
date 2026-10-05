"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEADLINE = new Date("2026-06-06T11:30:00Z");

function getTimeLeft() {
  const diff = DEADLINE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function RecruitmentBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Don't render after deadline
  if (!timeLeft) return null;

  return (
    <section className="relative mx-4 my-8 overflow-hidden border border-white/10 bg-[#0b0b0d] md:mx-8">
      {/* hairline top edge with a single ember segment */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,122,41,0.6) 30%, rgba(255,122,41,0.6) 70%, transparent)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-6 py-7 md:flex-row md:justify-between md:gap-10 md:py-8">
        {/* Left: text */}
        <div className="text-center md:text-left">
          <div className="mb-3 flex items-center justify-center gap-2.5 md:justify-start">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#ff7a29]" aria-hidden />
            <span className="kicker kicker-ember">Recruitment open</span>
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#f6f2ea] md:text-3xl">
            Join the club <span className="serif-accent font-normal text-[#b9b3a7]">2025–26</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#736d63]">
            PR · Design · Tech · Video · Content — applications close{" "}
            <span className="text-[#ffb173]">June 6 · 5:00 PM IST</span>
          </p>
        </div>

        {/* Right: countdown + action */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-3" role="timer" aria-label="Time until applications close">
            {[
              { val: timeLeft.days, lbl: "Days" },
              { val: timeLeft.hours, lbl: "Hrs" },
              { val: timeLeft.minutes, lbl: "Min" },
              { val: timeLeft.seconds, lbl: "Sec" },
            ].map((b) => (
              <div key={b.lbl} className="flex flex-col items-center">
                <span className="mono-data text-xl leading-none text-[#f6f2ea] md:text-2xl">
                  {pad(b.val)}
                </span>
                <span className="mono-data mt-1.5 text-[0.55rem] uppercase tracking-[0.22em] text-[#585349]">
                  {b.lbl}
                </span>
              </div>
            ))}
          </div>
          <Link href="/recruitment" className="btn-ember shrink-0">
            Apply now
          </Link>
        </div>
      </div>
    </section>
  );
}
