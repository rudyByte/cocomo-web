import type { Metadata } from "next";
import Link from "next/link";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Pricing — Cocomo Media",
  description: "Transparent campaign packages and custom performance media pricing for growth-ready brands.",
};

const highlightedTier = {
  name: "Scale & Dominance",
  emoji: "🚀",
  price: "₹1,80,000",
  period: "/ campaign",
  badge: "Most Popular",
  desc: "For established brands aiming for wide visibility and measurable revenue lift.",
  features: [
    "12 Micro to mid-tier creators",
    "5 High-production Reel assets + raw UGC",
    "Full Meta & Instagram ad management",
    "Dedicated Campaign Director",
    "Revenue attribution report",
  ],
};

const secondaryTiers = [
  {
    name: "Growth Launch",
    emoji: "⚡",
    price: "₹75,000",
    period: "/ campaign",
    desc: "Ideal for brands launching a new product or pushing initial awareness.",
    features: [
      "5 Vetted micro-influencers",
      "2 Custom Reel video assets",
      "Meta ad campaign setup",
      "Trackable promo redemption setup",
    ],
  },
  {
    name: "Custom Enterprise",
    emoji: "🏆",
    price: "Custom",
    period: "retainer",
    desc: "Always-on media engine for enterprise brands, chains, and regional powerhouses.",
    features: [
      "Unlimited creator sourcing",
      "Monthly video production sprints",
      "Multi-channel ad strategy",
      "Custom API signals & reporting",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Transparent Pricing</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem" }}>
          Predictable investment.<br />Measurable return.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Choose a fixed-scope campaign package or build a custom retainer with our execution team.
        </p>

        {/* Featured Tier — dark cinematic */}
        <div className={styles.proofCard} style={{ margin: "0 0 24px 0", padding: 0 }}>
          <div style={{ padding: "48px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span className={styles.proofBadge}>{highlightedTier.badge}</span>
                <h2 className={styles.proofTitle} style={{ marginBottom: "8px" }}>
                  {highlightedTier.emoji} {highlightedTier.name}
                </h2>
                <p className={styles.proofNarrativeText}>{highlightedTier.desc}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "var(--terra-light)", letterSpacing: "-2px", display: "block", lineHeight: 1 }}>
                  {highlightedTier.price}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(245,242,237,0.45)", marginTop: "4px", display: "block" }}>
                  {highlightedTier.period}
                </span>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "32px" }}>
              {highlightedTier.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "rgba(245,242,237,0.75)" }}>
                  <span style={{ color: "var(--terra-light)", fontSize: "16px" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/cocomo-media/contact" className={styles.btnCaseStudy}>
              Get started with this package
              <span className={styles.btnCaseStudyArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* Secondary Tiers */}
        <div className={styles.servicesGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {secondaryTiers.map(({ name, emoji, price, period, desc, features }) => (
            <div key={name} className={styles.serviceCard}>
              <div className={styles.svc__iconWrap}>{emoji}</div>
              <h2 className={styles.services__title}>{name}</h2>
              <p className={styles.services__desc}>{desc}</p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "var(--terra)", letterSpacing: "-1px", marginBottom: "20px", lineHeight: 1 }}>
                {price} <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--ink-gray)" }}>{period}</span>
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {features.map((f) => (
                  <li key={f} style={{ fontSize: "13px", color: "var(--ink-gray)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "var(--terra)", marginTop: "2px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/cocomo-media/contact" className={styles.hero__primary} style={{ alignSelf: "flex-start" }}>
                Get a quote
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className={styles.close} style={{ paddingInline: 0, paddingBottom: 0, marginTop: "4rem" }}>
          <div className={styles.closeInner}>
            <div className={styles.closeContent}>
              <span className={styles.close__eyebrow}>Custom solutions</span>
              <h2 className={styles.close__heading}>
                Need something <em>tailored?</em>
              </h2>
              <p className={styles.close__sub}>
                Every brand is different. Talk to us and we&apos;ll build a custom package around your goals.
              </p>
              <Link href="/cocomo-media/contact" className={styles.close__cta}>
                Book a Strategy Call →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
