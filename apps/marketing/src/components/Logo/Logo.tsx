"use client";

import React from "react";

interface LogoProps {
  variant?: "light" | "dark"; // light = black logo on white/light bg, dark = white logo on dark bg
  showText?: boolean;
  iconSize?: number;
  textSize?: string;
  spacing?: string;
  className?: string;
}

export function Logo({
  variant = "light",
  showText = true,
  iconSize = 28,
  textSize = "1.2rem",
  spacing = "0.5rem",
  className = "",
}: LogoProps) {
  // If variant is dark, we invert the black logo to make it white/chrome.
  // Transparency is native to the PNG asset, so no mix-blend-mode is needed.
  const filterStyle = variant === "dark" ? "invert(1) brightness(1.1)" : "none";

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
      {/* Pure C Ribbon Globe Circle Icon (True transparent PNG) */}
      <img
        src="/logo-icon.png?v=3"
        alt="Cocomo Logo Icon"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          objectFit: "contain",
          filter: filterStyle,
          display: "block",
          flexShrink: 0,
        }}
      />

      {/* Styled geometric wordmark */}
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
            fontSize: textSize,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: variant === "dark" ? "#FAFAF7" : "#0A162F",
            lineHeight: 1,
          }}
        >
          Cocomo
        </span>
      )}
    </div>
  );
}
