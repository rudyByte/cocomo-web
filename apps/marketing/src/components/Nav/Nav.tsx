"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown, Cpu, Sparkles, ArrowUpRight, ArrowRight } from "lucide-react";
import styles from "./Nav.module.css";
import { Logo } from "../Logo/Logo";

const products = [
  {
    name: "Cocomo Engine",
    badge: "CORE PRODUCT",
    desc: "AI Growth OS for Merchants. Predicts revenue & executes actions automatically.",
    href: "/platform",
    icon: Cpu,
    color: "var(--clay)",
  },
  {
    name: "Cocomo Media",
    badge: "CREATOR ENGINE",
    desc: "Orchestrate creator campaigns and local loops to capture customer attention.",
    href: "/cocomo-media",
    icon: Sparkles,
    color: "var(--gold)",
  },
];

const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/company", label: "Company" },
];

// Magnetic button hook
function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    el.style.transition = "transform 0.1s ease";
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ctaRef = useMagnetic(0.35) as React.RefObject<HTMLAnchorElement>;
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll reading progress
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Keyboard: D → /demo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); setDropdownOpen(false); }
      if (e.key === "d" && !e.ctrlKey && !e.metaKey && !["INPUT","TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        window.location.href = "/demo";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const openDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <>
      {/* ── Main Nav Bar ── */}
      <motion.header
        className={[styles.nav, scrolled ? styles["nav--scrolled"] : ""].join(" ")}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        role="banner"
      >
        {/* Progressive border bottom */}
        <motion.div
          className={styles.nav__border}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Reading progress bar */}
        <motion.div
          className={styles.nav__progress}
          style={{ scaleX: scrollProgress }}
          aria-hidden="true"
        />

        <div className={`container ${styles.nav__inner}`}>
          {/* Wordmark */}
          <Link href="/" className={styles.nav__logo} aria-label="Cocomo — home">
            <Logo variant="light" iconSize={26} textSize="1.05rem" spacing="0.45rem" />
            <span className={styles.nav__tag}>ENGINE</span>
          </Link>

          {/* Desktop links */}
          <nav className={styles.nav__links} aria-label="Primary navigation">
            {/* Products Dropdown */}
            <div
              className={styles.dropdown}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`${styles.nav__link} ${styles.dropdown__trigger}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  size={13}
                  className={[styles.dropdown__chevron, dropdownOpen ? styles["dropdown__chevron--open"] : ""].join(" ")}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className={styles.dropdown__menu}
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <div className={styles.dropdown__header}>
                      <span className={styles.dropdown__eyebrow}>COCOMO PRODUCT SUITE</span>
                    </div>
                    <div className={styles.dropdown__grid}>
                      {products.map((p, i) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.name}
                            href={p.href}
                            className={styles.dropdown__item}
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div
                              className={styles.dropdown__iconWrapper}
                              style={{ color: p.color, background: `color-mix(in srgb, ${p.color} 12%, transparent)` }}
                            >
                              <Icon size={17} strokeWidth={1.75} />
                            </div>
                            <div className={styles.dropdown__itemContent}>
                              <div className={styles.dropdown__itemTitle}>
                                <span>{p.name}</span>
                                <span className={styles.dropdown__badge} style={{ borderColor: p.color, color: p.color }}>
                                  {p.badge}
                                </span>
                              </div>
                              <p className={styles.dropdown__itemDesc}>{p.desc}</p>
                            </div>
                            <ArrowUpRight size={14} className={styles.dropdown__arrow} />
                          </Link>
                        );
                      })}
                    </div>
                    <div className={styles.dropdown__footer}>
                      <span>Need help choosing?</span>
                      <Link href="/demo" className={styles.dropdown__footerLink}>
                        Talk to us <ArrowRight size={11} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  styles.nav__link,
                  pathname === href || pathname?.startsWith(href + "/")
                    ? styles["nav__link--active"]
                    : "",
                ].join(" ")}
                aria-current={pathname === href ? "page" : undefined}
              >
                <span className={styles.nav__link_inner}>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.nav__actions}>
            <Link href="/login" className={styles.nav__signin}>
              Sign in
            </Link>
            <Link
              href="/demo"
              className={styles.nav__cta}
              id="nav-demo-cta"
              ref={ctaRef}
              data-cursor="hover"
            >
              Book a demo
            </Link>

            {/* Mobile menu toggle */}
            <button
              className={styles.nav__burger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 45 : 0, scale: menuOpen ? 0.85 : 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobile}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden={!menuOpen}
          >
            <div className={styles.mobile__inner}>
              <nav aria-label="Mobile navigation" className={styles.mobile__nav}>
                {/* Products group */}
                <div className={styles.mobile__group}>
                  <motion.span
                    className={styles.mobile__sectionLabel}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Products
                  </motion.span>
                  {products.map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={p.href}
                        className={styles.mobile__productLink}
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        <span className={styles.mobile__productName}>{p.name}</span>
                        <span className={styles.mobile__productDesc}>{p.desc}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.mobile__divider} />

                {/* Nav links */}
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={href}
                      className={[
                        styles.mobile__link,
                        pathname === href ? styles["mobile__link--active"] : "",
                      ].join(" ")}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href="/login" className={styles.mobile__link} tabIndex={menuOpen ? 0 : -1}>
                    Sign in
                  </Link>
                </motion.div>

                <motion.div
                  className={styles.mobile__ctaWrap}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href="/demo" className={styles.mobile__cta} tabIndex={menuOpen ? 0 : -1}>
                    Book a demo — free to start
                    <ArrowRight size={16} />
                  </Link>
                  <p className={styles.mobile__trust}>The platform is free. We earn only when you grow.</p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
