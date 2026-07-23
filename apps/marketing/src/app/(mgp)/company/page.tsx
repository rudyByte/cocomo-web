"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./company.module.css";

const values = [
  {
    icon: "🎯",
    title: "Action Over Analytics",
    desc: "Dashboards don't increase revenue — decisions do. We prioritize surfacing 1 actionable recommendation over 100 data points.",
  },
  {
    icon: "🤝",
    title: "Aligned Incentives",
    desc: "We don't charge subscription fees. Our success is directly tied to the incremental revenue we generate for your business.",
  },
  {
    icon: "⚡",
    title: "Closed-Loop Execution",
    desc: "Insights without execution are useless. We build end-to-end automation from POS telemetry directly to media dispatch.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    desc: "Customer data belongs to merchants. We employ edge hashing and strict encryption to keep your transaction signals secure.",
  },
];

export default function CompanyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="company-heading">
        <div className={`container ${styles.hero__inner}`}>
          <motion.div
            className={styles.hero__eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Building2 size={11} />
            About Cocomo
          </motion.div>

          <motion.h1
            id="company-heading"
            className={styles.hero__heading}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            We build the growth OS for real-world merchants.
          </motion.h1>

          <motion.p
            className={styles.hero__sub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Cocomo was founded on a simple observation: brick-and-mortar merchants have plenty of software telling them what happened, but zero systems telling them what to do next.
          </motion.p>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className={styles.section}>
        <div className="container">
          <span className="eyebrow">Our Values</span>
          <h2 className={styles.section__heading}>How we think about growth.</h2>
          <p className={styles.section__body}>
            We believe the future of merchant software isn&apos;t better charts — it&apos;s autonomous growth engines that turn POS data into executed revenue lift.
          </p>

          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.valueCard__icon}>{v.icon}</div>
                <h3 className={styles.valueCard__title}>{v.title}</h3>
                <p className={styles.valueCard__desc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className={styles.contact} id="contact">
        <div className={`container ${styles.contact__inner}`}>
          <span className="eyebrow">Get in Touch</span>
          <h2 className={styles.section__heading}>Talk with our team.</h2>
          <p className={styles.section__body}>
            Whether you&apos;re an enterprise restaurant group, a local multi-outlet operator, or a prospective partner — we&apos;d love to connect.
          </p>

          {submitted ? (
            <motion.div
              style={{
                background: "var(--white)",
                border: "1px solid var(--good)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-8)",
                marginTop: "var(--space-8)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 size={24} color="var(--good)" />
              <div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--ink)" }}>Message received</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--ink-muted)", marginTop: "2px" }}>
                  Thanks for reaching out! A member of our team will get back to you within 24 hours.
                </p>
              </div>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.form__row}>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="name">Name</label>
                  <input className={styles.form__input} id="name" type="text" required placeholder="Jane Doe" />
                </div>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="email">Work Email</label>
                  <input className={styles.form__input} id="email" type="email" required placeholder="jane@restaurant.com" />
                </div>
              </div>
              <div className={styles.form__field}>
                <label className={styles.form__label} htmlFor="outlets">Outlets / Brand</label>
                <input className={styles.form__input} id="outlets" type="text" placeholder="e.g. Bandra Bistro (3 locations)" />
              </div>
              <div className={styles.form__field}>
                <label className={styles.form__label} htmlFor="message">Message</label>
                <textarea className={`${styles.form__input} ${styles.form__textarea}`} id="message" rows={4} placeholder="Tell us about your outlets and growth goals..." />
              </div>
              <button type="submit" className={styles.form__submit}>
                Send Message
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
