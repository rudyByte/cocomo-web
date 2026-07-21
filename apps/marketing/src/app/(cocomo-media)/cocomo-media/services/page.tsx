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
    <div className={styles.page} style={{ paddingTop: "4rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Services</span>
        <h1 className={styles.section__heading} style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Full-stack media execution for growing brands.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          Whether you need a single viral creator push or an ongoing performance media operation,
          Cocomo Media executes end-to-end.
        </p>

        <div style={{ display: "grid", gap: "2rem" }}>
          {detailedServices.map((svc) => (
            <div key={svc.title} className={styles.services__card} style={{ padding: "2.5rem" }}>
              <h2 className={styles.services__title} style={{ fontSize: "1.5rem", color: "#fff" }}>
                {svc.title}
              </h2>
              <p style={{ color: "#E8356D", fontSize: "0.9375rem", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
                {svc.sub}
              </p>
              <p className={styles.services__desc} style={{ fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                {svc.body}
              </p>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none" }}>
                {svc.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "100px",
                      padding: "0.35rem 0.85rem",
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "5rem", textAlign: "center", padding: "4rem", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className={styles.section__heading}>Ready to build your custom campaign?</h2>
          <p className={styles.section__sub} style={{ margin: "1rem auto 2rem" }}>
            Get a tailored proposal with creator matches and budget breakdowns in 48 hours.
          </p>
          <Link href="/cocomo-media/contact" className={styles.hero__primary}>
            Request Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
