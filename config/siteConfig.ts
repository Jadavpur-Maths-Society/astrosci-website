/**
 * Central configuration file for the AstroSci website.
 *
 * Administrators can update logos, emails, social links, and other
 * site-wide values here and the changes will propagate across every
 * component that imports this config.
 */

const SUPABASE_PROJECT_URL = "https://rwjfnuszkhoznfrjzqfr.supabase.co";

export const siteConfig = {
  clubName: "AstroSci Club",
  university: "Jadavpur University",

  email: "astrosciclubjadavpur@gmail.com",

  social: {
    instagram: "https://www.instagram.com/astrosciclubju?igsh=ZmwwZWJ2bmhmdGhl",
    twitter: "",
    youtube: "",
    linkedin: "https://www.linkedin.com/company/astrosciclub-jadavpur-university/posts/?feedView=all",
    github: "",
  },

  assets: {
    /** Official club mark (transparent PNG, Supabase-hosted). */
    logo: `${SUPABASE_PROJECT_URL}/storage/v1/object/public/logos/unnamed-removebg-preview.png`,
    /** Local fallback if the remote logo ever fails to load. */
    logoFallback: "/assets/logo.svg",
    /** Favicon — same official mark. */
    favicon: `${SUPABASE_PROJECT_URL}/storage/v1/object/public/logos/unnamed-removebg-preview.png`,
    /** Cinematic black-hole loop used as the hero backdrop. */
    heroVideo: `${SUPABASE_PROJECT_URL}/storage/v1/object/public/VIDEOS/minimax-h3-max_a_MAKE_VIDEO_ELEMENT_A.mp4`,
    banner: "/assets/club-banner.png",
    paymentQr: "https://rwjfnuszkhoznfrjzqfr.supabase.co/storage/v1/object/public/logos/IMG-20260315-WA00501.jpg",
  },
};
