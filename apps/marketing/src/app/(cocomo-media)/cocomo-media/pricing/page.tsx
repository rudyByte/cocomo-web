import type { Metadata } from "next";
import Link from "next/link";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Pricing — Cocomo Media",
  description: "Transparent campaign packages and custom performance media pricing for growth-ready brands.",
};

const pricingTiers = [
  {
    name: "Growth Launch",
    price: "₹75,000",
    period: "/ campaign",
    desc: "Ideal for single-location outlets launching a new menu or pushing weekday covers.",
    features: [
      "5 Vetted local micro-influencers",
      "2 Custom Reel video assets",
      "Meta ad campaign setup & optimization",
      "Trackable promo redemption setup",
      "Real-time analytics dashboard access",
    ],
    highlight: false,
  },
  {
    name: "Scale & Dominance",
    price: "₹1,80,000",
    period: "/ campaign",
    desc: "For established outlets & multi-location brands aiming for city-wide visibility.",
    features: [
      "12 Micro to mid-tier creators",
      "5 High-production Reel assets + raw UGC",
      "Full Meta & Instagram ad management",
      "Dedicated Campaign Director",
      "POS & footfall revenue attribution report",
    ],
    highlight: true,
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
      "Guaranteed performance SLA",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "4rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Transparent Pricing</span>
        <h1 className={styles.section__heading} style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Predictable investment. Measurable return.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Choose a fixed-scope campaign package or build a custom retainer with our team.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={styles.services__card}
              style={{
                padding: "2.5rem",
                border: tier.highlight ? "2px solid #E8356D" : "1px solid rgba(255,255,255,0.08)",
                background: tier.highlight ? "rgba(232,53,109,0.06)" : "rgba(255,255,255,0.04)",
              }}
            >
              {tier.highlight && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#E8356D", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  ★ Most Popular
                </span>
              )}
              <h2 className={styles.services__title} style={{ fontSize: "1.5rem", color: "#fff" }}>
                {tier.name}
              </h2>
              <div style={{ margin: "1rem 0" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "var(--font-mono)", color: "#fff" }}>
                  {tier.price}
                </span>
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}> {tier.period}</span>
              </div>
              <p className={styles.services__desc} style={{ fontSize: "0.875rem", marginBottom: "2rem" }}>
                {tier.desc}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#E8356D" }}>✓</span> {f}
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
          ))}
        </div>
      </div>
    </div>
  );
}
