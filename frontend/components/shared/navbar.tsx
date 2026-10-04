"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-champagne transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Signature Emblem */}
        <Link
          href="/"
          className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-md group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              GB <span className="text-[var(--accent-primary)] font-extrabold">Technologies</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold hidden sm:inline">
              Digital Flagships & Web Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/#capabilities" className="transition-colors hover:text-[var(--text-primary)]">
            Capabilities
          </Link>
          <Link href="/#roi-gap" className="transition-colors hover:text-[var(--text-primary)]">
            The Speed Gap
          </Link>
          <Link href="/#speed-checker" className="transition-colors hover:text-[var(--text-primary)] text-[var(--accent-primary)] font-semibold">
            Speed Diagnostic
          </Link>
          <Link href="/#calculator" className="transition-colors hover:text-[var(--text-primary)]">
            ROI Calculator
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Client Portal
            </Button>
          </Link>
          <Link href="/#audit">
            <Button variant="glow" size="sm" className="gap-1.5 font-semibold">
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--surface-base)] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2 pb-3">
            <Link
              href="/#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              Capabilities
            </Link>
            <Link
              href="/#roi-gap"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              The Speed Gap
            </Link>
            <Link
              href="/#speed-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--accent-primary)] hover:bg-[var(--surface-raised)] font-bold"
            >
              Speed Diagnostic
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              ROI Calculator
            </Link>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Client Portal
              </Button>
            </Link>
            <Link href="/#audit" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" className="w-full font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
