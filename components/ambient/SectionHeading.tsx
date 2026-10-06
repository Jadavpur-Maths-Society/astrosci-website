"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SectionHeadingProps {
  /** Chapter number in the homepage field log. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
}

/** Shared editorial heading treatment for the lower homepage chapters. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  const centeredClass = centered ? "section-heading--centered" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -56px 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`section-heading ${centeredClass} ${className}`}
    >
      <div className="section-heading__meta">
        <span className="section-heading__index mono-data">FIELD NOTE {index}</span>
        <span className="section-heading__meta-rule" aria-hidden="true" />
        <span className="kicker kicker-ember">{eyebrow}</span>
        <span className="section-heading__coordinates mono-data" aria-hidden="true">
          JU · 22.4996° N
        </span>
      </div>

      <div className="section-heading__body">
        <div className="section-heading__copy">
          <div className="section-heading__title-window">
            <motion.h2
              initial={{ opacity: 0, y: "105%" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -56px 0px" }}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="section-heading__title"
            >
              {title}
            </motion.h2>
          </div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -56px 0px" }}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
              className="section-heading__description"
            >
              {description}
            </motion.p>
          )}
        </div>

        {action && (
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -56px 0px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="section-heading__action-wrap"
          >
            {action}
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0.4 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -56px 0px" }}
        transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
        className="section-heading__rule"
        aria-hidden="true"
      >
        <span />
      </motion.div>
    </motion.div>
  );
}
