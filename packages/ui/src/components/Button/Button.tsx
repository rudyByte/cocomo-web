"use client";

import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "a";
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      as: Tag = "button",
      href,
      loading = false,
      icon,
      iconPosition = "right",
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.btn,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
      loading ? styles["btn--loading"] : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className={styles.btn__icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.btn__label}>{children}</span>
        {icon && iconPosition === "right" && (
          <span className={styles.btn__icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {loading && (
          <span className={styles.btn__spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="31.4"
                strokeDashoffset="10"
              />
            </svg>
          </span>
        )}
      </>
    );

    if (Tag === "a" && href) {
      return (
        <a href={href} className={classes} aria-disabled={disabled}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
