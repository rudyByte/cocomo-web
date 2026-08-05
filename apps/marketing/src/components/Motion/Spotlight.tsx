"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Spotlight.module.css";

interface SpotlightProps {
  size?: number;
  opacity?: number;
}

export function Spotlight({ size = 500, opacity = 0.07 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check reduced motion & touch
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const parent = containerRef.current?.closest("footer") as HTMLElement | null;
    if (!parent) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentPos.current.x - size / 2}px, ${currentPos.current.y - size / 2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (!isHovered) setIsHovered(true);
      if (!isHoveringRef.current) {
        isHoveringRef.current = true;
        setIsHovered(true);
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setIsHovered(false);
      targetPos.current = { x: -1000, y: -1000 };
    };

    parent.addEventListener("mousemove", handleMouseMove, { passive: true });
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [size]);

  return (
    <div ref={containerRef} className={styles.spotlightContainer} aria-hidden="true">
      <div
        ref={spotlightRef}
        className={`${styles.spotlight} ${isHovered ? styles.active : ""}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 0%, transparent 65%)`,
        }}
      />
    </div>
  );
}
