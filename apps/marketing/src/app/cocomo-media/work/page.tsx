"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../media.module.css";

const caseStudies = [
  {
    num: "01",
    client: "Petpooja",
    category: "Restaurant SaaS · B2B",
    metrics: "28M+ Reach",
    metricSub: "3.0x Lead Pipeline Growth",
    reach: "84 creators · 12 cities",
    summary: "We activated a synchronized multi-city network of 84 food creators. Rather than posting generic ads, they integrated Petpooja SaaS naturally into their restaurant-vlog workflows, driving high-intent leads.",
    tags: ["B2B SaaS", "Food Creators", "12 Cities"],
    color: "#C8604A",
  },
  {
    num: "02",
    client: "Urban Company",
    category: "Home Services · App",
    metrics: "15M+ Reach",
    metricSub: "42% Increase in App Installs",
    reach: "60 creators · 8 states",
    summary: "Building authentic local trust for home services. We localized campaigns with micro-influencers across 8 states, executing custom creator-native visual hooks that translated directly to service bookings.",
    tags: ["Local Trust", "Micro Influencers", "8 States"],
    color: "#0EA5E9",
  },
  {
    num: "03",
    client: "Mamaearth",
    category: "D2C Skincare · Consumer",
    metrics: "50M+ Impressions",
    metricSub: "2.8x ROAS on Creator Spend",
    reach: "120 creators · pan-India",
    summary: "A full-funnel skincare storytelling campaign. Creators moved audiences from awareness to purchase by integrating Mamaearth into daily skincare routines — authentic, unscripted, and conversion-optimized.",
    tags: ["D2C", "Skincare", "Pan-India"],
    color: "#4ade80",
  },
];

export default function WorkPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>Case Studies</span>
          <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem" }}>
            Campaigns that changed<br />the story.
          </h1>
          <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
            Real brands. Real creators. Results that moved the bottom line.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {caseStudies.map(({ num, client, category, metrics, metricSub, reach, summary, tags, color }, idx) => (
            <motion.div
              key={client}
              className={styles.proofCard}
              style={{ margin: 0 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ padding: "40px" }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <span className={styles.proofBadge}>{num} // {category}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900, color, letterSpacing: "-1px", display: "block", lineHeight: 1 }}>
                      {metrics}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.5)", marginTop: "4px", display: "block" }}>
                      {metricSub}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className={styles.proofTitle} style={{ marginBottom: "16px" }}>
                  {client}
                </h2>

                {/* Summary */}
                <p className={styles.proofNarrativeText} style={{ marginBottom: "24px", fontSize: "15px", lineHeight: 1.75 }}>
                  {summary}
                </p>

                {/* Meta */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div className={styles.svc__tags}>
                    {tags.map((t) => (
                      <span key={t} style={{ fontSize: "11px", fontWeight: 500, background: "rgba(200,96,74,0.15)", color: "var(--terra-light)", padding: "5px 12px", borderRadius: "100px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.4)", fontFamily: "var(--font-mono)" }}>{reach}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.close} style={{ paddingInline: 0, paddingBottom: 0, marginTop: "4rem" }}>
          <div className={styles.closeInner}>
            <div className={styles.closeContent}>
              <span className={styles.close__eyebrow}>Start your campaign</span>
              <h2 className={styles.close__heading}>
                Your brand&apos;s story <em>starts here.</em>
              </h2>
              <p className={styles.close__sub}>
                Get a tailored proposal with creator matches and campaign projections in 48 hours.
              </p>
              <Link href="/cocomo-media/contact" className={styles.close__cta}>
                Get a Proposal →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
