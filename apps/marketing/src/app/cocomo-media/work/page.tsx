"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../media.module.css";

const caseStudies = [
  {
    client: "Bandra Artisanal Bakery",
    category: "Café & Bakery",
    metrics: "+42% Weekend Revenue",
    reach: "1.2M Impressions",
    summary: "Activated 8 food micro-creators over 3 weeks to push new weekend sourdough and brunch items, supported by geo-fenced Meta Reel ads.",
  },
  {
    client: "The Urban Gourmet",
    category: "Casual Dining Chain",
    metrics: "1,850+ Offer Redemptions",
    reach: "850K Views",
    summary: "Ran a targeted weekday lunch combo campaign with local office-vlogger creators to solve Tuesday-Thursday cover drops.",
  },
  {
    client: "Roast & Co.",
    category: "Specialty Coffee",
    metrics: "+65% Loyalty Signups",
    reach: "450K Impressions",
    summary: "Integrated creator reels with a WhatsApp digital loyalty card, turning first-time visitors into weekly regulars.",
  },
];

export default function WorkPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Work</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem", color: "#0A162F" }}>
          Proven results for ambitious merchants.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Explore how our creator campaigns turn attention into measurable footfall and revenue.
        </p>

        <div style={{ display: "grid", gap: "2.5rem" }}>
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.client}
              className={styles.services__card}
              style={{ padding: "3rem", background: "rgba(246, 248, 252, 0.45)", overflow: "hidden" }}
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-hover-text="VIEW"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.8125rem", color: "#2563EB", fontFamily: "var(--font-mono)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em" }}>
                  {cs.category}
                </span>
                <span style={{ fontSize: "1rem", color: "#3DAE80", fontFamily: "var(--font-mono)", fontWeight: "700" }}>
                  {cs.metrics}
                </span>
              </div>
              <h2 className={styles.services__title} style={{ fontSize: "2rem", color: "#0A162F", marginBottom: "0.75rem" }}>
                {cs.client}
              </h2>
              <p style={{ color: "#5E697F", fontSize: "0.875rem", marginBottom: "2rem", fontFamily: "var(--font-mono)" }}>
                Reach: {cs.reach}
              </p>
              <p className={styles.services__desc} style={{ fontSize: "1.0625rem", lineHeight: "1.7", color: "#0A162F" }}>
                {cs.summary}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "6rem", textAlign: "center" }}>
          <Link href="/cocomo-media/contact" className={styles.hero__primary} data-magnetic>
            Get a Proposal for Your Brand
          </Link>
        </div>
      </div>
    </div>
  );
}
