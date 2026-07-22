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
    <div className={styles.page} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Transparent Pricing</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem", color: "#0A162F" }}>
          Predictable investment. Measurable return.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Choose a fixed-scope campaign package or build a custom retainer with our team.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={styles.services__card}
              style={{
                padding: "3rem 2.5rem",
                border: tier.highlight ? "1px solid #C9A961" : "1px solid rgba(10, 22, 47, 0.08)", // Gold accent for highlight
                background: tier.highlight ? "#FAFBFC" : "rgba(246, 248, 252, 0.45)",
                boxShadow: tier.highlight ? "0 20px 48px rgba(10,22,47,0.06)" : "none",
                position: "relative"
              }}
            >
              {tier.highlight && (
                <span style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.75rem", 
                  color: "#C9A961", // Gold hairline color
                  fontWeight: 700,
                  textTransform: "uppercase", 
                  display: "block", 
                  marginBottom: "1rem",
                  letterSpacing: "0.08em"
                }}>
                  ✦ Most Popular
                </span>
              )}
              <h2 className={styles.services__title} style={{ fontSize: "1.65rem", color: "#0A162F", marginBottom: "1rem" }}>
                {tier.name}
              </h2>
              <div style={{ margin: "1.5rem 0", borderTop: "1px solid rgba(10,22,47,0.06)", paddingTop: "1.5rem" }}>
                <span style={{ fontSize: "2.75rem", fontWeight: "700", fontFamily: "var(--font-mono)", color: "#0A162F" }}>
                  {tier.price}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#5E697F" }}> {tier.period}</span>
              </div>
              <p className={styles.services__desc} style={{ fontSize: "0.9375rem", color: "#5E697F", marginBottom: "2rem", lineHeight: 1.6 }}>
                {tier.desc}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "2.5rem", borderTop: "1px dashed rgba(10,22,47,0.06)", paddingTop: "1.5rem" }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.875rem", color: "#0A162F", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "#2563EB", fontWeight: "bold" }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/cocomo-media/contact"
                className={styles.hero__primary}
                style={{ width: "100%", justifyContent: "center", textDecoration: "none", background: tier.highlight ? "#0A162F" : "#2563EB" }}
                data-magnetic
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
