"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import styles from "./media.module.css";

// Lazy-load 3D component — keeps it out of SSR bundle
const NetworkSphere = dynamic(
  () => import("@/components/media/NetworkSphere").then((m) => m.NetworkSphere),
  {
    ssr: false,
    loading: () => (
      <div className={styles.sphere__fallback} aria-hidden="true">
        <div className={styles.sphere__static} />
      </div>
    ),
  }
);

const services = [
  {
    title: "Influencer campaigns",
    desc: "Micro to mega — matched to your brand, tracked to revenue.",
    icon: "🎬",
  },
  {
    title: "Content production",
    desc: "Creator-native content at scale. Reels, stories, short-form.",
    icon: "📸",
  },
  {
    title: "Meta ads management",
    desc: "Performance-led campaigns run by our expert team.",
    icon: "⚡",
  },
  {
    title: "Creator management",
    desc: "End-to-end relationship management for your talent roster.",
    icon: "🤝",
  },
];

const process = [
  { num: "01", title: "Brief", desc: "Tell us your campaign goal and target audience." },
  { num: "02", title: "Match", desc: "We identify and vet creators from our network." },
  { num: "03", title: "Create", desc: "Content is produced, reviewed, and approved." },
  { num: "04", title: "Measure", desc: "Full attribution — reach, engagement, revenue." },
];

export default function CocomoMediaPage() {
  return (
    <div className={styles.page}>
      {/* Hero with 3D sphere */}
      <section className={styles.hero} aria-labelledby="media-heading">
        <div className={styles.hero__sphere}>
          <Suspense>
            <NetworkSphere />
          </Suspense>
        </div>

        <div className={styles.hero__overlay} aria-hidden="true" />

        <div className={styles.hero__content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.hero__eyebrow}>Cocomo Media</span>
            <h1 id="media-heading" className={styles.hero__heading}>
              Creator &amp; influencer
              <br />
              <span className={styles.hero__gradient}>growth engine.</span>
            </h1>
            <p className={styles.hero__sub}>
              We match your brand with the right creators, run the campaigns,
              and measure revenue — not just impressions.
            </p>
            <div className={styles.hero__ctas}>
              <Link href="/cocomo-media/contact" className={styles.hero__primary} id="media-proposal-cta">
                Get a proposal
              </Link>
              <Link href="/cocomo-media/work" className={styles.hero__secondary}>
                See our work ↓
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services bento grid */}
      <section className={styles.services} id="services" aria-labelledby="services-heading">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Services</span>
          <h2 id="services-heading" className={styles.section__heading}>
            Everything your brand needs to grow reach.
          </h2>
          <div className={styles.services__grid}>
            {services.map(({ title, desc, icon }) => (
              <motion.div
                key={title}
                className={styles.services__card}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className={styles.services__icon}>{icon}</span>
                <h3 className={styles.services__title}>{title}</h3>
                <p className={styles.services__desc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard tour teaser */}
      <section className={styles.dashboard} id="dashboard" aria-labelledby="dash-heading">
        <div className={styles.container}>
          <h2 id="dash-heading" className={styles.section__heading}>
            One dashboard. Every campaign.
          </h2>
          <p className={styles.section__sub}>
            Track creator performance, content approvals, ad spend, and revenue impact in real time.
          </p>
          <Link href="/cocomo-media/dashboard-tour" className={styles.dashboard__link} id="media-dash-link">
            Take the dashboard tour →
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process} id="process" aria-labelledby="process-heading">
        <div className={styles.container}>
          <h2 id="process-heading" className={styles.section__heading}>How it works</h2>
          <div className={styles.process__steps}>
            {process.map(({ num, title, desc }) => (
              <div key={num} className={styles.process__step}>
                <span className={styles.process__num}>{num}</span>
                <h3 className={styles.process__title}>{title}</h3>
                <p className={styles.process__desc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close CTA */}
      <section className={styles.close}>
        <div className={styles.container}>
          <h2 className={styles.close__heading}>
            Ready to grow your reach?
          </h2>
          <Link href="/cocomo-media/contact" className={styles.close__cta} id="media-close-cta">
            Get a proposal
          </Link>
        </div>
      </section>
    </div>
  );
}
