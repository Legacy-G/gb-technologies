"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Zap,
  Globe2,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Server,
  Database,
  Radio,
} from "lucide-react";

export function FundViewMonitoringView() {
  const [activeCategory, setActiveCategory] = React.useState("edge");
  const [timeRange, setTimeRange] = React.useState("24h");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. FUNDVIEW HEADER & CATEGORY FILTER PILL BAR                             */}
      {/* ========================================================================= */}
      <div className="rounded-3xl glass-card p-6 border border-[var(--border-subtle)] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Activity className="h-4 w-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] font-heading tracking-tight">
                Global Edge Telemetry &amp; Monitoring
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Live telemetry stream from 56 Vercel Edge PoPs and decoupled Django REST endpoints
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="accent"
              className="text-xs font-mono py-1 px-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
              100 / 100 Lighthouse
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-8 text-xs border-[var(--border-subtle)] gap-1.5"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Live Sync</span>
            </Button>
          </div>
        </div>

        {/* Category Capsule Filter Pills (Direct from FundView Top Bar) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {[
            { id: "edge", label: "Edge CDN", count: "142,850" },
            { id: "api", label: "API Gateway", count: "28,400" },
            { id: "cache", label: "Cache Hit", count: "98.4%" },
            { id: "us", label: "US-East", count: "38ms" },
            { id: "eu", label: "EU-West", count: "52ms" },
            { id: "ap", label: "AP-East", count: "69ms" },
          ].map((pill) => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                type="button"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 focus:outline-none ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--canvas)] font-bold shadow-sm"
                    : "bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)] font-bold"
                      : "bg-[var(--surface-overlay)] text-[var(--text-muted)] font-medium"
                  }`}
                >
                  {pill.count}
                </span>
              </button>
            );
          })}

          <div className="h-6 w-px bg-[var(--border-subtle)] mx-1" />

          {/* Timeframe pill */}
          <div className="flex items-center rounded-full bg-[var(--surface-raised)] p-0.5 border border-[var(--border-subtle)] text-[11px] font-mono shrink-0">
            {["1h", "24h", "7d"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  timeRange === t
                    ? "bg-[var(--surface-base)] text-[var(--text-primary)] font-bold shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FIRST ROW: 4 MODULAR GRAPH CARDS (FundView Reference Top Row)           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Soft Mint/Cyan Card (Dual-Line Wave Chart) */}
        <div className="card-fundview-mint space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-950 dark:text-emerald-200">
              Latency Trends
            </span>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
              Live FCP
            </span>
          </div>

          {/* Dual Line Wave SVG */}
          <div className="py-2">
            <svg className="w-full h-20 overflow-visible" viewBox="0 0 200 60">
              {/* Baseline Monolith Curve (Dark / Bronze) */}
              <path
                d="M 0 35 C 30 15, 60 45, 100 25 C 140 5, 170 40, 200 28"
                fill="none"
                stroke="oklch(0.24 0.04 85)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-75 dark:stroke-stone-300"
              />
              {/* Next.js Edge Curve (Luminous Emerald Mint) */}
              <path
                d="M 0 45 C 30 40, 60 10, 100 15 C 140 20, 170 5, 200 12"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bottom Metric Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-500/20 text-xs">
            <div>
              <div className="text-[10px] text-emerald-800 dark:text-emerald-300">Next.js Edge</div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-emerald-500" />
                59%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-emerald-800 dark:text-emerald-300">Django Monolith</div>
              <div className="text-base font-extrabold text-[var(--text-primary)] font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-[var(--text-primary)]" />
                41%
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Pale Warm Sand Card (Vertical Rounded Chunky Bar Chart) */}
        <div className="card-fundview-warm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-950 dark:text-amber-200">
              Throughput &amp; Traffic
            </span>
            <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 font-semibold">
              Req / Sec
            </span>
          </div>

          {/* 5 Chunky Vertical Rounded Bars */}
          <div className="flex items-end justify-center gap-3 h-20 py-1">
            <div className="w-5 h-12 rounded-lg bg-emerald-400/90 dark:bg-emerald-500" title="US-East: 42k" />
            <div className="w-5 h-16 rounded-lg bg-emerald-500 dark:bg-emerald-400" title="EU-West: 68k" />
            <div className="w-5 h-20 rounded-lg bg-emerald-600 dark:bg-emerald-300" title="AP-East: 85k" />
            <div className="w-5 h-14 rounded-lg bg-amber-400 dark:bg-amber-300" title="SA-East: 48k" />
            <div className="w-5 h-16 rounded-lg bg-amber-500 dark:bg-amber-400" title="AF-South: 56k" />
          </div>

          {/* Bottom Metric Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-amber-500/20 text-xs">
            <div>
              <div className="text-[10px] text-amber-800 dark:text-amber-300">US Nodes</div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-emerald-500" />
                32%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-amber-800 dark:text-amber-300">Global CDN</div>
              <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-amber-500" />
                68%
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Soft Pale Yellow/Gold Card (Area Wave Chart) */}
        <div className="card-fundview-yellow space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-950 dark:text-amber-200">
              Edge Cache Ratio
            </span>
            <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 font-semibold">
              98.4% Hit
            </span>
          </div>

          {/* Area Fill Wave SVG */}
          <div className="py-2">
            <svg className="w-full h-20 overflow-visible" viewBox="0 0 200 60">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 Q 25 15, 50 30 T 100 20 T 150 40 T 200 25 L 200 60 L 0 60 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M 0 35 Q 25 15, 50 30 T 100 20 T 150 40 T 200 25"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 50 Q 35 45, 75 48 T 150 45 T 200 52"
                fill="none"
                stroke="oklch(0.24 0.04 85)"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="opacity-60 dark:stroke-stone-300"
              />
            </svg>
          </div>

          {/* Bottom Metric Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-amber-500/20 text-xs">
            <div>
              <div className="text-[10px] text-amber-800 dark:text-amber-300">Edge Cache</div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-emerald-500" />
                26%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-amber-800 dark:text-amber-300">Revalidate</div>
              <div className="text-base font-extrabold text-[var(--text-primary)] font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-[var(--text-primary)]" />
                74%
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: High-Contrast Dark Card (4x8 LED Dot Matrix Grid) */}
        <div className="card-contrast-dark space-y-4 flex flex-col justify-between shadow-lg text-white">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">
              Cluster PoP Matrix
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
              56 Online
            </span>
          </div>

          {/* 4x8 LED Dot Matrix */}
          <div className="grid grid-cols-8 gap-1.5 py-1 justify-items-center">
            {Array.from({ length: 32 }).map((_, i) => {
              const isHighlight = i === 10 || i === 18 || i === 25;
              const isYellow = i === 14 || i === 21;
              const isDim = i > 28;
              return (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    isHighlight
                      ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                      : isYellow
                      ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : isDim
                      ? "bg-stone-700"
                      : "bg-emerald-600/80"
                  }`}
                  title={`Edge PoP Node #${i + 1}`}
                />
              );
            })}
          </div>

          {/* Bottom Metric Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-xs">
            <div>
              <div className="text-[10px] text-stone-300">Primary PoPs</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-emerald-400" />
                65%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-stone-300">Failover Mesh</div>
              <div className="text-base font-extrabold text-amber-300 font-mono flex items-center gap-1">
                <span className="h-2 w-1 rounded-full bg-amber-400" />
                35%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECOND ROW: STACKED BAR CHART & GANTT ROADMAP (FundView Bottom Row)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: High-Contrast Dark Card with Chunky Stacked Bars (5 cols) */}
        <div className="lg:col-span-5 card-contrast-dark p-6 space-y-5 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Server Response Latency (TTFB)
              </h3>
              <p className="text-[11px] text-stone-300 font-mono">
                Segmented Layer Latency Profile
              </p>
            </div>

            {/* Category legend pills (CL, FA Cup, DPCL style from FundView) */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Edge
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Gateway
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-800" /> DB
              </span>
            </div>
          </div>

          {/* Chunky Stacked Bars with Numeric Values inside Segments */}
          <div className="space-y-3">
            {[
              { time: "18:10", edge: 14, gw: 3, db: 8 },
              { time: "17:10", edge: 16, gw: 5, db: 12 },
              { time: "16:10", edge: 20, gw: 8, db: 14 },
              { time: "15:10", edge: 12, gw: 4, db: 6 },
              { time: "14:10", edge: 10, gw: 2, db: 4 },
            ].map((row, idx) => {
              const total = row.edge + row.gw + row.db;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-stone-400 w-12 text-right text-[11px]">
                    {row.time}
                  </span>
                  <div className="flex-1 flex h-7 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-0.5 gap-0.5">
                    {/* Edge Segment (Green) */}
                    <div
                      style={{ width: `${(row.edge / total) * 100}%` }}
                      className="h-full rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-mono font-bold text-black"
                      title={`Edge: ${row.edge}ms`}
                    >
                      {row.edge}
                    </div>
                    {/* Gateway Segment (Amber) */}
                    <div
                      style={{ width: `${(row.gw / total) * 100}%` }}
                      className="h-full rounded-lg bg-amber-400 flex items-center justify-center text-[10px] font-mono font-bold text-black"
                      title={`Gateway: ${row.gw}ms`}
                    >
                      {row.gw}
                    </div>
                    {/* Database Segment (Deep Emerald) */}
                    <div
                      style={{ width: `${(row.db / total) * 100}%` }}
                      className="h-full rounded-lg bg-emerald-800 flex items-center justify-center text-[10px] font-mono font-bold text-white"
                      title={`DB Query: ${row.db}ms`}
                    >
                      {row.db}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[11px] text-emerald-400 w-10 text-right">
                    {total}ms
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Projects Timeline / Interactive Gantt Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-card p-6 border border-[var(--border-subtle)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Projects Timeline &amp; Modernization Gantt
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                Active sprint phases mapped across milestones
              </p>
            </div>

            {/* Filter tags (FPVV, Clone, NDSA from FundView) */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                ● Live Edge
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 font-bold">
                ● In Sprint
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                ● Scheduled
              </span>
            </div>
          </div>

          {/* Interactive Gantt Timeline with Horizontal Gridlines & Floating Cards */}
          <div className="relative h-60 w-full rounded-2xl bg-[var(--surface-raised)]/60 border border-[var(--border-subtle)] p-4 flex flex-col justify-between overflow-hidden">
            {/* Horizontal Gridlines */}
            {[100, 80, 60, 40, 20, 0].map((val) => (
              <div key={val} className="flex items-center gap-3 w-full">
                <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 text-right">
                  {val}
                </span>
                <div className="flex-1 h-px bg-[var(--border-subtle)] opacity-60" />
              </div>
            ))}

            {/* Floating Soft Rounded Milestone Blocks (FundView Signature Style) */}
            {/* Block 1: Audit */}
            <div
              className="absolute left-16 top-10 px-3.5 py-2.5 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span className="font-mono font-bold text-xs">P1: 30</span>
              <span className="text-[10px] font-semibold bg-cyan-200 dark:bg-cyan-800 px-1 rounded-full">
                ✓
              </span>
            </div>

            {/* Block 2: Decoupled Edge Mesh (Green with team avatar cluster) */}
            <div
              className="absolute left-44 top-20 px-4 py-3 rounded-2xl bg-emerald-500 text-black shadow-lg flex flex-col gap-1 transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-mono font-black">
                <span>Phase 04: Edge Telemetry</span>
                <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  85%
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="text-[10px] font-semibold opacity-90">Sub-second 0.62s</span>
                <div className="flex -space-x-1">
                  <div className="h-5 w-5 rounded-full bg-stone-900 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    GB
                  </div>
                  <div className="h-5 w-5 rounded-full bg-amber-300 text-black text-[9px] font-bold flex items-center justify-center border border-white">
                    MV
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Scheduled Cutover (Soft Yellow) */}
            <div
              className="absolute right-8 top-8 px-3.5 py-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span className="font-mono font-bold text-xs">P5: Cutover</span>
              <div className="flex -space-x-1">
                <div className="h-5 w-5 rounded-full bg-stone-800 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  DNS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
