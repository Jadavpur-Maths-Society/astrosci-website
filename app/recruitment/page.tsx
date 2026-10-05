"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── DEADLINE: June 6, 2026, 5:00 PM IST (UTC+5:30 → UTC 11:30) ──
const DEADLINE = new Date("2026-06-06T11:30:00Z");

type Tab = "general" | "pr" | "design" | "tech" | "video" | "content";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = DEADLINE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

const TAB_META: Record<Tab, { label: string; emoji: string; color: string; gradient: string; btnGradient: string; dark: boolean }> = {
  general: { label: "General",      emoji: "🌌", color: "#ff8a3d", gradient: "linear-gradient(135deg,#ff8a3d,#ff7a29)", btnGradient: "linear-gradient(135deg,#ff8a3d,#ff7a29)", dark: false },
  pr:      { label: "📣 PR",        emoji: "📣", color: "#ff9d4d", gradient: "linear-gradient(135deg,#ff9d4d,#d94a12)", btnGradient: "linear-gradient(135deg,#ff9d4d,#d94a12)", dark: false },
  design:  { label: "🎨 Design",    emoji: "🎨", color: "#ff8f4d", gradient: "linear-gradient(135deg,#ff8f4d,#ff9d3d)", btnGradient: "linear-gradient(135deg,#ff8f4d,#ff9d3d)", dark: true  },
  tech:    { label: "⚡ Tech",      emoji: "⚡", color: "#ffb173", gradient: "linear-gradient(135deg,#ffb173,#ffab63)", btnGradient: "linear-gradient(135deg,#ffb173,#ffab63)", dark: true  },
  video:   { label: "🎬 Video",     emoji: "🎬", color: "#f0a461", gradient: "linear-gradient(135deg,#f0a461,#e08b2e)", btnGradient: "linear-gradient(135deg,#f0a461,#e08b2e)", dark: true  },
  content: { label: "✍️ Content",   emoji: "✍️", color: "#ffb173", gradient: "linear-gradient(135deg,#ffb173,#ff7a29)", btnGradient: "linear-gradient(135deg,#ffb173,#ff7a29)", dark: false },
};

const TABS: Tab[] = ["general", "pr", "design", "tech", "video", "content"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

.rc-root { --space:#060607;--deep:#0c0c0e;--surface:#131315;--card:#131315;--border:#1c1a17;--border-glow:#3a2a1c;--nebula1:#ff8a3d;--nebula2:#ff7a29;--nebula3:#ffab63;--star:#efe6da;--muted:#7d7468;--input-bg:#090c1f;--gold:#f0b429; }

/* ── STARS ── */
.rc-stars { position:fixed;inset:0;z-index:0;pointer-events:none; }

/* ── BANNER ── */
.rc-banner {
  position:relative;z-index:2;
  padding:0;overflow:hidden;
  background:#060607;
  border-bottom:1px solid #1c1a17;
}
.rc-banner-aurora {
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 60% at 15% 30%, #2a1a0e55 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 85% 20%, #24140944 0%, transparent 55%),
    radial-gradient(ellipse 80% 40% at 50% 80%, #1c100844 0%, transparent 60%),
    radial-gradient(ellipse 40% 70% at 70% 50%, #1a0e0733 0%, transparent 50%);
}
.rc-banner-lines {
  position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:0.08;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, #ff8a3d 40px);
}
.rc-banner-inner {
  position:relative;z-index:1;
  padding:80px 24px 60px;
  text-align:center;
  display:flex;flex-direction:column;align-items:center;gap:0;
}

/* spinning logo */
.rc-logo-ring {
  width:80px;height:80px;border-radius:50%;
  background:conic-gradient(from 0deg,#ff8a3d,#ff7a29,#ff9d4d,#ff8f4d,#f0a461,#ffab63,#ff8a3d);
  padding:3px;
  animation:rcSpin 12s linear infinite;
  margin-bottom:24px;flex-shrink:0;
}
.rc-logo-inner {
  width:100%;height:100%;border-radius:50%;
  background:#060607;
  display:flex;align-items:center;justify-content:center;font-size:32px;
}
@keyframes rcSpin { to { transform:rotate(360deg); } }

/* eyebrow */
.rc-eyebrow {
  font-family:'Orbitron',monospace;font-size:9px;letter-spacing:6px;
  color:#ffab63;text-transform:uppercase;margin-bottom:14px;
}

/* main title */
.rc-title {
  font-family:'Orbitron',monospace;
  font-size:clamp(2rem,6vw,4rem);font-weight:900;line-height:1.05;
  color:#f6f2ea;
  margin-bottom:10px;
}
.rc-subtitle {
  font-family:'Orbitron',monospace;font-size:10px;
  letter-spacing:3px;color:#7d7468;margin-bottom:36px;
}

/* ── BANNER STRIP ── */
.rc-rainbow-strip {
  width:100%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,122,41,0.5) 30%,rgba(255,122,41,0.5) 70%,transparent);
}

/* ── COUNTDOWN ── */
.rc-deadline-label {
  font-family:'Orbitron',monospace;font-size:9px;letter-spacing:4px;
  color:#f0b429;text-transform:uppercase;margin-bottom:14px;
}
.rc-countdown {
  display:flex;align-items:center;gap:12px;
  margin-bottom:32px;
}
.rc-timer-block {
  display:flex;flex-direction:column;align-items:center;
  background:linear-gradient(135deg,#131315,#131315);
  border:1px solid #1c1a17;
  border-radius:14px;
  padding:14px 20px;
  min-width:72px;
  position:relative;overflow:hidden;
}
.rc-timer-block::before {
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--tb-color,#ff8a3d);
}
.rc-timer-num {
  font-family:'Orbitron',monospace;font-size:28px;font-weight:900;
  color:#efe6da;line-height:1;
}
.rc-timer-lbl {
  font-family:'Orbitron',monospace;font-size:8px;letter-spacing:2px;
  color:#7d7468;margin-top:6px;
}
.rc-timer-sep {
  font-family:'Orbitron',monospace;font-size:24px;font-weight:900;
  color:#3a2a1c;line-height:1;padding-bottom:16px;
}
.rc-expired-badge {
  font-family:'Orbitron',monospace;font-size:13px;letter-spacing:3px;
  color:#f08a70;background:#1c0f0c;border:1px solid #6b2a20;
  padding:10px 24px;border-radius:50px;
}
.rc-date-pill {
  display:inline-flex;align-items:center;gap:8px;
  background:#090c1f;border:1px solid #3a2a1c;
  padding:8px 20px;border-radius:50px;
  font-family:'Orbitron',monospace;font-size:10px;color:#7d7468;
  letter-spacing:2px;
}
.rc-date-pill strong { color:#f0b429; }

/* ── PROMO BADGES ── */
.rc-badge-row {
  display:flex;flex-wrap:wrap;justify-content:center;gap:10px;
  margin:24px 0 0;
}
.rc-badge {
  display:flex;align-items:center;gap:6px;
  padding:6px 14px;border-radius:50px;
  font-family:'Orbitron',monospace;font-size:9px;letter-spacing:1.5px;
  border:1px solid;
}

/* ── TABS ── */
.rc-tabs-wrap {
  position:sticky;top:0;z-index:20;
  background:rgba(6,6,7,0.94);
  backdrop-filter:blur(14px);
  border-bottom:1px solid #1c1a17;
}
.rc-tabs {
  display:flex;gap:0;max-width:800px;margin:0 auto;
  overflow-x:auto;scrollbar-width:none;padding:0 16px;
}
.rc-tabs::-webkit-scrollbar{display:none}
.rc-tab-btn {
  background:none;border:none;
  padding:14px 16px;
  font-family:'Orbitron',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;
  color:#7d7468;cursor:pointer;
  border-bottom:2px solid transparent;
  white-space:nowrap;transition:all 0.2s;
  position:relative;top:1px;
}
.rc-tab-btn:hover { color:#efe6da; }
.rc-tab-btn.active { color:#efe6da;border-bottom-color:var(--tc,#ff8a3d); }

/* ── CONTAINER ── */
.rc-container { max-width:780px;margin:0 auto;padding:0 20px 80px;position:relative;z-index:2; }

/* ── SECTION ── */
.rc-section { display:none;padding-top:44px;animation:rcFadeUp 0.3s ease; }
.rc-section.active { display:block; }
@keyframes rcFadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }

.rc-section-header { display:flex;align-items:flex-start;gap:16px;margin-bottom:30px; }
.rc-s-icon {
  width:54px;height:54px;flex-shrink:0;border-radius:14px;
  display:flex;align-items:center;justify-content:center;font-size:22px;
}
.rc-s-title h2 {font-family:'Orbitron',monospace;font-size:18px;font-weight:800;letter-spacing:1px;}
.rc-s-title p {font-size:11px;color:#7d7468;font-family:'Orbitron',monospace;letter-spacing:1.5px;margin-top:4px;}

/* ── CARDS ── */
.rc-card {
  background:#131315;border:1px solid #1c1a17;
  border-radius:16px;padding:26px;margin-bottom:14px;
}
.rc-card-label {
  font-family:'Orbitron',monospace;font-size:9px;letter-spacing:3px;
  color:#7d7468;text-transform:uppercase;margin-bottom:20px;
}

/* ── FIELDS ── */
.rc-grid { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
@media(max-width:500px){.rc-grid{grid-template-columns:1fr}}
.rc-field { display:flex;flex-direction:column;gap:8px; }
.rc-field.full { grid-column:1/-1; }
.rc-label {
  font-size:11px;font-weight:600;color:#7d7468;letter-spacing:0.5px;
  font-family:'Orbitron',monospace;
}
.rc-label .req { color:#ff9d4d;margin-left:2px; }
input[type=text].rc-inp,input[type=number].rc-inp,input[type=email].rc-inp,textarea.rc-inp,select.rc-inp {
  background:#090c1f;border:1px solid #1c1a17;border-radius:10px;
  color:#efe6da;font-family:'DM Sans',sans-serif;font-size:14px;
  padding:12px 14px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;
  width:100%;resize:vertical;
}
input.rc-inp:focus,textarea.rc-inp:focus,select.rc-inp:focus {
  border-color:#ff8a3d;box-shadow:0 0 0 3px #4f6ef718;
}
textarea.rc-inp { min-height:90px; }
select.rc-inp option { background:#131315; }

/* ── Q-CARDS ── */
.rc-qcard {
  background:#131315;border:1px solid #1c1a17;
  border-radius:14px;padding:22px;margin-bottom:12px;
  transition:border-color 0.2s;
}
.rc-qcard:focus-within { border-color:#3a2a1c; }
.rc-qnum { font-family:'Orbitron',monospace;font-size:9px;color:#7d7468;letter-spacing:3px;margin-bottom:8px; }
.rc-qtitle { font-size:14px;font-weight:600;margin-bottom:14px;line-height:1.5;color:#efe6da; }
.rc-qweight { font-size:10px;font-weight:400;color:#f0b429;margin-left:6px; }

/* ── OPTIONS ── */
.rc-options { display:flex;flex-direction:column;gap:8px; }
.rc-option {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;
  background:#090c1f;border:1px solid #1c1a17;
  border-radius:9px;cursor:pointer;transition:all 0.15s;font-size:14px;
  color:#efe6da;
}
.rc-option:hover { border-color:#ff8a3d;background:#0f0e0d; }
.rc-option input[type=radio],.rc-option input[type=checkbox] {
  width:16px;height:16px;accent-color:#ff8a3d;flex-shrink:0;cursor:pointer;
}

/* ── DIVIDER ── */
.rc-div { display:flex;align-items:center;gap:10px;margin:18px 0; }
.rc-div::before,.rc-div::after { content:'';flex:1;height:1px;background:#1c1a17; }
.rc-div span { font-family:'Orbitron',monospace;font-size:9px;color:#7d7468;letter-spacing:3px; }

/* ── NOTE ── */
.rc-note {
  background:#141210;border-left:3px solid #f0b429;
  padding:10px 14px;border-radius:0 8px 8px 0;
  font-size:12px;color:#a07830;margin-bottom:16px;
  font-family:'Orbitron',monospace;letter-spacing:0.5px;
}

/* ── FORMSPREE NOTICE ── */
.rc-fsnotice {
  background:linear-gradient(135deg,#151311,#0e0e10);
  border:1px solid #4f6ef733;border-radius:12px;
  padding:16px 18px;margin-bottom:20px;
  display:flex;gap:12px;align-items:flex-start;
}
.rc-fsnotice .icon { font-size:18px;flex-shrink:0;margin-top:2px; }
.rc-fsnotice .text { font-size:12px;line-height:1.7; }
.rc-fsnotice .text strong { color:#ffab63;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:1px; }
.rc-fsnotice .text code { background:#1b1916;padding:2px 6px;border-radius:4px;font-size:11px;color:#f0b429; }

/* ── SUBMIT ── */
.rc-submit-wrap { padding:8px 0 4px; }
.rc-btn {
  width:100%;padding:16px;border:none;border-radius:12px;
  font-family:'Orbitron',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;
  cursor:pointer;font-weight:700;transition:all 0.2s;position:relative;overflow:hidden;
}
.rc-btn::after { content:'';position:absolute;inset:0;background:white;opacity:0;transition:opacity 0.15s; }
.rc-btn:hover::after { opacity:0.07; }
.rc-btn:active::after { opacity:0.14; }
.rc-btn:disabled { opacity:0.5;cursor:not-allowed; }

/* ── SUCCESS ── */
.rc-success { display:none;text-align:center;padding:60px 20px;animation:rcFadeUp 0.4s ease; }
.rc-success.show { display:block; }
.rc-success-icon { font-size:52px;margin-bottom:16px;animation:rcPulse 2s ease infinite; }
@keyframes rcPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.rc-success h3 { font-family:'Orbitron',monospace;font-size:18px;font-weight:800;margin-bottom:8px; }
.rc-success p { font-size:14px;color:#7d7468; }

/* ── TOAST ── */
.rc-toast {
  position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  padding:12px 28px;border-radius:50px;
  font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;
  z-index:200;white-space:nowrap;
  animation:rcToastIn 0.3s ease;
}
@keyframes rcToastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.rc-toast.success{background:#12120d;border:1px solid #2a1d0e;color:#f0a461;}
.rc-toast.error{background:#1c0f0c;border:1px solid #6b2a20;color:#f08a70;}

/* responsive timer */
@media(max-width:500px){
  .rc-timer-block{min-width:58px;padding:12px 14px;}
  .rc-timer-num{font-size:22px;}
  .rc-countdown{gap:8px;}
}
`;

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [submitted, setSubmitted] = useState<Partial<Record<Tab, boolean>>>({});
  const [sending, setSending] = useState<Partial<Record<Tab, boolean>>>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;
    type Star = { x: number; y: number; r: number; o: number; s: number; d: number };
    let stars: Star[] = [];
    let animId: number;
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); }
    function init() {
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2, o: Math.random() * 0.7 + 0.1,
        s: Math.random() * 0.3 + 0.05, d: Math.random() > 0.5 ? 1 : -1,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.o += s.s * 0.008 * s.d;
        if (s.o > 0.9 || s.o < 0.05) s.d *= -1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,214,178,${s.o})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>, team: string, key: Tab) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.action.includes("YOUR_FORM_ID")) {
      setToast({ msg: "⚠ Formspree ID not set!", type: "error" });
      return;
    }
    setSending((p: Partial<Record<Tab, boolean>>) => ({ ...p, [key]: true }));
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        setSubmitted((p: Partial<Record<Tab, boolean>>) => ({ ...p, [key]: true }));
        setToast({ msg: `✓ ${team} application received!`, type: "success" });
      } else throw new Error();
    } catch {
      setToast({ msg: "✗ Transmission failed — check your Form ID", type: "error" });
    } finally {
      setSending((p: Partial<Record<Tab, boolean>>) => ({ ...p, [key]: false }));
    }
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <canvas ref={canvasRef} className="rc-stars" />

      <div className="rc-root">
        <Navbar />

        {/* ── BANNER ── */}
        <section className="rc-banner">
          <div className="rc-banner-aurora" />
          <div className="rc-banner-lines" />
          <div className="rc-rainbow-strip" />

          <div className="rc-banner-inner">
            <div className="rc-logo-ring"><div className="rc-logo-inner">🔭</div></div>

            <div className="rc-eyebrow">★ Astro Club · AstroSci Society</div>
            <h1 className="rc-title">Recruitment<br />2025–26</h1>
            <p className="rc-subtitle">Select your team · Fill the form · Reach for the stars</p>

            {/* ── COUNTDOWN ── */}
            <div className="rc-deadline-label">⏳ Applications close in</div>

            {timeLeft.expired ? (
              <div className="rc-expired-badge">✗ Applications Closed</div>
            ) : (
              <div className="rc-countdown">
                {[
                  { val: timeLeft.days,    lbl: "DAYS",    color: "#ff9d4d" },
                  { val: timeLeft.hours,   lbl: "HOURS",   color: "#ff8f4d" },
                  { val: timeLeft.minutes, lbl: "MINS",    color: "#ff8a3d" },
                  { val: timeLeft.seconds, lbl: "SECS",    color: "#f0a461" },
                ].map((b, i) => (
                  <>
                    <div key={b.lbl} className="rc-timer-block" style={{ "--tb-color": b.color } as React.CSSProperties}>
                      <span className="rc-timer-num" style={{ color: b.color }}>{pad(b.val)}</span>
                      <span className="rc-timer-lbl">{b.lbl}</span>
                    </div>
                    {i < 3 && <span className="rc-timer-sep">:</span>}
                  </>
                ))}
              </div>
            )}

            <div className="rc-date-pill">
              Deadline &nbsp;|&nbsp; <strong>6 June 2025&nbsp;&nbsp;5:00 PM IST</strong>
            </div>

            {/* promo badges */}
            <div className="rc-badge-row">
              {[
                { text: "PR Team",      color: "#ff9d4d", bg: "#ff9d4d11" },
                { text: "Design Team",  color: "#ff8f4d", bg: "#ff8f4d11" },
                { text: "Tech Team",    color: "#ffb173", bg: "#ffb17311" },
                { text: "Video Team",   color: "#f0a461", bg: "#f0a46111" },
                { text: "Content Team", color: "#ffb173", bg: "#ffb17311" },
              ].map(b => (
                <span key={b.text} className="rc-badge" style={{ color: b.color, background: b.bg, borderColor: b.color + "44" }}>
                  {b.text}
                </span>
              ))}
            </div>
          </div>
          <div className="rc-rainbow-strip" />
        </section>

        {/* ── TABS ── */}
        <div className="rc-tabs-wrap">
          <div className="rc-tabs">
            {TABS.map(t => (
              <button
                key={t}
                className={`rc-tab-btn${activeTab === t ? " active" : ""}`}
                style={{ "--tc": TAB_META[t].color } as React.CSSProperties}
                onClick={() => { setActiveTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {TAB_META[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── FORMS ── */}
        <div className="rc-container">

          {/* ══════ GENERAL ══════ */}
          <div className={`rc-section${activeTab === "general" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#ece7de12,#ece7de28)", border: "1px solid #ece7de40" }}>🌌</div>
              <div className="rc-s-title">
                <h2>General Info</h2>
                <p>Required for all applications</p>
              </div>
            </div>

            {submitted.general ? (
              <div className="rc-success show"><div className="rc-success-icon">🌠</div><h3>Signal Received!</h3><p>Your general info has been transmitted to Astro Club base.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "General", "general")}>
                <input type="hidden" name="_subject" value="Astro Club Application — General" />
                <input type="hidden" name="team_form" value="General" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet Profile"}</div>
                  <div className="rc-grid">
                    <div className="rc-field">
                      <label className="rc-label">Full Name <span className="req">*</span></label>
                      <input className="rc-inp" type="text" name="name" placeholder="Your full name" required />
                    </div>
                    <div className="rc-field">
                      <label className="rc-label">Roll Number <span className="req">*</span></label>
                      <input className="rc-inp" type="text" name="roll" placeholder="e.g. 23CS001" required />
                    </div>
                    <div className="rc-field">
                      <label className="rc-label">Branch <span className="req">*</span></label>
                      <input className="rc-inp" type="text" name="branch" placeholder="e.g. CSE, ECE, ME…" required />
                    </div>
                    <div className="rc-field">
                      <label className="rc-label">Year <span className="req">*</span></label>
                      <select className="rc-inp" name="year" required>
                        <option value="" disabled>Select year</option>
                        <option>1st Year</option><option>2nd Year</option>
                        <option>3rd Year</option><option>4th Year</option>
                      </select>
                    </div>
                    <div className="rc-field full">
                      <label className="rc-label">Team Applying For <span className="req">*</span></label>
                      <select className="rc-inp" name="team" required>
                        <option value="" disabled>Choose a team</option>
                        <option>PR</option><option>Design</option><option>Tech</option>
                        <option>Content</option><option>Video Editing</option>
                      </select>
                    </div>
                    <div className="rc-field">
                      <label className="rc-label">Email <span className="req">*</span></label>
                      <input className="rc-inp" type="email" name="email" placeholder="your@email.com" required />
                    </div>
                    <div className="rc-field">
                      <label className="rc-label">Phone</label>
                      <input className="rc-inp" type="text" name="phone" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="rc-field full">
                      <label className="rc-label">Why do you want to join Astro Club? <span className="req">*</span></label>
                      <textarea className="rc-inp" name="motivation" placeholder="What draws you to astronomy and space science? What do you hope to contribute?" required />
                    </div>
                    <div className="rc-field full">
                      <label className="rc-label">How did you hear about this recruitment?</label>
                      <select className="rc-inp" name="referral">
                        <option value="" disabled>Select source</option>
                        <option>Instagram</option><option>WhatsApp group</option>
                        <option>Friend / senior</option><option>Department notice board</option>
                        <option>College website</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.general}
                    style={{ background: TAB_META.general.gradient, color: "#fff" }}>
                    {sending.general ? "Transmitting… ◌" : "Transmit General Info →"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ══════ PR ══════ */}
          <div className={`rc-section${activeTab === "pr" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#ff9d4d20,#ff9d4d40)", border: "1px solid #ff9d4d55" }}>📣</div>
              <div className="rc-s-title"><h2>PR Team</h2><p>Outreach · Social Media · Reels</p></div>
            </div>

            {submitted.pr ? (
              <div className="rc-success show"><div className="rc-success-icon">📡</div><h3>PR Signal Sent!</h3><p>Your application is in orbit. We&apos;ll be in touch.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "PR", "pr")}>
                <input type="hidden" name="_subject" value="Astro Club Application — PR Team" />
                <input type="hidden" name="team_form" value="PR" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet ID"}</div>
                  <div className="rc-grid">
                    <div className="rc-field"><label className="rc-label">Name <span className="req">*</span></label><input className="rc-inp" type="text" name="name" placeholder="Full name" required /></div>
                    <div className="rc-field"><label className="rc-label">Roll <span className="req">*</span></label><input className="rc-inp" type="text" name="roll" placeholder="Roll number" required /></div>
                    <div className="rc-field"><label className="rc-label">Branch</label><input className="rc-inp" type="text" name="branch" placeholder="Branch" /></div>
                    <div className="rc-field"><label className="rc-label">Email</label><input className="rc-inp" type="email" name="email" placeholder="Email" /></div>
                  </div>
                </div>

                <div className="rc-div"><span>★ PR QUESTIONS ★</span></div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 01</div>
                  <div className="rc-qtitle">How active are you on social media?</div>
                  <div className="rc-options">
                    {["Very active — post regularly", "Moderately active — mostly scroll", "Mostly a lurker", "Rarely use social media"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="sm_active" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 02</div>
                  <div className="rc-qtitle">What content do you watch / consume most?</div>
                  <textarea className="rc-inp" name="content_watch" placeholder="Reels, long-form, memes, astro content, news, podcasts — describe what you watch and on which platforms." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 03</div>
                  <div className="rc-qtitle">If asked, will you make reels for the club — showing your face?</div>
                  <div className="rc-options">
                    {["Yes, absolutely comfortable", "Maybe — depends on the concept", "No — prefer behind the scenes"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="reel_face" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 04</div>
                  <div className="rc-qtitle">Follower counts on social platforms</div>
                  <div className="rc-grid" style={{ marginTop: 8 }}>
                    {[["Instagram","ig_followers"],["LinkedIn","li_followers"],["Facebook","fb_followers"],["X (Twitter)","x_followers"]].map(([lbl,nm]) => (
                      <div key={nm} className="rc-field"><label className="rc-label">{lbl}</label><input className="rc-inp" type="number" name={nm} placeholder="followers" min="0" /></div>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 05</div>
                  <div className="rc-qtitle">Any PR work done in the past?</div>
                  <textarea className="rc-inp" name="pr_past" placeholder="Campaigns promoted, events publicized, content created for clubs, collaborations. Write 'None' if not applicable." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 06</div>
                  <div className="rc-qtitle">Link to your best social media work <span className="rc-qweight">⭐ High weightage</span></div>
                  <textarea className="rc-inp" name="best_work_link" placeholder="Instagram post/reel URL, YouTube link, Drive link — show us your best campaign, reel, or piece of content you've made." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 07</div>
                  <div className="rc-qtitle">Growth strategy — How would you grow Astro Club&apos;s Instagram from 500 to 5,000 followers in 6 months?</div>
                  <textarea className="rc-inp" name="growth_strategy" placeholder="Be specific: content types, posting frequency, collab ideas, trending formats, hashtag strategy, campaign ideas…" />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 08</div>
                  <div className="rc-qtitle">Trend adaptation — Describe a current trending format you&apos;d use for an astronomy post</div>
                  <textarea className="rc-inp" name="trend_idea" placeholder="E.g. 'POV you're a photon leaving the sun', 'brain rot astro facts', rate-a-planet series, AI voiceover + timelapse — pitch your idea!" />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 09</div>
                  <div className="rc-qtitle">Are you holding an admin position in any other club?</div>
                  <div className="rc-options">
                    <label className="rc-option"><input type="radio" name="admin_pos" value="Yes" />Yes</label>
                    <label className="rc-option"><input type="radio" name="admin_pos" value="No" />No</label>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="rc-label" style={{ display: "block", marginBottom: 6 }}>If yes — Club name &amp; your role</label>
                    <input className="rc-inp" type="text" name="admin_detail" placeholder="Club — Role" />
                  </div>
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.pr}
                    style={{ background: TAB_META.pr.gradient, color: "#fff" }}>
                    {sending.pr ? "Transmitting… ◌" : "Launch PR Application 🚀"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ══════ DESIGN ══════ */}
          <div className={`rc-section${activeTab === "design" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#ff8f4d20,#ff8f4d40)", border: "1px solid #ff8f4d55" }}>🎨</div>
              <div className="rc-s-title"><h2>Design Team</h2><p>Graphics · Astrophotography · Visual Identity</p></div>
            </div>

            {submitted.design ? (
              <div className="rc-success show"><div className="rc-success-icon">🌠</div><h3>Design Signal Sent!</h3><p>Your portfolio has been received. The design team will review shortly.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "Design", "design")}>
                <input type="hidden" name="_subject" value="Astro Club Application — Design Team" />
                <input type="hidden" name="team_form" value="Design" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet ID"}</div>
                  <div className="rc-grid">
                    <div className="rc-field"><label className="rc-label">Name <span className="req">*</span></label><input className="rc-inp" type="text" name="name" placeholder="Full name" required /></div>
                    <div className="rc-field"><label className="rc-label">Roll <span className="req">*</span></label><input className="rc-inp" type="text" name="roll" placeholder="Roll number" required /></div>
                    <div className="rc-field"><label className="rc-label">Branch</label><input className="rc-inp" type="text" name="branch" placeholder="Branch" /></div>
                    <div className="rc-field"><label className="rc-label">Email</label><input className="rc-inp" type="email" name="email" placeholder="Email" /></div>
                  </div>
                </div>

                <div className="rc-div"><span>★ DESIGN QUESTIONS ★</span></div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 01</div>
                  <div className="rc-qtitle">Design Portfolio <span className="rc-qweight">⭐ Highest weightage</span></div>
                  <textarea className="rc-inp" name="portfolio" placeholder="Behance, Dribbble, Google Drive, Instagram — paste all portfolio links here. Briefly describe the work." required />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 02</div>
                  <div className="rc-qtitle">Do you use AI for image editing or generation?</div>
                  <div className="rc-options">
                    {["Yes, frequently", "Sometimes", "No, prefer manual work"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="ai_use" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 03</div>
                  <div className="rc-qtitle">Show AI work — include the exact prompt used</div>
                  <textarea className="rc-inp" name="ai_work" placeholder="Link to AI-generated designs + the exact prompt for each piece." />
                  <div className="rc-div" style={{ margin: "14px 0 10px" }}><span>AND</span></div>
                  <label className="rc-label" style={{ display: "block", marginBottom: 8 }}>Non-AI (manual) work links</label>
                  <textarea className="rc-inp" name="manual_work" placeholder="Links to purely hand-crafted / manual design work." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 04</div>
                  <div className="rc-qtitle">Can you design at mass-scale — regular posts, event graphics, campaigns?</div>
                  <div className="rc-options">
                    {["Yes, I can manage high volume", "Still learning but willing", "Prefer smaller, detail-oriented work"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="scale" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 05</div>
                  <div className="rc-qtitle">Turnaround time — Can you deliver a quality post within 2 hours of receiving a brief?</div>
                  <div className="rc-options">
                    {["Yes, easily", "Usually yes, depends on complexity", "I need more time for quality work"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="turnaround" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 06</div>
                  <div className="rc-qtitle">Design process — Walk us through how you&apos;d approach a stargazing event poster</div>
                  <textarea className="rc-inp" name="design_process" placeholder="From brief to final file: mood-boarding, colour palette selection, typography, revisions — describe your process." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 07</div>
                  <div className="rc-qtitle">Your design philosophy — what makes a great astronomy visual? (2–3 sentences)</div>
                  <textarea className="rc-inp" name="design_philosophy" placeholder="What principles guide your design decisions in space / science-themed work?" style={{ minHeight: 70 }} />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 08</div>
                  <div className="rc-qtitle">Any astrophotography / night-sky photography or editing experience?</div>
                  <textarea className="rc-inp" name="astrophoto" placeholder="Describe experience, share photo links if possible. Write 'None' if not applicable." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 09</div>
                  <div className="rc-qtitle">Software you use</div>
                  <div className="rc-options">
                    {[["adobe_ps","Adobe Photoshop"],["adobe_ai","Adobe Illustrator"],["figma","Figma"],["canva","Canva / Canva Pro"],["lightroom","Adobe Lightroom"],["procreate","Procreate"],["adobe_other","Other (specify below)"]].map(([n,lbl]) => (
                      <label key={n} className="rc-option"><input type="checkbox" name={n} value="Yes" />{lbl}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <input className="rc-inp" type="text" name="other_tools" placeholder="Other tools you use…" />
                  </div>
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.design}
                    style={{ background: TAB_META.design.gradient, color: "#0a0a0f" }}>
                    {sending.design ? "Transmitting… ◌" : "Launch Design Application 🚀"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ══════ TECH ══════ */}
          <div className={`rc-section${activeTab === "tech" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#ffb17320,#ffb17340)", border: "1px solid #ffb17355" }}>⚡</div>
              <div className="rc-s-title"><h2>Tech Team</h2><p>ML · CV · Development · AI Tools</p></div>
            </div>

            {submitted.tech ? (
              <div className="rc-success show"><div className="rc-success-icon">🛸</div><h3>Tech Signal Sent!</h3><p>Your application is in orbit. The tech team will review your work.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "Tech", "tech")}>
                <input type="hidden" name="_subject" value="Astro Club Application — Tech Team" />
                <input type="hidden" name="team_form" value="Tech" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet ID"}</div>
                  <div className="rc-grid">
                    <div className="rc-field"><label className="rc-label">Name <span className="req">*</span></label><input className="rc-inp" type="text" name="name" placeholder="Full name" required /></div>
                    <div className="rc-field"><label className="rc-label">Roll <span className="req">*</span></label><input className="rc-inp" type="text" name="roll" placeholder="Roll number" required /></div>
                    <div className="rc-field"><label className="rc-label">Branch</label><input className="rc-inp" type="text" name="branch" placeholder="Branch" /></div>
                    <div className="rc-field"><label className="rc-label">Email</label><input className="rc-inp" type="email" name="email" placeholder="Email" /></div>
                  </div>
                </div>

                <div className="rc-div"><span>★ TECH QUESTIONS ★</span></div>
                <div className="rc-note">★ SHOWING ACTUAL WORK CARRIES HIGHEST WEIGHTAGE</div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 01</div>
                  <div className="rc-qtitle">ML experience — supervised &amp; unsupervised classification, image / pictorial analysis?</div>
                  <textarea className="rc-inp" name="ml_exp" placeholder="Models built, datasets used, techniques (CNN, SVM, K-Means, YOLO, etc.). Paste GitHub / Kaggle links. Write 'None' if not applicable." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 02</div>
                  <div className="rc-qtitle">Your primary tech stack</div>
                  <div className="rc-options">
                    {[
                      ["stack_python",   "Python — NumPy, Pandas, scikit-learn"],
                      ["stack_dl",       "Deep Learning — TensorFlow / PyTorch"],
                      ["stack_web",      "Web Dev — React / Next.js / Node"],
                      ["stack_cv",       "Computer Vision — OpenCV / YOLO"],
                      ["stack_data",     "Data Science — SQL, Spark, Tableau"],
                      ["stack_embedded", "Embedded / IoT — Arduino, Raspberry Pi"],
                      ["stack_other",    "Other (specify below)"],
                    ].map(([n, lbl]) => (
                      <label key={n} className="rc-option"><input type="checkbox" name={n} value="Yes" />{lbl}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <input className="rc-inp" type="text" name="stack_detail" placeholder="Elaborate or mention other languages / tools…" />
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 03</div>
                  <div className="rc-qtitle">Do you use LLMs to build artifacts, tools, or small-scale sites?</div>
                  <div className="rc-options">
                    {["Yes, regularly", "Experimenting / still learning", "Not yet"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="llm_use" value={v} />{v}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="rc-label" style={{ display: "block", marginBottom: 6 }}>Which LLM tools?</label>
                    <input className="rc-inp" type="text" name="llm_tools" placeholder="e.g. Claude, ChatGPT, Gemini, Cursor, v0…" />
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 04</div>
                  <div className="rc-qtitle">Show your tech work <span className="rc-qweight">⭐ Required · Highest weightage</span></div>
                  <textarea className="rc-inp" name="tech_work" placeholder="GitHub profile, project repos, deployed sites, Kaggle notebooks, research papers — paste all links here." required />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 05</div>
                  <div className="rc-qtitle">Your astronomy knowledge level</div>
                  <div className="rc-options">
                    {[
                      "Enthusiast — follow news & events",
                      "Intermediate — understand the science behind observations",
                      "Advanced — read papers, know the math",
                      "Expert / research-level",
                    ].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="astro_level" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 06</div>
                  <div className="rc-qtitle">Describe your ideal Astro Club tech project in detail</div>
                  <textarea className="rc-inp" name="ideal_project" placeholder="E.g. automated meteor detection pipeline, AI-generated sky atlas, live ISS tracker with AR overlay, galaxy morphology classifier — pitch your idea with tech stack and feasibility." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 07</div>
                  <div className="rc-qtitle">In the AI era, how can you use tech to advance Astro Club?</div>
                  <textarea className="rc-inp" name="ai_vision" placeholder="Automation, AI-powered astronomy tools, data pipelines, sky-mapping apps, anything innovative." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 08</div>
                  <div className="rc-qtitle">Any hardware / telescope control / IoT / Raspberry Pi experience?</div>
                  <textarea className="rc-inp" name="hardware_exp" placeholder="Telescope automation, sky-scanning rigs, sensor arrays, motor controllers — describe or link. Write 'None' if not applicable." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 09</div>
                  <div className="rc-qtitle">How many hours per week can you realistically contribute to tech projects?</div>
                  <div className="rc-options">
                    {["1–3 hours", "3–6 hours", "6–10 hours", "10+ hours"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="weekly_hours" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.tech}
                    style={{ background: TAB_META.tech.gradient, color: "#0a0a0f" }}>
                    {sending.tech ? "Transmitting… ◌" : "Launch Tech Application 🚀"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ══════ VIDEO ══════ */}
          <div className={`rc-section${activeTab === "video" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#f0a46120,#f0a46140)", border: "1px solid #f0a46155" }}>🎬</div>
              <div className="rc-s-title"><h2>Video Editing</h2><p>Reels · Event Films · Timelapse · Motion</p></div>
            </div>

            {submitted.video ? (
              <div className="rc-success show"><div className="rc-success-icon">🎞️</div><h3>Video Signal Sent!</h3><p>Your work links have been received. We&apos;ll review and get back to you.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "Video Editing", "video")}>
                <input type="hidden" name="_subject" value="Astro Club Application — Video Editing" />
                <input type="hidden" name="team_form" value="Video Editing" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet ID"}</div>
                  <div className="rc-grid">
                    <div className="rc-field"><label className="rc-label">Name <span className="req">*</span></label><input className="rc-inp" type="text" name="name" placeholder="Full name" required /></div>
                    <div className="rc-field"><label className="rc-label">Roll <span className="req">*</span></label><input className="rc-inp" type="text" name="roll" placeholder="Roll number" required /></div>
                    <div className="rc-field"><label className="rc-label">Branch</label><input className="rc-inp" type="text" name="branch" placeholder="Branch" /></div>
                    <div className="rc-field"><label className="rc-label">Email</label><input className="rc-inp" type="email" name="email" placeholder="Email" /></div>
                  </div>
                </div>

                <div className="rc-div"><span>★ VIDEO QUESTIONS ★</span></div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 01</div>
                  <div className="rc-qtitle">Are you comfortable using AI in video editing?</div>
                  <div className="rc-options">
                    {["Yes, already using AI tools", "Open to learning AI tools", "Prefer traditional workflow"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="ai_vid" value={v} />{v}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="rc-label" style={{ display: "block", marginBottom: 6 }}>AI tools used (if any)</label>
                    <input className="rc-inp" type="text" name="ai_vid_tools" placeholder="e.g. Runway, CapCut AI, Adobe Firefly, Topaz Video…" />
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 02</div>
                  <div className="rc-qtitle">How comfortable are you with Adobe Premiere Pro?</div>
                  <div className="rc-options">
                    {["Professional — it's my primary tool", "Intermediate — know the basics well", "Beginner — still learning", "Haven't used it"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="premiere" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 03</div>
                  <div className="rc-qtitle">Other software you prefer</div>
                  <div className="rc-options">
                    {[["sw_resolve","DaVinci Resolve"],["sw_fcpx","Final Cut Pro"],["sw_capcut","CapCut"],["sw_ae","Adobe After Effects"],["sw_blender","Blender (3D / motion)"],["sw_other","Other (specify below)"]].map(([n,lbl]) => (
                      <label key={n} className="rc-option"><input type="checkbox" name={n} value="Yes" />{lbl}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <input className="rc-inp" type="text" name="sw_other_name" placeholder="Other software name…" />
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 04</div>
                  <div className="rc-qtitle">Show your work <span className="rc-qweight">⭐ Required · Highest weightage</span></div>
                  <textarea className="rc-inp" name="video_work" placeholder="YouTube, Google Drive, Instagram Reels, Vimeo — paste all video links here." required />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 05</div>
                  <div className="rc-qtitle">Describe your editing aesthetic / style in exactly 3 words</div>
                  <input className="rc-inp" type="text" name="style_words" placeholder="e.g. Cinematic · Minimal · Fast — or Dark · Moody · Atmospheric" />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 06</div>
                  <div className="rc-qtitle">Have you shot or edited astronomy / night-sky / timelapse footage?</div>
                  <div className="rc-options">
                    {["Yes — shot and edited", "Edited someone else's footage", "No — but very interested", "No — not my focus"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="astro_footage" value={v} />{v}</label>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="rc-label" style={{ display: "block", marginBottom: 6 }}>Link to astro footage (if any)</label>
                    <input className="rc-inp" type="text" name="astro_footage_link" placeholder="YouTube / Drive link to night sky / timelapse footage" />
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 07</div>
                  <div className="rc-qtitle">Turnaround — How long does a polished 60-second reel take you after receiving footage?</div>
                  <div className="rc-options">
                    {["Under 2 hours", "2–5 hours", "5–10 hours", "More than 10 hours depending on complexity"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="turnaround" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 08</div>
                  <div className="rc-qtitle">Your best video — link it and tell us why it&apos;s your best <span className="rc-qweight">⭐ High weightage</span></div>
                  <textarea className="rc-inp" name="best_video" placeholder="Paste the link and explain: what made this special, what challenges you overcame, what techniques you used." />
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.video}
                    style={{ background: TAB_META.video.gradient, color: "#0a0a0f" }}>
                    {sending.video ? "Transmitting… ◌" : "Launch Video Application 🚀"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ══════ CONTENT ══════ */}
          <div className={`rc-section${activeTab === "content" ? " active" : ""}`}>
            <div className="rc-section-header">
              <div className="rc-s-icon" style={{ background: "linear-gradient(135deg,#ffb17320,#ffb17340)", border: "1px solid #ffb17355" }}>✍️</div>
              <div className="rc-s-title"><h2>Content Team</h2><p>Writing · Research · Astro Storytelling</p></div>
            </div>

            {submitted.content ? (
              <div className="rc-success show"><div className="rc-success-icon">✨</div><h3>Content Signal Sent!</h3><p>Your words have reached us. We&apos;ll be in touch soon.</p></div>
            ) : (
              <form action="https://formspree.io/f/xkoeejyk" method="POST" onSubmit={e => handleSubmit(e, "Content", "content")}>
                <input type="hidden" name="_subject" value="Astro Club Application — Content Team" />
                <input type="hidden" name="team_form" value="Content" />

                <div className="rc-card">
                  <div className="rc-card-label">{"// Cadet ID"}</div>
                  <div className="rc-grid">
                    <div className="rc-field"><label className="rc-label">Name <span className="req">*</span></label><input className="rc-inp" type="text" name="name" placeholder="Full name" required /></div>
                    <div className="rc-field"><label className="rc-label">Roll <span className="req">*</span></label><input className="rc-inp" type="text" name="roll" placeholder="Roll number" required /></div>
                    <div className="rc-field"><label className="rc-label">Branch</label><input className="rc-inp" type="text" name="branch" placeholder="Branch" /></div>
                    <div className="rc-field"><label className="rc-label">Email</label><input className="rc-inp" type="email" name="email" placeholder="Email" /></div>
                  </div>
                </div>

                <div className="rc-div"><span>★ CONTENT QUESTIONS ★</span></div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 01</div>
                  <div className="rc-qtitle">What type of content writing are you comfortable with?</div>
                  <div className="rc-options">
                    {[
                      ["cw_captions", "Social media captions"],
                      ["cw_articles", "Long-form articles / blogs"],
                      ["cw_scripts",  "Video / reel scripts"],
                      ["cw_research", "Research & fact-writing"],
                      ["cw_creative", "Creative / storytelling"],
                      ["cw_newsletter","Newsletters / club updates"],
                    ].map(([n, lbl]) => (
                      <label key={n} className="rc-option"><input type="checkbox" name={n} value="Yes" />{lbl}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 02</div>
                  <div className="rc-qtitle">Share a writing sample <span className="rc-qweight">⭐ High weightage</span></div>
                  <textarea className="rc-inp" name="writing_sample" placeholder="Paste a short piece — a caption, paragraph, or blog intro you've written. Or share a Google Doc / Medium / Substack link." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 03</div>
                  <div className="rc-qtitle">Live task — Write a 3-line Instagram caption for the James Webb Space Telescope&apos;s latest image release</div>
                  <textarea className="rc-inp" name="jwst_caption" placeholder="Write it here — show us your voice! Include a hook, the fact, and a call to action." style={{ minHeight: 80 }} required />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 04</div>
                  <div className="rc-qtitle">Comfortable writing about astronomy &amp; science?</div>
                  <div className="rc-options">
                    {["Yes, it's my primary interest area", "Willing to research and learn", "Comfortable with any topic, science included", "Not particularly comfortable with science writing"].map(v => (
                      <label key={v} className="rc-option"><input type="radio" name="astro_write" value={v} />{v}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 05</div>
                  <div className="rc-qtitle">Research habits — how do you ensure accuracy before publishing?</div>
                  <textarea className="rc-inp" name="research_habits" placeholder="How do you fact-check? Which sources do you trust? How do you simplify complex science for a general audience?" />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 06</div>
                  <div className="rc-qtitle">Reading habits — what do you regularly read?</div>
                  <div className="rc-options">
                    {[["read_books","Books (fiction / non-fiction)"],["read_journals","Science journals / papers"],["read_news","Space / tech news (NASA, ESA, SpaceX updates)"],["read_blogs","Blogs & newsletters"],["read_social","Mostly social media content"]].map(([n,lbl]) => (
                      <label key={n} className="rc-option"><input type="checkbox" name={n} value="Yes" />{lbl}</label>
                    ))}
                  </div>
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 07</div>
                  <div className="rc-qtitle">What&apos;s the most fascinating astronomical event or discovery you&apos;ve followed recently?</div>
                  <textarea className="rc-inp" name="astro_fascination" placeholder="Tell us what it was, why it excited you, and what you learned from following it." />
                </div>

                <div className="rc-qcard">
                  <div className="rc-qnum">Q 08</div>
                  <div className="rc-qtitle">Why do you want to join the Astro Club Content team?</div>
                  <textarea className="rc-inp" name="motivation" placeholder="What unique perspective do you bring? What kind of content do you want to create for the club?" required />
                </div>

                <div className="rc-submit-wrap">
                  <button type="submit" className="rc-btn" disabled={!!sending.content}
                    style={{ background: TAB_META.content.gradient, color: "#fff" }}>
                    {sending.content ? "Transmitting… ◌" : "Launch Content Application 🚀"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>{/* /container */}

        <Footer />
      </div>

      {toast && (
        <div className={`rc-toast ${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
