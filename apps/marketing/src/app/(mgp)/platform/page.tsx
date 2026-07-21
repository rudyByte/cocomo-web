import type { Metadata } from "next";
import { Loop } from "../sections/Loop";
import styles from "./platform.module.css";

export const metadata: Metadata = {
  title: "Platform — How Cocomo Works",
  description:
    "The Observe → Recommend → Execute → Measure loop. Cocomo's four-phase growth engine for merchants, explained in full.",
};

export default function PlatformPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="platform-heading">
        <div className="container">
          <span className="eyebrow">The platform</span>
          <h1 id="platform-heading" className={styles.hero__heading}>
            A growth engine, not a dashboard.
          </h1>
          <p className={styles.hero__sub}>
            Cocomo works in a continuous loop — observing your business signals,
            recommending the highest-impact action, executing it through our
            network, and measuring the revenue it created. Then it starts again.
          </p>
        </div>
      </section>

      {/* Loop diagram */}
      <Loop />

      {/* Four phases detail */}
      <section id="loop" className={styles.phases} aria-labelledby="phases-heading">
        <div className="container">
          <h2 id="phases-heading" className="sr-only">The four phases</h2>
          {[
            {
              num: "01",
              title: "Observe",
              body: "Cocomo connects to your POS, foot-traffic sensors, Meta ad accounts, Google reviews, and booking platforms. It reads the signals your business emits — hour by hour, table by table — without requiring manual data entry.",
            },
            {
              num: "02",
              title: "Recommend",
              body: "From every signal, Cocomo surfaces one prioritised action: the change most likely to increase your revenue right now. Every recommendation shows the reasoning, the confidence %, the expected ₹ impact, and the effort required. No black box.",
            },
            {
              num: "03",
              title: "Execute",
              body: "You approve. Cocomo executes — through our network of creators, Meta campaigns, WhatsApp offers, staff task assignments, and combo mechanics. Most actions are live within 24 hours.",
            },
            {
              num: "04",
              title: "Measure",
              body: "Every campaign and action is tracked back to ₹ revenue at the outlet level. Cocomo shows you exactly what it created — not impressions, not clicks, but revenue. This measurement feeds the next cycle of observation.",
            },
          ].map(({ num, title, body }) => (
            <div key={num} className={styles.phase} id={`phase-${num}`}>
              <div className={styles.phase__num}>{num}</div>
              <div className={styles.phase__content}>
                <h3 className={styles.phase__title}>{title}</h3>
                <p className={styles.phase__body}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing model */}
      <section id="pricing" className={styles.pricing} aria-labelledby="pricing-heading">
        <div className="container">
          <h2 id="pricing-heading" className={styles.pricing__heading}>
            The platform is free.
            <br />
            We earn only when you grow.
          </h2>
          <p className={styles.pricing__body}>
            No monthly fee. No seat count. No impressions. Cocomo&apos;s revenue comes from a
            percentage of the incremental revenue we demonstrably create for you — verified
            against your baseline.
          </p>
        </div>
      </section>

      {/* Security */}
      <section id="security" className={styles.security} aria-labelledby="security-heading">
        <div className="container">
          <h2 id="security-heading" className={styles.section__heading}>Security &amp; data</h2>
          <p className={styles.section__body}>
            All merchant data is encrypted at rest and in transit. Cocomo is SOC 2 Type II
            compliant. {/* TODO: add security details */}
          </p>
        </div>
      </section>
    </div>
  );
}
