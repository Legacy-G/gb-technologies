"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please provide both username and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.post("/auth/login/", { username, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.data?.message || err?.data?.detail || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setUsername("admin");
    setPassword("admin");
    setLoading(true);
    setError(null);

    try {
      await apiClient.post("/auth/login/", { username: "admin", password: "admin" });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.data?.message || "Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--canvas)]">
      {/* Soft Ambient Champagne Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent-glow)] blur-[140px] opacity-40"
      />

      {/* Top back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to GB Technologies</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Emblem */}
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-primary)] text-[var(--accent-foreground)] shadow-md transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="h-6 w-6" />
            </div>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <Badge variant="accent" className="gap-1.5 py-1 px-3 text-[11px] font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>Secure Enterprise Gateway</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Client Portal Login
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            Access your live engineering pipeline, Core Web Vitals telemetry, and project milestones.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl space-y-6">
          {/* Quick Demo Access Callout */}
          <div className="rounded-xl bg-[var(--surface-raised)] p-4 border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                <span>Instant Evaluation Access</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold">
                1-Click
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Explore the live client portal with pre-loaded leads and Core Web Vitals telemetry.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleQuickDemo}
              disabled={loading}
              className="w-full text-xs font-bold border-[var(--border-gold)] hover:bg-[var(--accent-primary)]/10"
            >
              <span>⚡ Quick Demo Sign In</span>
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[var(--border-subtle)]" />
            <span className="absolute bg-[var(--surface-base)] px-3 text-[11px] font-semibold text-[var(--text-muted)] uppercase">
              Or Sign In With Account
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                Username or Client Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted)]">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  type="text"
                  placeholder="admin or executive@acmecorp.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9 h-11 text-sm bg-[var(--surface-base)] border-[var(--border-strong)]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Password
                </label>
                <span className="text-[11px] text-[var(--text-muted)]">
                  (Default demo: <code className="text-[var(--accent-primary)]">admin</code>)
                </span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted)]">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-11 text-sm bg-[var(--surface-base)] border-[var(--border-strong)]"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="glow"
                size="lg"
                disabled={loading}
                className="w-full h-11 font-bold gap-2 text-sm shadow-md"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Client Portal"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Help link */}
          <div className="pt-2 text-center text-xs text-[var(--text-muted)]">
            <span>Need enterprise SSO provisioning? </span>
            <Link href="/#audit" className="text-[var(--accent-primary)] hover:underline font-semibold">
              Contact Engineering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
