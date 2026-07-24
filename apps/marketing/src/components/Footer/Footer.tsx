"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";
import { Logo } from "../Logo/Logo";

type FooterLink = {
  label: string;
  href?: string;
  badge?: string;
};

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Platform", href: "/platform" },
    { label: "How it works", href: "/platform#loop" },
    { label: "Pricing model", href: "/platform#pricing" },
    { label: "Security", href: "/platform#security" },
  ],
  Industries: [
    { label: "Restaurants", href: "/restaurants" },
    { label: "Cafés & QSR", href: "/restaurants#cafes" },
    { label: "Retail", href: "/platform" },
    { label: "Beauty & Wellness", href: "/platform" },
  ],
  Company: [
    { label: "Vision", href: "/company#vision" },
    { label: "Team", href: "/company#team" },
    { label: "Careers", href: "/company#contact" },
    { label: "Contact", href: "/company#contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Status", href: "/legal/status" },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.footer__inner}`}>
        {/* Growth line SVG */}
        <svg
          className={styles.footer__growthLine}
          viewBox="0 0 1200 40"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 36 Q 150 28, 300 32 T 600 20 T 900 12 T 1200 4"
            stroke="var(--clay)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </svg>

        {/* Top: brand + links */}
        <div className={styles.footer__top}>
          {/* Brand */}
          <div className={styles.footer__brand}>
            <Link href="/" className={styles.footer__wordmark} aria-label="Cocomo home">
              <Logo variant="light" iconSize={28} textSize="1.15rem" spacing="0.6rem" />
            </Link>
            <p className={styles.footer__tagline}>
              Growth, made an operating system.
            </p>
            <p className={styles.footer__trust}>
              The platform is free.
              <br />
              We earn only when you grow.
            </p>
            <Link href="/demo" className={styles.footer__cta}>
              Book a demo
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Link columns */}
          <nav className={styles.footer__nav} aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([group, links], groupIdx) => (
              <motion.div
                key={group}
                className={styles.footer__col}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`eyebrow ${styles.footer__colhead}`}>{group}</span>
                <ul role="list">
                  {links.map((link) => {
                    const { label, href, badge } = link;
                    return (
                      <li key={label}>
                        {href ? (
                          <Link href={href} className={styles.footer__link}>
                            {label}
                          </Link>
                        ) : (
                          <span className={styles["footer__link--muted"]} aria-disabled="true">
                            {label}
                            {badge && (
                              <span className={styles.footer__badge} aria-label={`${label} — coming soon`}>
                                {badge}
                              </span>
                            )}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="hairline" />

        {/* Bottom */}
        <div className={styles.footer__bottom}>
          <span className={styles.footer__copy}>
            © {new Date().getFullYear()} Cocomo. All rights reserved.
          </span>
          <div className={styles.footer__surfaces}>
            <Link href="/cocomo-media" className={styles.footer__medialink}>
              Cocomo Media ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
