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
          {/* TODO: Replace with real team profiles */}
          <p className={styles.section__body}>
            TODO: Team profiles — founders, key hires.
          </p>
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
