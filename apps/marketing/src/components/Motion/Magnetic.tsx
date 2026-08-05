"use client";

import React, { useEffect, useRef, useState } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // max offset in px
  radius?: number; // proximity radius in px
  className?: string;
}

export function Magnetic({ children, strength = 12, radius = 50, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0, scale: 1 });
  const currentPos = useRef({ x: 0, y: 0, scale: 1 });
  const rafRef = useRef<number | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Check reduced motion & touch
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);
      currentPos.current.scale = lerp(currentPos.current.scale, targetPos.current.scale, 0.18);

      if (el) {
        el.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0) scale(${currentPos.current.scale.toFixed(3)})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDistance = Math.max(rect.width, rect.height) / 2 + radius;

      if (dist < maxDistance) {
        // Compute magnetic offset
        const deltaX = (e.clientX - centerX) / maxDistance;
        const deltaY = (e.clientY - centerY) / maxDistance;
        targetPos.current.x = deltaX * strength;
        targetPos.current.y = deltaY * strength;
        targetPos.current.scale = isPressed ? 0.97 : 1.03;
      } else {
        targetPos.current.x = 0;
        targetPos.current.y = 0;
        targetPos.current.scale = 1;
      }
    };

    const handleMouseLeave = () => {
      targetPos.current = { x: 0, y: 0, scale: 1 };
    };

    const handleMouseDown = () => {
      setIsPressed(true);
      targetPos.current.scale = 0.97;
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      targetPos.current.scale = 1.03;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [strength, radius, isPressed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
