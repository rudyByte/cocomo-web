"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParallaxWatermark.module.css";

interface ParallaxWatermarkProps {
  text?: string;
}

export function ParallaxWatermark({ text = "COCOMO" }: ParallaxWatermarkProps) {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const scrollOffsetY = useRef<number>(0);
  const targetCursorOffset = useRef({ x: 0, y: 0 });
  const currentCursorOffset = useRef({ x: 0, y: 0 });
  const targetOpacity = useRef(0);
  const currentOpacity = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = watermarkRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentCursorOffset.current.x = lerp(currentCursorOffset.current.x, targetCursorOffset.current.x, 0.08);
      currentCursorOffset.current.y = lerp(currentCursorOffset.current.y, targetCursorOffset.current.y, 0.08);
      currentOpacity.current = lerp(currentOpacity.current, targetOpacity.current, 0.05);

      if (el) {
        const totalX = currentCursorOffset.current.x;
        const totalY = (prefersReducedMotion ? 0 : scrollOffsetY.current * 0.12) + currentCursorOffset.current.y;
        el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
        el.style.opacity = currentOpacity.current.toFixed(3);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleScroll = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
      scrollOffsetY.current = distanceFromCenter;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || isTouch) return;
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      if (e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200) {
        const sectionCenterX = rect.left + rect.width / 2;
        const sectionCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - sectionCenterX) / (rect.width / 2);
        const deltaY = (e.clientY - sectionCenterY) / (rect.height / 2);

        targetCursorOffset.current = {
          x: -deltaX * 12,
          y: -deltaY * 12,
        };
      }
    };

    const handleMouseLeave = () => {
      targetCursorOffset.current = { x: 0, y: 0 };
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        targetOpacity.current = entry.isIntersecting ? 0.09 : 0;
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.parentElement?.addEventListener("mouseleave", handleMouseLeave);
    handleScroll();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      el.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={watermarkRef} className={styles.watermark} aria-hidden="true">
      {text}
    </div>
  );
}
