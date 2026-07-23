"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
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
            <img
              src="/logo-icon.png?v=3"
              alt="Cocomo Logo Icon"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
                display: "block",
                flexShrink: 0
              }}
            />
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
