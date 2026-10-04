import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "success" | "warning" | "destructive" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--surface-raised)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
    accent: "bg-[var(--accent-glow)] text-[var(--accent-primary)] border-[var(--accent-primary)]/30",
    success: "bg-emerald-500/10 text-[var(--status-success)] border-emerald-500/20",
    warning: "bg-amber-500/10 text-[var(--status-warning)] border-amber-500/20",
    destructive: "bg-rose-500/10 text-[var(--status-destructive)] border-rose-500/20",
    outline: "border-[var(--border-strong)] text-[var(--text-primary)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
