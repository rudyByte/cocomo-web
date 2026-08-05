/**
 * LinePlusDivider.tsx
 * Trionn-style horizontal line that draws itself on scroll entry,
 * with a + SVG cross at the end point.
 *
 * Usage:
 *   <LinePlusDivider plusPosition="center" />
 *   <LinePlusDivider plusPosition="right" color="#2F323B" />
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LinePlusDivider.module.css";

gsap.registerPlugin(ScrollTrigger);

interface LinePlusDividerProps {
  /** Where to place the + cross: left, center, or right of line */
  plusPosition?: "left" | "center" | "right" | "col-4" | "col-7" | "col-9";
  /** Line color (defaults to current --hairline token) */
  color?: string;
  /** Extra className on wrapper */
  className?: string;
}

const PlusSVG = ({ color = "currentColor" }: { color?: string }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line x1="6.5" y1="0" x2="6.5" y2="13" stroke={color} strokeWidth="1" />
    <line x1="0" y1="6.5" x2="13" y2="6.5" stroke={color} strokeWidth="1" />
  </svg>
);

export function LinePlusDivider({
  plusPosition = "center",
  color,
  className = "",
}: LinePlusDividerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const plus = plusRef.current;
    const wrap = wrapRef.current;
    if (!line || !plus || !wrap) return;

    // Start: line at 0 width, plus invisible
    gsap.set(line, { width: 0 });
    gsap.set(plus, { opacity: 0, scale: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(line, {
      width: "100%",
      duration: 1.1,
      ease: "power3.inOut",
    }).to(
      plus,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const plusPositionClass =
    plusPosition === "left"
      ? styles["plus--left"]
      : plusPosition === "right"
      ? styles["plus--right"]
      : plusPosition === "col-4"
      ? styles["plus--col4"]
      : plusPosition === "col-7"
      ? styles["plus--col7"]
      : plusPosition === "col-9"
      ? styles["plus--col9"]
      : styles["plus--center"];

  const lineColor = color || "var(--hairline)";

  return (
    <div ref={wrapRef} className={`${styles.wrapper} ${className}`}>
      {/* The expanding line */}
      <div
        ref={lineRef}
        className={styles.line}
        style={{ backgroundColor: lineColor }}
      />
      {/* The + cross */}
      <div ref={plusRef} className={`${styles.plus} ${plusPositionClass}`}>
        <PlusSVG color={color || "var(--ink-muted)"} />
      </div>
    </div>
  );
}
