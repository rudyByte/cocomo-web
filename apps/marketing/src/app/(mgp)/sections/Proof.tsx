"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import styles from "./Proof.module.css";

const metrics = [
  { value: "+34%", label: "Avg. revenue lift", sub: "measured over 90 days" },
  { value: "₹2.4Cr", label: "Revenue generated", sub: "across partner merchants" },
  { value: "14 days", label: "Median time to result", sub: "from first recommendation" },
];

function MetricRoll({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          // Parse prefix, number (integer or decimal), and suffix
          const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
          if (match) {
            const prefix = match[1];
            const numVal = parseFloat(match[2]);
            const suffix = match[3];
            const isDecimal = match[2].includes(".");

            animate(0, numVal, {
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
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
              <span className={styles.proof__value} data-metric>
                <MetricRoll value={value} />
              </span>
              <span className={styles.proof__label}>{label}</span>
              <span className={styles.proof__sub}>{sub}</span>
            </motion.div>
          ))}
        </div>

        <motion.figure
          className={styles.proof__quote}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.55 }}
        >
          <blockquote className={styles.proof__blockquote}>
            &ldquo;Within two weeks, Cocomo identified our Tuesday lunch drop and executed a campaign
            that brought weekday covers up 41%. We didn&apos;t have to do anything except approve
            the recommendation.&rdquo;
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
