"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide entire loader up to reveal page
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: () => {
              setActive(false);
            }
          });
        }
      });

      // Reset transforms
      gsap.set([word1Ref.current, word2Ref.current], { yPercent: 100 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Staggered slide up reveal
      tl.to(word1Ref.current, {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out"
      })
      .to(word2Ref.current, {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out"
      }, "-=0.6")
      // Expand dynamic accent line
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.inOut"
      }, "-=0.5")
      // Brief aesthetic pause
      .to({}, { duration: 0.35 });
    });

    return () => ctx.revert();
  }, []);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#FAFAF7", // Warm cream backdrop (var(--paper))
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        {/* Typographic Mask */}
        <div style={{ overflow: "hidden", display: "flex", alignItems: "center", gap: "10px" }}>
          {/* C Ribbon Globe Icon */}
          <div ref={word1Ref} style={{ display: "flex", alignItems: "center" }}>
            <svg
              width={36}
              height={36}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "#0A162F" }}
            >
              <path d="M43,8 C30,12 20,24 16,38 C14,45 14,55 16,62 C20,76 30,88 43,92 C37,84 31,70 31,50 C31,30 37,16 43,8 Z" />
              <path d="M54,4 C42,10 33,24 30,38 C28,45 28,55 30,62 C33,76 42,90 54,96 C48,86 42,70 42,50 C42,30 48,14 54,4 Z" />
              <path d="M65,1 C55,9 47,24 45,38 C43,45 43,55 45,62 C47,76 55,91 65,99 C59,88 54,70 54,50 C54,30 59,12 65,1 Z" />
              <path d="M44,91 C58,95 72,93 83,86 C88,83 92,79 95,74 C91,72 85,71 78,71 C65,71 52,78 44,91 Z" />
              <path d="M38,78 C54,83 71,81 83,72 C89,68 93,63 96,57 C92,56 85,55 78,55 C63,55 48,64 38,78 Z" />
              <path d="M32,65 C50,71 68,69 82,58 C88,53 92,47 94,40 C90,40 83,40 76,40 C59,40 43,50 32,65 Z" />
            </svg>
          </div>
          
          {/* Wordmark Text */}
          <div ref={word2Ref} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0A162F",
                lineHeight: 1
              }}
            >
              Cocomo
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px",
                fontWeight: 600,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                lineHeight: 1
              }}
            >
              Media
            </span>
          </div>
        </div>
        
        {/* Sleek divider line */}
        <div
          ref={lineRef}
          style={{
            width: "64px",
            height: "1.5px",
            background: "#2563EB",
            transformOrigin: "center"
          }}
        />
      </div>
    </div>
  );
}
