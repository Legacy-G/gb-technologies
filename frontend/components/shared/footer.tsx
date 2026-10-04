import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-base)] text-[var(--text-secondary)] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)] shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">
                GB <span className="text-[var(--accent-primary)]">Technologies</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Engineering high-converting digital flagships, decoupled web platforms, and bespoke applications for organizations where speed and visual mastery drive enterprise value.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>Core Web Vitals & Sub-Second Speed Guaranteed</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#capabilities" className="hover:text-[var(--text-primary)] transition-colors">
                  High-Conversion Digital Flagships
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="hover:text-[var(--text-primary)] transition-colors">
                  Bespoke Full-Stack Web Apps
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="hover:text-[var(--text-primary)] transition-colors">
                  Decoupled Headless Modernization
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-[var(--text-primary)] transition-colors">
                  Speed & Revenue Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Client Portal & Delivery
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-[var(--text-primary)] transition-colors">
                  Client Delivery Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-[var(--text-primary)] transition-colors">
                  Onboarding & New Project
                </Link>
              </li>
              <li>
                <Link href="/#roi-gap" className="hover:text-[var(--text-primary)] transition-colors">
                  The Conversion ROI Gap
                </Link>
              </li>
              <li>
                <Link href="/#audit" className="hover:text-[var(--text-primary)] transition-colors">
                  Schedule Technical Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Quality & Guarantees
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>&lt; 0.8s First Contentful Paint</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>100% WCAG 2.2 AA Accessibility</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>Strict Enterprise NDA Protection</span>
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
              Security Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
