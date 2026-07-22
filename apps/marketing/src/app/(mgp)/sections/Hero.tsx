"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp, CheckCircle2, Zap, Cpu, Activity, ShieldCheck, Layers, BarChart3, Radio } from "lucide-react";
import { ProductSwitcher } from "@/components/ProductSwitcher/ProductSwitcher";
import styles from "./Hero.module.css";

// ── Scenario definitions ──────────────────────────────────────────────────────
type CardState = "idle" | "analyzing" | "recommended" | "executed";

interface Scenario {
  id: string;
  name: string;
  outlet: string;
  dailyRevenue: string;
  lift: string;
  chartPathBaseline: string;
  chartPathExecuted: string;
  signals: Array<{ time: string; source: string; msg: string }>;
  recommendation: {
    title: string;
    lift: string;
    confidence: string;
    actions: string[];
    status: CardState;
  };
}

const scenarios: Scenario[] = [
  {
    id: "lunch-covers",
    name: "Weekday Lunch",
    outlet: "Bandra West Outlet · Petpooja POS",
    dailyRevenue: "₹84,200",
    lift: "+28.4%",
    chartPathBaseline: "M0 90 Q 75 80, 150 85 T 300 95 T 450 80 L 500 85",
    chartPathExecuted: "M0 90 Q 75 60, 150 45 T 300 30 T 450 15 L 500 10",
    signals: [
      { time: "11:42", source: "POS", msg: "Lunch covers +18% vs baseline" },
      { time: "11:38", source: "META", msg: "Bandra Geo-Campaign ROI 4.2x" },
      { time: "11:15", source: "WA", msg: "48 Combo redemptions logged" },
    ],
    recommendation: {
      title: "Increase Tuesday & Wednesday lunch covers",
      lift: "₹1,80,000",
      confidence: "92%",
      actions: [
        "Partner with 3 local food creators (Cocomo Media)",
        "Launch weekday lunch combo offer (₹299)",
        "Geo-fence Meta ads to 1km radius (11am-1pm)",
        "Trigger WhatsApp re-engagement loops",
      ],
      status: "executed",
    },
  },
  {
    id: "dinner-traffic",
    name: "Slow Tuesday Dinner",
    outlet: "Koramangala Café · Pine Labs POS",
    dailyRevenue: "₹1,12,000",
    lift: "+14.2%",
    chartPathBaseline: "M0 85 Q 100 80, 200 83 T 400 85 L 500 80",
    chartPathExecuted: "M0 85 Q 100 50, 200 42 T 400 30 L 500 22",
    signals: [
      { time: "20:15", source: "POS", msg: "Dinner table check-ins +24%" },
      { time: "19:48", source: "INFLU", msg: "Koramangala promo reels live" },
      { time: "19:22", source: "POS", msg: "Chef's special table turn rate 1.4x" },
    ],
    recommendation: {
      title: "Boost Tuesday night dinner traffic",
      lift: "₹2,40,000",
      confidence: "88%",
      actions: [
        "Contract 2 food creators for dinner showcase",
        "Introduce Tuesday Chef's sharing board",
        "Target local office hubs with dinner ads (5pm-7pm)",
      ],
      status: "recommended",
    },
  },
  {
    id: "vip-retention",
    name: "Lost VIP Patrons",
    outlet: "Juhu Bistro · Petpooja POS",
    dailyRevenue: "₹95,000",
    lift: "+8.5%",
    chartPathBaseline: "M0 95 Q 120 90, 240 92 T 480 94 L 500 95",
    chartPathExecuted: "M0 95 Q 120 75, 240 68 T 480 62 L 500 58",
    signals: [
      { time: "16:30", source: "WA", msg: "VIP loyalty blast dispatched" },
      { time: "16:10", source: "CRM", msg: "Segment: 'Lost VIPs' target list ready" },
      { time: "15:45", source: "POS", msg: "12 repeat VIP check-ins registered" },
    ],
    recommendation: {
      title: "Re-engage lost Patrons",
      lift: "₹1,20,000",
      confidence: "95%",
      actions: [
        "Identify patrons inactive for 45+ days",
        "Trigger WhatsApp invitation with complimentary starter",
        "Prioritize weekend reservation availability",
      ],
      status: "analyzing",
    },
  },
];

// ── Recommendation card subcomponent ──────────────────────────────────────────
interface RecommendationCardProps {
  rec: Scenario["recommendation"];
}

function RecommendationCard({ rec }: RecommendationCardProps) {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (rec.status === "executed") {
      const numericLift = parseInt(rec.lift.replace(/[^0-9]/g, ""), 10);
      const controls = animate(0, numericLift, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setRevenue(Math.floor(v)),
      });
      return () => controls.stop();
    } else {
      setRevenue(0);
    }
  }, [rec]);

  const formatRevenue = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      className={`${styles.card} ${styles[`card--${rec.status}`]}`}
      layout
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Banner indicating Hero Product Engine */}
      <div className={styles.card__engineHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Cpu size={12} color="var(--clay)" />
          <span className={styles.card__engineTag}>COCOMO ENGINE // ACTION #409</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "var(--good)", fontFamily: "var(--font-mono)" }}>
          <Activity size={10} />
          <span>LIVE</span>
        </div>
      </div>

      {/* Header */}
      <div className={styles.card__header}>
        <div className={styles.card__pill}>
          {rec.status === "idle" && <span className={styles.card__dot} />}
          {rec.status === "analyzing" && (
            <motion.div
              className={styles.card__pulse}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          )}
          {rec.status === "recommended" && <TrendingUp size={10} strokeWidth={2.5} />}
          {rec.status === "executed" && <CheckCircle2 size={10} strokeWidth={2.5} />}
          <span className={styles.card__status}>
            {rec.status === "idle" && "Observing signals"}
            {rec.status === "analyzing" && "Analyzing POS..."}
            {rec.status === "recommended" && "Ready to execute"}
            {rec.status === "executed" && "Campaign Active"}
          </span>
        </div>

        <motion.div
          className={styles.card__confidence}
          initial={{ opacity: 0 }}
          animate={{ opacity: rec.status === "recommended" || rec.status === "executed" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ShieldCheck size={11} style={{ marginRight: 4, display: "inline-block", verticalAlign: "middle" }} />
          {rec.confidence}
        </motion.div>
      </div>

      {/* Title */}
      <div className={styles.card__title}>
        {rec.title}
      </div>

      {/* Revenue metric */}
      <motion.div
        className={styles.card__revenue}
        animate={{
          color: rec.status === "executed" ? "var(--good)" : "var(--clay)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={styles.card__revlabel}>PROJECTED REVENUE LIFT</span>
        <span className={styles.card__revnum} data-metric>
          {rec.status === "executed" ? `+₹${formatRevenue(revenue)}` : `+${rec.lift}`}
          <span className={styles.card__revperiod}>/mo</span>
        </span>
      </motion.div>

      {/* Actions list */}
      <motion.ul
        className={styles.card__actions}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: rec.status !== "idle" ? 1 : 0,
          height: rec.status !== "idle" ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {rec.actions.map((action, i) => (
          <motion.li
            key={action}
            className={styles.card__action}
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.card__actiondot} />
            {action}
          </motion.li>
        ))}
      </motion.ul>

      {/* Execute button */}
      {rec.status === "recommended" && (
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
      {rec.status === "executed" && (
        <motion.div
          className={styles.card__execdone}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle2 size={12} />
          All actions launched
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Dashboard Mockup subcomponent ─────────────────────────────────────────────
interface DashboardMockupProps {
  scenario: Scenario;
}

function DashboardMockup({ scenario }: DashboardMockupProps) {
  return (
    <div className={styles.dashMockup}>
      {/* Top telemetry bar */}
      <div className={styles.dashMockup__topbar}>
        <div className={styles.dashMockup__outlet}>
          <Layers size={12} color="var(--clay)" />
          <span>{scenario.outlet}</span>
          <span className={styles.dashMockup__liveDot} />
        </div>
        <div className={styles.dashMockup__statGroup}>
          <div>
            <span className={styles.dashMockup__statLabel}>DAILY REVENUE</span>
            <span className={styles.dashMockup__statVal} data-metric>{scenario.dailyRevenue}</span>
          </div>
          <div>
            <span className={styles.dashMockup__statLabel}>WEEKDAY LIFT</span>
            <span className={styles.dashMockup__statVal} style={{ color: "var(--good)" }} data-metric>{scenario.lift}</span>
          </div>
        </div>
      </div>

      {/* Sparkline chart SVG */}
      <div className={styles.dashMockup__chartBox}>
        <div className={styles.dashMockup__chartTitle}>
          <span>REVENUE ATTRIBUTION &amp; LIFT</span>
          <span style={{ color: "var(--clay)" }}>● Baseline vs Executed</span>
        </div>
        <svg viewBox="0 0 500 120" className={styles.dashMockup__chartSvg} fill="none">
          {/* Baseline curve */}
          <motion.path
            d={scenario.chartPathBaseline}
            stroke="var(--hairline)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Cocomo Executed curve */}
          <motion.path
            d={scenario.chartPathExecuted}
            stroke="var(--clay)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <circle cx="450" cy="15" r="4" fill="var(--clay)" />
        </svg>
      </div>

      {/* Live Signals Log */}
      <div className={styles.dashMockup__signals}>
        <div className={styles.dashMockup__signalHead}>
          <Radio size={10} color="var(--clay)" />
          <span>INCOMING TELEMETRY SIGNALS</span>
        </div>
        {scenario.signals.map((s) => (
          <div key={s.time} className={styles.dashMockup__signalRow}>
            <span className={styles.dashMockup__time}>{s.time}</span>
            <span className={styles.dashMockup__source}>{s.source}</span>
            <span className={styles.dashMockup__msg}>{s.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const activeScenario = scenarios[activeScenarioIdx];

  // Auto-rotate scenarios on initial load if user hasn't clicked
  const hasClicked = useRef(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (hasClicked.current) return;
      setActiveScenarioIdx((prev) => (prev + 1) % scenarios.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (idx: number) => {
    hasClicked.current = true;
    setActiveScenarioIdx(idx);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <div className={styles.hero__grain} aria-hidden="true" />
      <div className={styles.hero__glow} aria-hidden="true" />
      <img src="/growth_layers.png" className={styles.hero__branchImage} alt="" aria-hidden="true" />

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
            POS and ERP software answer <em>what happened</em>. <strong>Cocomo Engine</strong> continuously analyzes sales, footfall, and customer signals to tell you <strong>what to do next</strong> — and automatically executes it through our network.
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

        {/* Right: Live Interactive Simulator Showcase Panel */}
        <motion.div
          className={styles.hero__visualContainer}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dashboard Viewport Mockup (Fully Visible & Dynamic) */}
          <div className={styles.viewport}>
            {/* Header integrates Scenario Tabs simulating real browser tabs! */}
            <div className={styles.viewport__header}>
              <div className={styles.viewport__dots}>
                <span className={styles.viewport__dot} />
                <span className={styles.viewport__dot} />
                <span className={styles.viewport__dot} />
              </div>

              {/* Integrates scenarios right inside mockup header tabs */}
              <div className={styles.viewport__tabs}>
                {scenarios.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`${styles.viewport__tab} ${idx === activeScenarioIdx ? styles["viewport__tab--active"] : ""}`}
                    onClick={() => handleTabClick(idx)}
                    role="tab"
                    aria-selected={idx === activeScenarioIdx}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.viewport__content}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DashboardMockup scenario={activeScenario} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Recommendation Overlay Card (Moved Below Mockup for 100% Visibility) */}
          <div className={styles.cardContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <RecommendationCard rec={activeScenario.recommendation} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Core Telemetry Stats */}
          <motion.div
            className={styles.hero__stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { label: "Incremental Lift", value: "+34%" },
              { label: "Action Resolution", value: "Closed Loop" },
              { label: "Attributed Revenue", value: "₹2.4Cr" },
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
