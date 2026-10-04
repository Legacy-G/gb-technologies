"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Sparkles,
  LogOut,
  ExternalLink,
  Activity,
  Layers,
  Users,
  Menu,
  X,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface UserProfile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile?: {
    company?: string;
    country?: string;
    phone_number?: string;
  };
}

function DashboardHeaderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "crextio";

  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [signingOut, setSigningOut] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadUser() {
      try {
        const userData = await apiClient.get<UserProfile>("/users/me/");
        setUser(userData);
      } catch {
        setUser({
          username: "executive_client",
          email: "executive@vancecapital.com",
          first_name: "Marcus",
          last_name: "Vance",
          profile: {
            company: "Vance Capital Partners",
          },
        });
      }
    }
    loadUser();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await apiClient.post("/auth/logout/");
    } catch {
      // Ignore network errors on logout
    } finally {
      router.push("/auth/login");
    }
  };

  const displayName = user?.first_name ? `${user.first_name} ${user.last_name}` : "Marcus Vance";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--canvas)]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* =================================================================== */}
          {/* GROUP 1 (LEFT): BRAND IDENTITY & STATUS                             */}
          {/* =================================================================== */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-amber-400 text-[var(--accent-foreground)] shadow-md shadow-[var(--accent-glow)] font-bold transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black tracking-tight text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  GB TECHNOLOGIES
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[var(--accent-primary)] uppercase font-bold">
                  Client Hub
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Edge</span>
            </span>
          </div>

          {/* =================================================================== */}
          {/* GROUP 2 (CENTER): CREXTIO / FUNDVIEW SEGMENTED CAPSULE NAV         */}
          {/* =================================================================== */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] shadow-xs">
            <Link
              href="/dashboard?view=crextio"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                currentView === "crextio"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Executive Hub</span>
            </Link>

            <Link
              href="/dashboard?view=fundview"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                currentView === "fundview"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Activity className="h-3.5 w-3.5 text-emerald-500" />
              <span>Telemetry &amp; Graphs</span>
            </Link>

            <Link
              href="/dashboard?view=leads"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                currentView === "leads"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Users className="h-3.5 w-3.5 text-amber-500" />
              <span>Inbound Leads</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold">
                18
              </span>
            </Link>

            <Link
              href="/dashboard?view=milestones"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                currentView === "milestones"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-cyan-500" />
              <span>Roadmap</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                85%
              </span>
            </Link>
          </nav>

          {/* =================================================================== */}
          {/* GROUP 3 (RIGHT): EXECUTIVE UTILITIES & PROFILE                      */}
          {/* =================================================================== */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Discrete Flagship Site Link */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
              title="Return to public marketing flagship"
            >
              <span>Live Flagship</span>
              <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
            </Link>

            {/* Dark / Light Mode Switcher */}
            <ThemeToggle />

            {/* Compact Executive User Pill */}
            <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-amber-200 text-[var(--accent-foreground)] text-[11px] font-bold">
                {displayName.charAt(0)}
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)] hidden sm:inline">
                {displayName}
              </span>
            </div>

            {/* Sign Out Action */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              disabled={signingOut}
              className="h-8 w-8 p-0 rounded-full text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Sign out of Client Portal"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-subtle)] space-y-2">
            <Link
              href="/dashboard?view=crextio"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                currentView === "crextio"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>✦ Executive Hub</span>
            </Link>

            <Link
              href="/dashboard?view=fundview"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                currentView === "fundview"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <Activity className="h-4 w-4 text-emerald-500" />
              <span>📊 Telemetry &amp; Graphs</span>
            </Link>

            <Link
              href="/dashboard?view=leads"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                currentView === "leads"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-500" />
                <span>⚡ Inbound Leads</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold">
                18
              </span>
            </Link>

            <Link
              href="/dashboard?view=milestones"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                currentView === "milestones"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-500" />
                <span>🗺️ Roadmap</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                85%
              </span>
            </Link>

            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]"
              >
                <span>Live Flagship Site</span>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--canvas)] flex flex-col selection:bg-[var(--accent-primary)] selection:text-[var(--accent-foreground)]">
      {/* Top Executive Navigation Bar with Suspense for safe search params access */}
      <React.Suspense fallback={<div className="h-16 w-full border-b border-[var(--border-subtle)] bg-[var(--canvas)]" />}>
        <DashboardHeaderContent />
      </React.Suspense>

      {/* Main Dashboard Workspace (Zero Bottom Footer) */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
