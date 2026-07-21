"use client";
import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import styles from "./contact.module.css";

export default function MediaContactPage() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        const res = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Something went wrong");
        setSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Get a proposal</span>
          <h1 className={styles.heading}>Let&apos;s grow your reach.</h1>
          <p className={styles.sub}>
            Tell us about your brand and campaign goals. We&apos;ll come back with a
            tailored creator strategy and budget estimate within 48 hours.
          </p>
        </div>
        <div className={styles.formcard}>
          {submitted ? (
            <motion.div className={styles.success} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckCircle2 size={36} color="#3DAE80" />
              <h2 className={styles.success__heading}>Proposal request received.</h2>
              <p className={styles.success__body}>We&apos;ll be in touch within 48 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <p className={styles.form__error}>{error}</p>}
              <div className={styles.form__row}>
                <label className={styles.form__label}>Name *<input name="name" required className={styles.form__input} placeholder="Priya Kapoor" /></label>
                <label className={styles.form__label}>Business *<input name="businessName" required className={styles.form__input} placeholder="Café Nero India" /></label>
              </div>
              <div className={styles.form__row}>
                <label className={styles.form__label}>Email *<input name="email" type="email" required className={styles.form__input} placeholder="priya@cafenero.in" /></label>
                <label className={styles.form__label}>Phone<input name="phone" type="tel" className={styles.form__input} placeholder="+91 98000 00000" /></label>
              </div>
              <label className={styles.form__label}>Campaign brief
                <textarea name="brief" rows={5} className={`${styles.form__input} ${styles.form__textarea}`} placeholder="Tell us your campaign goal, target audience, and approximate budget..." />
              </label>
              <button type="submit" disabled={isPending} className={styles.form__submit} id="media-contact-submit">
                {isPending ? <><Loader2 size={16} className={styles.spinner} />Sending...</> : "Send proposal request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
