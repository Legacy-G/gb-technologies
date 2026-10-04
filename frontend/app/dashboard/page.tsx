"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrextioDashboardView } from "@/components/dashboard/crextio-dashboard-view";
import { FundViewMonitoringView } from "@/components/dashboard/fundview-monitoring-view";
import { LeadsFeedWidget } from "@/components/dashboard/leads-feed-widget";
import { ProjectMilestonesWidget } from "@/components/dashboard/project-milestones-widget";
import { VitalsMonitorWidget } from "@/components/dashboard/vitals-monitor-widget";
import {
  Sparkles,
  Activity,
  Layers,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

type DashboardTab = "crextio" | "fundview" | "leads" | "milestones";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<DashboardTab>("crextio");

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE CAPSULE VIEW SWITCHER (Crextio / FundView Aesthetic)    */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-2xl glass-card border border-[var(--border-subtle)]">
        {/* Capsule Tab Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1">
          <button
            type="button"
            onClick={() => setActiveTab("crextio")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all shrink-0 focus:outline-none ${
              activeTab === "crextio"
                ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>Executive Hub (Crextio)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fundview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all shrink-0 focus:outline-none ${
              activeTab === "fundview"
                ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            }`}
          >
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>Telemetry &amp; Graphs (FundView)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all shrink-0 focus:outline-none ${
              activeTab === "leads"
                ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            }`}
          >
            <Users className="h-3.5 w-3.5 text-amber-500" />
            <span>Inbound Leads</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold">
              18
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("milestones")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all shrink-0 focus:outline-none ${
              activeTab === "milestones"
                ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-cyan-500" />
            <span>Roadmap</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
              85%
            </span>
          </button>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2 shrink-0 px-2 sm:px-0">
          <Link href="/#speed-checker">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] gap-1.5 h-8 rounded-full"
            >
              <Zap className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Speed Diagnostic</span>
            </Button>
          </Link>
          <Link href="/#audit">
            <Button
              variant="glow"
              size="sm"
              className="text-xs h-8 rounded-full gap-1.5 font-bold shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sprint Review</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TABBED CONTENT VIEWS                                                   */}
      {/* ========================================================================= */}
      {activeTab === "crextio" && (
        <CrextioDashboardView onSwitchToMonitoring={() => setActiveTab("fundview")} />
      )}

      {activeTab === "fundview" && (
        <FundViewMonitoringView />
      )}

      {activeTab === "leads" && (
        <div className="space-y-6">
          <LeadsFeedWidget />
        </div>
      )}

      {activeTab === "milestones" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ProjectMilestonesWidget />
            </div>
            <div className="lg:col-span-5">
              <VitalsMonitorWidget />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
