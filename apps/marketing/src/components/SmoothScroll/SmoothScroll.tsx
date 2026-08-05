/**
 * SmoothScroll.tsx
 * Lenis smooth scroll provider — synced with GSAP ticker.
 * Wrap your app in this to get physics-based momentum scrolling.
 */
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker so ScrollTrigger stays perfectly in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Also update ScrollTrigger on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Store instance on window for access from other components
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Utility hook — get lenis instance in child components */
export function useLenis() {
  if (typeof window === "undefined") return null;
  return (window as unknown as Record<string, unknown>).__lenis as Lenis | null;
}
