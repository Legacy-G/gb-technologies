import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[var(--accent-primary)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-sm hover:shadow",
      glow:
        "bg-[var(--accent-primary)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-[0_0_24px_var(--accent-glow)] hover:shadow-[0_0_36px_var(--accent-glow)]",
      secondary:
        "bg-[var(--surface-raised)] text-[var(--text-primary)] hover:bg-[var(--surface-overlay)] border border-[var(--border-subtle)]",
      outline:
        "border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-raised)]",
      ghost:
        "text-[var(--text-primary)] hover:bg-[var(--surface-raised)]",
      destructive:
        "bg-[var(--status-destructive)] text-white hover:opacity-90 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
