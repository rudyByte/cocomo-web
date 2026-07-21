import Link from "next/link";
import styles from "./media-layout.module.css";

const mediaNav = [
  { href: "/cocomo-media", label: "Home" },
  { href: "/cocomo-media/services", label: "Services" },
  { href: "/cocomo-media/dashboard-tour", label: "Dashboard" },
  { href: "/cocomo-media/work", label: "Work" },
  { href: "/cocomo-media/pricing", label: "Pricing" },
  { href: "/cocomo-media/contact", label: "Get a proposal" },
];

export default function CocomoMediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Cocomo Media Nav — fully separate from MGP */}
      <header className={styles.nav}>
        <div className={`${styles.nav__inner}`}>
          <Link href="/cocomo-media" className={styles.nav__logo} aria-label="Cocomo Media — home">
            <span className={styles.nav__wordmark}>
              <span className={styles.nav__co}>Cocomo</span>
              <span className={styles.nav__media}>Media</span>
            </span>
          </Link>

          <nav className={styles.nav__links} aria-label="Cocomo Media navigation">
            {mediaNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.nav__link} ${label === "Get a proposal" ? styles["nav__link--cta"] : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" style={{ paddingTop: "72px" }}>
        {children}
      </main>

      {/* Cocomo Media Footer — separate from MGP */}
      <footer className={styles.footer}>
        <div className={styles.footer__inner}>
          <div>
            <Link href="/cocomo-media" className={styles.footer__logo}>Cocomo Media</Link>
            <p className={styles.footer__tagline}>Creator & Influencer Growth Engine</p>
          </div>
          <nav className={styles.footer__nav} aria-label="Cocomo Media footer">
            {mediaNav.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.footer__link}>{label}</Link>
            ))}
          </nav>
          <div className={styles.footer__bottom}>
            <span className={styles.footer__powered}>
              Powered by the{" "}
              <Link href="/" className={styles.footer__mgplink}>Cocomo Growth OS ↗</Link>
            </span>
            <span className={styles.footer__copy}>© {new Date().getFullYear()} Cocomo</span>
          </div>
        </div>
      </footer>
    </>
  );
}
