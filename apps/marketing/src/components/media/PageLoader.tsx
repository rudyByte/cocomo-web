"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic noise particle array
    const particles: Array<{ x: number; y: number; size: number; speed: number; alpha: number }> = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animFrame: number;
    const draw = () => {
      ctx.fillStyle = "rgba(10, 14, 26, 0.2)"; // Deep Navy base
      ctx.fillRect(0, 0, width, height);

      // Draw faint grid noise
      ctx.save();
      ctx.strokeStyle = "rgba(47, 95, 224, 0.05)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Animate flowing noise particles
      ctx.fillStyle = "#2F5FE0"; // Electric Blue
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#2F5FE0";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    // SVG wordmark line-draw animation using GSAP
    const textEl = textRef.current;
    if (textEl) {
      gsap.fromTo(
        textEl,
        { strokeDasharray: 800, strokeDashoffset: 800, fill: "rgba(255, 255, 255, 0)" },
        {
          strokeDashoffset: 0,
          fill: "rgba(255, 255, 255, 1)",
          duration: 1.6,
          ease: "power2.inOut",
          onComplete: () => {
            // Trigger diagonal wipe away after wordmark completes drawing
            gsap.to(containerRef.current, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 0.95,
              ease: "power4.inOut",
              delay: 0.2,
              onComplete: () => {
                setActive(false);
              }
            });
          }
        }
      );
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0A0E1A", // Luxury deep navy background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Base polygon for wipe
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <svg width="420" height="80" viewBox="0 0 420 80" style={{ overflow: "visible" }}>
          <text
            ref={textRef}
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "38px",
              fontWeight: 800,
              letterSpacing: "4px",
              fill: "none",
              stroke: "#FFFFFF",
              strokeWidth: "1.2px",
            }}
          >
            COCOMO MEDIA
          </text>
        </svg>
      </div>
    </div>
  );
}
