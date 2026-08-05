/**
 * ScrollReveal.tsx
 * Trionn-style scroll-triggered reveal for sections/elements.
 *
 * Wraps children and uses GSAP ScrollTrigger to animate them in
 * as they enter the viewport. Supports multiple reveal types.
 *
 * Usage:
 *   <ScrollReveal type="fade-up">
 *     <h2>Your content</h2>
 *   </ScrollReveal>
 *
 *   <ScrollReveal type="stagger" staggerChildren=".my-item">
 *     <div className="my-item">Item 1</div>
 *     <div className="my-item">Item 2</div>
 *   </ScrollReveal>
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "stagger" | "clip-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  type?: RevealType;
  /** CSS selector for children to stagger (only for type="stagger") */
  staggerChildren?: string;
  /** Stagger amount in seconds */
  stagger?: number;
  /** Delay before animation starts (after trigger) */
  delay?: number;
  /** Duration of the animation */
  duration?: number;
  /** GSAP ease string */
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  className?: string;
  /** Only animate once */
  once?: boolean;
}

export function ScrollReveal({
  children,
  type = "fade-up",
  staggerChildren,
  stagger = 0.08,
  delay = 0,
  duration = 0.85,
  ease = "power3.out",
  start = "top 85%",
  className,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targets: Element | Element[] = el;

    if (type === "stagger" && staggerChildren) {
      targets = Array.from(el.querySelectorAll(staggerChildren));
      if (!(targets as Element[]).length) targets = el;
    }

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration,
      ease,
      delay,
      stagger: type === "stagger" ? stagger : 0,
    };

    switch (type) {
      case "fade-up":
        fromVars = { opacity: 0, y: 40 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "fade-in":
        fromVars = { opacity: 0 };
        toVars = { ...toVars, opacity: 1 };
        break;
      case "slide-left":
        fromVars = { opacity: 0, x: 60 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "slide-right":
        fromVars = { opacity: 0, x: -60 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "stagger":
        fromVars = { opacity: 0, y: 30 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "clip-up":
        // Clip-path reveal from bottom (premium cinematic effect)
        fromVars = { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 };
        toVars = { ...toVars, clipPath: "inset(0% 0% 0% 0%)", ease: "power4.out" };
        break;
    }

    gsap.set(targets as gsap.TweenTarget, fromVars);

    const anim = gsap.to(targets as gsap.TweenTarget, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [type, staggerChildren, stagger, delay, duration, ease, start, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
