"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { siteConfig } from "@/config/siteConfig";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "POTW", href: "/potw" },
  { label: "Magazine", href: "/magazine" },
  { label: "Projects", href: "/projects" },
  { label: "Astronomy", href: "/astronomy" },
  { label: "Team", href: "/team" },
  { label: "Members", href: "/members" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Donators", href: "/donators" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    async function checkAuth() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setIsSignedIn(true);
          const { data } = await supabase
            .from("profiles")
            .select("profile_image")
            .eq("id", user.id)
            .maybeSingle();
          if (data?.profile_image) setProfileImage(data.profile_image);
        }
      } catch {
        // auth check failed silently
      }
    }
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
      if (!session?.user) setProfileImage("");
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#08080a]/88 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-6 px-6">
        {/* wordmark */}
        <Link href="/" className="group flex items-center gap-3" aria-label="AstroSci Club, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.assets.logo}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] text-[#f6f2ea]">
              ASTROSCI
            </span>
            <span className="mono-data mt-0.5 text-[0.55rem] uppercase tracking-[0.26em] text-[#6a655c]">
              Jadavpur University
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center xl:flex">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative px-2.5 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-[#948d81] transition-colors hover:text-[#f6f2ea]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                aria-hidden
                className="absolute inset-x-2.5 bottom-0.5 h-px origin-left scale-x-0 bg-[#ff7a29] transition-transform duration-300 group-hover:scale-x-100"
                style={{ transitionDelay: `${Math.min(i, 6) * 12}ms` }}
              />
              {item.label}
            </Link>
          ))}
        </div>

        {/* account cluster */}
        <div className="hidden items-center gap-5 xl:flex">
          {isSignedIn ? (
            <Link href="/profile" className="flex items-center gap-2.5" aria-label="Your profile">
              <span className="mono-data text-[0.6rem] uppercase tracking-[0.22em] text-[#948d81] transition-colors hover:text-[#f6f2ea]">
                Profile
              </span>
              <span className="relative block h-7 w-7 overflow-hidden rounded-full border border-white/15">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-[#171614]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#948d81]" aria-hidden>
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                )}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="text-[0.66rem] uppercase tracking-[0.18em] text-[#948d81] transition-colors hover:text-[#f6f2ea]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Log in
            </Link>
          )}
          <Link
            href="/recruitment"
            className="border border-[#ff7a29] bg-[#ff7a29] px-4 py-2 text-[0.64rem] uppercase tracking-[0.18em] text-[#17110b] transition-colors hover:border-[#ffb173] hover:bg-[#ffb173]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Recruiting
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-white/10 xl:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-px w-4 bg-[#f6f2ea] transition-transform duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-4 bg-[#f6f2ea] transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#08080a]/97 backdrop-blur-xl xl:hidden"
          >
            <div className="mx-auto max-w-content px-6 py-4">
              <div className="grid grid-cols-2 gap-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/[0.06] py-3 text-[0.7rem] uppercase tracking-[0.18em] text-[#b9b3a7] transition-colors hover:text-[#ffb173]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                {isSignedIn ? (
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="btn-quiet flex-1 justify-center"
                  >
                    Your profile
                  </Link>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="btn-quiet flex-1 justify-center"
                  >
                    Log in
                  </Link>
                )}
                <Link
                  href="/recruitment"
                  onClick={() => setMenuOpen(false)}
                  className="btn-ember flex-1 justify-center"
                >
                  Recruiting
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
