"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import styles from "./Proof.module.css";

function MetricRoll({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
          if (match) {
            const prefix = match[1];
            const numVal = parseFloat(match[2]);
            const suffix = match[3];
            const isDecimal = match[2].includes(".");

            animate(0, numVal, {
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              onUpdate: (latest) => {
                setDisplay(
                  prefix +
                    (isDecimal ? latest.toFixed(1) : Math.round(latest).toString()) +
                    suffix
                );
              },
            });
          } else {
            setDisplay(value);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function Proof() {
  return (
    <section className={styles.proof} id="section-proof" aria-labelledby="proof-heading">
      <div className="container">
        <div className={styles.proof__header}>
          <span className="eyebrow">Proven Lift</span>
          <motion.h2
            id="proof-heading"
            className={styles.proof__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Measured in net revenue, not slides.
          </motion.h2>
        </div>

        {/* Asymmetric Hero Metric Layout */}
        <div className={styles.proof__heroMetricGrid}>
          {/* Dominant 120px+ Numeral */}
          <motion.div
            className={styles.proof__heroValueWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.proof__heroNumeral} data-metric>
              <MetricRoll value="+34%" />
            </span>
            <span className={styles.proof__heroLabel}>Average Net Revenue Lift</span>
            <span className={styles.proof__heroSub}>Measured over 90-day execution cycles</span>
          </motion.div>

          {/* Unboxed Secondary Metrics Column */}
          <div className={styles.proof__subMetrics}>
            <motion.div
              className={styles.proof__subMetricItem}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className={styles.proof__subMetricValue} data-metric>
                <MetricRoll value="₹2.4Cr" />
              </span>
              <span className={styles.proof__subMetricLabel}>Total Revenue Generated</span>
            </motion.div>

            <motion.div
              className={styles.proof__subMetricItem}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className={styles.proof__subMetricValue} data-metric>
                <MetricRoll value="14 days" />
              </span>
              <span className={styles.proof__subMetricLabel}>Median Time to First Measured Lift</span>
            </motion.div>
          </div>
        </div>

        {/* Unboxed Quiet Testimonial Quote */}
        <motion.figure
          className={styles.proof__quietQuote}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.55 }}
        >
          <blockquote className={styles.proof__blockquote}>
            &ldquo;Within two weeks, Cocomo identified our Tuesday lunch drop and executed a campaign that brought weekday covers up 41%. We didn&apos;t have to do anything except approve the recommendation.&rdquo;
          </blockquote>
          <figcaption className={styles.proof__caption}>
            <span className={styles.proof__name}>Kabir Malhotra</span>
            <span className={styles.proof__biz}>Founder, The Sassy Spoon, Mumbai</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
