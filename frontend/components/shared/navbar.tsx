"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Layers, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)] shadow-md">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            GB <span className="text-[var(--accent-primary)]">Technologies</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/#services" className="transition-colors hover:text-[var(--text-primary)]">
            Services
          </Link>
          <Link href="/#modernization" className="transition-colors hover:text-[var(--text-primary)]">
            Modernization
          </Link>
          <Link href="/#impact" className="transition-colors hover:text-[var(--text-primary)]">
            Enterprise Impact
          </Link>
          <Link href="/#methodology" className="transition-colors hover:text-[var(--text-primary)]">
            Methodology
          </Link>
        </nav>

        {/* Right CTA / Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Client Portal
            </Button>
          </Link>
          <Link href="/#briefing">
            <Button variant="glow" size="sm" className="gap-1.5">
              <span>Executive Briefing</span>
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
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              Services
            </Link>
            <Link
              href="/#modernization"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              Modernization
            </Link>
            <Link
              href="/#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              Enterprise Impact
            </Link>
            <Link
              href="/#methodology"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            >
              Methodology
            </Link>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Client Portal
              </Button>
            </Link>
            <Link href="/#briefing" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" className="w-full">
                Schedule Executive Briefing
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
