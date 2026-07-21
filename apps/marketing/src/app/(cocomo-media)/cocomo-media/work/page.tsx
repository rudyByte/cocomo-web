import type { Metadata } from "next";
import Link from "next/link";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Case Studies & Work — Cocomo Media",
  description: "Real creator campaign results and growth case studies across dining, cafés, and lifestyle brands.",
};

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
    <div className={styles.page} style={{ paddingTop: "4rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Work</span>
        <h1 className={styles.section__heading} style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Proven results for ambitious merchants.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Explore how our creator campaigns turn attention into measurable footfall and revenue.
        </p>

        <div style={{ display: "grid", gap: "2rem" }}>
          {caseStudies.map((cs) => (
            <div key={cs.client} className={styles.services__card} style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.8125rem", color: "#E8356D", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  {cs.category}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#3DAE80", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                  {cs.metrics}
                </span>
              </div>
              <h2 className={styles.services__title} style={{ fontSize: "1.75rem", color: "#fff", marginBottom: "0.5rem" }}>
                {cs.client}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginBottom: "1.5rem", fontFamily: "var(--font-mono)" }}>
                Reach: {cs.reach}
              </p>
              <p className={styles.services__desc} style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {cs.summary}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <Link href="/cocomo-media/contact" className={styles.hero__primary}>
            Get a Proposal for Your Brand
          </Link>
        </div>
      </div>
    </div>
  );
}
