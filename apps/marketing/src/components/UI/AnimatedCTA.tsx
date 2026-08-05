/**
 * AnimatedCTA.tsx
 * Trionn-style animated CTA button with:
 * - Per-character text animation (chars slide up/down on hover)
 * - Dual underline: u-right slides out, u-left slides in
 * - Arrow icon enters from the right on hover
 *
 * Usage:
 *   <AnimatedCTA href="/demo" color="#111">Book a demo</AnimatedCTA>
 */
"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./AnimatedCTA.module.css";

interface AnimatedCTAProps {
  href: string;
  children: string;
  color?: string;
  className?: string;
  external?: boolean;
  id?: string;
  onClick?: () => void;
}

export function AnimatedCTA({
  href,
  children,
  color,
  className = "",
  external,
  id,
  onClick,
}: AnimatedCTAProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const uRightRef = useRef<HTMLSpanElement>(null);
  const uLeftRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const chars = children.split("");

  const getCharEls = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { originals: [], clones: [] };
    return {
      originals: Array.from(el.querySelectorAll<HTMLSpanElement>(`.${styles.charOriginal}`)),
      clones: Array.from(el.querySelectorAll<HTMLSpanElement>(`.${styles.charClone}`)),
    };
  }, []);

  const handleEnter = useCallback(() => {
    const { originals, clones } = getCharEls();

    gsap.killTweensOf([
      ...originals,
      ...clones,
      uRightRef.current,
      uLeftRef.current,
      arrowRef.current,
    ]);

    // Chars fly up
    gsap.to(originals, {
      y: "-110%",
      opacity: 0,
      duration: 0.32,
      stagger: 0.02,
      ease: "power2.in",
    });
    // Clone chars enter from below
    gsap.fromTo(
      clones,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.38,
        stagger: 0.02,
        ease: "power2.out",
        delay: 0.04,
      }
    );

    // Underline: u-right exits right, u-left enters from left
    gsap.to(uRightRef.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.fromTo(
      uLeftRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    // Arrow slides in
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", delay: 0.05 }
      );
    }
  }, [getCharEls]);

  const handleLeave = useCallback(() => {
    const { originals, clones } = getCharEls();

    gsap.killTweensOf([
      ...originals,
      ...clones,
      uRightRef.current,
      uLeftRef.current,
      arrowRef.current,
    ]);

    // Chars return
    gsap.to(originals, {
      y: "0%",
      opacity: 1,
      duration: 0.32,
      stagger: 0.016,
      ease: "power2.out",
    });
    gsap.to(clones, {
      y: "110%",
      opacity: 0,
      duration: 0.25,
      stagger: 0.016,
      ease: "power2.in",
    });

    // Underline reset
    gsap.to(uRightRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(uLeftRef.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.25,
      ease: "power2.in",
    });

    // Arrow hides
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        opacity: 0,
        x: 6,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [getCharEls]);

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      ref={containerRef}
      href={href}
      id={id}
      className={`${styles.cta} ${className}`}
      style={color ? ({ "--cta-color": color } as React.CSSProperties) : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      draggable={false}
      {...linkProps}
    >
      {/* Dual underline */}
      <span className={styles.underlineWrap} aria-hidden="true">
        <span ref={uRightRef} className={styles.uRight} />
        <span ref={uLeftRef} className={styles.uLeft} />
      </span>

      {/* Text with char split */}
      <span className={styles.wordWrap}>
        {/* Original chars */}
        <span className={styles.layerOriginal}>
          {chars.map((char, i) => (
            <span
              key={`o-${i}`}
              className={styles.charOriginal}
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>

        {/* Clone chars */}
        <span className={styles.layerClone} aria-hidden="true">
          {chars.map((char, i) => (
            <span
              key={`c-${i}`}
              className={styles.charClone}
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      </span>

      {/* Arrow */}
      <span ref={arrowRef} className={styles.arrow} aria-hidden="true">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
          <path
            d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Link>
  );
}
