import Link from "next/link";
import { Layers, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-base)] text-[var(--text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)]">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">
                GB <span className="text-[var(--accent-primary)]">Technologies</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Transforming complex enterprise systems into high-performance, maintainable digital engines through modern decoupled engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-500 dark:text-indigo-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>Enterprise Delivery Excellence — On-Time & In-Budget</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Core Practices
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-[var(--text-primary)] transition-colors">
                  Legacy System Modernization
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[var(--text-primary)] transition-colors">
                  Bespoke Enterprise Software
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[var(--text-primary)] transition-colors">
                  Decoupled Web & Mobile Platforms
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[var(--text-primary)] transition-colors">
                  Dedicated Senior Engineering Pods
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Engagement & Portal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-[var(--text-primary)] transition-colors">
                  Client Delivery Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-[var(--text-primary)] transition-colors">
                  Client Account Registration
                </Link>
              </li>
              <li>
                <Link href="/#impact" className="hover:text-[var(--text-primary)] transition-colors">
                  Enterprise Value Metrics
                </Link>
              </li>
              <li>
                <Link href="/#briefing" className="hover:text-[var(--text-primary)] transition-colors">
                  Request Executive Briefing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Trust & Governance
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>ISO 27001 Information Security</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>SOC 2 Type II Aligned Auditing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>Zero IP Leakage NDA Protocol</span>
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
              Terms of Engagement
            </Link>
            <Link href="/legal/security" className="hover:text-[var(--text-primary)]">
              Security Governance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
