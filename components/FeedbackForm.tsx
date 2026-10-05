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
      <CometLine className="absolute top-0 left-0 right-0" color="#38bdf8" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 relative"
        >
          <span aria-hidden className="absolute -top-3 left-[18%] w-1 h-1 rounded-full bg-[#a5f3fc] astro-twinkle" />
          <span aria-hidden className="absolute top-6 right-[16%] w-1.5 h-1.5 rounded-full bg-[#93c5fd] astro-twinkle" style={{ animationDelay: "1.4s" }} />
          <p
            className="text-xs tracking-[0.4em] text-[#38bdf8] mb-2 uppercase"
            style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
          >
            — We Value Your Input —
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
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
          className="rounded-2xl border border-white/10 bg-[#07091a]/80 backdrop-blur-sm p-6 md:p-8 space-y-5"
        >
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0d1a] border border-white/10 text-white text-sm focus:border-[#38bdf8]/50 focus:outline-none transition-all astro-input"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0d1a] border border-white/10 text-white text-sm focus:border-[#38bdf8]/50 focus:outline-none transition-all astro-input"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              className="text-gray-400 text-xs mb-1 block"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
            >
              Feedback
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0d1a] border border-white/10 text-white text-sm focus:border-[#38bdf8]/50 focus:outline-none transition-all resize-none astro-input"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
              placeholder="Share your thoughts..."
            />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-3 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30"
            >
              <span
                className="text-[#38bdf8] text-sm"
                style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
              >
                ✓ Thank you for your feedback!
              </span>
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-[#38bdf8]/20 to-[#2563eb]/20 border border-[#38bdf8]/40 text-[#38bdf8] text-sm font-medium hover:from-[#38bdf8]/30 hover:to-[#2563eb]/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300 overflow-hidden"
              style={{ fontFamily: "'Public Sans', 'Inter', system-ui, sans-serif" }}
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
