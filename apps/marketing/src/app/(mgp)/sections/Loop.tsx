"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Eye, Cpu, Zap, BarChart4, ArrowRight } from "lucide-react";
import styles from "./Loop.module.css";

const loopPhases = [
  {
    num: "01",
    phase: "Observe",
    icon: Eye,
    title: "Continuous Telemetry",
    desc: "Engine aggregates sales telemetry, hourly transaction velocity, Google reviews, and neighborhood traffic sensors automatically.",
    color: "var(--clay)",
  },
  {
    num: "02",
    phase: "Recommend",
    icon: Cpu,
    title: "Prioritized Actions",
    desc: "Calculates the exact weekday drop, maps it to a ₹ expected revenue impact, and surfaces concrete recommendations with confidence scores.",
    color: "var(--warn)",
  },
  {
    num: "03",
    phase: "Execute",
    icon: Zap,
    title: "Instant Campaigns",
    desc: "Deploys local Meta ad sets, matches and contracts micro-creators, or triggers WhatsApp loyalty loops with a single merchant approval click.",
    color: "var(--clay)",
  },
  {
    num: "04",
    phase: "Measure",
    icon: BarChart4,
    title: "Closed-Loop Attribution",
    desc: "Traces campaign redemption mechanics directly back to cover lift and outlet sales, feeding the attribution data back to start the cycle again.",
    color: "var(--good)",
  },
];

export function Loop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to active index states
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    if (latest < 0.35) index = 0;
    else if (latest < 0.55) index = 1;
    else if (latest < 0.75) index = 2;
    else index = 3;
    setActiveIdx(index);
  });

  // Calculate width scaling or path length scrub
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={sectionRef} className={styles.loop} id="section-loop" aria-labelledby="loop-heading">
      <div className={styles.loop__glow} aria-hidden="true" />

      <div className="container" style={{ position: "relative" }}>
        <div className={styles.loop__header}>
          <span className="eyebrow">The Engine Cycle</span>
          <motion.h2
            id="loop-heading"
            className={styles.loop__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            Every execution feeds the next recommendation. The system gets sharper with every cover resolved.
          </motion.p>
        </div>

        {/* Animated Connecting SVG Path (Desktop only) */}
        <div className={styles.loop__svgWrapper}>
          <svg className={styles.loop__svg} viewBox="0 0 1000 100" fill="none">
            {/* Background path line */}
            <path
              d="M 120 50 L 370 50 L 620 50 L 870 50"
              stroke="rgba(37, 99, 235, 0.08)"
              strokeWidth="2.5"
            />
            {/* Animated active path line */}
            <motion.path
              d="M 120 50 L 370 50 L 620 50 L 870 50"
              stroke="var(--clay)"
              strokeWidth="3"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Bento Grid Process Layout */}
        <div className={styles.loop__grid}>
          {loopPhases.map(({ num, phase, icon: Icon, title, desc, color }, i) => {
            const isActive = activeIdx === i;
            return (
              <motion.div
                key={num}
                className={`${styles.phaseCard} ${isActive ? styles["phaseCard--active"] : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Desktop Connection Arrow */}
                {i < 3 && (
                  <div className={styles.phaseCard__bridge} aria-hidden="true">
                    <ArrowRight
                      size={14}
                      className={styles.phaseCard__bridgeArrow}
                      style={{ color: isActive ? color : "var(--hairline)" }}
                    />
                  </div>
                )}

                <div className={styles.phaseCard__top}>
                  <span className={styles.phaseCard__index} style={{ color: isActive ? color : "var(--ink-muted)" }}>
                    {num} / {phase.toUpperCase()}
                  </span>
                  <div
                    className={styles.phaseCard__icon}
                    style={{
                      color: isActive ? color : "var(--ink-muted)",
                      backgroundColor: isActive
                        ? `color-mix(in srgb, ${color} 12%, transparent)`
                        : "rgba(10, 22, 47, 0.04)",
                      border: isActive ? `1px solid ${color}` : "1px solid transparent",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                <div className={styles.phaseCard__body}>
                  <h3 className={styles.phaseCard__title}>{title}</h3>
                  <p className={styles.phaseCard__desc}>{desc}</p>
                </div>

                {/* Bottom active line indicator */}
                <div
                  className={styles.phaseCard__accentLine}
                  style={{
                    backgroundColor: isActive ? color : "transparent",
                    boxShadow: isActive ? `0 0 12px ${color}` : "none"
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
