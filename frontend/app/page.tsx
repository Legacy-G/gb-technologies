"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Gem,
  LayoutTemplate,
  Command,
  Globe,
  Sliders,
  DollarSign,
  Gauge,
  Layers,
} from "lucide-react";

export default function HomePage() {
  // ---------------------------------------------------------------------------
  // 1. Interactive Revenue & Conversion Calculator State
  // ---------------------------------------------------------------------------
  const [monthlyVisitors, setMonthlyVisitors] = React.useState(50000);
  const [currentConversionRate, setCurrentConversionRate] = React.useState(2.0); // 2.0%
  const [averageDealValue, setAverageDealValue] = React.useState(500); // $500

  // Calculation: +45% average conversion lift with a sub-second decoupled flagship
  const currentMonthlyConversions = (monthlyVisitors * currentConversionRate) / 100;
  const currentMonthlyRevenue = currentMonthlyConversions * averageDealValue;

  const projectedConversionRate = currentConversionRate * 1.45; // 45% lift
  const projectedMonthlyConversions = (monthlyVisitors * projectedConversionRate) / 100;
  const projectedMonthlyRevenue = projectedMonthlyConversions * averageDealValue;
  const monthlyRevenueGain = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualRevenueGain = monthlyRevenueGain * 12;

  // ---------------------------------------------------------------------------
  // 2. Interactive Strategy Audit Form State (Wired to Django API)
  // ---------------------------------------------------------------------------
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    service_interest: "Digital Flagship",
    message: "",
  });
  const [formStatus, setFormStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      await apiClient.post("/contact/leads/", formData);
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        service_interest: "Digital Flagship",
        message: "",
      });
    } catch (err: unknown) {
      setFormStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unable to submit consultation request. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Warm Champagne Ivory Atmosphere with Flowing Gold Waves) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-14 md:pb-20 border-b border-[var(--border-subtle)]">
        {/* Soft Champagne & Warm Gold Ambient Radial Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-[var(--accent-glow)] blur-[150px] opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
            {/* Golden Announcement Pill */}
            <Badge variant="accent" className="gap-2 py-1 px-3.5 text-xs font-semibold shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Bespoke Web Engineering</span>
            </Badge>

            {/* Display H1 Typography (Deep Earthy Bronze) */}
            <h1 className="text-fluid-hero font-extrabold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
              Bespoke Web Platforms Built for Speed &amp; Revenue
            </h1>

            {/* Lead Narrative */}
            <p className="text-fluid-body text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              We engineer sub-second digital flagships and decoupled web applications that turn visitors into high-value clients.
            </p>

            {/* Hero Action CTA Group (Warm Gold Button from Reference Image) */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
              <a href="#audit">
                <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 px-6 py-5 font-bold shadow-md">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#calculator">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-5 py-5 border-[var(--border-strong)]">
                  Calculate ROI
                </Button>
              </a>
            </div>

            {/* Signature 4 Elevated Cards (Directly derived from the 4 white cards in the screenshot) */}
            <div className="pt-8 sm:pt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
              {/* Card 1: Easel / UI Craft */}
              <div className="glass-card rounded-xl p-4 sm:p-5 text-left space-y-2.5 transition-transform hover:-translate-y-1 hover:shadow-md border border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <LayoutTemplate className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Bespoke Design</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">Zero generic templates. Crafted for prestige and market authority.</p>
                </div>
              </div>

              {/* Card 2: Diamond / Precision */}
              <div className="glass-card rounded-xl p-4 sm:p-5 text-left space-y-2.5 transition-transform hover:-translate-y-1 hover:shadow-md border border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Gem className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Sub-Second Speed</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">&lt;0.8s First Contentful Paint. 100/100 Core Web Vitals.</p>
                </div>
              </div>

              {/* Card 3: Location / Global Edge */}
              <div className="glass-card rounded-xl p-4 sm:p-5 text-left space-y-2.5 transition-transform hover:-translate-y-1 hover:shadow-md border border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Global Decoupling</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">Next.js Edge + Django REST Framework API scalability.</p>
                </div>
              </div>

              {/* Card 4: Command / Conversion */}
              <div className="glass-card rounded-xl p-4 sm:p-5 text-left space-y-2.5 transition-transform hover:-translate-y-1 hover:shadow-md border border-[var(--border-subtle)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Command className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Conversion ROI</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">+40% to +180% average pipeline conversion lift.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUANTIFIABLE SPEED & CONVERSION METRICS DOCK */}
      {/* ========================================================================= */}
      <section className="py-10 bg-[var(--surface-base)]/50 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Executive KPI Dock Container */}
          <div className="glass-card rounded-2xl p-2 sm:p-3 border border-[var(--border-subtle)] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
              {/* Metric 1: Pipeline Revenue */}
              <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 group hover:bg-[var(--surface-raised)]/40 transition-colors rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                    Pipeline Impact
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent-primary)] tracking-tight">
                    $180M+
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium leading-snug">
                    Client pipeline revenue generated
                  </p>
                </div>
              </div>

              {/* Metric 2: Speed Benchmark */}
              <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 group hover:bg-[var(--surface-raised)]/40 transition-colors rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Speed Benchmark
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                    &lt; 0.8s
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium leading-snug">
                    Median First Contentful Paint (FCP)
                  </p>
                </div>
              </div>

              {/* Metric 3: Conversion Lift */}
              <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 group hover:bg-[var(--surface-raised)]/40 transition-colors rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                    Conversion Delta
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <Gauge className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent-primary)] tracking-tight">
                    +84%
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium leading-snug">
                    Average qualified conversion lift
                  </p>
                </div>
              </div>

              {/* Metric 4: Lighthouse Score */}
              <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 group hover:bg-[var(--surface-raised)]/40 transition-colors rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Audit Standard
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                    100 / 100
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium leading-snug">
                    Google Lighthouse performance score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE "COST OF ORDINARY" PROBLEM VS SOLUTION SHOWCASE */}
      {/* ========================================================================= */}
      <section id="roi-gap" className="py-24 bg-[var(--canvas)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="default">The Reality of Modern Web Standards</Badge>
            <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
              The Invisible Revenue Drain: Why Typical Websites Fail to Convert
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Every 100ms of latency and generic template design silently leaks qualified buyers to competitors. See how a bespoke decoupled architecture changes the equation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Commodity Website (The Problem) */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-500">
                  The Commodity Website Trap
                </span>
                <span className="text-xs text-rose-500/80 font-mono">Slow & Leaking Pipeline</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Bloated Templates & Fragmented CMS
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>3.8s–5.2s mobile load time</strong> causing 53% of high-intent visitors to bounce immediately.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Generic WordPress / theme builders</strong> that dilute brand credibility and fail to command premium pricing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Monolithic architecture bottlenecks</strong> that crash during marketing campaigns and product launches.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Poor WCAG compliance & SEO penalties</strong> due to bloated third-party plugin scripts.</span>
                </li>
              </ul>
            </div>

            {/* The GB Technologies Flagship (The Solution) */}
            <div className="rounded-2xl border border-[var(--border-gold)] bg-[var(--surface-base)] p-6 sm:p-8 space-y-6 shadow-md gold-shimmer-border">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--accent-primary)]">
                  The GB Technologies Flagship
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">Sub-Second & Conversion-Optimized</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Bespoke Decoupled Digital Engine
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant &lt;0.8s edge rendering</strong> keeping 95%+ of visitors engaged with sub-second fluid page transitions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Master-crafted warm luxury design</strong> establishing instant institutional trust and elevated brand prestige.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Next.js App Router + Headless Django REST API</strong> that effortlessly scales to millions of requests without slowdown.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed 100/100 Core Web Vitals & WCAG 2.2 AA</strong> accessibility out of the box.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CAPABILITIES BENTO GRID (Warm Champagne & Gold Shimmer Craft) */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-24 bg-[var(--surface-base)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="accent">Master-Crafted Capabilities</Badge>
            <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
              Engineering Every Layer for Performance and Commercial Impact
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              We combine world-class UI design, fluid typography, and enterprise-grade decoupled software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Digital Flagships */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <Gauge className="h-5 w-5" />
                </div>
                <CardTitle>High-Conversion Digital Flagships</CardTitle>
                <CardDescription>
                  Designed for category leaders. We build flagship marketing web experiences that pair world-class aesthetics with extreme performance to maximize inbound conversion rates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-[var(--surface-raised)] p-4 text-xs font-mono text-[var(--text-secondary)] space-y-2 border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 font-semibold">
                    <span>Google Lighthouse Audit: 100 / 100 / 100 / 100</span>
                    <span className="text-emerald-600">PASSED</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-sans">
                    <div className="bg-[var(--surface-base)] p-2 rounded border border-[var(--border-subtle)]">
                      <div className="text-sm font-bold text-emerald-600">0.6s</div>
                      <div className="text-[10px] text-[var(--text-muted)]">FCP (Instant)</div>
                    </div>
                    <div className="bg-[var(--surface-base)] p-2 rounded border border-[var(--border-subtle)]">
                      <div className="text-sm font-bold text-emerald-600">0.9s</div>
                      <div className="text-[10px] text-[var(--text-muted)]">LCP (Hero Render)</div>
                    </div>
                    <div className="bg-[var(--surface-base)] p-2 rounded border border-[var(--border-subtle)]">
                      <div className="text-sm font-bold text-emerald-600">0.00</div>
                      <div className="text-[10px] text-[var(--text-muted)]">CLS (Zero Shift)</div>
                    </div>
                    <div className="bg-[var(--surface-base)] p-2 rounded border border-[var(--border-subtle)]">
                      <div className="text-sm font-bold text-emerald-600">32ms</div>
                      <div className="text-[10px] text-[var(--text-muted)]">INP (Response)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 2: Bespoke Full-Stack Web Apps */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle>Bespoke Web Applications</CardTitle>
                <CardDescription>
                  Custom client portals, SaaS interfaces, and internal dashboards built with strict TypeScript contracts and real-time state.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Next.js 16 + React 19 Server Components</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Django REST Framework API Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>HttpOnly Cookie JWT Authentication</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 3: Headless Modernization */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <CardTitle>Headless Decoupling</CardTitle>
                <CardDescription>
                  Safely migrate away from bloated monoliths and legacy CMS setups using the Strangler pattern with zero downtime.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Zero Database Migration Downtime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Full SEO & 301 URL Preservation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  <span>Incremental Route-by-Route Cutover</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 4: Conversion Optimization */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle>Conversion Rate Optimization Architecture</CardTitle>
                <CardDescription>
                  Every layout, contrast ratio, and CTA positioning is grounded in cognitive usability science. We design clear visual paths that guide visitors to action without friction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--text-primary)]">60-30-10</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Visual Focus Balance</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--accent-primary)]">11.2 : 1</div>
                    <div className="text-[11px] text-[var(--text-muted)]">AAA Text Contrast</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-emerald-600">Zero Shift</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Visual Stability (CLS)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE REVENUE & CONVERSION CALCULATOR */}
      {/* ========================================================================= */}
      <section id="calculator" className="py-24 bg-[var(--canvas)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="accent">Interactive ROI Estimator</Badge>
            <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
              Calculate the Revenue Impact of a Sub-Second Web Flagship
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Adjust your current traffic and conversion parameters to see how a +45% conversion lift from sub-second speed directly accelerates your annual revenue.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-10 border border-[var(--border-gold)] shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders on Left */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider 1: Monthly Visitors */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[var(--text-primary)]">Monthly Unique Visitors</span>
                    <span className="text-[var(--accent-primary)] font-mono font-bold">
                      {monthlyVisitors.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={250000}
                    step={5000}
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-raised)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                  />
                  <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                    <span>5,000</span>
                    <span>100,000</span>
                    <span>250,000+</span>
                  </div>
                </div>

                {/* Slider 2: Current Conversion Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[var(--text-primary)]">Current Website Conversion Rate</span>
                    <span className="text-[var(--accent-primary)] font-mono font-bold">
                      {currentConversionRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={6.0}
                    step={0.1}
                    value={currentConversionRate}
                    onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-raised)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                  />
                  <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                    <span>0.5% (Subpar)</span>
                    <span>2.0% (Average)</span>
                    <span>6.0% (High)</span>
                  </div>
                </div>

                {/* Slider 3: Average Order / Customer Value */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[var(--text-primary)]">Average Deal / Customer Value</span>
                    <span className="text-[var(--accent-primary)] font-mono font-bold">
                      ${averageDealValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={5000}
                    step={100}
                    value={averageDealValue}
                    onChange={(e) => setAverageDealValue(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--surface-raised)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                  />
                  <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                    <span>$100</span>
                    <span>$2,500</span>
                    <span>$5,000+</span>
                  </div>
                </div>
              </div>

              {/* Output Metric on Right */}
              <div className="lg:col-span-5 rounded-xl bg-[var(--surface-raised)] p-6 text-center space-y-4 border border-[var(--border-subtle)]">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Projected Annual Revenue Lift
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[var(--accent-primary)] font-mono tracking-tight">
                  +${Math.round(annualRevenueGain).toLocaleString()}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Based on an average <strong>+45% conversion lift</strong> from eliminating load latency, reducing cognitive friction, and establishing luxury visual authority.
                </p>
                <div className="pt-2">
                  <a href="#audit">
                    <Button variant="glow" size="sm" className="w-full font-bold">
                      Claim Your Audit
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE STRATEGY AUDIT & GET STARTED FORM */}
      {/* ========================================================================= */}
      <section id="audit" className="py-24 bg-[var(--surface-base)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="accent">Executive Technical Audit</Badge>
              <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
                Ready to Stop Looking Ordinary and Start Converting?
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Schedule a confidential strategy session with our Principal Designers & Staff Engineers. We will analyze your existing website, audit your Core Web Vitals, and provide an actionable architectural plan to unlock pipeline.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Strict enterprise NDA prior to any discovery call</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Comprehensive Core Web Vitals & CRO Audit Report</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Guaranteed response within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="lg:col-span-7">
              <Card className="glass-card shadow-lg p-2 sm:p-4 border-[var(--border-gold)]">
                <CardHeader>
                  <CardTitle>Schedule Your Strategy Session</CardTitle>
                  <CardDescription>
                    Fill in your project context below to connect directly with our engineering leadership.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formStatus === "success" ? (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center space-y-3">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        Audit Request Confirmed
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                        Thank you for reaching out to GB Technologies. A Principal Architect has received your request and will follow up with our bilateral NDA and proposed meeting slots within 24 business hours.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormStatus("idle")}
                        className="mt-4"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formStatus === "error" && (
                        <div className="rounded-md border border-[var(--status-destructive)]/30 bg-[var(--status-destructive)]/10 p-3 text-xs text-[var(--status-destructive)]">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          placeholder="e.g. Jonathan Vance"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                          label="Corporate Email"
                          type="email"
                          placeholder="jonathan@enterprise.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Organization / Brand"
                          placeholder="Acme Technologies Corp."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                            Primary Initiative
                          </label>
                          <select
                            value={formData.service_interest}
                            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
                          >
                            <option value="Digital Flagship">High-Conversion Digital Flagship</option>
                            <option value="Bespoke Web App">Bespoke Full-Stack Web Application</option>
                            <option value="Decoupled Modernization">Decoupled Headless Modernization</option>
                            <option value="Performance CRO Audit">Core Web Vitals & Conversion Audit</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Project Parameters & Challenges
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe your current website platform, conversion bottlenecks, target launch timeline, or specific engineering needs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="flex w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full gap-2 font-bold py-6 text-base"
                        isLoading={formStatus === "loading"}
                      >
                        <span>Request Architecture Audit</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
