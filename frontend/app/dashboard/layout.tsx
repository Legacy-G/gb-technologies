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
  ShieldCheck,
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
    job_title?: string;
    bio?: string;
    country?: string;
    phone_number?: string;
    profile_image_url?: string | null;
    kyc_status?: "unverified" | "pending" | "verified" | "rejected";
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
      // 1. Check local cache first for instant synchronous display
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("gb_user");
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch {}
        }
      }

      // 2. Fetch fresh user data from API endpoint
      try {
        const userData = await apiClient.get<UserProfile>("/users/me/");
        if (userData && (userData.username || userData.email)) {
          setUser(userData);
          if (typeof window !== "undefined") {
            localStorage.setItem("gb_user", JSON.stringify(userData));
          }
        }
      } catch {
        // Keep cached user if available
      }
    }
    loadUser();

    const handleUpdate = () => loadUser();
    window.addEventListener("gb_user_updated", handleUpdate);
    return () => window.removeEventListener("gb_user_updated", handleUpdate);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await apiClient.post("/auth/logout/");
    } catch {
      // Ignore network errors on logout
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("gb_user");
      }
      router.push("/auth/login");
    }
  };

  const displayName = user
    ? user.first_name
      ? `${user.first_name} ${user.last_name || ""}`.trim()
      : user.username
    : "Executive Partner";

  const initials = user
    ? user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : (user.first_name || user.username || "EP").slice(0, 2).toUpperCase()
    : "EP";

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

            <Link
              href="/dashboard?view=profile"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                currentView === "profile"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <ShieldCheck className={`h-3.5 w-3.5 ${
                user?.profile?.kyc_status === "verified"
                  ? "text-emerald-500"
                  : user?.profile?.kyc_status === "pending"
                  ? "text-amber-500"
                  : "text-[var(--accent-primary)]"
              }`} />
              <span>Identity &amp; KYC</span>
              <span className={`h-1.5 w-1.5 rounded-full ${
                user?.profile?.kyc_status === "verified"
                  ? "bg-emerald-500"
                  : user?.profile?.kyc_status === "pending"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-stone-400"
              }`} />
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

            {/* Interactive Executive User Pill */}
            <Link
              href="/dashboard?view=profile"
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all group"
              title={`${displayName} • ${user?.profile?.company || "Enterprise Client"} (Click to edit profile & KYC)`}
            >
              <div className="relative">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-amber-200 text-[var(--accent-foreground)] text-[10px] font-bold overflow-hidden">
                  {user?.profile?.profile_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profile.profile_image_url}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                {user?.profile?.kyc_status === "verified" && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-[var(--surface-raised)]" />
                )}
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors hidden sm:inline">
                {displayName}
              </span>
            </Link>

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
            {/* User Profile in Mobile Drawer */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-[var(--border-subtle)] mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-amber-200 text-[var(--accent-foreground)] text-xs font-bold">
                  {initials}
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">{displayName}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{user?.profile?.company || user?.email || "Enterprise Client"}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                disabled={signingOut}
                className="h-8 text-xs text-rose-500 hover:bg-rose-500/10 gap-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Button>
            </div>
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

            <Link
              href="/dashboard?view=profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold ${
                currentView === "profile"
                  ? "bg-[var(--text-primary)] text-[var(--canvas)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>🛡️ Identity &amp; KYC</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                user?.profile?.kyc_status === "verified"
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : user?.profile?.kyc_status === "pending"
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "bg-stone-500/20 text-stone-500"
              }`}>
                {user?.profile?.kyc_status || "Unverified"}
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
