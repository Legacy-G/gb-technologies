import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "flex h-10 w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-200 outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--status-destructive)] focus:border-[var(--status-destructive)] focus:ring-[var(--status-destructive)]",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[var(--status-destructive)] font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
