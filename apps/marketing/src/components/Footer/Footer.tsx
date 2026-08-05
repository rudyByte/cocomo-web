"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";
import { Logo } from "../Logo/Logo";
import { Atmosphere } from "../Motion/Atmosphere";
import { LineWaveWordmark } from "../Motion/LineWaveWordmark";
import { Magnetic } from "../Motion/Magnetic";
import { Spotlight } from "../Motion/Spotlight";
import { WavyDivider } from "../Motion/WavyDivider";
import { CharSplitLink } from "../UI/CharSplitLink";

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
    { label: "Caf\u00e9s & QSR", href: "/restaurants#cafes" },
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
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const setFog = (event: PointerEvent, active: boolean) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const fogTarget = target.closest<HTMLElement>("[data-fog-hover]");
      if (!fogTarget || !footer.contains(fogTarget)) return;
      fogTarget.dataset.fogActive = active ? "true" : "false";
    };

    const enter = (event: PointerEvent) => setFog(event, true);
    const leave = (event: PointerEvent) => setFog(event, false);

    footer.addEventListener("pointerover", enter);
    footer.addEventListener("pointerout", leave);

    return () => {
      footer.removeEventListener("pointerover", enter);
      footer.removeEventListener("pointerout", leave);
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} role="contentinfo">
      <div className={styles.footer__bgWrap}>
        <Atmosphere />
        <Spotlight size={620} opacity={0.14} />
      </div>

      <LineWaveWordmark text="COCOMO" placement="footer" />

      <div className={`container ${styles.footer__inner}`}>
        <WavyDivider className={styles.footer__growthLine} color="var(--clay)" />

        <div className={styles.footer__top}>
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
            <Magnetic strength={12} radius={50}>
              <Link href="/demo" className={styles.footer__cta}>
                <CharSplitLink>Book a demo</CharSplitLink>
                <ArrowUpRight size={14} />
              </Link>
            </Magnetic>
          </div>

          <nav className={styles.footer__nav} aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className={styles.footer__col}>
                <span className={`eyebrow ${styles.footer__colhead}`} data-fog-hover>
                  {group}
                </span>
                <ul role="list">
                  {links.map(({ label, href, badge }) => (
                    <li key={label}>
                      {href ? (
                        <Link href={href} className={styles.footer__link} data-fog-hover>
                          <CharSplitLink>{label}</CharSplitLink>
                        </Link>
                      ) : (
                        <span className={styles["footer__link--muted"]} aria-disabled="true">
                          {label}
                          {badge && (
                            <span
                              className={styles.footer__badge}
                              aria-label={`${label} - coming soon`}
                            >
                              {badge}
                            </span>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="hairline" />

        <div className={styles.footer__bottom}>
          <span className={styles.footer__copy}>
            {"\u00a9"} {new Date().getFullYear()} Cocomo. All rights reserved.
          </span>
          <div className={styles.footer__surfaces}>
            <Link href="/cocomo-media" className={styles.footer__medialink}>
              {"Cocomo Media \u2197"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
