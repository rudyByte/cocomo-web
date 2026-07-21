"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ChevronDown, Cpu, Sparkles, BarChart3, ArrowRight } from "lucide-react";
import styles from "./Nav.module.css";

const products = [
  {
    name: "Cocomo Engine",
    badge: "HERO PRODUCT",
    desc: "AI Growth Operating System for Merchants. Predicts revenue & executes actions.",
    href: "/platform",
    icon: Cpu,
    color: "var(--clay)",
  },
  {
    name: "Cocomo Media",
    badge: "EXECUTION NETWORK",
    desc: "Influencer & creator growth engine connected to POS & revenue lift.",
    href: "/cocomo-media",
    icon: Sparkles,
    color: "#E8356D",
  },
  {
    name: "Cocomo Intelligence",
    badge: "SIGNAL ANALYTICS",
    desc: "Continuous POS, footfall, and competitor anomaly detection.",
    href: "/platform#loop",
    icon: BarChart3,
    color: "var(--good)",
  },
];

const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/company", label: "Company" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detect scroll for frosted header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Read persisted theme
  useEffect(() => {
    const stored = localStorage.getItem("cocomo-theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(stored ?? preferred);
  }, []);

  // Keyboard shortcut: D → /demo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "d" && !e.ctrlKey && !e.metaKey && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        window.location.href = "/demo";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("cocomo-theme", next);
  }, [theme]);

  return (
    <>
      <header
        className={[styles.nav, scrolled ? styles["nav--scrolled"] : ""].join(" ")}
        role="banner"
      >
        <div className={`container ${styles.nav__inner}`}>
          {/* Wordmark */}
          <Link href="/" className={styles.nav__logo} aria-label="Cocomo — home">
            <span className={styles.nav__wordmark}>Cocomo</span>
            <span className={styles.nav__tag}>ENGINE</span>
          </Link>

          {/* Desktop links */}
          <nav className={styles.nav__links} aria-label="Primary navigation">
            {/* Products Dropdown Toggle */}
            <div
              className={styles.dropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`${styles.nav__link} ${styles.dropdown__trigger}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  size={14}
                  className={`${styles.dropdown__chevron} ${dropdownOpen ? styles["dropdown__chevron--open"] : ""}`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {dropdownOpen && (
                <div className={styles.dropdown__menu} role="menu">
                  <div className={styles.dropdown__header}>
                    <span className={styles.dropdown__eyebrow}>COCOMO PRODUCT SUITE</span>
                  </div>
                  <div className={styles.dropdown__grid}>
                    {products.map((p) => {
                      const Icon = p.icon;
                      return (
                        <Link
                          key={p.name}
                          href={p.href}
                          className={styles.dropdown__item}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className={styles.dropdown__iconWrapper} style={{ backgroundColor: `color-mix(in srgb, ${p.color} 15%, transparent)`, color: p.color }}>
                            <Icon size={18} />
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
                        </Link>
                      );
                    })}
                  </div>
                  <div className={styles.dropdown__footer}>
                    <span>Not sure which solution fits your business?</span>
                    <Link href="/demo" className={styles.dropdown__footerLink}>
                      Book a strategy demo <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
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
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className={styles.nav__actions}>
            <button
              onClick={toggleTheme}
              className={styles.nav__theme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`${theme === "light" ? "Dark" : "Light"} mode`}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Link href="/login" className={styles.nav__signin}>
              Sign in
            </Link>

            <Link
              href="/demo"
              className={styles.nav__cta}
              id="nav-demo-cta"
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
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={[styles.mobile, menuOpen ? styles["mobile--open"] : ""].join(" ")}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <div className={styles.mobile__sectionLabel}>PRODUCTS</div>
          {products.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className={styles.mobile__productLink}
              tabIndex={menuOpen ? 0 : -1}
            >
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--ink-muted)" }}>{p.desc}</div>
            </Link>
          ))}
          <div className={styles.mobile__divider} />
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                styles.mobile__link,
                pathname === href ? styles["mobile__link--active"] : "",
              ].join(" ")}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </Link>
          ))}
          <div className={styles.mobile__divider} />
          <Link href="/login" className={styles.mobile__link} tabIndex={menuOpen ? 0 : -1}>
            Sign in
          </Link>
          <Link href="/demo" className={styles.mobile__cta} tabIndex={menuOpen ? 0 : -1}>
            Book a demo — free to start
          </Link>
        </nav>
      </div>
    </>
  );
}
