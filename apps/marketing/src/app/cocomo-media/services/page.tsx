import type { Metadata } from "next";
import Link from "next/link";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Services — Cocomo Media",
  description: "Influencer marketing, content production, Meta ads, and creator management.",
};

const detailedServices = [
  {
    title: "Influencer & Creator Campaigns",
    sub: "Hyper-local matching for maximum footfall and conversion",
    body: "We source, vet, and contract food, lifestyle, and regional micro-influencers. Every campaign is engineered around trackable redemption mechanisms and foot traffic lift.",
    features: ["Vetted network of 5,000+ creators", "Usage rights & content licensing", "Trackable promo codes & UTM link tracking"],
  },
  {
    title: "High-Volume Content Production",
    sub: "Reels, stories, and UGC built for social algorithms",
    body: "Static photography doesn't drive social discovery. We produce short-form video content designed for Instagram Reels, YouTube Shorts, and Meta ad placements.",
    features: ["On-location shoot coordination", "Dedicated edit & color grading", "A/B creative testing hooks"],
  },
  {
    title: "Meta Ads & Paid Media Management",
    sub: "Performance media buying connected to POS signals",
    body: "Stop wasting budget on broad radius boost posts. We run geo-fenced Meta campaigns targeting high-intent foodies and local residents during key meal decision windows.",
    features: ["Geo-fencing down to 500m radius", "Dynamic day-parting ads (Lunch/Dinner)", "Closed-loop revenue attribution"],
  },
  {
    title: "Creator Roster & Brand Ambassador Management",
    sub: "Long-term relationships that build authentic category authority",
    body: "One-off posts build awareness; recurring creator partnerships build habits. We build and manage exclusive creator ambassador programs for your brand.",
    features: ["Monthly recurring deliverables", "Exclusive regional ambassador rights", "Performance bonus structures"],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Services</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem", color: "#0A162F" }}>
          Full-stack media execution for growing brands.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Whether you need a single viral creator push or an ongoing performance media operation,
          Cocomo Media executes end-to-end.
        </p>

        <div style={{ display: "grid", gap: "2rem" }}>
          {detailedServices.map((svc) => (
            <div key={svc.title} className={styles.services__card} style={{ padding: "3rem", background: "rgba(246, 248, 252, 0.4)" }}>
              <h2 className={styles.services__title} style={{ fontSize: "1.75rem", color: "#0A162F", marginBottom: "0.5rem" }}>
                {svc.title}
              </h2>
              <p style={{ color: "#2563EB", fontSize: "0.875rem", fontFamily: "var(--font-mono)", fontWeight: 600, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {svc.sub}
              </p>
              <p className={styles.services__desc} style={{ fontSize: "1.0625rem", lineHeight: "1.75", marginBottom: "2rem", color: "#5E697F" }}>
                {svc.body}
              </p>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none", padding: 0 }}>
                {svc.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(10, 22, 47, 0.08)",
                      borderRadius: "100px",
                      padding: "0.5rem 1.25rem",
                      fontSize: "0.8125rem",
                      color: "#0A162F",
                      fontWeight: 500,
                      boxShadow: "0 2px 6px rgba(10,22,47,0.01)"
                    }}
                  >
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "6rem", textAlign: "center", padding: "5rem 3rem", background: "rgba(246, 248, 252, 0.45)", borderRadius: "32px", border: "1px solid rgba(10, 22, 47, 0.06)" }}>
          <h2 className={styles.section__heading} style={{ color: "#0A162F", marginBottom: "1rem" }}>Ready to build your custom campaign?</h2>
          <p className={styles.section__sub} style={{ margin: "1rem auto 2.5rem" }}>
            Get a tailored proposal with creator matches and budget breakdowns in 48 hours.
          </p>
          <Link href="/cocomo-media/contact" className={styles.hero__primary} data-magnetic>
            Request Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
