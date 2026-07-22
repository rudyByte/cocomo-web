import type { Metadata } from "next";
import Link from "next/link";
import { DashboardPreview } from "@/components/media/DashboardPreview";
import styles from "../media.module.css";

export const metadata: Metadata = {
  title: "Dashboard Tour — Cocomo Media",
  description: "Explore the live campaign dashboard for tracking reach, content approvals, and revenue impact.",
};

const dashboardModules = [
  {
    title: "Live Creator Feed & Approvals",
    desc: "Review video drafts, request edits, and approve content before it goes live. No messy email threads.",
    stat: "100% Transparency",
  },
  {
    title: "Real-Time Attribution",
    desc: "Track promo code redemptions, footfall increases, and Meta ad conversions as they happen.",
    stat: "₹ Impact Tracked",
  },
  {
    title: "Budget & ROI Analytics",
    desc: "Clear visual reports showing your cost per acquired customer, reach velocity, and incremental revenue.",
    stat: "Clear Reporting",
  },
];

export default function DashboardTourPage() {
  return (
    <div className={styles.page} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Dashboard Tour</span>
        <h1 className={styles.section__heading} style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", marginBottom: "1.5rem", color: "#0A162F" }}>
          Control every campaign from one screen.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          No black-box reporting or delayed monthly PDFs. Cocomo Media gives you real-time visibility into creator output, ad spend, and sales impact.
        </p>

        {/* Dynamic, interactive animated dashboard component */}
        <DashboardPreview />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {dashboardModules.map((mod) => (
            <div key={mod.title} className={styles.services__card} style={{ background: "rgba(246, 248, 252, 0.45)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#C9A961", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem" }}>{mod.stat}</span>
              <h3 className={styles.services__title} style={{ color: "#0A162F", fontSize: "1.35rem", marginBottom: "0.75rem" }}>{mod.title}</h3>
              <p className={styles.services__desc} style={{ color: "#5E697F", fontSize: "0.9375rem", lineHeight: 1.6 }}>{mod.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <Link href="/cocomo-media/contact" className={styles.hero__primary} data-magnetic>
            Get Started with Cocomo Media
          </Link>
        </div>
      </div>
    </div>
  );
}
