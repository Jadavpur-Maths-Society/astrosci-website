"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import ClubLogo from "@/components/ClubLogo";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

const socialDisplayNames: Record<string, string> = {
  instagram: "Instagram",
  twitter: "Twitter/X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  github: "GitHub",
};

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "POTW", href: "/potw" },
  ],
  Club: [
    { label: "Magazine", href: "/magazine" },
    { label: "Projects", href: "/projects" },
    { label: "Astronomy", href: "/astronomy" },
    { label: "Team", href: "/team" },
  ],
  Support: [
    { label: "Membership", href: "/sponsors" },
    { label: "Donate", href: "/donators" },
    { label: "Recruitment", href: "/recruitment" },
    { label: "Feedback", href: "/support" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050506]">
      <div className="mx-auto max-w-content px-6 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pr-10"
          >
            <div className="flex items-center gap-3">
              <ClubLogo size={40} glow spinOnHover />
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-semibold tracking-[-0.02em] text-[#f6f2ea]">
                  ASTROSCI
                </span>
                <span className="mono-data mt-1 text-[0.55rem] uppercase tracking-[0.26em] text-[#6a655c]">
                  {siteConfig.university}
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-xs text-[0.85rem] leading-relaxed text-[#736d63]">
              A student-led astronomy club. We observe, we photograph, we compute —
              and we keep the club&apos;s doors open to anyone who looks up.
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="link-rule mono-data mt-6 inline-block text-[0.7rem] uppercase tracking-[0.16em]"
            >
              {siteConfig.email}
            </a>

            <div className="mt-7 flex items-center gap-2.5">
              {Object.entries(siteConfig.social).map(([key, href]) => {
                if (!href || !socialIcons[key]) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialDisplayNames[key] || key}
                    className="flex h-8 w-8 items-center justify-center border border-white/10 text-[#736d63] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff7a29]/50 hover:text-[#ffb173] hover:shadow-[0_4px_16px_rgba(255,122,41,0.25)]"
                  >
                    {socialIcons[key]}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* link columns */}
          {Object.entries(footerLinks).map(([section, links], col) => (
            <motion.nav
              key={section}
              aria-label={section}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.08 + col * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h4 className="kicker mb-5 text-[#6a655c]">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-0 text-[0.85rem] text-[#948d81] transition-colors hover:text-[#f6f2ea]"
                    >
                      <span className="inline-block h-px w-0 bg-[#ff7a29] transition-all duration-300 group-hover:mr-2 group-hover:w-3" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.07] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="mono-data text-[0.6rem] uppercase tracking-[0.2em] text-[#585349]">
            © 2025 AstroSci Club · Jadavpur University
          </p>
          <p className="mono-data flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#585349]">
            <span className="h-1.5 w-1.5 bg-[#ff7a29]" aria-hidden />
            22.4996° N · 88.3716° E · Kolkata
          </p>
        </div>
      </div>
    </footer>
  );
}
