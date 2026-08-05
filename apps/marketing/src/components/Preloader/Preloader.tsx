/**
 * Preloader.tsx
 * Trionn-style cinematic page-load preloader.
 * 
 * Sequence:
 * 1. 10 horizontal belts cover the screen (scaleY 0→1, staggered)
 * 2. Logo box appears with corner + markers
 * 3. SVG logo path draws itself (strokeDashoffset)
 * 4. Slot-machine counter counts 0→100
 * 5. Tagline words "Inspire · Innovate · Impact" stagger in
 * 6. Belts wipe away (scaleY 1→0, staggered from top)
 * 7. Page content revealed
 * 
 * On repeat visits (same session): shorter transition only (belts wipe in/out quickly)
 */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete?: () => void;
}

// Cocomo wordmark path — draws the "C" letterform
const COCOMO_PATH =
  "M 60 20 C 45 20 32 30 26 44 C 20 58 20 72 26 86 C 32 100 45 110 60 110 C 72 110 82 104 88 94";

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const beltsRef = useRef<HTMLDivElement[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip full preloader if already shown this session
    const alreadyShown = sessionStorage.getItem("cocomo-preloader-shown");
    const isFirstLoad = !alreadyShown;
    sessionStorage.setItem("cocomo-preloader-shown", "1");

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    const belts = beltsRef.current;
    const corners = cornersRef.current;
    const path = pathRef.current;

    if (isFirstLoad) {
      // ── Phase 1: Belts slam in from top ──────────────────────
      tl.set(belts, { scaleY: 0, transformOrigin: "top center" })
        .to(belts, {
          scaleY: 1,
          duration: 0.65,
          stagger: 0.04,
          ease: "power3.inOut",
        })

        // ── Phase 2: Logo box and corners appear ─────────────────
        .fromTo(
          logoBoxRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          corners,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" },
          "-=0.3"
        )

        // ── Phase 3: Path draws ──────────────────────────────────
        .fromTo(
          path,
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
          "-=0.1"
        )

        // ── Phase 4: Counter 0→100 ───────────────────────────────
        .add(() => {
          let n = 0;
          const interval = setInterval(() => {
            n += Math.ceil(Math.random() * 8);
            if (n >= 100) {
              n = 100;
              clearInterval(interval);
            }
            setCount(n);
          }, 18);
        }, "-=0.8")

        // ── Phase 5: Tagline words stagger in ────────────────────
        .fromTo(
          taglineRef.current?.querySelectorAll(`.${styles.tagWord}`) ?? [],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" },
          "-=0.3"
        )

        // ── Hold ─────────────────────────────────────────────────
        .to({}, { duration: 0.4 })

        // ── Phase 6: Logo box & corners fade out ─────────────────
        .to(
          [logoBoxRef.current, corners, taglineRef.current, counterRef.current],
          { opacity: 0, duration: 0.35, ease: "power2.in" }
        )

        // ── Phase 7: Belts wipe away ─────────────────────────────
        .set(belts, { transformOrigin: "bottom center" })
        .to(belts, {
          scaleY: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.inOut",
        });
    } else {
      // Short repeat-visit transition
      tl.set(belts, { scaleY: 0, transformOrigin: "top center" })
        .to(belts, {
          scaleY: 1,
          duration: 0.45,
          stagger: 0.025,
          ease: "power3.inOut",
        })
        .to({}, { duration: 0.15 })
        .set(belts, { transformOrigin: "bottom center" })
        .to(belts, {
          scaleY: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.inOut",
        });
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      {/* 10 horizontal belts */}
      <div className={styles.beltsWrap}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={styles.belt}
            ref={(el) => { if (el) beltsRef.current[i] = el; }}
          />
        ))}
      </div>

      {/* Center logo box with corner + markers */}
      <div className={styles.center}>
        <div ref={logoBoxRef} className={styles.logoBox}>
          {/* Corner plus marks */}
          {(["tl", "tr", "bl", "br"] as const).map((pos, i) => (
            <div
              key={pos}
              className={`${styles.corner} ${styles[`corner--${pos}`]}`}
              ref={(el) => { if (el) cornersRef.current[i] = el; }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" strokeWidth="1" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#555" strokeWidth="1" />
              </svg>
            </div>
          ))}

          {/* Animated SVG path */}
          <svg
            className={styles.logoSvg}
            viewBox="0 0 120 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d={COCOMO_PATH}
              stroke="#434343"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>

          {/* Page label */}
          <div className={styles.logoLabel}>COCOMO</div>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className={styles.tagline}>
          <span className={styles.tagWord}>Growth</span>
          <span className={styles.tagDot}>·</span>
          <span className={styles.tagWord}>made</span>
          <span className={styles.tagDot}>·</span>
          <span className={styles.tagWord}>simple</span>
        </div>
      </div>

      {/* Counter */}
      <div ref={counterRef} className={styles.counter}>
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}
