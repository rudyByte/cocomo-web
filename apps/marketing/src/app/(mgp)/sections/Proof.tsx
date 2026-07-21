"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Proof.module.css";

// TODO: replace with real merchant metrics/quote
const metrics = [
  { value: "+34%", label: "Avg. revenue lift", sub: "measured over 90 days" },
  { value: "₹2.4Cr", label: "Revenue generated", sub: "across partner merchants" },
  { value: "14 days", label: "Median time to result", sub: "from first recommendation" },
];

export function Proof() {
  return (
    <section className={styles.proof} id="section-proof" aria-labelledby="proof-heading">
      <div className="container">
        <div className={styles.proof__header}>
          <span className="eyebrow">Results</span>
          <motion.h2
            id="proof-heading"
            className={styles.proof__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Measured in rupees, not slides.
          </motion.h2>
        </div>

        <div className={styles.proof__metrics}>
          {metrics.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              className={styles.proof__metric}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <span className={styles.proof__value} data-metric>{value}</span>
              <span className={styles.proof__label}>{label}</span>
              <span className={styles.proof__sub}>{sub}</span>
            </motion.div>
          ))}
        </div>

        {/* TODO: replace with real merchant quote */}
        <motion.figure
          className={styles.proof__quote}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.55 }}
        >
          <blockquote className={styles.proof__blockquote}>
            {/* TODO: Replace with real merchant quote */}
            &ldquo;Within two weeks, Cocomo identified our Tuesday lunch drop and executed a campaign
            that brought weekday covers up 41%. We didn&apos;t have to do anything except approve
            the recommendation.&rdquo;
          </blockquote>
          <figcaption className={styles.proof__caption}>
            {/* TODO: Replace with real merchant name, business, city */}
            <span className={styles.proof__name}>Restaurant owner, Mumbai</span>
            <span className={styles.proof__biz}>TODO: Real merchant name</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
