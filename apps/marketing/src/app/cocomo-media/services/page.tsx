"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../media.module.css";

const detailedServices = [
  {
    num: "01",
    emoji: "🧠",
    title: "Influencer & Creator Campaigns",
    sub: "Hyper-local matching for maximum reach and conversion",
    body: "We source, vet, and contract food, lifestyle, and regional micro-influencers. Every campaign is engineered around trackable redemption mechanisms and audience lift.",
    features: ["Vetted network of 500+ creators", "Usage rights & content licensing", "Trackable promo codes & UTM links"],
    tags: ["Nano", "Micro", "Macro"],
  },
  {
    num: "02",
    emoji: "🎬",
    title: "High-Volume Content Production",
    sub: "Reels, stories, and UGC built for social algorithms",
    body: "Static photography doesn't drive social discovery. We produce short-form video content designed for Instagram Reels, YouTube Shorts, and Meta ad placements.",
    features: ["On-location shoot coordination", "Dedicated edit & color grading", "A/B creative testing hooks"],
    tags: ["Video", "Photography", "Motion"],
  },
  {
    num: "03",
    emoji: "📣",
    title: "Meta Ads & Paid Media Management",
    sub: "Performance media buying with measurable attribution",
    body: "Stop wasting budget on broad boost posts. We run geo-fenced Meta campaigns targeting high-intent audiences during key decision windows.",
    features: ["Geo-fencing down to 500m radius", "Dynamic day-parting ads", "Closed-loop revenue attribution"],
    tags: ["Meta", "Paid", "Attribution"],
  },
  {
    num: "04",
    emoji: "🤝",
    title: "Brand Ambassador Management",
    sub: "Long-term relationships that build authentic category authority",
    body: "One-off posts build awareness; recurring creator partnerships build habits. We build and manage exclusive creator ambassador programs for your brand.",
    features: ["Monthly recurring deliverables", "Exclusive regional ambassador rights", "Performance bonus structures"],
    tags: ["Partnerships", "Recurring", "Exclusive"],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>Our Services</span>
          <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem" }}>
            Full-stack media execution<br />for growing brands.
          </h1>
          <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
            Whether you need a single viral creator push or an ongoing performance media operation,
            Cocomo Media executes end-to-end.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {detailedServices.map(({ num, emoji, title, sub, body, features, tags }, i) => (
            <motion.div
              key={num}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.svc__num}>{num}</span>
              <div className={styles.svc__iconWrap}>{emoji}</div>
              <h2 className={styles.services__title}>{title}</h2>
              <p style={{ color: "var(--terra)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                {sub}
              </p>
              <p className={styles.services__desc}>{body}</p>
              <div className={styles.svc__tags} style={{ marginBottom: "16px" }}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.svc__tag}>{tag}</span>
                ))}
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {features.map((f) => (
                  <li key={f} style={{ fontSize: "13px", color: "var(--ink-gray)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "var(--terra)", marginTop: "2px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.close} style={{ paddingInline: 0, paddingBottom: 0 }}>
          <div className={styles.closeInner}>
            <div className={styles.closeContent}>
              <span className={styles.close__eyebrow}>Get started</span>
              <h2 className={styles.close__heading}>
                Ready to build your <em>custom campaign?</em>
              </h2>
              <p className={styles.close__sub}>
                Tailored proposal with creator matches and budget breakdowns in 48 hours.
              </p>
              <Link href="/cocomo-media/contact" className={styles.close__cta}>
                Request Proposal →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
