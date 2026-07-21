"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Gap.module.css";

const existingSystems = [
  { name: "POS", question: "What sold?" },
  { name: "ERP", question: "What's in stock?" },
  { name: "CRM", question: "Who are my customers?" },
  { name: "Accounting", question: "What did I earn?" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

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
            Your tools answer what happened.
            <br />
            None of them answer what's next.
          </motion.p>
        </div>

        <div className={styles.gap__grid}>
          {/* Existing systems — past tense */}
          <div className={styles.gap__col}>
            <span className={`eyebrow ${styles.gap__collabel}`}>What you have</span>
            <div className={styles.gap__systems}>
              {existingSystems.map(({ name, question }, i) => (
                <motion.div
                  key={name}
                  className={styles.gap__system}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <span className={styles.gap__sysname}>{name}</span>
                  <span className={styles.gap__sysq}>{question}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.gap__arrow} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M8 24h32M32 16l8 8-8 8"
                stroke="var(--clay)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Cocomo — forward-looking */}
          <div className={styles.gap__col}>
            <span className={`eyebrow ${styles.gap__collabel} ${styles["gap__collabel--clay"]}`}>
              What Cocomo adds
            </span>
            <motion.div
              className={styles.gap__cocomo}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.gap__cocomoq}>What should I do next to grow revenue?</span>
              <div className={styles.gap__cocomoanswer}>
                <div className={styles.gap__answerline} />
                <span>
                  A specific action, with reasoning, confidence score, and ₹ impact — ready to execute.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
