import type { Metadata } from "next";
import Link from "next/link";
import styles from "./restaurants.module.css";

export const metadata: Metadata = {
  title: "Restaurants — Cocomo for Food & Beverage",
  description:
    "Cocomo's beachhead vertical. See how the Growth OS increases weekday covers, repeat visits, and monthly revenue for restaurants, cafés, and QSR chains.",
};

export default function RestaurantsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="rest-heading">
        <div className="container">
          <span className="eyebrow">Restaurants</span>
          <h1 id="rest-heading" className={styles.hero__heading}>
            The only OS built for how restaurants actually grow.
          </h1>
          <p className={styles.hero__sub}>
            Restaurants don&apos;t die from bad food. They die from empty tables on Tuesdays,
            first-time visitors who never return, and marketing campaigns that don&apos;t trace
            back to covers. Cocomo fixes the loop.
          </p>
          <Link href="/demo?vertical=restaurants" className={styles.hero__cta} id="restaurants-demo-cta">
            Book a demo for your restaurant
          </Link>
        </div>
      </section>

      {/* Worked example */}
      <section className={styles.example} id="section-example" aria-labelledby="example-heading">
        <div className="container">
          <span className="eyebrow">Worked example</span>
          <h2 id="example-heading" className={styles.section__heading}>
            A real recommendation, step by step.
          </h2>

          <div className={styles.example__steps}>
            {[
              { step: "Signal", text: "Cocomo detects a 38% drop in weekday lunch covers vs. weekend baseline, cross-referenced with 3 competitor promotions in a 500m radius launched in the last 14 days." },
              { step: "Recommendation", text: "Increase weekday lunch sales · ₹1.8L/mo impact · 92% confidence · 14 days to measurable result." },
              { step: "Actions", text: "Partner with 3 local micro-influencers (15K–50K reach each). Launch a weekday combo at ₹299. Run Meta ads Tue–Thu, 11am–1pm. Track repeat visitor rate via WhatsApp check-in." },
              { step: "Result", text: "Weekday covers increased by 42% within 14 days of campaign launch. Average transaction value grew 18% through the ₹299 combo, resulting in ₹1.95L in new high-margin revenue." },
            ].map(({ step, text }) => (
              <div key={step} className={styles.example__step}>
                <div className={styles.example__steplabel}>{step}</div>
                <p className={styles.example__steptext}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafes section */}
      <section id="cafes" className={styles.sub} aria-labelledby="cafes-heading">
        <div className="container">
          <h2 id="cafes-heading" className={styles.section__heading}>Cafés &amp; QSR</h2>
          <p className={styles.section__body}>
            High transaction frequency, high repeat opportunity. Cocomo optimises loyalty loops,
            day-part offers, and neighbourhood reach for cafés and quick-service formats.
          </p>
        </div>
      </section>

      {/* Chains section */}
      <section id="chains" className={styles.sub} aria-labelledby="chains-heading">
        <div className="container">
          <h2 id="chains-heading" className={styles.section__heading}>Chains &amp; multi-outlet</h2>
          <p className={styles.section__body}>
            Outlet-level recommendations with brand-level dashboards. Cocomo identifies which
            outlets are under-performing and why — and executes fixes at scale.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.cta__heading}>Ready to fill those Tuesday tables?</h2>
          <Link href="/demo?vertical=restaurants" className={styles.cta__btn} id="restaurants-close-cta">
            Book a demo — free to start
          </Link>
        </div>
      </section>
    </div>
  );
}
