"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Utensils, TrendingUp, Users, BarChart3 } from "lucide-react";
import styles from "./restaurants.module.css";

const steps = [
  {
    step: "Signal",
    text: "Cocomo detects a 38% drop in weekday lunch covers vs. weekend baseline, cross-referenced with 3 competitor promotions in a 500m radius launched in the last 14 days.",
    icon: "📡",
  },
  {
    step: "Recommendation",
    text: "Increase weekday lunch sales · ₹1.8L/mo impact · 92% confidence · 14 days to measurable result.",
    icon: "🎯",
  },
  {
    step: "Actions",
    text: "Partner with 3 local micro-influencers (15K–50K reach each). Launch a weekday combo at ₹299. Run Meta ads Tue–Thu, 11am–1pm. Track repeat visitor rate via WhatsApp check-in.",
    icon: "⚡",
  },
  {
    step: "Result",
    text: "Weekday covers increased by 42% within 14 days. Average transaction value grew 18% through the ₹299 combo, resulting in ₹1.95L in new high-margin revenue.",
    icon: "✅",
  },
];

const subSections = [
  {
    id: "cafes",
    label: "Format",
    heading: "Cafés & QSR",
    body: "High transaction frequency, high repeat opportunity. Cocomo optimises loyalty loops, day-part offers, and neighbourhood reach for cafés and quick-service formats.",
    metrics: ["+28%", "+₹1.2L"],
    metricLabels: ["Repeat visits", "Monthly lift/outlet"],
  },
  {
    id: "chains",
    label: "Scale",
    heading: "Chains & Multi-outlet",
    body: "Outlet-level recommendations with brand-level dashboards. Cocomo identifies which outlets are under-performing and why — and executes fixes at scale.",
    metrics: ["8+", "1 click"],
    metricLabels: ["Outlets managed", "Campaign dispatch"],
  },
];

export default function RestaurantsPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="rest-heading">
        <div className={styles.hero__bg}>
          <img src="/restaurants-hero.png" className={styles.hero__bgImage} alt="Elegant restaurant interior" />
          <div className={styles.hero__bgFade} />
        </div>

        <div className={`container ${styles.hero__inner}`}>
          <motion.div
            className={styles.hero__eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Utensils size={11} />
            For Restaurants
          </motion.div>

          <motion.h1
            id="rest-heading"
            className={styles.hero__heading}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            The only OS built for how restaurants actually grow.
          </motion.h1>

          <motion.p
            className={styles.hero__sub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Restaurants don&apos;t die from bad food. They die from empty tables on Tuesdays, first-time visitors who never return, and marketing that doesn&apos;t trace back to covers. Cocomo fixes the loop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6 }}
          >
            <Link href="/demo?vertical=restaurants" className={styles.hero__cta} id="restaurants-demo-cta">
              Book a demo for your restaurant
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <div className={styles.stats} aria-hidden="true">
        <div className={`container ${styles.stats__inner}`}>
          {[
            { value: "+34%", label: "Avg. weekday cover lift" },
            { value: "14 days", label: "To first measurable result" },
            { value: "₹2.4Cr", label: "Attributed revenue" },
            { value: "92%", label: "Avg. recommendation confidence" },
          ].map((stat, i) => (
            <>
              {i > 0 && <div className={styles.stats__divider} />}
              <div key={stat.label} className={styles.stats__item}>
                <span className={styles.stats__value}>{stat.value}</span>
                <span className={styles.stats__label}>{stat.label}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* ── Worked Example ── */}
      <section className={styles.example} id="section-example" aria-labelledby="example-heading">
        <div className="container">
          <span className="eyebrow">Worked Example</span>
          <h2 id="example-heading" className={styles.section__heading}>
            A real recommendation, step by step.
          </h2>
          <p className={styles.section__body}>
            This is how Cocomo turns a slow Tuesday into a measurable revenue win, automatically.
          </p>

          <div className={styles.example__steps}>
            {steps.map(({ step, text, icon }, i) => (
              <motion.div
                key={step}
                className={styles.example__step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.example__steplabel}>
                  <span style={{ fontSize: "1.25rem", display: "block", marginBottom: "var(--space-1)" }}>{icon}</span>
                  {step}
                </div>
                <p className={styles.example__steptext}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub sections ── */}
      {subSections.map(({ id, label, heading, body, metrics, metricLabels }) => (
        <section key={id} id={id} className={styles.sub} aria-labelledby={`${id}-heading`}>
          <div className="container">
            <div className={styles.sub__grid}>
              <motion.div
                className={styles.sub__card}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="eyebrow" style={{ marginBottom: "var(--space-3)", display: "block" }}>{label}</span>
                <h2 id={`${id}-heading`} className={styles.sub__heading}>{heading}</h2>
                <p className={styles.section__body}>{body}</p>
                <div style={{ display: "flex", gap: "var(--space-8)", marginTop: "var(--space-6)" }}>
                  {metrics.map((m, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--clay)" }}>{m}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "var(--tracking-mono)", textTransform: "uppercase", color: "var(--ink-muted)" }}>{metricLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
              >
                {["Observe signals", "Recommend action", "Execute campaign", "Measure ₹ lift"].map((step, i) => (
                  <div key={step} style={{
                    display: "flex", alignItems: "center", gap: "var(--space-3)",
                    padding: "var(--space-3) var(--space-4)",
                    background: "var(--white)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-rest)"
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", fontWeight: 700,
                      color: "var(--clay)", background: "var(--clay-tint)",
                      border: "1px solid var(--clay-border)",
                      padding: "2px 7px", borderRadius: "var(--radius-xs)"
                    }}>0{i + 1}</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--ink-soft)", fontWeight: 500 }}>{step}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ── */}
      <section className={styles.cta}>
        <div className="container" style={{ position: "relative" }}>
          <h2 className={styles.cta__heading}>Ready to fill those Tuesday tables?</h2>
          <Link href="/demo?vertical=restaurants" className={styles.cta__btn} id="restaurants-close-cta">
            Book a demo — free to start
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
