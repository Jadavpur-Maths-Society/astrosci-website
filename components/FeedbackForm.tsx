"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CometLine from "@/components/ambient/CometLine";

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
    <section className="py-16 px-6 relative overflow-hidden">
      <CometLine className="absolute top-0 left-0 right-0" color="#ffb173" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 relative"
        >
          <span aria-hidden className="absolute -top-3 left-[18%] w-1 h-1 rounded-full bg-[#ffd7b0] astro-twinkle" />
          <span aria-hidden className="absolute top-6 right-[16%] w-1.5 h-1.5 rounded-full bg-[#ffc9a0] astro-twinkle" style={{ animationDelay: "1.4s" }} />
          <p
            className="kicker mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            — We Value Your Input —
          </p>
          <h2
            className="section-title leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FEEDBACK
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/10 bg-[#0b0b0d]/80 backdrop-blur-sm p-6 md:p-8 space-y-5"
        >
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0c0c0e] border border-white/10 text-white text-sm focus:border-[#ffb173]/50 focus:outline-none transition-all astro-input"
              style={{ fontFamily: "var(--font-body)" }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0c0c0e] border border-white/10 text-white text-sm focus:border-[#ffb173]/50 focus:outline-none transition-all astro-input"
              style={{ fontFamily: "var(--font-body)" }}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Feedback
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#0c0c0e] border border-white/10 text-white text-sm focus:border-[#ffb173]/50 focus:outline-none transition-all resize-none astro-input"
              style={{ fontFamily: "var(--font-body)" }}
              placeholder="Share your thoughts..."
            />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-3 rounded-lg bg-[#ffb173]/10 border border-[#ffb173]/30"
            >
              <span
                className="text-[#ffb173] text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                ✓ Thank you for your feedback!
              </span>
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              className="group relative w-full py-3 rounded-lg bg-gradient-to-r from-[#ffb173]/20 to-[#ff7a29]/20 border border-[#ffb173]/40 text-[#ffb173] text-sm font-medium hover:from-[#ffb173]/30 hover:to-[#ff7a29]/30 hover:shadow-[0_0_30px_rgba(255,177,115,0.3)] transition-all duration-300 overflow-hidden"
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Feedback
              <span className="shine-sweep" aria-hidden />
            </motion.button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
