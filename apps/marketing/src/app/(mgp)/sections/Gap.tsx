"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Gap.module.css";

const existingSystems = [
  { name: "POS", question: "What sold today?" },
  { name: "ERP", question: "What's in inventory?" },
  { name: "CRM", question: "Who bought last month?" },
  { name: "Accounting", question: "What did we net?" },
];

export function Gap() {
  return (
    <section className={styles.gap} id="section-gap" aria-labelledby="gap-heading">
      <div className={`container ${styles.gap__inner}`}>
        <div className={styles.gap__header}>
          <span className="eyebrow">The missing layer</span>
          <motion.h2
            id="gap-heading"
            className={styles.gap__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            You have every system but one.
          </motion.h2>
          <motion.p
            className={styles.gap__sub}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Your existing software stack records history. None of it tells you what to execute next to capture revenue.
          </motion.p>
        </div>

        {/* Asymmetric 30% vs 70% weighted grid */}
        <div className={styles.gap__grid}>
          {/* Left: De-emphasized quiet legacy list */}
          <motion.div
            className={styles.gap__legacyCol}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.gap__legacyHeader}>Backward-looking stack</span>
            <ul className={styles.gap__legacyList}>
              {existingSystems.map(({ name, question }) => (
                <li key={name} className={styles.gap__legacyItem}>
                  <span className={styles.gap__legacyName}>{name}</span>
                  <span className={styles.gap__legacyQ}>{question}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: 70% dominant kinetic answer block */}
          <motion.div
            className={styles.gap__heroCol}
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.gap__heroEyebrow}>What Cocomo Operating System Adds</span>
            <h3 className={styles.gap__heroHeadline}>
              &ldquo;What exact action should I take right now to grow revenue?&rdquo;
            </h3>
            <p className={styles.gap__heroBody}>
              A prioritized recommendation with explicit reasoning, expected ₹ impact, and one-click execution across local media, loyalty, and staff ops.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
