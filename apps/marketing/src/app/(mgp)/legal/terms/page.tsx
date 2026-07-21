import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "Terms of Service — Cocomo" };

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.heading}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: July 2025</p>
        <div className={styles.body}>
          {/* TODO: This document requires legal review before launch. */}
          <h2>1. Service description</h2>
          <p>Cocomo provides a Growth Operating System for merchants. The platform is free to use. Cocomo earns a percentage of demonstrably created incremental revenue. TODO: Full legal language required.</p>
          <h2>2. Acceptable use</h2>
          <p>TODO: Acceptable use policy required.</p>
          <h2>3. Limitation of liability</h2>
          <p>TODO: Limitation of liability clause required — lawyer review mandatory.</p>
          <h2>4. Contact</h2>
          <p>Legal questions: <a href="mailto:legal@cocomo.com">legal@cocomo.com</a></p>
        </div>
      </div>
    </div>
  );
}
