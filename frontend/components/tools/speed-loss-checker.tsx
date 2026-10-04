"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Globe,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface DiagnosticResult {
  id: number;
  url: string;
  monthly_visitors: number;
  average_deal_value: number;
  conversion_rate: number;
  metrics: {
    measured_fcp: number;
    measured_lcp: number;
    lighthouse_score: number;
    mobile_bounce_rate: number;
  };
  financial_impact: {
    annual_current_revenue: number;
    annual_revenue_lost: number;
    annual_recoverable_revenue: number;
    projected_conversion_lift: number;
  };
  decoupled_projection: {
    projected_fcp: number;
    projected_lcp: number;
    projected_lighthouse: number;
    stack: string;
  };
}

interface SpeedLossCheckerProps {
  onClaimBlueprint?: (data: { url: string; lostRevenue: number; recoverableRevenue: number; fcp: number }) => void;
}

export function SpeedLossChecker({ onClaimBlueprint }: SpeedLossCheckerProps) {
  const [url, setUrl] = React.useState("");
  const [businessType, setBusinessType] = React.useState<"saas" | "services" | "ecommerce">("saas");
  const [monthlyVisitors, setMonthlyVisitors] = React.useState(50000);
  const [averageDealValue, setAverageDealValue] = React.useState(500);
  const [conversionRate, setConversionRate] = React.useState(2.0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [progressStep, setProgressStep] = React.useState(0);
  const [progressMessage, setProgressMessage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<DiagnosticResult | null>(null);

  // Business model presets
  const applyPreset = (type: "saas" | "services" | "ecommerce") => {
    setBusinessType(type);
    if (type === "saas") {
      setMonthlyVisitors(45000);
      setAverageDealValue(1200);
      setConversionRate(2.0);
    } else if (type === "services") {
      setMonthlyVisitors(18000);
      setAverageDealValue(4500);
      setConversionRate(1.5);
    } else if (type === "ecommerce") {
      setMonthlyVisitors(110000);
      setAverageDealValue(180);
      setConversionRate(2.8);
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid website URL (e.g. acmecorp.com)");
      return;
    }

    setError(null);
    setLoading(true);
    setProgressStep(1);
    setProgressMessage("Resolving DNS and measuring Time to First Byte (TTFB)...");

    const timer1 = setTimeout(() => {
      setProgressStep(2);
      setProgressMessage("Analyzing mobile First Contentful Paint (FCP) & Core Web Vitals...");
    }, 1200);

    const timer2 = setTimeout(() => {
      setProgressStep(3);
      setProgressMessage("Benchmarking mobile visitor abandonment & annual revenue leakage...");
    }, 2400);

    try {
      const response = await apiClient.post<DiagnosticResult>("/api/v1/audit/speed-loss/", {
        url: url.trim(),
        monthly_visitors: monthlyVisitors,
        average_deal_value: averageDealValue,
        conversion_rate: conversionRate,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      setResult(response);
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setError(err?.response?.data?.url?.[0] || err?.message || "Failed to analyze target website. Please check the URL and try again.");
    } finally {
      setLoading(false);
      setProgressStep(0);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleClaim = () => {
    if (result && onClaimBlueprint) {
      onClaimBlueprint({
        url: result.url,
        lostRevenue: result.financial_impact.annual_revenue_lost,
        recoverableRevenue: result.financial_impact.annual_recoverable_revenue,
        fcp: result.metrics.measured_fcp,
      });
    } else {
      const target = document.getElementById("audit");
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[var(--border-gold)] shadow-xl relative overflow-hidden">
        {/* Soft gold ambient spotlight behind card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[350px] rounded-full bg-[var(--accent-glow)] blur-[140px] opacity-40"
        />

        {/* Header */}
        <div className="relative text-center max-w-2xl mx-auto space-y-3 mb-8">
          <Badge variant="accent" className="gap-1.5 py-1 px-3 text-xs font-semibold shadow-xs">
            <Zap className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>Live Interactive Client Tool</span>
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Live Website Speed &amp; Revenue Loss Diagnostic
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Enter any company URL. We run a live mobile speed diagnostic to calculate the hidden revenue your current website leaks to mobile bounce latency.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* STATE 1: INPUT FORM                                                 */}
        {/* ------------------------------------------------------------------- */}
        {!result && !loading && (
          <form onSubmit={handleRunAudit} className="space-y-6 max-w-3xl mx-auto">
            {/* URL input bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]">
                  <Globe className="h-4 w-4" />
                </div>
                <Input
                  type="text"
                  placeholder="e.g. acmecorp.com or https://company.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12 text-sm sm:text-base border-[var(--border-strong)] bg-[var(--surface-base)]"
                  required
                />
              </div>
              <Button type="submit" variant="glow" size="lg" className="h-12 px-6 font-bold gap-2 shrink-0">
                <span>Run Live Speed Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
                <span>Industry Profile Preset:</span>
                <div className="inline-flex rounded-lg p-0.5 bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => applyPreset("saas")}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      businessType === "saas"
                        ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold shadow-xs"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    B2B SaaS
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset("services")}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      businessType === "services"
                        ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold shadow-xs"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    High-Ticket Advisory
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset("ecommerce")}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      businessType === "ecommerce"
                        ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold shadow-xs"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    E-Commerce Flagship
                  </button>
                </div>
              </div>

              {/* Advanced Parameters Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>{showAdvanced ? "Hide Traffic & Deal Customization" : "Customize Traffic & Deal Value"}</span>
                {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            {/* Collapsible Advanced Traffic Parameters */}
            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                    Monthly Traffic (Visitors)
                  </label>
                  <Input
                    type="number"
                    min={1000}
                    step={1000}
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Math.max(1000, Number(e.target.value)))}
                    className="h-9 text-xs font-mono bg-[var(--surface-base)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                    Average Deal / Order ($)
                  </label>
                  <Input
                    type="number"
                    min={10}
                    step={50}
                    value={averageDealValue}
                    onChange={(e) => setAverageDealValue(Math.max(10, Number(e.target.value)))}
                    className="h-9 text-xs font-mono bg-[var(--surface-base)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                    Current Conversion Rate (%)
                  </label>
                  <Input
                    type="number"
                    min={0.1}
                    max={25}
                    step={0.1}
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Math.max(0.1, Number(e.target.value)))}
                    className="h-9 text-xs font-mono bg-[var(--surface-base)]"
                  />
                </div>
              </div>
            )}
          </form>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* STATE 2: LOADING DIAGNOSTIC PROGRESS                                */}
        {/* ------------------------------------------------------------------- */}
        {loading && (
          <div className="py-12 max-w-lg mx-auto text-center space-y-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-[var(--surface-raised)] border-t-[var(--accent-primary)] animate-spin" />
              <Zap className="h-6 w-6 text-[var(--accent-primary)] absolute" />
            </div>

            <div className="space-y-2">
              <div className="text-base font-bold text-[var(--text-primary)]">
                Analyzing {url.replace(/^https?:\/\//, "")}
              </div>
              <p className="text-xs text-[var(--text-muted)] animate-pulse">
                {progressMessage}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2">
              <span className={`h-1.5 rounded-full transition-all duration-300 ${progressStep >= 1 ? "w-8 bg-[var(--accent-primary)]" : "w-2 bg-[var(--border-strong)]"}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${progressStep >= 2 ? "w-8 bg-[var(--accent-primary)]" : "w-2 bg-[var(--border-strong)]"}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${progressStep >= 3 ? "w-8 bg-[var(--accent-primary)]" : "w-2 bg-[var(--border-strong)]"}`} />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* STATE 3: AUDIT RESULTS DASHBOARD                                    */}
        {/* ------------------------------------------------------------------- */}
        {result && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Top Summary Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-medium">Audited Target</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] font-mono truncate max-w-xs sm:max-w-md">
                    {result.url}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-[var(--text-secondary)]">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Test Another Domain</span>
              </Button>
            </div>

            {/* Comparative Speed & Core Web Vitals Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Current Measured Latency (The Problem) */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-500 flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Current Measured Speed</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-bold">
                    Score: {result.metrics.lighthouse_score} / 100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-lg bg-[var(--surface-base)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-xs text-[var(--text-muted)]">Mobile FCP</div>
                    <div className="text-2xl font-extrabold text-rose-500 font-mono mt-0.5">
                      {result.metrics.measured_fcp}s
                    </div>
                    <div className="text-[10px] text-rose-500/80 mt-0.5">Failing Core Web Vitals</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-base)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-xs text-[var(--text-muted)]">Bounce Penalty</div>
                    <div className="text-2xl font-extrabold text-rose-500 font-mono mt-0.5">
                      {result.metrics.mobile_bounce_rate}%
                    </div>
                    <div className="text-[10px] text-rose-500/80 mt-0.5">Abandon prior to render</div>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Every 1-second delay past 1.0s increases mobile bounce rates by 32% to 90%, bleeding high-intent prospective buyers.
                </p>
              </div>

              {/* Box 2: GB Technologies Sub-Second Benchmark (The Solution) */}
              <div className="rounded-2xl border border-[var(--border-gold)] bg-[var(--surface-base)] p-6 space-y-4 shadow-md gold-shimmer-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[var(--accent-primary)] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>GB Technologies Flagship Benchmark</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    Score: 100 / 100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-xs text-[var(--text-muted)]">Target FCP</div>
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      &lt; 0.8s
                    </div>
                    <div className="text-[10px] text-emerald-600/80 mt-0.5">Instant Edge Render</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-xs text-[var(--text-muted)]">Conversion Lift</div>
                    <div className="text-2xl font-extrabold text-[var(--accent-primary)] font-mono mt-0.5">
                      +{result.financial_impact.projected_conversion_lift}%
                    </div>
                    <div className="text-[10px] text-[var(--accent-primary)]/80 mt-0.5">Measured Client Average</div>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Decoupled Next.js edge caching and optimized headless APIs maintain fluid page transitions and 100/100 performance scores.
                </p>
              </div>
            </div>

            {/* Financial Impact Banner */}
            <div className="rounded-2xl bg-[var(--surface-raised)] p-6 sm:p-8 border border-[var(--border-strong)] text-center space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)]">
                Annual Financial Impact of Mobile Speed Gap
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div>
                  <div className="text-xs text-rose-500 font-semibold mb-1">
                    Annual Revenue Lost to Latency
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-mono tracking-tight">
                    -${Math.round(result.financial_impact.annual_revenue_lost).toLocaleString()}
                  </div>
                </div>

                <div className="hidden sm:block h-12 w-px bg-[var(--border-subtle)]" />

                <div>
                  <div className="text-xs text-[var(--accent-primary)] font-semibold mb-1">
                    Recoverable with Sub-Second Stack
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] font-mono tracking-tight">
                    +${Math.round(result.financial_impact.annual_recoverable_revenue).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                <Button
                  onClick={handleClaim}
                  variant="glow"
                  size="lg"
                  className="w-full sm:w-auto px-8 font-bold gap-2 shadow-md"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Claim Full Architecture Blueprint for This Site</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
