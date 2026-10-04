"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Zap,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  ArrowUpRight,
  Gauge,
  Wifi,
} from "lucide-react";

export function VitalsMonitorWidget() {
  const [activeRegion, setActiveRegion] = React.useState<"us" | "eu" | "ap">("us");

  const regionalData = {
    us: { region: "US-East (N. Virginia)", edgeFcp: "0.58s", latency: "38ms", status: "Optimal" },
    eu: { region: "EU-West (Frankfurt)", edgeFcp: "0.64s", latency: "52ms", status: "Optimal" },
    ap: { region: "AP-East (Tokyo)", edgeFcp: "0.71s", latency: "69ms", status: "Optimal" },
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[var(--border-subtle)] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Core Web Vitals &amp; Edge Health
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Real-time telemetry across Vercel Edge CDN nodes and Django Headless API gateway
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <Badge variant="accent" className="text-[11px] font-mono py-0.5 px-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold">
            100 / 100 Lighthouse
          </Badge>
        </div>
      </div>

      {/* 4 Core Web Vitals Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* FCP */}
        <div className="rounded-xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">FCP (Instant)</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">PASS</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            0.62s
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">Target: &lt; 0.8s</div>
        </div>

        {/* LCP */}
        <div className="rounded-xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">LCP (Hero)</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">PASS</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            0.88s
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">Target: &lt; 1.2s</div>
        </div>

        {/* CLS */}
        <div className="rounded-xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">CLS (Zero Shift)</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">ZERO</span>
          </div>
          <div className="text-2xl font-extrabold text-[var(--accent-primary)] font-mono">
            0.00
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">Target: 0.00</div>
        </div>

        {/* INP */}
        <div className="rounded-xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">INP (Response)</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">PASS</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            22ms
          </div>
          <div className="text-[10px] text-[var(--text-muted)]">Target: &lt; 50ms</div>
        </div>
      </div>

      {/* Global Regional Edge Latency Breakdown */}
      <div className="rounded-xl bg-[var(--surface-raised)] p-4 border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Globe2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>Global Edge CDN Nodes</span>
          </span>
          <div className="flex gap-1">
            {(["us", "eu", "ap"] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                  activeRegion === reg
                    ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
          <div className="rounded-lg bg-[var(--surface-base)] p-2.5 border border-[var(--border-subtle)]">
            <div className="text-[10px] text-[var(--text-muted)] font-sans">Active Node</div>
            <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5 truncate">
              {regionalData[activeRegion].region}
            </div>
          </div>
          <div className="rounded-lg bg-[var(--surface-base)] p-2.5 border border-[var(--border-subtle)]">
            <div className="text-[10px] text-[var(--text-muted)] font-sans">Edge FCP</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {regionalData[activeRegion].edgeFcp}
            </div>
          </div>
          <div className="rounded-lg bg-[var(--surface-base)] p-2.5 border border-[var(--border-subtle)]">
            <div className="text-[10px] text-[var(--text-muted)] font-sans">TTFB Ping</div>
            <div className="text-xs font-bold text-[var(--accent-primary)] mt-0.5">
              {regionalData[activeRegion].latency}
            </div>
          </div>
        </div>
      </div>

      {/* 24h Speed Stability Bar */}
      <div className="rounded-xl bg-[var(--surface-raised)] p-4 border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Wifi className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>24h Speed Stability Index</span>
          </span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            99.99% Uptime
          </span>
        </div>

        {/* Visual simulated hourly telemetry bars */}
        <div className="flex items-end gap-1 h-10 pt-2">
          {[
            98, 99, 100, 100, 99, 98, 100, 100, 100, 99, 100, 100, 99, 100, 100, 100, 98, 100,
            100, 99, 100, 100, 100, 100,
          ].map((val, idx) => (
            <div
              key={idx}
              title={`Hour ${idx}:00 — Score ${val}/100`}
              className="flex-1 bg-emerald-500/80 hover:bg-emerald-400 rounded-xs transition-all cursor-pointer"
              style={{ height: `${val - 50}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
          <span>24h ago</span>
          <span>12h ago</span>
          <span>Live Now</span>
        </div>
      </div>
    </div>
  );
}
