"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Sparkles,
  LogOut,
  User,
  ShieldCheck,
  Activity,
  ExternalLink,
  ChevronDown,
  Building,
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [signingOut, setSigningOut] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadUser() {
      try {
        const userData = await apiClient.get<UserProfile>("/users/me/");
        setUser(userData);
      } catch {
        // Fallback default client
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
  const displayCompany = user?.profile?.company || "Vance Capital Partners";

  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] flex flex-col selection:bg-[var(--gold-primary)] selection:text-black">
      {/* Top Executive Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Brand + Portal Badge */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-secondary)] text-white shadow-md shadow-[var(--gold-glow)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black tracking-tight text-base text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors">
                    GB TECHNOLOGIES
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[var(--gold-primary)] uppercase">
                    Modernization Studio
                  </span>
                </div>
              </Link>

              <div className="hidden sm:block h-5 w-[1px] bg-[var(--border-subtle)]" />

              <div className="hidden sm:flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] py-0.5 px-2 bg-[var(--surface-raised)] border-[var(--gold-primary)]/30 text-[var(--gold-primary)] font-bold"
                >
                  Client Portal
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden md:inline font-mono text-[11px]">Production Edge</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-[var(--text-secondary)]">
              <Link
                href="/dashboard"
                className="text-[var(--gold-primary)] flex items-center gap-1.5"
              >
                <Activity className="h-3.5 w-3.5" />
                Modernization Hub
              </Link>
              <Link
                href="/#speed-checker"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
              >
                Speed &amp; Revenue Checker
              </Link>
              <Link
                href="/"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
              >
                Live Flagship
                <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
              </Link>
            </div>

            {/* Right: Actions, Theme, User Chip, Sign Out */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />

              {/* User Profile Pill */}
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] text-xs font-bold">
                  {displayName.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] leading-tight truncate max-w-[120px]">
                    {displayCompany}
                  </span>
                </div>
              </div>

              {/* Sign Out Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-xs text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/10 h-8 px-2.5"
                title="Sign out of Client Portal"
              >
                <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">
                  {signingOut ? "Exiting..." : "Sign Out"}
                </span>
              </Button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-[var(--text-muted)]">
                <Building className="h-3.5 w-3.5 text-[var(--gold-primary)]" />
                <span>Signed in as <strong className="text-[var(--text-primary)]">{displayName}</strong> ({displayCompany})</span>
              </div>
              <div className="flex flex-col gap-2 pt-2 text-sm font-medium">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-[var(--surface-raised)] text-[var(--gold-primary)] font-bold flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Modernization Hub
                </Link>
                <Link
                  href="/#speed-checker"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
                >
                  Speed &amp; Revenue Checker
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] flex items-center justify-between"
                >
                  <span>Live Flagship Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Executive Portal Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-canvas)] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--gold-primary)]" />
            <span>
              256-bit TLS Encrypted Client Portal • SOC 2 Type II Compliant Architecture
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} GB Technologies Ltd.</span>
            <span className="h-3 w-[1px] bg-[var(--border-subtle)]" />
            <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
              Enterprise Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
