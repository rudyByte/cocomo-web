"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Alignment.module.css";

export function Alignment() {
  return (
    <section className={styles.align} id="section-alignment" aria-labelledby="align-heading">
      <div className="container">
        <motion.div
          className={styles.align__inner}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">The alignment</span>
          <h2 id="align-heading" className={styles.align__heading}>
            The platform is free.
            <br />
            We earn only when you grow.
          </h2>
          <p className={styles.align__copy}>
            Every system we touch is measured against one number: the revenue it creates for you.
            Our incentives are structurally aligned with yours — not with feature adoption,
            not with seat count, not with impressions.
          </p>
          <div className={styles.align__divider} aria-hidden="true" />
          <p className={styles.align__footer}>
            This isn&apos;t a pricing model. It&apos;s a design principle that governs every
            recommendation Cocomo makes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ForWhom() {
  const verticals = [
    { label: "Restaurants", href: "/restaurants", active: true },
    { label: "Cafés & QSR", href: "/restaurants#cafes", active: true },
    { label: "Chains", href: "/restaurants#chains", active: true },
    { label: "Retail", active: false },
    { label: "Beauty & Wellness", active: false },
    { label: "Fitness", active: false },
    { label: "Hotels", active: false },
  ];

  return (
    <section className={styles.forwhom} id="section-for-whom" aria-labelledby="forwhom-heading">
      <div className="container">
        <div className={styles.forwhom__header}>
          <span className="eyebrow">Industries</span>
          <motion.h2
            id="forwhom-heading"
            className={styles.forwhom__heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Restaurants today,
            <br />
            commerce tomorrow.
          </motion.h2>
          <motion.p
            className={styles.forwhom__sub}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            We&apos;re building depth in one vertical before expanding. Each industry gets a
            worked playbook — not a generic dashboard.
          </motion.p>
        </div>

        <div className={styles.forwhom__chips}>
          {verticals.map(({ label, href, active }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {active && href ? (
                <Link href={href} className={`${styles.forwhom__chip} ${styles["forwhom__chip--active"]}`}>
                  {label}
                </Link>
              ) : (
                <span
                  className={styles.forwhom__chip}
                  aria-disabled="true"
                  title={`${label} — coming soon`}
                >
                  {label}
                  <span className={styles.forwhom__soon}>soon</span>
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className={styles.close} id="section-close" aria-labelledby="close-heading">
      <div className="container">
        <motion.div
          className={styles.close__inner}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 id="close-heading" className={styles.close__heading}>
            Know what to grow.
            <br />
            <em className={styles.close__em}>Then watch it get done.</em>
          </h2>
          <Link href="/demo" className={styles.close__cta} id="close-demo-cta">
            Book a demo — free to start
          </Link>
          <p className={styles.close__trust}>
            The platform is free. We earn only when you grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
