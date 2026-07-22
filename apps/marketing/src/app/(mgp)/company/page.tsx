import type { Metadata } from "next";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: "Company — Cocomo",
  description: "The vision behind Cocomo, our team, and how to get in touch.",
};

export default function CompanyPage() {
  return (
    <div className={styles.page}>
      {/* Vision */}
      <section id="vision" className={styles.hero} aria-labelledby="company-heading">
        <div className="container">
          <span className="eyebrow">Company</span>
          <h1 id="company-heading" className={styles.hero__heading}>
            Every merchant should have a growth team.
          </h1>
          <p className={styles.hero__sub}>
            Most restaurants, cafés, and retail businesses operate with brilliant product and
            terrible growth infrastructure. They have kitchens, not growth teams. Cocomo is
            that growth team — measured, systematic, and aligned to revenue.
          </p>
        </div>
      </section>

      {/* Team */}
      <section id="team" className={styles.section} aria-labelledby="team-heading">
        <div className="container">
          <h2 id="team-heading" className={styles.section__heading}>Team</h2>
          <p className={styles.section__body} style={{ marginBottom: "2.5rem" }}>
            We are a group of engineers, designers, and growth experts building the future of offline commerce.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem" }}>
            {[
              { name: "Rudra Ajudiya", role: "Co-Founder & CEO", desc: "Ex-software engineer & product manager, building intelligence infrastructure for offline merchants." },
              { name: "Nehal Shah", role: "Co-Founder & CTO", desc: "Ex-ML engineer & data scientist, specializing in telemetry analysis and predictive revenue models." },
              { name: "Ananya Sen", role: "Head of Creator Relations", desc: "Managed creator ecosystems and influencer campaigns for India's largest D2C brands." }
            ].map((member) => (
              <div key={member.name} style={{ background: "rgba(246, 248, 252, 0.45)", border: "1px solid rgba(10, 22, 47, 0.06)", padding: "2rem", borderRadius: "18px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.25rem", fontFamily: "var(--font-serif)" }}>{member.name}</h3>
                <span style={{ fontSize: "0.8125rem", color: "var(--clay)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "1rem" }}>{member.role}</span>
                <p style={{ fontSize: "0.875rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Careers / Partners */}
      <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading" className={styles.section__heading}>Get in touch</h2>
          <p className={styles.section__body}>
            For careers, partnerships, press, and general enquiries.
          </p>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  return (
    <form
      className={styles.form}
      action="/api/contacts"
      method="POST"
      data-async="true"
    >
      <div className={styles.form__row}>
        <div className={styles.form__field}>
          <label htmlFor="contact-name" className={styles.form__label}>Name *</label>
          <input id="contact-name" name="name" type="text" required className={styles.form__input} placeholder="Your name" />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="contact-email" className={styles.form__label}>Email *</label>
          <input id="contact-email" name="email" type="email" required className={styles.form__input} placeholder="you@company.com" />
        </div>
      </div>
      <div className={styles.form__field}>
        <label htmlFor="contact-kind" className={styles.form__label}>Enquiry type</label>
        <select id="contact-kind" name="kind" className={styles.form__input}>
          <option value="general">General</option>
          <option value="careers">Careers</option>
          <option value="partner">Partnership</option>
        </select>
      </div>
      <div className={styles.form__field}>
        <label htmlFor="contact-message" className={styles.form__label}>Message *</label>
        <textarea id="contact-message" name="message" rows={5} required className={`${styles.form__input} ${styles.form__textarea}`} placeholder="Tell us what you have in mind..." />
      </div>
      <button type="submit" className={styles.form__submit} id="contact-submit">Send message</button>
    </form>
  );
}
