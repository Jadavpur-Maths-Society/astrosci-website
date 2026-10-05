"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

function getGreeting(): string {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  });
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 22 || hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 pt-24 pb-10"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Link href="/profile" className="group" aria-label="Open your profile">
          <span className="relative block h-24 w-24">
            {/* hairline ring */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#ff7a29]/60"
            />
            {/* rotating tick on the ring */}
            <span aria-hidden className="absolute -inset-2 astro-spin-slower">
              <span className="absolute left-1/2 top-0 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb173]" />
            </span>
            <span className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full bg-[#121214]">
              {profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg viewBox="0 0 24 24" className="h-10 w-10 fill-[#585349]" aria-hidden>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5"
        >
          <p className="kicker kicker-ember mb-2">{greeting}</p>
          <h1 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#f6f2ea] md:text-3xl">
            Hello, <span className="serif-accent font-normal text-[#b9b3a7]">{userName}</span>
          </h1>
        </motion.div>
      </div>
    </motion.section>
  );
}
