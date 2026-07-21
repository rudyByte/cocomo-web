"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate } from "framer-motion";
import { ArrowRight, TrendingUp, CheckCircle2, Zap, Cpu, Activity, ShieldCheck } from "lucide-react";
import { ProductSwitcher } from "@/components/ProductSwitcher/ProductSwitcher";
import styles from "./Hero.module.css";

// ── Recommendation card states ────────────────────────────────────────────────
type CardState = "idle" | "analyzing" | "recommended" | "executed";

interface RecommendationCardAnimatedProps {
  state: CardState;
}

function AnimatedRecommendationCard({ state }: RecommendationCardAnimatedProps) {
  const [revenue, setRevenue] = useState(0);

  // Animate revenue counter when executed
  useEffect(() => {
    if (state === "executed") {
      const controls = animate(0, 180000, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setRevenue(Math.floor(v)),
      });
      return () => controls.stop();
    } else {
      setRevenue(0);
    }
  }, [state]);

  const formatRevenue = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      className={`${styles.card} ${styles[`card--${state}`]}`}
      layout
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Banner indicating Hero Product Engine */}
      <div className={styles.card__engineHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Cpu size={12} color="var(--clay)" />
          <span className={styles.card__engineTag}>COCOMO ENGINE // MGP LIVE DEMO</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--good)", fontFamily: "var(--font-mono)" }}>
          <Activity size={10} />
          <span>REAL-TIME POS SIGNAL</span>
        </div>
      </div>

      {/* Header */}
      <div className={styles.card__header}>
        <div className={styles.card__pill}>
          {state === "idle" && <span className={styles.card__dot} />}
          {state === "analyzing" && (
            <motion.div
              className={styles.card__pulse}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          )}
          {state === "recommended" && <TrendingUp size={10} strokeWidth={2.5} />}
          {state === "executed" && <CheckCircle2 size={10} strokeWidth={2.5} />}
          <span className={styles.card__status}>
            {state === "idle" && "Observing signals"}
            {state === "analyzing" && "Analyzing POS & Footfall"}
            {state === "recommended" && "Ready to execute"}
            {state === "executed" && "Executed"}
          </span>
        </div>

        <motion.div
          className={styles.card__confidence}
          initial={{ opacity: 0 }}
          animate={{ opacity: state === "recommended" || state === "executed" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ShieldCheck size={12} style={{ marginRight: 4, display: "inline" }} />
          92% confidence
        </motion.div>
      </div>

      {/* Title */}
      <div className={styles.card__title}>
        Increase Tuesday &amp; Wednesday lunch covers
      </div>

      {/* Revenue metric */}
      <motion.div
        className={styles.card__revenue}
        animate={{
          color: state === "executed" ? "var(--good)" : "var(--clay)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={styles.card__revlabel}>₹ PROJECTED REVENUE LIFT</span>
        <span className={styles.card__revnum} data-metric>
          {state === "executed" ? `+₹${formatRevenue(revenue)}` : "+₹1,80,000"}
          <span className={styles.card__revperiod}>/mo</span>
        </span>
      </motion.div>

      {/* Actions list */}
      <motion.ul
        className={styles.card__actions}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: state === "recommended" || state === "executed" ? 1 : 0,
          height: state === "recommended" || state === "executed" ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          "Partner with 3 local food creators (Cocomo Media Network)",
          "Launch weekday lunch combo offer (₹299)",
          "Geo-fence Meta ads to 1km radius (11am-1pm)",
          "Trigger WhatsApp re-engagement to inactive regulars",
          "Track cover lift directly from POS integration",
        ].map((action, i) => (
          <motion.li
            key={action}
            className={styles.card__action}
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: state === "recommended" || state === "executed" ? 1 : 0,
              x: state === "recommended" || state === "executed" ? 0 : -8,
            }}
            transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.card__actiondot} />
            {action}
          </motion.li>
        ))}
      </motion.ul>

      {/* Execute button */}
      {state === "recommended" && (
        <motion.div
          className={styles.card__execbtn}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Zap size={12} />
          Execute campaign now
        </motion.div>
      )}
      {state === "executed" && (
        <motion.div
          className={styles.card__execdone}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle2 size={12} />
          All 5 actions launched across network
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const [cardState, setCardState] = useState<CardState>("idle");
  const hasAnimated = useRef(false);

  // Run the signature animation sequence once on mount
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCardState("executed");
      return;
    }

    const seq = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setCardState("analyzing");
      await new Promise((r) => setTimeout(r, 1800));
      setCardState("recommended");
      await new Promise((r) => setTimeout(r, 2000));
      setCardState("executed");
    };
    seq();
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <div className={styles.hero__grain} aria-hidden="true" />

      <div className={`container ${styles.hero__inner}`}>
        {/* Left: copy */}
        <div className={styles.hero__copy}>
          <motion.div
            className={styles.hero__eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Cpu size={12} color="var(--clay)" />
              COCOMO ENGINE v2.4 — GROWTH OS
            </span>
          </motion.div>

          <motion.h1
            id="hero-headline"
            className={styles.hero__headline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Know what to grow.
            <br />
            <em className={styles.hero__em}>Then watch it get done.</em>
          </motion.h1>

          <motion.p
            className={styles.hero__sub}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            POS and ERP software answer <em>what happened</em>. <strong>Cocomo Engine</strong> continuously analyzes your sales, footfall, and customer signals to tell you <strong>what to do next</strong> — and automatically executes it through our network.
          </motion.p>

          <motion.div
            className={styles.hero__ctas}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/demo" className={styles.hero__primary} id="hero-demo-cta">
              Book a demo — free to start
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <span className={styles.hero__trust}>
              The platform is free. We earn only when you grow.
            </span>
          </motion.div>

          {/* Product Switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ProductSwitcher />
          </motion.div>
        </div>

        {/* Right: animated recommendation card */}
        <motion.div
          className={styles.hero__visual}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Cocomo Engine real-time AI decision demo"
          role="img"
        >
          <AnimatedRecommendationCard state={cardState} />

          {/* Supporting metric stats */}
          <motion.div
            className={styles.hero__stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: cardState === "executed" ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { label: "Avg revenue lift", value: "+34%" },
              { label: "Actions executed", value: "5" },
              { label: "Time to result", value: "14 days" },
            ].map(({ label, value }) => (
              <div key={label} className={styles.hero__stat}>
                <span className={styles.hero__statval} data-metric>{value}</span>
                <span className={styles.hero__statlabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
