"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Atmosphere.module.css";

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  vx: number;
  vy: number;
  sineOffset: number;
  sineSpeed: number;
}

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const cursorTarget = useRef({ x: 0, y: 0, active: 0 });
  const cursorCurrent = useRef({ x: 0, y: 0, active: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scope = canvas.closest("footer") as HTMLElement | null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || 400;

    const sizeCanvas = () => {
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    sizeCanvas();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      sizeCanvas();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const particleCount = window.matchMedia("(pointer: coarse)").matches ? 18 : 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.9 + 0.9,
        alpha: Math.random() * 0.2 + 0.08,
        targetAlpha: Math.random() * 0.24 + 0.1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05, // Float gently upward
        sineOffset: Math.random() * Math.PI * 2,
        sineSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let time = 0;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      cursorCurrent.current.x = lerp(cursorCurrent.current.x, cursorTarget.current.x, 0.045);
      cursorCurrent.current.y = lerp(cursorCurrent.current.y, cursorTarget.current.y, 0.045);
      cursorCurrent.current.active = lerp(cursorCurrent.current.active, cursorTarget.current.active, 0.06);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.sineOffset += p.sineSpeed;
        const pullX = (cursorCurrent.current.x - p.x) / Math.max(width, 1);
        const pullY = (cursorCurrent.current.y - p.y) / Math.max(height, 1);
        p.x += p.vx + Math.sin(p.sineOffset) * 0.18 - pullX * cursorCurrent.current.active * 0.22;
        p.y += p.vy - pullY * cursorCurrent.current.active * 0.12;
        p.alpha = lerp(p.alpha, p.targetAlpha, 0.015);

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
        ctx.shadowColor = "rgba(37, 99, 235, 0.18)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    const handlePointerMove = (e: MouseEvent) => {
      if (!scope) return;
      const rect = scope.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        cursorTarget.current.active = 0;
        return;
      }

      cursorTarget.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: 1,
      };
    };

    const handlePointerLeave = () => {
      cursorTarget.current.active = 0;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    scope?.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      scope?.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.ambientGlow} />
      <canvas ref={canvasRef} className={styles.particleCanvas} />
    </div>
  );
}
