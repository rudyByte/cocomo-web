/**
 * MarqueeRow.tsx
 * Trionn-style continuous marquee text scroll.
 * Speed multiplies when user scrolls fast (via Lenis velocity).
 *
 * Usage:
 *   <MarqueeRow items={["Growth", "Revenue", "Impact"]} />
 *   <MarqueeRow items={["Inspire ✦", "Innovate ✦", "Impact ✦"]} direction="left" />
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MarqueeRow.module.css";

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  separator?: string;
}

export function MarqueeRow({
  items,
  direction = "left",
  speed = 60,          // px per second
  className = "",
  separator = "✦",
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  const rafRef = useRef<number>(0);
  const velocityMultiplier = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Get the width of one complete content set (we duplicate it for seamless loop)
    const getTrackWidth = () => track.scrollWidth / 2;

    const dir = direction === "left" ? -1 : 1;

    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Add a velocity boost when scrolling (detected from Lenis)
      const lenis = (window as unknown as Record<string, unknown>).__lenis as {
        velocity?: number;
      } | null;
      const scrollVel = lenis?.velocity ?? 0;
      const velBoost = 1 + Math.min(Math.abs(scrollVel) * 0.04, 3);
      velocityMultiplier.current += (velBoost - velocityMultiplier.current) * 0.08;

      xPos.current += dir * speed * delta * velocityMultiplier.current;

      // Seamless loop
      const w = getTrackWidth();
      if (dir === -1 && xPos.current <= -w) {
        xPos.current += w;
      } else if (dir === 1 && xPos.current >= 0) {
        xPos.current -= w;
      }

      gsap.set(track, { x: xPos.current });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed]);

  // Build content items (duplicated for seamless loop)
  const buildContent = () =>
    [...items, ...items].map((item, i) => (
      <React.Fragment key={i}>
        <span className={styles.item}>{item}</span>
        <span className={styles.sep} aria-hidden="true">{separator}</span>
      </React.Fragment>
    ));

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div ref={trackRef} className={styles.track} aria-label={items.join(", ")}>
        {/* Two sets for seamless loop */}
        <div className={styles.set} aria-hidden="false">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <span className={styles.item}>{item}</span>
              <span className={styles.sep} aria-hidden="true">{separator}</span>
            </React.Fragment>
          ))}
        </div>
        <div className={styles.set} aria-hidden="true">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <span className={styles.item}>{item}</span>
              <span className={styles.sep} aria-hidden="true">{separator}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
