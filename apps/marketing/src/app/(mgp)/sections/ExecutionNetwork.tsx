"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, MessageSquare, Tag, BarChart2, Repeat } from "lucide-react";
import styles from "./ExecutionNetwork.module.css";

const channels = [
  { icon: Users, label: "Creator campaigns", sub: "Micro-influencers in your city" },
  { icon: Zap, label: "Meta ads", sub: "Auto-targeted to your customer profile" },
  { icon: MessageSquare, label: "WhatsApp offers", sub: "Personalised to repeat visitors" },
  { icon: Tag, label: "Combo offers", sub: "Optimised by day-part & demand" },
  { icon: BarChart2, label: "Staff tasks", sub: "Assigned with context and timing" },
  { icon: Repeat, label: "Loyalty loops", sub: "Bring customers back, automatically" },
];

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
            transition={{ duration: 0.6 }}
          >
            Most tools stop here.
            <br />
            <span className={styles.exec__em}>We don&apos;t.</span>
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
          {channels.map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              className={styles.exec__card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.exec__icon} aria-hidden="true">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className={styles.exec__copy}>
                <span className={styles.exec__label}>{label}</span>
                <span className={styles.exec__sublabel}>{sub}</span>
              </div>
            </motion.div>
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
