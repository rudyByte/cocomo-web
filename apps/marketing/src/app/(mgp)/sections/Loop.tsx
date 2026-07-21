"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Loop.module.css";

const nodes = [
  {
    id: "observe",
    label: "Observe",
    sublabel: "Your POS, foot traffic, campaigns, reviews",
    x: 80,
    y: 80,
  },
  {
    id: "recommend",
    label: "Recommend",
    sublabel: "Specific action, confidence, ₹ impact",
    x: 520,
    y: 80,
  },
  {
    id: "execute",
    label: "Execute",
    sublabel: "Creators, Meta ads, WhatsApp, offers",
    x: 520,
    y: 320,
  },
  {
    id: "measure",
    label: "Measure",
    sublabel: "Revenue lift, attribution, next signal",
    x: 80,
    y: 320,
  },
];

const paths = [
  { d: "M200 100 H500", from: "observe", to: "recommend" },
  { d: "M540 140 V300", from: "recommend", to: "execute" },
  { d: "M500 340 H200", from: "execute", to: "measure" },
  { d: "M100 300 V140", from: "measure", to: "observe" },
];

export function Loop() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.loop} id="section-loop" aria-labelledby="loop-heading" ref={ref}>
      <div className="container">
        <div className={styles.loop__header}>
          <span className="eyebrow">How it works</span>
          <motion.h2
            id="loop-heading"
            className={styles.loop__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            One continuous loop.
          </motion.h2>
          <motion.p
            className={styles.loop__sub}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Every recommendation feeds the next one. The system gets sharper over time.
          </motion.p>
        </div>

        {/* SVG Diagram */}
        <div className={styles.loop__diagram} aria-hidden="true">
          <svg
            viewBox="0 0 620 420"
            className={styles.loop__svg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Draw paths */}
            {paths.map(({ d, from }, i) => (
              <motion.path
                key={from}
                d={d}
                stroke="var(--hairline)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  delay: i * 0.3 + 0.4,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}

            {/* Arrow heads */}
            {inView && (
              <>
                <motion.polygon
                  points="498,93 508,100 498,107"
                  fill="var(--hairline)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                />
                <motion.polygon
                  points="533,298 540,308 547,298"
                  fill="var(--hairline)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                />
                <motion.polygon
                  points="202,333 192,340 202,347"
                  fill="var(--hairline)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                />
                <motion.polygon
                  points="93,142 100,132 107,142"
                  fill="var(--hairline)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                />
              </>
            )}

            {/* Nodes */}
            {nodes.map(({ id, label, x, y }, i) => (
              <motion.g
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x + 60}px ${y + 28}px` }}
              >
                <rect
                  x={x}
                  y={y - 6}
                  width="120"
                  height="40"
                  rx="8"
                  fill={id === "observe" ? "var(--clay)" : "var(--surface)"}
                  stroke={id === "observe" ? "var(--clay-deep)" : "var(--hairline)"}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 60}
                  y={y + 19}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="500"
                  letterSpacing="0.06em"
                  fill={id === "observe" ? "#fff" : "var(--ink-soft)"}
                >
                  {label.toUpperCase()}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Mobile stacked fallback */}
        <div className={styles.loop__mobile} aria-label="The Cocomo loop">
          {nodes.map(({ label, sublabel }, i) => (
            <motion.div
              key={label}
              className={styles.loop__step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={`${styles.loop__stepnum} ${i === 0 ? styles["loop__stepnum--active"] : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={styles.loop__stepcopy}>
                <span className={styles.loop__steplabel}>{label}</span>
                <span className={styles.loop__stepsub}>{sublabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
