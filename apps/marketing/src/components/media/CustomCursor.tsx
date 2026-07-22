"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Reset style defaults
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Context-sensitive hovers: expand cursor & overlay text
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for elements wanting hover indicator text
      const viewTrigger = target.closest("[data-hover-text]");
      if (viewTrigger) {
        const text = viewTrigger.getAttribute("data-hover-text") || "";
        setHoverText(text);
        setIsHovered(true);
        gsap.to(cursor, {
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: "#2F5FE0", // Electric Blue accent
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "power2.out"
        });
        return;
      }

      // Check for magnetic zones scale up
      if (target.closest("[data-magnetic]") || target.closest("a") || target.closest("button")) {
        gsap.to(cursor, {
          scale: 2.2,
          backgroundColor: "rgba(47, 95, 224, 0.4)",
          mixBlendMode: "difference",
          duration: 0.25
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const viewTrigger = target.closest("[data-hover-text]");
      if (viewTrigger) {
        setHoverText("");
        setIsHovered(false);
        gsap.to(cursor, {
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#2F5FE0",
          mixBlendMode: "difference",
          duration: 0.3,
          ease: "power2.out"
        });
      }

      if (target.closest("[data-magnetic]") || target.closest("a") || target.closest("button")) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#2F5FE0",
          mixBlendMode: "difference",
          duration: 0.25
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    // Magnetic Core Pull logic
    const magneticElements = document.querySelectorAll("[data-magnetic]");
    
    const applyMagneticEffect = (el: Element) => {
      const htmlEl = el as HTMLElement;
      
      const onMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        // Pull element towards cursor within radius
        const pullRadius = 80;
        if (distance < pullRadius) {
          const strength = 0.35; // displacement coefficient
          gsap.to(htmlEl, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Magnetically lock the cursor closer
          xTo(centerX + dx * 0.45);
          yTo(centerY + dy * 0.45);
        }
      };

      const onLeave = () => {
        gsap.to(htmlEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)"
        });
      };

      htmlEl.addEventListener("mousemove", onMove);
      htmlEl.addEventListener("mouseleave", onLeave);

      return () => {
        htmlEl.removeEventListener("mousemove", onMove);
        htmlEl.removeEventListener("mouseleave", onLeave);
      };
    };

    const cleanups = Array.from(magneticElements).map(applyMagneticEffect);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cleanups.forEach((cb) => cb());
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#2F5FE0", // Electric Blue accent
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transform: "translate3d(-50%, -50%, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontSize: "8px",
        fontWeight: "bold",
        letterSpacing: "0.08em",
        overflow: "hidden",
      }}
    >
      {isHovered && <span style={{ opacity: 1, transition: "opacity 0.25s" }}>{hoverText}</span>}
    </div>
  );
}
