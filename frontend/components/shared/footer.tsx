import Link from "next/link";
import { Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-base)] text-[var(--text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)]">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">
                GB <span className="text-[var(--accent-primary)]">Technologies</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Architecting mission-critical cloud infrastructure, cyber resilience, and high-performance digital platforms.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.999% SLA)</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#solutions" className="hover:text-[var(--text-primary)] transition-colors">
                  Enterprise Cloud Migration
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[var(--text-primary)] transition-colors">
                  Zero-Trust Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[var(--text-primary)] transition-colors">
                  Microservices Architecture
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[var(--text-primary)] transition-colors">
                  Real-time Data Telemetry
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-[var(--text-primary)] transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-[var(--text-primary)] transition-colors">
                  Create Enterprise Account
                </Link>
              </li>
              <li>
                <Link href="/#metrics" className="hover:text-[var(--text-primary)] transition-colors">
                  System Telemetry & Health
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Schedule Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Compliance & Security
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>ISO 27001 Aligned Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>GDPR & HIPAA Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} GB Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-[var(--text-primary)]">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-[var(--text-primary)]">
              Terms of Service
            </Link>
            <Link href="/legal/security" className="hover:text-[var(--text-primary)]">
              Security Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
