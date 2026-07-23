"use client";

import React from "react";

interface LogoProps {
  variant?: "light" | "dark"; // light = dark logo on white/light bg, dark = silver/white logo on dark bg
  layout?: "horizontal" | "vertical";
  showText?: boolean;
  iconSize?: number; // for horizontal layout
  textSize?: string;
  spacing?: string;
  className?: string;
  size?: number; // for vertical layout
}

export function Logo({
  variant = "light",
  layout = "horizontal",
  showText = true,
  iconSize = 30,
  textSize = "1.2rem",
  spacing = "0.6rem",
  className = "",
  size = 140,
}: LogoProps) {
  const imgSrc = variant === "dark" ? "/logo-dark-bg.png" : "/logo-light-bg.png";
  const blendMode = variant === "dark" ? "screen" : "multiply";

  if (layout === "vertical") {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${size}px`,
          userSelect: "none",
        }}
      >
        <img
          src={imgSrc}
          alt="Cocomo Logo"
          style={{
            width: "100%",
            height: "auto",
            mixBlendMode: blendMode,
            display: "block",
          }}
        />
      </div>
    );
  }

  // Horizontal layout: Crop the exact circle icon from the reference image, and pair it with a geometric wordmark
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
      {/* Cropped exact glossy 3D C Ribbon circle icon */}
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          position: "relative",
          overflow: "hidden",
          display: "inline-block",
          flexShrink: 0,
        }}
      >
        <img
          src={imgSrc}
          alt="Cocomo Logo Icon"
          style={{
            position: "absolute",
            top: "-6%", // Focus precisely on the ribbon sphere, hiding the text
            left: "50%",
            transform: "translateX(-50%)",
            height: "140%", // Clip the bottom 30% text
            width: "auto",
            maxWidth: "none",
            mixBlendMode: blendMode,
          }}
        />
      </div>

      {/* Styled geometric wordmark to match the inspo font */}
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
