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
          <span className={styles.phase}>Dashboard coming soon — join the waitlist via demo.</span>
        </p>

        {/* Auth stub: Clerk sign-in button placeholder */}
        <div className={styles.clerkStub} role="region" aria-label="Sign in options">
          {/* TODO: Replace with <SignIn /> from @clerk/nextjs once Clerk keys are configured */}
          <p className={styles.clerkNote}>
            Authentication is being configured. In the meantime,{" "}
            <Link href="/demo" className={styles.clerkLink}>book a demo</Link>{" "}
            to get early access.
          </p>
          <Link href="/demo" className={styles.clerkCta} id="login-demo-link">
            Book a demo — get early access
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
