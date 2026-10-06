"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import CometLine from "@/components/ambient/CometLine";

function getGreeting(): string {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  });
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 22 || hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function ProfileGreeting() {
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [greeting] = useState(getGreeting());

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("name, profile_image")
            .eq("id", user.id)
            .maybeSingle();
          if (data) {
            setUserName(data.name || "Explorer");
            setProfileImage(data.profile_image || "");
          } else {
            setUserName(
              user.user_metadata?.name || user.user_metadata?.full_name || "Explorer"
            );
          }
        } else {
          setUserName("Explorer");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUserName("Explorer");
      }
    }
    fetchProfile();
  }, []);

  const displayedName = userName || "Explorer";

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
      <CometLine className="absolute left-0 right-0 top-0" color="#ffb173" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="home-panel plate-frame relative mx-auto max-w-content p-6 md:p-8 lg:p-10"
      >
        <span className="plate-corner" aria-hidden="true" />
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#ff7a29]/[0.055] blur-3xl" aria-hidden="true" />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
          <div className="flex items-center gap-5 md:gap-7">
            <Link href="/profile" className="group shrink-0" aria-label="Open your profile">
              <span className="relative block h-[4.5rem] w-[4.5rem] md:h-24 md:w-24">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#ff7a29]/60"
                />
                <span aria-hidden="true" className="absolute -inset-2 astro-spin-slower">
                  <span className="absolute left-1/2 top-0 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb173]" />
                </span>
                <span className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full bg-[#121214]">
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profileImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-9 w-9 fill-[#585349] md:h-10 md:w-10" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </span>
              </span>
            </Link>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="kicker kicker-ember">{greeting}</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span className="mono-data text-[0.55rem] uppercase tracking-[0.16em] text-[#6a655c]">Observer&apos;s log · 01</span>
              </div>
              <h1 className="font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#f6f2ea] sm:text-3xl md:text-4xl">
                Hello, <span className="serif-accent font-normal text-[#ffb173]">{displayedName}</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#736d63]">
                Your place in the universe is right here. Take a look around, find your next sky to explore.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-5 md:min-w-[220px] md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="kicker text-[#6a655c]">Your observatory</p>
              <p className="mono-data mt-2 text-[0.64rem] uppercase tracking-[0.14em] text-[#948d81]">22.4996° N · 88.3716° E</p>
            </div>
            <Link href="/profile" className="section-action group w-fit">
              <span>Open your profile</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
