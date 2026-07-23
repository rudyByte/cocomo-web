"use client";

import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "color"; // light = dark text/icon, dark = white text/icon, color = cobalt blue icon
  showText?: boolean;
  iconSize?: number;
  textSize?: string;
  spacing?: string;
  className?: string;
}

export function Logo({
  variant = "light",
  showText = true,
  iconSize = 32,
  textSize = "1.25rem",
  spacing = "0.75rem",
  className = "",
}: LogoProps) {
  // Determine colors based on variant
  const iconColor =
    variant === "color"
      ? "var(--clay)" // Cobalt Blue
      : variant === "dark"
      ? "#FAFAF7" // Luxury Off-white
      : "#0A162F"; // Rich Charcoal Ink

  const textColor =
    variant === "dark"
      ? "#FAFAF7"
      : "#0A162F";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing,
        userSelect: "none",
      }}
    >
      {/* Curved Ribbon C Globe Sphere Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <g style={{ fill: iconColor }}>
          {/* Vertical/Sweeping Ribbons forming the left sphere shell */}
          <path d="M43,8 C30,12 20,24 16,38 C14,45 14,55 16,62 C20,76 30,88 43,92 C37,84 31,70 31,50 C31,30 37,16 43,8 Z" />
          <path d="M54,4 C42,10 33,24 30,38 C28,45 28,55 30,62 C33,76 42,90 54,96 C48,86 42,70 42,50 C42,30 48,14 54,4 Z" />
          <path d="M65,1 C55,9 47,24 45,38 C43,45 43,55 45,62 C47,76 55,91 65,99 C59,88 54,70 54,50 C54,30 59,12 65,1 Z" />
          
          {/* Horizontal/Transverse Ribbons forming the bottom-right shell with C-gap */}
          <path d="M44,91 C58,95 72,93 83,86 C88,83 92,79 95,74 C91,72 85,71 78,71 C65,71 52,78 44,91 Z" />
          <path d="M38,78 C54,83 71,81 83,72 C89,68 93,63 96,57 C92,56 85,55 78,55 C63,55 48,64 38,78 Z" />
          <path d="M32,65 C50,71 68,69 82,58 C88,53 92,47 94,40 C90,40 83,40 76,40 C59,40 43,50 32,65 Z" />
        </g>
      </svg>

      {/* Sleek Geometric Sans-Serif Wordmark */}
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
            fontSize: textSize,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: textColor,
            lineHeight: 1,
          }}
        >
          Cocomo
        </span>
      )}
    </div>
  );
}
