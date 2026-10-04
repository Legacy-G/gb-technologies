"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectMilestonesWidget } from "@/components/dashboard/project-milestones-widget";
import { VitalsMonitorWidget } from "@/components/dashboard/vitals-monitor-widget";
import { LeadsFeedWidget } from "@/components/dashboard/leads-feed-widget";
import {
  Sparkles,
  TrendingUp,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Download,
  Activity,
  Layers,
  Users,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Welcome & Status Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-card border border-[var(--border-subtle)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-[var(--gold-primary)]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge
                variant="accent"
                className="text-[11px] font-mono py-0.5 px-2 bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] border-[var(--gold-primary)]/30 font-bold"
              >
                Q4 Modernization Sprint
              </Badge>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {currentDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
              Enterprise Client Hub
            </h1>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Welcome back, <strong className="text-[var(--text-primary)]">Marcus</strong>. Your decoupled Next.js architecture is live on Edge CDN nodes, actively eliminating latency bottlenecks and capturing incoming enterprise demand.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/#speed-checker">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-[var(--border-subtle)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] gap-1.5"
              >
                <Zap className="h-3.5 w-3.5 text-[var(--gold-primary)]" />
                <span>Run Speed Diagnostic</span>
              </Button>
            </Link>

            <Link href="/#contact">
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] hover:opacity-95 text-white font-bold shadow-md shadow-[var(--gold-glow)] gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Schedule Modernization Review</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 High-Level Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Speed Acceleration */}
        <div className="rounded-xl glass-card p-5 border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Page Load Velocity</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              0.62s
            </span>
            <span className="text-xs line-through text-[var(--text-muted)]">3.8s</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+83% faster than legacy monolith</span>
          </div>
        </div>

        {/* KPI 2: Retained Annual Revenue */}
        <div className="rounded-xl glass-card p-5 border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Annual Revenue Saved</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--gold-primary)]/10 text-[var(--gold-primary)]">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
              +$142,500
            </span>
            <span className="text-xs text-[var(--text-muted)]">/yr</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)]">
            Based on Akamai 100ms conversion model
          </div>
        </div>

        {/* KPI 3: Modernization Progress */}
        <div className="rounded-xl glass-card p-5 border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Phase Trajectory</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <Layers className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
              Phase 4
            </span>
            <span className="text-xs font-bold text-[var(--gold-primary)]">85% Complete</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)]">
            Target Cutover: Week 6 zero-downtime
          </div>
        </div>

        {/* KPI 4: Infrastructure SLA */}
        <div className="rounded-xl glass-card p-5 border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Infrastructure SLA</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              99.99%
            </span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Zero outages in last 30 days</span>
          </div>
        </div>
      </div>

      {/* Grid: Modernization Roadmap & Core Web Vitals Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5-Phase Roadmap Widget (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <ProjectMilestonesWidget />
        </div>

        {/* Right Column: Real-Time Core Web Vitals Telemetry Widget (5 cols on desktop) */}
        <div className="lg:col-span-5">
          <VitalsMonitorWidget />
        </div>
      </div>

      {/* Bottom Full-Width Section: Live Leads Feed Widget */}
      <div>
        <LeadsFeedWidget />
      </div>
    </div>
  );
}
