"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Orbit } from "lucide-react";
import CometLine from "@/components/ambient/CometLine";
import SectionHeading from "@/components/ambient/SectionHeading";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      <CometLine className="absolute left-0 right-0 top-0" color="#ffb173" />

      <div className="relative z-10 mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              index="09"
              eyebrow="Signal desk"
              title="LEAVE A SIGNAL"
              description="Questions, ideas, a sky you want to explore together — we read every message."
            />

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="home-panel plate-frame relative p-6 md:p-8"
            >
              <span className="plate-corner" aria-hidden="true" />
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#ff7a29]/[0.07] blur-3xl" aria-hidden="true" />

              <div className="relative z-10">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="kicker kicker-ember">Community channel</span>
                  <span className="mono-data flex items-center gap-2 text-[0.56rem] uppercase tracking-[0.15em] text-[#736d63]">
                    <span className="h-1.5 w-1.5 animate-pulse bg-[#ffb173]" aria-hidden="true" />
                    Open
                  </span>
                </div>

                <div className="relative mb-7 flex h-28 items-center justify-center overflow-hidden border border-white/[0.07] bg-[#08080a]/50">
                  <span className="absolute h-40 w-64 rounded-[50%] border border-[#ffb173]/10" aria-hidden="true" />
                  <span className="absolute h-28 w-48 rotate-[-24deg] rounded-[50%] border border-[#ffb173]/15" aria-hidden="true" />
                  <span className="absolute h-16 w-32 rotate-[32deg] rounded-[50%] border border-[#ff7a29]/20" aria-hidden="true" />
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="absolute h-24 w-24 rounded-full border border-dashed border-[#ffb173]/25"
                    aria-hidden="true"
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center border border-[#ffb173]/35 bg-[#0a0908] text-[#ffb173]">
                    <Orbit className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-[#f6f2ea]">
                  Good observations begin with a question.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#948d81]">
                  Tell us what you would like to see, learn or build. Your note helps shape the next club night, workshop or project.
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="mono-data text-[0.55rem] uppercase tracking-[0.15em] text-[#585349]">AstroSci · Jadavpur University</span>
                  <span className="mono-data text-[0.55rem] uppercase tracking-[0.15em] text-[#ffb173]/70">22.4996° N</span>
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="home-panel plate-frame relative space-y-5 p-6 md:p-8"
          >
            <span className="plate-corner" aria-hidden="true" />
            <div className="mb-1 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="kicker kicker-ember">Transmission form</p>
                <p className="mt-2 font-display text-lg text-[#f6f2ea]">Your note to the club</p>
              </div>
              <span className="mono-data text-[0.58rem] text-[#6a655c]">09 / 09</span>
            </div>

            <div>
              <label htmlFor="feedback-name" className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#948d81]">
                Name
              </label>
              <input
                id="feedback-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="astro-input w-full border border-white/10 bg-[#08080a]/75 px-4 py-3 text-sm text-[#f6f2ea] transition-colors placeholder:text-[#585349] focus:border-[#ffb173]/50 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="feedback-email" className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#948d81]">
                Email
              </label>
              <input
                id="feedback-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="astro-input w-full border border-white/10 bg-[#08080a]/75 px-4 py-3 text-sm text-[#f6f2ea] transition-colors placeholder:text-[#585349] focus:border-[#ffb173]/50 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="feedback-message" className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#948d81]">
                Your message
              </label>
              <textarea
                id="feedback-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="astro-input w-full resize-none border border-white/10 bg-[#08080a]/75 px-4 py-3 text-sm leading-relaxed text-[#f6f2ea] transition-colors placeholder:text-[#585349] focus:border-[#ffb173]/50 focus:outline-none"
                placeholder="Share a thought, an idea, or a question..."
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-[#ffb173]/30 bg-[#ffb173]/[0.07] px-4 py-4 text-center"
                role="status"
              >
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#ffb173]">
                  Signal received — thank you.
                </span>
              </motion.div>
            ) : (
              <motion.button
                type="submit"
                className="btn-ember group relative w-full justify-center overflow-hidden"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
              >
                Send your signal
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                <span className="shine-sweep" aria-hidden="true" />
              </motion.button>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
