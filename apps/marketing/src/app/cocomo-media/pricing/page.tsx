import type { Metadata } from "next";
import Link from "next/link";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Pricing — Cocomo Media",
  description: "Transparent campaign packages and custom performance media pricing for growth-ready brands.",
};

const highlightedTier = {
  name: "Scale & Dominance",
  price: "₹1,80,000",
  period: "/ campaign",
  desc: "For established outlets & multi-location brands aiming for city-wide visibility and measurable revenue lift.",
  features: [
    "12 Micro to mid-tier creators",
    "5 High-production Reel assets + raw UGC",
    "Full Meta & Instagram ad management",
    "Dedicated Campaign Director",
    "POS & footfall revenue attribution report",
  ],
};

const secondaryTiers = [
  {
    name: "Growth Launch",
    price: "₹75,000",
    period: "/ campaign",
    desc: "Ideal for single-location outlets launching a new menu or pushing weekday covers.",
    features: [
      "5 Vetted local micro-influencers",
      "2 Custom Reel video assets",
      "Meta ad campaign setup",
      "Trackable promo redemption setup",
    ],
  },
  {
    name: "Custom Enterprise",
    price: "Custom",
    period: "retainer",
    desc: "Always-on media engine for restaurant chains, franchises, and regional brands.",
    features: [
      "Unlimited creator sourcing & contracting",
      "Monthly video production sprints",
      "Multi-channel ad strategy (Meta + Google)",
      "Growth OS integration & custom API signals",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Transparent Pricing</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem", color: "var(--ink)" }}>
          Predictable investment. Measurable return.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Choose a fixed-scope campaign package or build a custom retainer with our execution team.
        </p>

        {/* Asymmetric Weighted Layout: 60% Dominant Tier vs 40% Side Comparison Column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start" }}>
          <style>{`
            @media (min-width: 960px) {
              .pricingAsymmetricGrid {
                display: grid !important;
                grid-template-columns: 1.4fr 1fr !important;
                gap: 2.5rem !important;
              }
            }
          `}</style>
          <div className="pricingAsymmetricGrid" style={{ display: "grid", gap: "2rem" }}>
            {/* Dominant Highlighted Package (60% weight) */}
            <div
              className={styles.services__card}
              style={{
                padding: "3.5rem 3rem",
                border: "1.5px solid var(--clay-border)",
                background: "var(--paper-2)",
                boxShadow: "var(--shadow-card)",
                borderRadius: "28px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--clay)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1rem",
                  letterSpacing: "0.08em",
                }}
              >
                ✦ RECOMMENDED EXECUTION TIER
              </span>
              <h2 className={styles.services__title} style={{ fontSize: "2.25rem", color: "var(--ink)", marginBottom: "0.5rem" }}>
                {highlightedTier.name}
              </h2>
              <p className={styles.services__desc} style={{ fontSize: "1rem", color: "var(--ink-soft)", marginBottom: "2rem", lineHeight: 1.6 }}>
                {highlightedTier.desc}
              </p>

              <div style={{ margin: "2rem 0", borderTop: "1px solid var(--hairline)", paddingTop: "1.5rem" }}>
                <span style={{ fontSize: "3.5rem", fontWeight: "900", fontFamily: "var(--font-serif)", color: "var(--ink)", letterSpacing: "-0.04em" }}>
                  {highlightedTier.price}
                </span>
                <span style={{ fontSize: "1rem", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}> {highlightedTier.period}</span>
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "2.5rem", borderTop: "1px dashed var(--hairline-warm)", paddingTop: "1.5rem" }}>
                {highlightedTier.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.9375rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--clay)", fontWeight: "bold" }}>—</span> {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/cocomo-media/contact"
                className={styles.hero__primary}
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                Select Package
              </Link>
            </div>

            {/* Slimmer Comparison Column (40% weight) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {secondaryTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={styles.services__card}
                  style={{
                    padding: "2.5rem 2rem",
                    border: "1px solid var(--hairline)",
                    background: "var(--white)",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={styles.services__title} style={{ fontSize: "1.35rem", color: "var(--ink)", marginBottom: "0.5rem" }}>
                    {tier.name}
                  </h3>
                  <div style={{ margin: "1rem 0", borderTop: "1px solid var(--hairline)", paddingTop: "1rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}> {tier.period}</span>
                  </div>
                  <p className={styles.services__desc} style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
                    {tier.desc}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ fontSize: "0.8125rem", color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "var(--ink-subtle)" }}>—</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/cocomo-media/contact"
                    className={styles.hero__secondary}
                    style={{ fontSize: "0.875rem", textDecoration: "none", color: "var(--clay)", fontWeight: 700 }}
                  >
                    Inquire about {tier.name} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
