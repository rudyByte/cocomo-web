import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "Privacy Policy — Cocomo" };

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: July 2025</p>
        <div className={styles.body}>
          {/* TODO: This document requires legal review before launch. Replace sections below with counsel-reviewed content. */}
          <h2>1. Information we collect</h2>
          <p>When you use Cocomo, we collect information you provide directly (name, email, business details) and information generated through platform use (transaction signals, campaign data). TODO: Expand with full legal language.</p>
          <h2>2. How we use your information</h2>
          <p>We use data solely to generate revenue-growth recommendations for your business and to measure the impact of executed actions. TODO: Expand with full legal language.</p>
          <h2>3. Data security</h2>
          <p>All data is encrypted at rest and in transit using industry-standard protocols. TODO: Expand with security certifications and specifics.</p>
          <h2>4. Contact</h2>
          <p>Privacy questions: <a href="mailto:privacy@cocomo.com">privacy@cocomo.com</a></p>
        </div>
      </div>
    </div>
  );
}
