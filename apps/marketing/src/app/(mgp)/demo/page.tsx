"use client";

import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import styles from "./demo.module.css";

function DemoForm() {
  const searchParams = useSearchParams();
  const vertical = searchParams.get("vertical") ?? "general";
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    startTransition(async () => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, vertical }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Something went wrong");
        setSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  };

  if (submitted) {
    return (
      <motion.div
        className={styles.success}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <CheckCircle2 size={40} strokeWidth={1.5} color="var(--good)" />
        <h2 className={styles.success__heading}>We&apos;ll be in touch.</h2>
        <p className={styles.success__copy}>
          Our team will reach out within one business day to schedule a demo tailored to your
          business.
        </p>
        <p className={styles.success__trust}>
          The platform is free. We earn only when you grow.
        </p>
      </motion.div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <div className={styles.form__error} role="alert">
          {error}
        </div>
      )}

      <div className={styles.form__row}>
        <div className={styles.form__field}>
          <label htmlFor="name" className={styles.form__label}>
            Your name <span aria-hidden>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className={styles.form__input}
            placeholder="Rahul Sharma"
            autoComplete="name"
          />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="businessName" className={styles.form__label}>
            Business name <span aria-hidden>*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            minLength={2}
            className={styles.form__input}
            placeholder="Spice Garden Restaurants"
          />
        </div>
      </div>

      <div className={styles.form__row}>
        <div className={styles.form__field}>
          <label htmlFor="email" className={styles.form__label}>
            Email <span aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.form__input}
            placeholder="rahul@spicegarden.com"
            autoComplete="email"
          />
        </div>
        <div className={styles.form__field}>
          <label htmlFor="phone" className={styles.form__label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={styles.form__input}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={styles.form__field}>
        <label htmlFor="message" className={styles.form__label}>
          What are you looking to grow?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${styles.form__input} ${styles.form__textarea}`}
          placeholder="E.g. weekday lunch covers, repeat visits, new area expansion..."
        />
      </div>

      <button
        type="submit"
        className={styles.form__submit}
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <Loader2 size={16} className={styles.form__spinner} />
            Sending...
          </>
        ) : (
          <>
            Book my demo
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className={styles.form__privacy}>
        No spam. We&apos;ll only use your details to schedule the demo.
      </p>
    </form>
  );
}

export default function DemoPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.page__inner}`}>
        {/* Left: copy */}
        <div className={styles.page__copy}>
          <span className="eyebrow">Book a demo</span>
          <h1 className={styles.page__heading}>
            See exactly how Cocomo grows your revenue.
          </h1>
          <p className={styles.page__sub}>
            In 30 minutes, we&apos;ll show you the specific recommendations Cocomo would make for
            your business — with reasoning, confidence scores, and ₹ impact estimates.
          </p>

          <div className={styles.page__points}>
            {[
              "Tailored to your category and city",
              "Shows real signal data, not mock demos",
              "Explains the execution network in detail",
              "Free to start — we earn only when you grow",
            ].map((point) => (
              <div key={point} className={styles.page__point}>
                <CheckCircle2 size={16} color="var(--good)" strokeWidth={2} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className={styles.page__form}>
          <div className={styles.page__formcard}>
            <Suspense>
              <DemoForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
