import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "System Status — Cocomo" };

export default function StatusPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.heading}>System Status</h1>
        <p className={styles.updated}>All systems operational.</p>
        <div className={styles.body}>
          {[
            { service: "API", status: "Operational" },
            { service: "Database", status: "Operational" },
            { service: "Recommendation engine", status: "Operational" },
            { service: "Campaign execution", status: "Operational" },
          ].map(({ service, status }) => (
            <div key={service} className={styles.statusRow}>
              <span className={styles.statusService}>{service}</span>
              <span className={styles.statusBadge}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
