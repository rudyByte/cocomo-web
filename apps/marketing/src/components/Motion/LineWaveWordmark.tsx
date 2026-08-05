"use client";

import React, { useEffect, useId, useRef } from "react";
import styles from "./LineWaveWordmark.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

export function LineWaveWordmark({
  text = "COCOMO",
  placement = "curtain",
}: {
  text?: string;
  placement?: "curtain" | "footer";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const maskId = useId().replace(/:/g, "");
  const lineYs = Array.from({ length: 54 }, (_, index) => 24 + index * 6);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const scope = canvas.closest("footer") ?? canvas.closest("[aria-label='Footer transition']") ?? parent;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, tActive: 0 };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const emitFog = (x: number, y: number) => {
      if (prefersReducedMotion || particles.length > 120) return;
      for (let i = 0; i < 3; i += 1) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.55) * 1.1,
          life: 1,
          size: 38 + Math.random() * 84,
        });
      }
    };

    const drawWord = () => {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `900 ${Math.min(width / 3.55, height * 0.58)}px Inter, Arial, sans-serif`;
      (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "-0.08em";
      ctx.fillText(text, width * 0.5, height * 0.57);
      ctx.globalCompositeOperation = "source-in";

      const lineGap = Math.max(6, height / 92);
      const centerX = pointer.x;
      const centerY = pointer.y;
      for (let y = height * 0.18; y < height * 0.92; y += lineGap) {
        const dy = y - centerY;
        const proximityY = Math.exp(-(dy * dy) / 18000) * pointer.active;
        const wave = Math.sin(time * 0.035 + y * 0.055) * (1.6 + proximityY * 7);
        const gap = proximityY * 54;
        const alpha = 0.34 + Math.sin(time * 0.018 + y * 0.028) * 0.06;

        ctx.strokeStyle = `rgba(215, 229, 255, ${alpha})`;
        ctx.lineWidth = 1.15;
        ctx.beginPath();

        if (pointer.active > 0.02 && Math.abs(dy) < 150) {
          ctx.moveTo(width * 0.04, y + wave);
          ctx.lineTo(Math.max(width * 0.04, centerX - gap), y + wave * 0.35);
          ctx.moveTo(Math.min(width * 0.96, centerX + gap), y - wave * 0.25);
          ctx.lineTo(width * 0.96, y + wave);
        } else {
          ctx.moveTo(width * 0.04, y + wave);
          ctx.lineTo(width * 0.96, y - wave * 0.25);
        }

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFog = () => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.965;
        p.size *= 1.012;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(210, 225, 255, ${0.08 * p.life})`);
        gradient.addColorStop(0.42, `rgba(160, 175, 205, ${0.055 * p.life})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life < 0.025) particles.splice(i, 1);
      }
      ctx.restore();
    };

    const render = () => {
      time += prefersReducedMotion ? 0 : 1;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.active += (pointer.tActive - pointer.active) * 0.075;

      drawWord();
      drawFog();
      rafRef.current = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.tActive = 1;
      emitFog(pointer.tx, pointer.ty);
    };

    const leave = () => {
      pointer.tActive = 0;
    };

    resize();
    render();
    window.addEventListener("resize", resize, { passive: true });
    scope.addEventListener("pointermove", move, { passive: true });
    scope.addEventListener("pointerleave", leave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      scope.removeEventListener("pointermove", move);
      scope.removeEventListener("pointerleave", leave);
    };
  }, [text]);

  return (
    <div className={`${styles.wrap} ${placement === "footer" ? styles.footerPlacement : ""}`} aria-hidden="true">
      <svg className={styles.svgText} viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id={maskId}>
            <rect width="1200" height="360" fill="black" />
            <text
              x="600"
              y="218"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              className={styles.maskText}
            >
              {text}
            </text>
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          {lineYs.map((y, index) => (
            <line
              key={y}
              x1={20 + (index % 3) * 8}
              x2={1180 - (index % 4) * 11}
              y1={y}
              y2={y + Math.sin(index * 0.7) * 2}
              className={styles.maskLine}
            />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
