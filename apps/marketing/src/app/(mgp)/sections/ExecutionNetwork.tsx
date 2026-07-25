"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Users, MessageSquare, Tag, BarChart2, Repeat, ChevronRight } from "lucide-react";
import styles from "./ExecutionNetwork.module.css";

const channels = [
  { id: "creators", icon: Users, label: "Creator campaigns", tag: "INFLUENCER LOOP", desc: "Instantly matches and contracts micro-creators in your city based on target dining demographics." },
  { id: "ads", icon: Zap, label: "Meta & Geo ads", tag: "PAID MEDIA", desc: "Auto-targeted localized ad sets deployed to zipcodes with low weekday footfall velocity." },
  { id: "whatsapp", icon: MessageSquare, label: "WhatsApp offers", tag: "DIRECT CRM", desc: "Personalized retention triggers sent to high-value lapse customers with unique redemption tokens." },
  { id: "combos", icon: Tag, label: "Dynamic combos", tag: "PROMOTIONS", desc: "Algorithmically optimized menu bundles designed to clear slow-moving inventory at peak margin." },
  { id: "staff", icon: BarChart2, label: "Staff directives", tag: "OPERATIONS", desc: "Actionable daily shift instructions pushed directly to floor leads and kitchen managers." },
  { id: "loyalty", icon: Repeat, label: "Loyalty loops", tag: "RETENTION", desc: "Automated cashback and visit streaks that turn one-time diners into weekly regulars." },
];

export function ExecutionNetwork() {
  const [activeId, setActiveId] = useState<string>("creators");

  return (
    <section className={styles.exec} id="section-execution" aria-labelledby="exec-heading">
      <div className="container">
        <div className={styles.exec__header}>
          <span className="eyebrow">Integrated Execution</span>
          <motion.h2
            id="exec-heading"
            className={styles.exec__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Most tools stop at insight.
            <br />
            <span className={styles.exec__em}>We execute.</span>
          </motion.h2>
          <motion.p
            className={styles.exec__sub}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Every recommendation connects directly to an active execution channel — no manual campaign setup required.
          </motion.p>
        </div>
      </div>

      {/* Running Marquee Ticker Band */}
      <div className={styles.exec__tickerBand} aria-hidden="true">
        <div className={styles.exec__tickerTrack}>
          {[...channels, ...channels].map((item, idx) => (
            <span key={`${item.id}-${idx}`} className={styles.exec__tickerItem}>
              {item.label}
              <span className={styles.exec__tickerDot} />
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Asymmetric Expandable Channel List */}
        <div className={styles.exec__list}>
          {channels.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                className={`${styles.exec__row} ${isActive ? styles["exec__row--active"] : ""}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
              >
                <div className={styles.exec__rowHeader}>
                  <div className={styles.exec__rowLeft}>
                    <div className={styles.exec__rowIcon}>
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className={styles.exec__rowTitle}>{item.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className={styles.exec__rowTag}>{item.tag}</span>
                    <ChevronRight
                      size={16}
                      style={{
                        color: isActive ? "var(--clay)" : "var(--ink-subtle)",
                        transform: isActive ? "rotate(90deg)" : "none",
                        transition: "transform 0.3s ease, color 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      className={styles.exec__rowDesc}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={styles.exec__callout}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className={styles.exec__callouttext}>
            Cocomo Media functions as an integrated execution layer inside your growth OS — not an external agency.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
