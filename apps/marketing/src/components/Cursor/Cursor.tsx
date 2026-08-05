"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Cursor.module.css";

type CursorState = "default" | "hover" | "text" | "drag" | "hidden";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate the outer ring with lerp (trailing effect)
  const animate = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;

    // Lerp the ring toward the dot position
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

    ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("a, button, [data-cursor]");
      if (!closest) {
        const isText = target.closest("p, h1, h2, h3, h4, h5, h6, span, em, strong, blockquote");
        setState(isText ? "text" : "default");
        return;
      }

      const cursorAttr = (closest as HTMLElement).dataset.cursor;
      if (cursorAttr === "drag") setState("drag");
      else if (cursorAttr === "hidden") setState("hidden");
      else setState("hover");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onMouseOver, true);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onMouseOver, true);
    };
  }, [animate, isVisible, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        className={[
          styles.cursor__dot,
          styles[`cursor__dot--${state}`],
          !isVisible ? styles["cursor--hidden"] : "",
        ].join(" ")}
        aria-hidden="true"
      />
      {/* Outer ring — lags behind with lerp */}
      <div
        ref={ringRef}
        className={[
          styles.cursor__ring,
          styles[`cursor__ring--${state}`],
          !isVisible ? styles["cursor--hidden"] : "",
        ].join(" ")}
        aria-hidden="true"
      />
    </>
  );
}
