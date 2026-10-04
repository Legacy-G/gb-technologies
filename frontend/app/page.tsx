"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import {
  ShieldCheck,
  Layers,
  Code2,
  Users2,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Award,
  Terminal,
} from "lucide-react";

export default function HomePage() {
  // Executive Briefing Form State
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    service_interest: "Legacy Modernization",
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
        service_interest: "Legacy Modernization",
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
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 border-b border-[var(--border-subtle)]">
        {/* Subtle Ambient Radial Glow (Royal Indigo) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-[var(--accent-glow)] blur-[140px] opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            {/* Announcement Badge */}
            <Badge variant="accent" className="gap-2 py-1.5 px-4 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>Enterprise Digital Transformation & Custom Engineering</span>
            </Badge>

            {/* Display H1 Typography */}
            <h1 className="text-fluid-hero font-extrabold text-[var(--text-primary)]">
              Transforming Complex Enterprise Systems into High-Performance Digital Engines
            </h1>

            {/* Lead Narrative */}
            <p className="text-fluid-body text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We partner with forward-thinking enterprise leaders to engineer bespoke software, safely decouple legacy monolithic architectures, and deploy dedicated senior engineering pods with predictable milestone delivery.
            </p>

            {/* Hero Action CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a href="#briefing">
                <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2">
                  <span>Schedule Executive Briefing</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#services">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Engineering Practices
                </Button>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[var(--text-muted)] w-full max-w-3xl border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4 text-[var(--status-success)]" />
                <span>99.4% On-Time Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-500" />
                <span>$2.4B+ Value Delivered</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users2 className="h-4 w-4 text-blue-500" />
                <span>Senior Staff Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUANTIFIABLE ENTERPRISE IMPACT RIBBON */}
      {/* ========================================================================= */}
      <section id="impact" className="py-12 bg-[var(--surface-base)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--accent-primary)]">
                $2.4B+
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Enterprise Transaction Volume
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
                -65%
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Technical Debt & Defect Reduction
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--accent-primary)]">
                4.8x
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Accelerated Feature Velocity
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
                100%
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Enterprise Client Retention
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE ENGINEERING PRACTICES BENTO GRID */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 bg-[var(--canvas)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="default">Core Engineering Practices</Badge>
            <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
              Transforming Architecture into Strategic Advantage
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              From de-risking legacy migrations to building high-concurrency custom platforms, our practices ensure institutional excellence at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Legacy Monolith Modernization */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <Workflow className="h-5 w-5" />
                </div>
                <CardTitle>Legacy Monolith Modernization & Decoupling</CardTitle>
                <CardDescription>
                  De-risk high-stakes system overhauls using the Strangler Fig pattern. We extract bounded contexts into headless API services and modern edge frontends with zero operational downtime.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-[var(--surface-raised)] p-4 text-xs font-mono text-[var(--text-secondary)] space-y-1.5 border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>strangler-proxy: routing audit matrix</span>
                  </div>
                  <div>[PROXY] /api/v1/auth/*        -&gt; [Headless Django REST Service: Healthy]</div>
                  <div>[PROXY] /dashboard/*          -&gt; [Next.js App Router (React 19): Healthy]</div>
                  <div>[FALLBACK] /legacy/billing/*   -&gt; [Original Monolith: Target Cutover Sprint 3]</div>
                  <div className="text-emerald-500 font-medium">✓ Zero session drift detected. 100% traffic parity maintained.</div>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 2: Custom Enterprise Software */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 mb-2">
                  <Code2 className="h-5 w-5" />
                </div>
                <CardTitle>Bespoke Full-Stack Engineering</CardTitle>
                <CardDescription>
                  Custom mission-critical software built with strict TypeScript contracts, domain-driven design, and resilient state synchronization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Type-Safe Next.js & DRF Stacks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Micro-Frontends & Design Tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Automated CI/CD Quality Gates</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 3: Architecture & DDD */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle>Domain-Driven Architecture</CardTitle>
                <CardDescription>
                  Establish clear bounded contexts, event-driven domain models, and long-term architectural blueprints that scale with organizational growth.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>Event Storming & Domain Modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>Technical Due Diligence Audits</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 4: Dedicated Engineering Pods */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 mb-2">
                  <Users2 className="h-5 w-5" />
                </div>
                <CardTitle>Dedicated Senior Engineering Pods</CardTitle>
                <CardDescription>
                  Autonomous, self-directed delivery teams composed of Principal Architects, Senior Full-Stack Engineers, and QA specialists who integrate directly into your engineering workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--text-primary)]">Sprint-Based</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Predictable Velocity</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-emerald-500">Zero Onboarding Lag</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Day 1 Production Ready</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--accent-primary)]">Staff+ Only</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Elite Engineering Talent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE EXECUTIVE BRIEFING & CONSULTATION */}
      {/* ========================================================================= */}
      <section id="briefing" className="py-24 bg-[var(--surface-base)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="accent">Executive Advisory</Badge>
              <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
                Schedule an Architectural Discovery Session
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Connect directly with our Principal Architects and Practice Leads. We will review your modernization objectives, evaluate legacy technical debt, and present a risk-mitigated technical roadmap tailored to your business timeline.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Strict Enterprise NDA prior to any technical disclosure</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Tailored Technical Architecture Scoping Document</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Executive response within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="lg:col-span-7">
              <Card className="glass-card shadow-lg p-2 sm:p-4">
                <CardHeader>
                  <CardTitle>Request Executive Briefing</CardTitle>
                  <CardDescription>
                    Provide your initiative parameters below to connect directly with our practice leadership.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formStatus === "success" ? (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center space-y-3">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        Briefing Request Received
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                        Thank you for contacting GB Technologies. A Principal Consultant has been assigned to your inquiry and will reach out with our standard bilateral NDA and availability within 24 business hours.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormStatus("idle")}
                        className="mt-4"
                      >
                        Submit Another Request
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
                          placeholder="e.g. Elena Rostova"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                          label="Corporate Email"
                          type="email"
                          placeholder="elena@enterprise.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Enterprise / Organization"
                          placeholder="Global Technologies Corp."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                            Primary Engagement Area
                          </label>
                          <select
                            value={formData.service_interest}
                            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
                          >
                            <option value="Legacy Modernization">Legacy System Modernization & Decoupling</option>
                            <option value="Bespoke Software Development">Bespoke Full-Stack Software Engineering</option>
                            <option value="Dedicated Engineering Pod">Dedicated Senior Engineering Pod</option>
                            <option value="Enterprise Architecture Advisory">Enterprise Architecture & DDD Advisory</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Initiative Context & Timeline
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Briefly describe your existing application stack, technical debt bottlenecks, target outcomes, or planned delivery milestones..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="flex w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full gap-2"
                        isLoading={formStatus === "loading"}
                      >
                        <span>Schedule Executive Briefing</span>
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
