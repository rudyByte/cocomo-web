"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Zap, Users, MessageSquare, Tag, BarChart2, Repeat, LucideIcon } from "lucide-react";
import styles from "./ExecutionNetwork.module.css";

interface ChannelItem {
  icon: LucideIcon;
  label: string;
  sub: string;
}

const channels: ChannelItem[] = [
  { icon: Users, label: "Creator campaigns", sub: "Micro-influencers in your city" },
  { icon: Zap, label: "Meta ads", sub: "Auto-targeted to your customer profile" },
  { icon: MessageSquare, label: "WhatsApp offers", sub: "Personalised to repeat visitors" },
  { icon: Tag, label: "Combo offers", sub: "Optimised by day-part & demand" },
  { icon: BarChart2, label: "Staff tasks", sub: "Assigned with context and timing" },
  { icon: Repeat, label: "Loyalty loops", sub: "Bring customers back, automatically" },
];

// Alternating reveal directions for organic feel
const revealDirections = [
  { x: -24, y: 0 },  // left
  { x: 24, y: 0 },   // right
  { x: 0, y: 20 },   // up
  { x: -24, y: 0 },  // left
  { x: 24, y: 0 },   // right
  { x: 0, y: 20 },   // up
];

function ExecutionCard({ item, index }: { item: ChannelItem; index: number }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  // Mouse tracking for glow effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  const dir = revealDirections[index % revealDirections.length];

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.exec__card} ${inView ? styles.drawIcon : ""}`}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow glow */}
      <div className={styles.exec__glow} aria-hidden="true" />

      <div className={styles.exec__icon} aria-hidden="true">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className={styles.exec__copy}>
        <span className={styles.exec__label}>{item.label}</span>
        <span className={styles.exec__sublabel}>{item.sub}</span>
      </div>
    </motion.div>
  );
}

export function ExecutionNetwork() {
  return (
    <section className={styles.exec} id="section-execution" aria-labelledby="exec-heading">
      <div className="container">
        <div className={styles.exec__header}>
          <span className="eyebrow">Execution network</span>
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
            Every recommendation is backed by a network that executes it — creators,
            paid media, messaging, promotions, and staff — all tracked back to ₹ revenue.
          </motion.p>
        </div>

        <div className={styles.exec__grid}>
          {channels.map((item, i) => (
            <ExecutionCard key={item.label} item={item} index={i} />
          ))}
        </div>

        <motion.div
          className={styles.exec__callout}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className={styles.exec__callouttext}>
            This is where Cocomo Media capability lives within your growth OS —
            not a separate agency, an integrated execution layer.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
