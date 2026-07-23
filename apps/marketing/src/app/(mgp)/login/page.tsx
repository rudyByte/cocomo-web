import type { Metadata } from "next";
import Link from "next/link";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Sign In — Cocomo",
  description: "Sign in to your Cocomo Growth OS dashboard.",
};

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.wordmark}>Cocomo</Link>
        <h1 className={styles.heading}>Sign in</h1>
        <p className={styles.sub}>
          Access your Growth OS dashboard.
          <br />
          <span className={styles.phase}>Direct login is active for onboarded merchants.</span>
        </p>

        {/* Auth stub: Clerk sign-in button placeholder */}
        <div className={styles.clerkStub} role="region" aria-label="Sign in options">
          <p className={styles.clerkNote}>
            Your merchant workspace is active. If you haven&apos;t received your credentials yet,{" "}
            <Link href="/demo" className={styles.clerkLink}>book a demo</Link>{" "}
            to onboard your outlets.
          </p>
          <Link href="/demo" className={styles.clerkCta} id="login-demo-link">
            Book a demo — get instant credentials
          </Link>
        </div>

        <p className={styles.legal}>
          By signing in you agree to our{" "}
          <Link href="/legal/terms">Terms</Link> and{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
