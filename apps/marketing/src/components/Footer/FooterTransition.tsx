"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./FooterTransition.module.css";
import { Footer } from "./Footer";
import { LineWaveWordmark } from "../Motion/LineWaveWordmark";

export function FooterTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 1.28", "end end"],
  });

  const heavyProgress = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 26,
    mass: 0.9,
    restDelta: 0.0008,
  });

  const progress = prefersReducedMotion ? scrollYProgress : heavyProgress;
  const panelY = useTransform(progress, [0, 0.62], ["100%", "0%"]);
  const panelRadius = useTransform(progress, [0, 0.55], ["28px 28px 0 0", "0px 0px 0 0"]);
  const shadeOpacity = useTransform(progress, [0.05, 0.55], [0, 0.38]);
  const footerOpacity = useTransform(progress, [0.5, 0.72], [0, 1]);
  const footerY = useTransform(progress, [0.5, 0.72], [28, 0]);
  const footerBlur = useTransform(progress, [0.5, 0.72], ["blur(14px)", "blur(0px)"]);

  return (
    <section ref={sceneRef} className={styles.scene} aria-label="Footer transition">
      <div className={styles.sticky}>
        <motion.div className={styles.shade} style={{ opacity: shadeOpacity }} />
        <motion.div
          className={styles.panel}
          style={{
            y: prefersReducedMotion ? "0%" : panelY,
            borderRadius: prefersReducedMotion ? "0px" : panelRadius,
          }}
        >
          <div className={styles.panelAtmosphere} aria-hidden="true" />
          <LineWaveWordmark text="COCOMO" />
          <motion.div
            className={styles.footerReveal}
            style={{
              opacity: prefersReducedMotion ? 1 : footerOpacity,
              y: prefersReducedMotion ? 0 : footerY,
              filter: prefersReducedMotion ? "none" : footerBlur,
            }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
