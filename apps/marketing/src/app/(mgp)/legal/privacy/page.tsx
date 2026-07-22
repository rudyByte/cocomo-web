import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "Privacy Policy — Cocomo" };

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: July 2026</p>
        <div className={styles.body}>
          <h2>1. Information We Collect</h2>
          <p>
            When you register for or use Cocomo, we collect information necessary to provide and optimize our growth recommendation services. This includes name, business contact details, email addresses, and merchant telemetry data (such as Point of Sale transaction metrics, local campaign engagement scores, and public review signals).
          </p>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the collected information solely to generate customized revenue-growth recommendations, coordinate and launch campaign activations (including influencer matching via Cocomo Media), and track campaign redemptions to verify exact incremental sales lifts. We do not sell or monetize your operational metrics.
          </p>
          <h2>3. Data Security and Scopes</h2>
          <p>
            All connection states and transaction details are encrypted using industry-standard protocols, including AES-256 at rest and TLS 1.3 in transit. Our POS platform connectors utilize read-only tokens with strict access scopes. Personally identifiable information (PII) is hashed automatically before being stored in our relational databases.
          </p>
          <h2>4. Data Retention</h2>
          <p>
            We retain operational and transaction telemetry only as long as required to perform historical attribution comparisons. You may request deletion of your merchant metrics and associated user profiles by contacting our privacy operations team.
          </p>
          <h2>5. Contact</h2>
          <p>Privacy questions: <a href="mailto:privacy@cocomo.com">privacy@cocomo.com</a></p>
        </div>
      </div>
    </div>
  );
}
