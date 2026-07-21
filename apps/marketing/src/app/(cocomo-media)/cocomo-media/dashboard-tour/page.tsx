import type { Metadata } from "next";
import Link from "next/link";
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
    <div className={styles.page} style={{ paddingTop: "4rem" }}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Dashboard Tour</span>
        <h1 className={styles.section__heading} style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Control every campaign from one screen.
        </h1>
        <p className={styles.section__sub} style={{ marginBottom: "4rem" }}>
          No black-box reporting or delayed monthly PDFs. Cocomo Media gives you real-time visibility into creator output, ad spend, and sales impact.
        </p>

        {/* Dashboard Preview Mockup */}
        <div
          style={{
            background: "rgba(20, 20, 20, 0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "4rem",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "#E8356D" }}>LIVE CAMPAIGN DEMO // MUMBAI FOODIES FEST</span>
            <span style={{ fontSize: "0.75rem", background: "rgba(61,174,128,0.2)", color: "#3DAE80", padding: "0.25rem 0.75rem", borderRadius: "100px", border: "1px solid #3DAE80" }}>
              ● Active (12 Creators)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Total Reach", val: "482,500", change: "+18%" },
              { label: "Content Engagement", val: "8.4%", change: "+2.1%" },
              { label: "Redemptions", val: "1,240", change: "+340 this week" },
              { label: "Est. Revenue Lift", val: "₹3,45,000", change: "ROI 4.2x" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>{m.label}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "700", fontFamily: "var(--font-mono)", color: "#fff" }}>{m.val}</div>
                <div style={{ fontSize: "0.75rem", color: "#3DAE80", marginTop: "0.25rem" }}>{m.change}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 style={{ fontSize: "0.9375rem", color: "#fff", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>CREATOR CONTENT APPROVAL QUEUE</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { creator: "@foodie_mumbai", title: "Top 5 Secret Pizza Spots in Bandra", status: "Approved & Scheduled" },
                { creator: "@cafeculture.in", title: "Weekend Brunch Reel - Special Combo", status: "Ready for Review" },
              ].map((c) => (
                <div key={c.creator} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                  <div>
                    <span style={{ fontWeight: "600", color: "#E8356D", marginRight: "0.75rem" }}>{c.creator}</span>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}>{c.title}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {dashboardModules.map((mod) => (
            <div key={mod.title} className={styles.services__card}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#F5A623" }}>{mod.stat}</span>
              <h3 className={styles.services__title}>{mod.title}</h3>
              <p className={styles.services__desc}>{mod.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <Link href="/cocomo-media/contact" className={styles.hero__primary}>
            Get Started with Cocomo Media
          </Link>
        </div>
      </div>
    </div>
  );
}
