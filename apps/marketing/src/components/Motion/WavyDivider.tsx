"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, MotionValue, useMotionValue } from "framer-motion";
import styles from "./WavyDivider.module.css";

interface WavyDividerProps {
  className?: string;
  color?: string;
  drawProgress?: MotionValue<number>;
}

export function WavyDivider({ className = "", color = "var(--clay)", drawProgress }: WavyDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useRef<number | null>(null);
  const cursorDistY = useRef<number>(100);
  const targetX = useRef<number | null>(null);
  const currentX = useRef<number | null>(null);
  const currentAmplitude = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Use drawProgress directly as pathLength (0 = invisible, 1 = fully drawn).
  // When no drawProgress is passed, default to fully-drawn (1).
  const fallbackProgress = useMotionValue(1);
  const pathLengthValue = drawProgress ?? fallbackProgress;

  const basePoints = [
    { x: 0, y: 36 },
    { x: 150, y: 28 },
    { x: 300, y: 32 },
    { x: 450, y: 25 },
    { x: 600, y: 20 },
    { x: 750, y: 16 },
    { x: 900, y: 12 },
    { x: 1050, y: 8 },
    { x: 1200, y: 4 },
  ];

  const generatePath = useCallback((pts: typeof basePoints) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q ${pts[i].x} ${pts[i].y}, ${xc} ${yc}`;
    }
    d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return d;
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const svgEl = svgRef.current;
    if (!svgEl) return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let time = 0;

    const animate = () => {
      time += 0.025;

      if (cursorX.current !== null && cursorDistY.current < 50) {
        targetX.current = cursorX.current;
        const proxFactor = Math.max(0, 1 - cursorDistY.current / 50);
        currentAmplitude.current = lerp(currentAmplitude.current, 9 * proxFactor, 0.12);
      } else {
        currentAmplitude.current = lerp(currentAmplitude.current, 0, 0.06);
      }

      if (currentX.current === null) {
        currentX.current = targetX.current;
      } else if (targetX.current !== null) {
        currentX.current = lerp(currentX.current, targetX.current, 0.12);
      }

      const distortedPoints = basePoints.map((pt, index) => {
        const idleWave = isTouch ? Math.sin(time * 0.55 + index * 0.6) * 0.7 : Math.sin(time + index * 0.6) * 1.2;

        if (currentX.current !== null && currentAmplitude.current > 0.05) {
          const distX = Math.abs(pt.x - currentX.current);
          const gaussian = Math.exp(-Math.pow(distX / 160, 2));
          const offsetY = -currentAmplitude.current * gaussian + idleWave;
          return { x: pt.x, y: pt.y + offsetY };
        }
        return { x: pt.x, y: pt.y + idleWave };
      });

      if (pathRef.current) {
        pathRef.current.setAttribute("d", generatePath(distortedPoints));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = svgEl.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) * (1200 / rect.width);
      const relativeY = Math.abs(e.clientY - (rect.top + rect.height / 2));

      cursorX.current = relativeX;
      cursorDistY.current = relativeY;
    };

    const handleMouseLeave = () => {
      cursorX.current = null;
      cursorDistY.current = 100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    svgEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      svgEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [generatePath]);

  return (
    <svg
      ref={svgRef}
      className={`${styles.wavyDivider} ${className}`}
      viewBox="0 0 1200 40"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        ref={pathRef}
        d="M 0 36 Q 150 28, 225 30 Q 300 32, 450 25 Q 600 20, 750 16 Q 900 12, 1050 8 T 1200 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: drawProgress ? pathLengthValue : undefined }}
        className={`${styles.wavyPath} ${isVisible && !drawProgress ? styles.drawIn : ""}`}
      />
    </svg>
  );
}
