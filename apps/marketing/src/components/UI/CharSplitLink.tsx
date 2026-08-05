/**
 * CharSplitLink.tsx
 * Trionn-style per-character hover animation for links.
 *
 * How it works:
 * - Splits text into individual <span> chars
 * - Two identical text layers: "original" and "clone"
 * - On hover: original chars fly out translateY(-110%), clone chars fly in from below
 * - Each char has a stagger delay
 * - On mouse leave: reverse
 */
"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "gsap";
import styles from "./CharSplitLink.module.css";

interface CharSplitLinkProps {
  children: string;
  className?: string;
}

export function CharSplitLink({
  children,
  className = "",
}: CharSplitLinkProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const getChars = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { originals: [], clones: [] };
    const originals = Array.from(el.querySelectorAll<HTMLSpanElement>(`.${styles.charOriginal}`));
    const clones = Array.from(el.querySelectorAll<HTMLSpanElement>(`.${styles.charClone}`));
    return { originals, clones };
  }, []);

  const handleEnter = useCallback(() => {
    const { originals, clones } = getChars();
    if (!originals.length) return;

    gsap.killTweensOf([...originals, ...clones]);

    // Original chars fly up and out
    gsap.to(originals, {
      y: "-110%",
      opacity: 0,
      duration: 0.35,
      stagger: 0.022,
      ease: "power2.in",
    });

    // Clone chars fly in from below
    gsap.fromTo(
      clones,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.4,
        stagger: 0.022,
        ease: "power2.out",
        delay: 0.03,
      }
    );
  }, [getChars]);

  const handleLeave = useCallback(() => {
    const { originals, clones } = getChars();
    if (!originals.length) return;

    gsap.killTweensOf([...originals, ...clones]);

    // Original chars return
    gsap.to(originals, {
      y: "0%",
      opacity: 1,
      duration: 0.35,
      stagger: 0.018,
      ease: "power2.out",
    });

    // Clone chars exit downward
    gsap.to(clones, {
      y: "110%",
      opacity: 0,
      duration: 0.28,
      stagger: 0.018,
      ease: "power2.in",
    });
  }, [getChars]);

  const chars = children.split("");

  return (
    <span
      ref={containerRef as React.RefObject<HTMLSpanElement>}
      className={`${styles.charSplit} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Original layer */}
      <span className={styles.layerOriginal} aria-hidden="false">
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

      {/* Clone layer (visually identical, positioned absolute) */}
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
  );
}
