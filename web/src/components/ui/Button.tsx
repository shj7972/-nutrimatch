"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "active:scale-95",
        {
          "w-full": fullWidth,
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2.5 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
          "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg":
            variant === "primary",
          "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400":
            variant === "secondary",
          "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 focus:ring-slate-400":
            variant === "outline",
          "bg-transparent hover:bg-slate-50 text-slate-600 focus:ring-slate-400":
            variant === "ghost",
          "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500":
            variant === "danger",
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
