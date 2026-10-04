"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import {
  ShieldCheck,
  Cloud,
  Layers,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Globe2,
} from "lucide-react";

export default function HomePage() {
  // Contact Form State
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    service_interest: "Cloud Infrastructure",
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
        service_interest: "Cloud Infrastructure",
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
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent-glow)] blur-[120px] opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            {/* Announcement Badge */}
            <Badge variant="accent" className="gap-2 py-1.5 px-3.5 text-xs font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>Announcing GB Enterprise Platform 3.0</span>
            </Badge>

            {/* Display H1 Typography */}
            <h1 className="text-fluid-hero font-extrabold text-[var(--text-primary)]">
              Architecting Resilient Cloud & High-Velocity Digital Systems
            </h1>

            {/* Lead Narrative */}
            <p className="text-fluid-body text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We design, build, and optimize mission-critical cloud infrastructure, zero-trust security mesh, and decoupled full-stack platforms engineered for 99.999% uptime.
            </p>

            {/* Hero Action CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a href="#contact">
                <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2">
                  <span>Schedule Technical Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#solutions">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Capabilities
                </Button>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[var(--text-muted)] w-full max-w-3xl border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Activity className="h-4 w-4 text-[var(--status-success)]" />
                <span>99.999% SLA Uptime</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Sub-50ms Global Edge</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe2 className="h-4 w-4 text-blue-500" />
                <span>Multi-Cloud Scalability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUANTIFIABLE METRICS RIBBON */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-12 bg-[var(--surface-base)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--accent-primary)]">
                99.999%
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Enterprise SLA Availability
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
                -42%
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Average Cloud Cost Reduction
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--accent-primary)]">
                10x
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Deployment Frequency Velocity
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
                &lt; 50ms
              </div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Median Global API Latency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CAPABILITIES BENTO GRID */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-24 bg-[var(--canvas)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="default">Enterprise Capabilities</Badge>
            <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
              Engineered for Scale, Security, and Predictability
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Explore how our core engineering practices accelerate product delivery while enforcing ironclad resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Cloud Architecture */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-2">
                  <Cloud className="h-5 w-5" />
                </div>
                <CardTitle>Autonomous Multi-Cloud Infrastructure</CardTitle>
                <CardDescription>
                  Automate provisioning with Terraform, Kubernetes orchestration, and serverless compute meshes that dynamically auto-scale with traffic spikes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-[var(--surface-raised)] p-4 text-xs font-mono text-[var(--text-secondary)] space-y-1 border border-[var(--border-subtle)]">
                  <div className="text-emerald-500 font-semibold">$ terraform apply -auto-approve</div>
                  <div>+ cluster.eks.us-east-1 (Nodes: 12, AutoScaler: Active)</div>
                  <div>+ cdn.edge_routes (Cache hit ratio: 98.4%)</div>
                  <div className="text-[var(--text-muted)]">Apply complete! Resources: 24 added, 0 destroyed.</div>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 2: Zero-Trust Security */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mb-2">
                  <Lock className="h-5 w-5" />
                </div>
                <CardTitle>Zero-Trust Security Mesh</CardTitle>
                <CardDescription>
                  Continuous authentication, micro-segmentation, and end-to-end cryptographic enforcement across all services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>mTLS Service Communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Automated Key Rotation (24h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>SIEM Real-time Threat Analysis</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 3: Microservices */}
            <Card className="glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle>Decoupled Microservices</CardTitle>
                <CardDescription>
                  Isolate business domains into fast, maintainable services powered by event buses and asynchronous queues.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>Kafka & RabbitMQ Pipelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>GraphQL & REST API Gateways</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 4: Observability */}
            <Card className="md:col-span-2 glass-card hover:border-[var(--accent-primary)]/40 transition-all">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 mb-2">
                  <Cpu className="h-5 w-5" />
                </div>
                <CardTitle>Intelligent Telemetry & Instant Observability</CardTitle>
                <CardDescription>
                  Deep tracing across every request lifecycle with automated incident detection and predictive anomaly alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--text-primary)]">0.02ms</div>
                    <div className="text-[11px] text-[var(--text-muted)]">DNS Resolution</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-emerald-500">100%</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Health Checks</div>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-raised)] p-3 border border-[var(--border-subtle)]">
                    <div className="text-lg font-bold text-[var(--accent-primary)]">24 / 7</div>
                    <div className="text-[11px] text-[var(--text-muted)]">On-call SRE Coverage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE AUDIT BOOKING & CONTACT */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 bg-[var(--surface-base)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="accent">Technical Advisory</Badge>
              <h2 className="text-fluid-h2 font-bold text-[var(--text-primary)]">
                Ready to Modernize Your Enterprise Architecture?
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Connect directly with our Principal Architects. We will conduct an architectural review of your existing stack, diagnose latency bottlenecks, and deliver an actionable modernization roadmap.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Confidentiality guaranteed via enterprise NDA</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Zero-obligation technical assessment report</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Direct response within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="lg:col-span-7">
              <Card className="glass-card shadow-lg p-2 sm:p-4">
                <CardHeader>
                  <CardTitle>Schedule an Architectural Audit</CardTitle>
                  <CardDescription>
                    Provide your system parameters below to connect with our technical leadership team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formStatus === "success" ? (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center space-y-3">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                        Thank you for reaching out. A Senior Technical Advisor has been assigned to your request and will contact you within 24 business hours.
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
                          placeholder="e.g. Dr. Alan Turing"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                          label="Corporate Email"
                          type="email"
                          placeholder="alan@organization.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Organization / Company"
                          placeholder="Enterprise Ltd."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                            Primary Focus Area
                          </label>
                          <select
                            value={formData.service_interest}
                            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-[var(--border-subtle)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
                          >
                            <option value="Cloud Infrastructure">Cloud Infrastructure & Migration</option>
                            <option value="Zero-Trust Cybersecurity">Zero-Trust Cybersecurity</option>
                            <option value="Full-Stack Modernization">Full-Stack Decoupled Modernization</option>
                            <option value="DevOps & Reliability">DevOps & 24/7 SRE Observability</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Project Context / Infrastructure Notes
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Briefly describe your current architecture, cloud provider, and primary technical challenges..."
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
                        <span>Submit Architecture Scoping Request</span>
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
