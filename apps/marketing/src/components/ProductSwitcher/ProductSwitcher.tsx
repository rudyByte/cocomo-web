"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductSwitcher.module.css";

export function ProductSwitcher() {
  const router = useRouter();

  return (
    <div className={styles.switcher} role="group" aria-label="Choose your path">
      <span className={styles.switcher__label}>Not sure where to start?</span>
      <div className={styles.switcher__btns}>
        <button
          className={`${styles.switcher__btn} ${styles["switcher__btn--active"]}`}
          onClick={() => {
            // Already on MGP — smooth scroll to the gap section
            document.getElementById("section-gap")?.scrollIntoView({ behavior: "smooth" });
          }}
          id="switcher-grow-revenue"
        >
          Grow revenue
        </button>
        <button
          className={styles.switcher__btn}
          onClick={() => router.push("/cocomo-media")}
          id="switcher-grow-reach"
        >
          Grow reach — influencer &amp; creator marketing
        </button>
      </div>
    </div>
  );
}
