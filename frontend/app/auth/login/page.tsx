"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Lock,
  User,
  Mail,
  Building,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  UserPlus,
  LogIn,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

function AuthFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = React.useState<"login" | "register">(initialMode);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Login form fields
  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  // Registration form fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [regUsername, setRegUsername] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = React.useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setError("Please provide both username and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post<any>("/auth/login/", {
        username: loginUsername.trim(),
        password: loginPassword,
      });

      if (res?.user && typeof window !== "undefined") {
        localStorage.setItem("gb_user", JSON.stringify(res.user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.data?.detail ||
          "Authentication failed. Please verify credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regUsername.trim() || !regEmail.trim() || !regPassword) {
      setError("Please complete all required fields (username, email, password).");
      return;
    }

    if (regPassword !== regPasswordConfirm) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (regPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post<any>("/auth/register/", {
        username: regUsername.trim(),
        email: regEmail.trim(),
        password: regPassword,
        password_confirm: regPasswordConfirm,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company: company.trim(),
      });

      if (res?.user && typeof window !== "undefined") {
        localStorage.setItem("gb_user", JSON.stringify(res.user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      let msg = "Registration failed. Please try again.";
      if (err?.data) {
        if (typeof err.data === "string") msg = err.data;
        else if (err.data.message) msg = err.data.message;
        else if (err.data.detail) msg = err.data.detail;
        else {
          const firstKey = Object.keys(err.data)[0];
          if (firstKey) {
            const val = err.data[firstKey];
            msg = `${firstKey}: ${Array.isArray(val) ? val.join(" ") : val}`;
          }
        }
      }
      setError(msg);
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-heading">
            {mode === "login" ? "Client Portal Sign In" : "Register Enterprise Account"}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            {mode === "login"
              ? "Access your live engineering pipeline, Core Web Vitals telemetry, and project milestones."
              : "Provision your client hub profile to monitor live deployments and track sprint milestones."}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl space-y-6">
          {/* Executive Mode Toggle Capsule Bar */}
          <div className="flex items-center rounded-full bg-[var(--surface-raised)] p-1 border border-[var(--border-subtle)] text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all focus:outline-none ${
                mode === "login"
                  ? "bg-[var(--surface-base)] text-[var(--text-primary)] font-bold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <LogIn className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all focus:outline-none ${
                mode === "register"
                  ? "bg-[var(--surface-base)] text-[var(--text-primary)] font-bold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <UserPlus className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Register Account</span>
            </button>
          </div>

          {/* Error Message with Registration / Login Quick Switch Prompts */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
              {mode === "login" && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError(null);
                    }}
                    className="text-xs font-bold text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Unregistered account? Register here</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
              {mode === "register" && error.toLowerCase().includes("already exists") && (
                <div className="pt-1.5 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      const prefill = regEmail || regUsername;
                      if (prefill) {
                        setLoginUsername(prefill);
                      }
                      setMode("login");
                      setError(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-base)] border border-[var(--border-gold)] text-xs font-bold text-[var(--accent-primary)] hover:bg-[var(--surface-raised)] transition-colors shadow-xs"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Account already exists — Sign in with {regEmail || regUsername || "this account"} &rarr;</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* 1. SIGN IN FORM                                                 */}
          {/* =============================================================== */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Username or Work Email
                </label>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                    <User className="h-4 w-4" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter registered username or work email"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    autoComplete="username"
                    className="pl-10 h-11 text-sm bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Password
                  </label>
                </div>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pl-10 h-11 text-sm bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
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
                  className="w-full h-11 font-bold gap-2 text-sm shadow-md rounded-xl"
                >
                  <span>{loading ? "Authenticating..." : "Sign In to Client Portal"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* =============================================================== */}
          {/* 2. REGISTRATION FORM                                            */}
          {/* =============================================================== */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Sarah"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    className="h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Connor"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Company / Organization
                </label>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                    <Building className="h-3.5 w-3.5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Cyberdyne Systems or Vance Capital"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    className="pl-10 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="sconnor"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      autoComplete="username"
                      className="pl-10 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Work Email
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="sarah@cyberdyne.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      autoComplete="email"
                      className="pl-10 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      autoComplete="new-password"
                      className="pl-10 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={regPasswordConfirm}
                      onChange={(e) => setRegPasswordConfirm(e.target.value)}
                      autoComplete="new-password"
                      className="pl-10 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  disabled={loading}
                  className="w-full h-11 font-bold gap-2 text-sm shadow-md rounded-xl"
                >
                  <span>{loading ? "Creating Account..." : "Create Account & Enter Portal"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Help link */}
          <div className="pt-2 text-center text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
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

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-[var(--text-muted)] font-mono">Loading authentication portal...</div>}>
      <AuthFormContent />
    </React.Suspense>
  );
}
