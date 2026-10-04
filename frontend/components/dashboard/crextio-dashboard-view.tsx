"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Laptop,
  ShieldCheck,
  Layers,
  Users,
  Activity,
  Award,
} from "lucide-react";

interface CrextioDashboardProps {
  onSwitchToMonitoring?: () => void;
}

export function CrextioDashboardView({ onSwitchToMonitoring }: CrextioDashboardProps) {
  // Speed dial simulation state
  const [isRunning, setIsRunning] = React.useState(true);
  const [dialSeconds, setDialSeconds] = React.useState(62); // 0.62s FCP
  const [accordionOpen, setAccordionOpen] = React.useState<{ [key: string]: boolean }>({
    devices: true,
  });

  // Checklist items
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Monolith Dependency Audit", time: "Sep 12, 08:30", done: true },
    { id: 2, title: "OKLCH Design Token System", time: "Sep 15, 10:30", done: true },
    { id: 3, title: "Next.js Decoupled Frontend", time: "Sep 18, 14:00", done: true },
    { id: 4, title: "Akamai Speed Loss Engine", time: "Sep 21, 11:15", done: true },
    { id: 5, title: "DRF Lead Capture Endpoint", time: "Sep 25, 09:45", done: true },
    { id: 6, title: "Multi-Region Edge Benchmarks", time: "Sep 28, 16:30", done: true },
    { id: 7, title: "Crextio & FundView Dashboards", time: "Today, 13:45", done: true },
    { id: 8, title: "Zero-Downtime DNS Cutover", time: "Oct 10, 14:00", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const toggleAccordion = (key: string) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Timer simulation
  React.useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setDialSeconds((prev) => (prev >= 68 ? 58 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [isRunning]);

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. CREXTIO EXECUTIVE GREETING & SEGMENTED PIPELINE BAR                    */}
      {/* ========================================================================= */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-[var(--border-subtle)] relative overflow-hidden">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-[var(--accent-glow)] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                Enterprise Modernization Hub
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] font-heading tracking-tight mt-1">
                Welcome in, Marcus
              </h1>
            </div>

            {/* Segmented Pipeline Progress Bar (From Crextio Reference) */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-medium text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--text-primary)]" />
                  Audit <strong className="text-[var(--text-primary)]">15%</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
                  OKLCH Design <strong className="text-[var(--text-primary)]">15%</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Decoupled Edge <strong className="text-[var(--text-primary)]">55%</strong>
                </span>
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full border border-[var(--border-strong)]" />
                  Strangler Cutover <strong>15%</strong>
                </span>
              </div>

              {/* Connected Segmented Bar Track */}
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-[var(--surface-overlay)] border border-[var(--border-subtle)] p-0.5 gap-1">
                {/* Segment 1: Audit */}
                <div
                  className="h-full rounded-full bg-[var(--text-primary)] transition-all"
                  style={{ width: "15%" }}
                  title="Architecture Audit: 100% Completed"
                />
                {/* Segment 2: OKLCH Design */}
                <div
                  className="h-full rounded-full bg-[var(--accent-primary)] transition-all"
                  style={{ width: "15%" }}
                  title="OKLCH Design Tokens: 100% Completed"
                />
                {/* Segment 3: Decoupled Edge */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] via-amber-400 to-emerald-500 transition-all"
                  style={{ width: "55%" }}
                  title="Decoupled Edge Deployment: Active 85%"
                />
                {/* Segment 4: Cutover */}
                <div
                  className="h-full rounded-full bg-transparent border border-dashed border-[var(--border-strong)]"
                  style={{ width: "15%" }}
                  title="Zero-Downtime Cutover: Scheduled Week 6"
                />
              </div>
            </div>
          </div>

          {/* Top-Right Executive Stat Trio (Crextio Indicator) */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 bg-[var(--surface-raised)]/70 backdrop-blur-sm p-4 rounded-2xl border border-[var(--border-subtle)]">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono">
                78
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Deliverables
              </div>
            </div>

            <div className="h-8 w-px bg-[var(--border-subtle)]" />

            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent-primary)] font-mono">
                56
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Edge PoPs
              </div>
            </div>

            <div className="h-8 w-px bg-[var(--border-subtle)]" />

            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                203
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Tests Passed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CREXTIO BENTO GRID                                                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Executive Profile & Accordion Drawer (4 Cols)             */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-6">
          {/* Executive Lead Hero Card */}
          <div className="rounded-3xl glass-card overflow-hidden border border-[var(--border-subtle)] shadow-sm">
            <div className="relative h-56 w-full bg-gradient-to-br from-amber-100 via-amber-50 to-stone-200 dark:from-stone-900 dark:via-stone-800 dark:to-neutral-900 flex items-center justify-center overflow-hidden">
              {/* Elegant Modern Portrait Silhouette & Graphic */}
              <div className="relative flex flex-col items-center">
                <div className="h-28 w-28 rounded-full border-4 border-[var(--surface-base)] shadow-xl overflow-hidden bg-gradient-to-tr from-[var(--accent-primary)] to-amber-200 flex items-center justify-center text-3xl font-heading font-black text-[var(--accent-foreground)]">
                  MV
                </div>
                <Badge
                  variant="outline"
                  className="mt-3 bg-[var(--surface-base)]/90 backdrop-blur-md border-[var(--accent-primary)]/40 font-mono text-[11px] text-[var(--text-primary)] font-bold shadow-sm"
                >
                  Enterprise Client
                </Badge>
              </div>

              {/* Floating Pill Overlay Badge (like $1,200 pill in Crextio) */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[var(--surface-base)]/95 backdrop-blur-md border border-[var(--border-subtle)] shadow-md flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-primary)]">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+$142,500/yr Saved</span>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Marcus Vance</h3>
                  <p className="text-xs text-[var(--text-muted)]">Managing Partner, Vance Capital</p>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Settings Drawer (from Crextio left column) */}
          <div className="rounded-3xl glass-card p-4 border border-[var(--border-subtle)] space-y-2 divide-y divide-[var(--border-subtle)]">
            {/* Drawer 1: Active Deployment Device */}
            <div className="pt-2 first:pt-0">
              <button
                onClick={() => toggleAccordion("devices")}
                className="w-full py-2 flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <Laptop className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Deployment Environment</span>
                </div>
                {accordionOpen.devices ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                )}
              </button>

              {accordionOpen.devices && (
                <div className="pb-2 pt-1 flex items-center justify-between text-xs rounded-xl bg-[var(--surface-raised)] p-2.5 border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-base)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                      <Layers className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">Vercel Edge Mesh</div>
                      <div className="text-[10px] text-[var(--text-muted)]">Node Version 16.3.8</div>
                    </div>
                  </div>
                  <Badge variant="accent" className="text-[10px] font-mono py-0 px-1.5 font-bold">
                    Active
                  </Badge>
                </div>
              )}
            </div>

            {/* Drawer 2: Architecture Specifications */}
            <div className="pt-2">
              <button
                onClick={() => toggleAccordion("arch")}
                className="w-full py-2 flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Architecture Specifications</span>
                </div>
                {accordionOpen.arch ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                )}
              </button>

              {accordionOpen.arch && (
                <div className="pb-2 pt-1 text-xs text-[var(--text-secondary)] space-y-1.5 p-2 rounded-xl bg-[var(--surface-raised)]">
                  <div className="flex justify-between">
                    <span>Decoupled Pattern:</span>
                    <strong className="text-[var(--text-primary)]">Strangler Fig</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>API Invalidation:</span>
                    <strong className="text-[var(--text-primary)]">On-Demand ISR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Standard:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">SOC 2 Type II</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer 3: SLA & 99.99% Guarantee */}
            <div className="pt-2">
              <button
                onClick={() => toggleAccordion("sla")}
                className="w-full py-2 flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>SLA &amp; Uptime Guarantee</span>
                </div>
                {accordionOpen.sla ? (
                  <ChevronUp className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                )}
              </button>

              {accordionOpen.sla && (
                <div className="pb-2 pt-1 text-xs text-[var(--text-secondary)] space-y-1.5 p-2 rounded-xl bg-[var(--surface-raised)]">
                  <div className="flex justify-between">
                    <span>Availability SLA:</span>
                    <strong className="text-emerald-600 font-bold">99.99%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Failover RTO:</span>
                    <strong className="text-[var(--text-primary)]">&lt; 15 seconds</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CENTER COLUMN: Velocity Chart + Speed Radial Dial + Calendar (5 Cols)  */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Velocity Capsule Bar Chart (from Crextio Middle Top) */}
            <div className="rounded-3xl glass-card p-5 border border-[var(--border-subtle)] space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Sprint Velocity
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" />
              </div>

              <div>
                <div className="text-2xl font-black text-[var(--text-primary)] font-mono">
                  6.1 h
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">Active engineering this week</div>
              </div>

              {/* Weekly Capsule Bars (S M T W T F S) with Friday highlighted in Gold */}
              <div className="flex items-end justify-between gap-1.5 pt-2">
                {[
                  { day: "S", h: "h-8", active: false },
                  { day: "M", h: "h-14", active: false },
                  { day: "T", h: "h-10", active: false },
                  { day: "W", h: "h-16", active: false },
                  { day: "T", h: "h-12", active: false },
                  { day: "F", h: "h-20", active: true, tag: "0.62s" },
                  { day: "S", h: "h-6", active: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                    {item.active && (
                      <span className="text-[9px] font-mono font-bold text-[var(--accent-foreground)] bg-[var(--accent-primary)] px-1 py-0.5 rounded-full shadow-xs">
                        {item.tag}
                      </span>
                    )}
                    <div
                      className={`w-full max-w-[12px] rounded-full transition-all duration-300 ${item.h} ${
                        item.active
                          ? "bg-gradient-to-t from-[var(--accent-primary)] to-amber-300 shadow-[0_0_12px_var(--accent-glow)]"
                          : "bg-[var(--text-primary)] opacity-80 hover:opacity-100"
                      }`}
                    />
                    <span className="text-[10px] font-mono font-semibold text-[var(--text-muted)]">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Speed Telemetry Radial Dial (from Crextio Middle Top) */}
            <div className="rounded-3xl glass-card p-5 border border-[var(--border-subtle)] space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Latency Tracker
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" />
              </div>

              {/* Radial Dial Graphic */}
              <div className="relative flex flex-col items-center justify-center my-1">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="var(--surface-overlay)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Glowing Gold Active Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="var(--accent-primary)"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.78)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Central Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-black text-[var(--text-primary)] font-mono">
                    0.{(dialSeconds / 100).toFixed(2).split(".")[1]}s
                  </div>
                  <div className="text-[9px] font-semibold text-[var(--accent-primary)] uppercase tracking-wide">
                    Instant FCP
                  </div>
                </div>
              </div>

              {/* Interactive Audio/Timer Controls */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
                  title={isRunning ? "Pause telemetry simulation" : "Resume telemetry simulation"}
                >
                  {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setDialSeconds(62)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-raised)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title="Reset benchmark"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Milestones Calendar Card (from Crextio Middle Bottom) */}
          <div className="rounded-3xl glass-card p-5 border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)] font-mono">
                September 2026
              </span>
              <span className="text-[11px] font-semibold text-[var(--accent-primary)] flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Active Sprint Schedule
              </span>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-6 text-center text-xs font-mono py-1 border-b border-[var(--border-subtle)] text-[var(--text-muted)]">
              <div>Mon <span className="font-bold text-[var(--text-primary)]">22</span></div>
              <div>Tue <span className="font-bold text-[var(--text-primary)]">23</span></div>
              <div>Wed <span className="font-bold text-[var(--accent-primary)]">24</span></div>
              <div>Thu <span className="font-bold text-[var(--text-primary)]">25</span></div>
              <div>Fri <span className="font-bold text-[var(--text-primary)]">26</span></div>
              <div>Sat <span className="font-bold text-[var(--text-muted)]">27</span></div>
            </div>

            {/* Floating Event Pills (Crextio Signature Style) */}
            <div className="space-y-2 pt-1 text-xs">
              {/* Event 1: Architecture Sync */}
              <div className="p-3 rounded-2xl bg-[var(--text-primary)] text-[var(--canvas)] shadow-md flex items-center justify-between">
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                    Weekly Modernization Sync
                  </div>
                  <div className="text-[10px] opacity-75 font-mono mt-0.5">
                    Wednesday • 09:00 - 10:00 UTC
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="h-6 w-6 rounded-full bg-amber-400 text-black text-[10px] font-bold flex items-center justify-center border border-black">
                    GB
                  </div>
                  <div className="h-6 w-6 rounded-full bg-stone-300 text-black text-[10px] font-bold flex items-center justify-center border border-black">
                    MV
                  </div>
                </div>
              </div>

              {/* Event 2: Strangler Cutover Dry Run */}
              <div className="p-3 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-gold)] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5 text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    Zero-Downtime Cutover Dry Run
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
                    Thursday • 14:00 - 15:30 UTC
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono py-0 px-2 font-bold text-[var(--accent-primary)] border-[var(--accent-primary)]/40">
                  Ready
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Modernization Tasks Dark Checklist Card (3 Cols)          */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Sprint Completion Pill Card */}
          <div className="rounded-3xl glass-card p-5 border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)]">Sprint Milestones</span>
              <span className="font-mono font-extrabold text-[var(--accent-primary)] text-sm">
                85%
              </span>
            </div>

            {/* Segmented completion blocks */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-2 rounded-full bg-[var(--accent-primary)]" title="Phase 1-3 Completed" />
              <div className="h-2 rounded-full bg-[var(--accent-primary)]" title="Phase 4 Active" />
              <div className="h-2 rounded-full bg-[var(--surface-overlay)] border border-[var(--border-subtle)]" title="Phase 5 Scheduled" />
            </div>
          </div>

          {/* High-Contrast Obsidian Task Checklist Card (from Crextio Right) */}
          <div className="card-contrast-dark p-5 space-y-4 shadow-xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-bold tracking-tight text-white">
                  Sprint Deliverables
                </h4>
                <p className="text-[11px] text-stone-300 dark:text-stone-400 font-mono">
                  {completedCount} of {tasks.length} Completed
                </p>
              </div>
              <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-foreground)]">
                {completedCount}/{tasks.length}
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  type="button"
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-start justify-between gap-2.5 group focus:outline-none"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {task.done ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-stone-400 group-hover:text-amber-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-xs font-medium leading-tight truncate ${
                          task.done ? "text-stone-200 line-through opacity-85" : "text-white font-semibold"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                        {task.time}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {task.done ? (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        DONE
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-amber-300 font-bold bg-amber-400/20 px-1.5 py-0.5 rounded">
                        NEXT
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Switch to Telemetry Button */}
            {onSwitchToMonitoring && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToMonitoring}
                className="w-full border-white/20 text-white hover:bg-white/10 text-xs mt-2 gap-1.5 font-semibold"
              >
                <Activity className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                <span>Open FundView Telemetry</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
