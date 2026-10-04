"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitCommit,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  ShieldAlert,
  Layers,
  Zap,
} from "lucide-react";

interface MilestonePhase {
  id: number;
  phaseNumber: string;
  title: string;
  timeline: string;
  status: "Completed" | "In Progress" | "Scheduled";
  progressPercent: number;
  description: string;
  deliverables: {
    name: string;
    completed: boolean;
    specNote?: string;
  }[];
}

const MILESTONE_PHASES: MilestonePhase[] = [
  {
    id: 1,
    phaseNumber: "Phase 01",
    title: "Monolith Audit & Architecture Strategy",
    timeline: "Completed (Week 1)",
    status: "Completed",
    progressPercent: 100,
    description:
      "Full forensic code audit of monolithic Django templates, identifying server-rendered latency bottlenecks and architecting the headless strangler model.",
    deliverables: [
      { name: "Legacy Template & View Dependency Mapping", completed: true },
      { name: "Headless Decoupling Blueprint & Data Contracts", completed: true },
      { name: "Security Audit & JWT Invalidation Baseline", completed: true },
    ],
  },
  {
    id: 2,
    phaseNumber: "Phase 02",
    title: "Decoupled Flagship & OKLCH Design System",
    timeline: "Completed (Weeks 2–3)",
    status: "Completed",
    progressPercent: 100,
    description:
      "Crafting the next-generation Next.js 16 App Router frontend with OKLCH Champagne Gold and Obsidian Bronze tokens derived from executive branding.",
    deliverables: [
      { name: "Executive Typography & High-Contrast Palette", completed: true },
      { name: "Resilient Dual-Mode Edge API Layer", completed: true },
      { name: "Accessible Screen-Reader Tested Components", completed: true },
    ],
  },
  {
    id: 3,
    phaseNumber: "Phase 03",
    title: "Interactive Client Engines & Revenue Calc",
    timeline: "Completed (Week 4)",
    status: "Completed",
    progressPercent: 100,
    description:
      "High-converting executive tools: Live Website Speed & Revenue Loss diagnostic calculator with real-time currency toggles and visual audit gauges.",
    deliverables: [
      { name: "Akamai 100ms Latency Drop Formula Integration", completed: true },
      { name: "Interactive Visual Audit & Core Web Vitals Scorer", completed: true },
      { name: "One-Click Diagnostic Executive PDF Exporter", completed: true },
    ],
  },
  {
    id: 4,
    phaseNumber: "Phase 04",
    title: "Client Portal & Edge Performance Tuning",
    timeline: "In Progress (Week 5)",
    status: "In Progress",
    progressPercent: 85,
    description:
      "Active rollout of authenticated Client Portal, real-time lead capture tracking, regional edge latency monitoring, and milestone dashboards.",
    deliverables: [
      { name: "Live Lead Inquiry Feed (/api/v1/contact/leads/)", completed: true },
      { name: "Multi-Region Core Web Vitals Telemetry Widget", completed: true },
      { name: "Interactive Milestone & Roadmap Tracker", completed: true },
      { name: "Role-Based Executive Permission Hardening", completed: false, specNote: "Deploying final JWT rotation" },
    ],
  },
  {
    id: 5,
    phaseNumber: "Phase 05",
    title: "Zero-Downtime Cutover & Analytics Handoff",
    timeline: "Scheduled (Week 6)",
    status: "Scheduled",
    progressPercent: 0,
    description:
      "Final DNS cutover through Cloudflare/Vercel reverse proxy, automated Lighthouse CI gating, and executive operations handover.",
    deliverables: [
      { name: "Zero-Downtime DNS & SSL Strangler Cutover", completed: false },
      { name: "Continuous CWV Regression Monitoring & Alerts", completed: false },
      { name: "Executive Team Handover & Admin Training Walkthrough", completed: false },
    ],
  },
];

export function ProjectMilestonesWidget() {
  const [expandedPhase, setExpandedPhase] = React.useState<number | null>(4); // default open Phase 4 (Active)

  const togglePhase = (id: number) => {
    setExpandedPhase((prev) => (prev === id ? null : id));
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[var(--border-subtle)] space-y-6">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold-primary)]/10 text-[var(--gold-primary)]">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Enterprise Modernization Roadmap
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            5-Phase Strangler Fig Architecture: Monolith to Decoupled Edge Flagship
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-[var(--text-muted)]">Overall Progress</div>
            <div className="text-base font-extrabold text-[var(--gold-primary)] font-mono">
              85% Completed
            </div>
          </div>
          <Badge
            variant="accent"
            className="text-[11px] font-mono py-1 px-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold"
          >
            On Schedule
          </Badge>
        </div>
      </div>

      {/* High-level Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
          <span>Deployment Trajectory</span>
          <span>Target Cutover: Week 6</span>
        </div>
        <div className="relative h-3 w-full rounded-full bg-[var(--surface-raised)] overflow-hidden border border-[var(--border-subtle)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--gold-primary)] via-amber-400 to-emerald-500 transition-all duration-700"
            style={{ width: "85%" }}
          />
        </div>
        <div className="grid grid-cols-5 text-[10px] font-mono text-[var(--text-muted)] text-center pt-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Phase 1 (100%)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Phase 2 (100%)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Phase 3 (100%)</span>
          <span className="text-[var(--gold-primary)] font-bold">Phase 4 (85%)</span>
          <span className="text-[var(--text-muted)]">Phase 5 (0%)</span>
        </div>
      </div>

      {/* Phase List Cards */}
      <div className="space-y-3">
        {MILESTONE_PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const isCompleted = phase.status === "Completed";
          const isInProgress = phase.status === "In Progress";

          return (
            <div
              key={phase.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isInProgress
                  ? "bg-[var(--surface-raised)] border-[var(--gold-primary)]/40 shadow-sm"
                  : isCompleted
                  ? "bg-[var(--surface-card)] border-[var(--border-subtle)]"
                  : "bg-[var(--surface-card)]/50 border-[var(--border-subtle)]/60 opacity-80"
              }`}
            >
              {/* Collapsible Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                type="button"
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--surface-raised)]/60 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : isInProgress
                        ? "bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] border border-[var(--gold-primary)]/30 animate-pulse"
                        : "bg-muted text-[var(--text-muted)] border border-[var(--border-subtle)]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      phase.phaseNumber.replace("Phase ", "P")
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[var(--gold-primary)]">
                        {phase.phaseNumber}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                        {phase.title}
                      </h4>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] flex items-center gap-2 mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{phase.timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Badge
                    variant={isCompleted ? "default" : isInProgress ? "accent" : "outline"}
                    className={`text-[10px] font-mono py-0.5 px-2 font-bold ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : isInProgress
                        ? "bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] border-[var(--gold-primary)]/30"
                        : "text-[var(--text-muted)] border-[var(--border-subtle)]"
                    }`}
                  >
                    {phase.status}
                  </Badge>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[var(--border-subtle)]/70 text-xs">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                      Phase Deliverables &amp; Verification
                    </div>
                    <div className="space-y-1.5">
                      {phase.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)]"
                        >
                          <div className="flex items-center gap-2">
                            {item.completed ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-[var(--gold-primary)] shrink-0" />
                            )}
                            <span
                              className={`font-medium ${
                                item.completed
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--text-secondary)]"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>
                          {item.specNote && (
                            <span className="text-[10px] font-mono text-[var(--gold-primary)] bg-[var(--gold-primary)]/10 px-1.5 py-0.5 rounded">
                              {item.specNote}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-3.5 rounded-xl bg-[var(--surface-raised)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <span className="text-[var(--text-secondary)]">
            Next milestone review: <strong className="text-[var(--text-primary)]">Friday, 14:00 UTC</strong> (Strangler Cutover Dry Run)
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] flex items-center gap-1.5"
          onClick={() => {
            alert("Modernization Architecture Specification v2.4 downloaded successfully.");
          }}
        >
          <Download className="h-3.5 w-3.5" />
          Export Architecture Spec
        </Button>
      </div>
    </div>
  );
}
