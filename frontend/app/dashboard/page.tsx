"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CrextioDashboardView } from "@/components/dashboard/crextio-dashboard-view";
import { FundViewMonitoringView } from "@/components/dashboard/fundview-monitoring-view";
import { LeadsFeedWidget } from "@/components/dashboard/leads-feed-widget";
import { ProjectMilestonesWidget } from "@/components/dashboard/project-milestones-widget";
import { VitalsMonitorWidget } from "@/components/dashboard/vitals-monitor-widget";
import { ProfileKycView } from "@/components/dashboard/profile-kyc-view";

type DashboardTab = "crextio" | "fundview" | "leads" | "milestones" | "profile";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = (searchParams.get("view") as DashboardTab) || "crextio";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Dynamic View Rendering based on Header Capsule Navigation */}
      {currentView === "crextio" && (
        <CrextioDashboardView
          onSwitchToMonitoring={() => router.push("/dashboard?view=fundview")}
        />
      )}

      {currentView === "fundview" && (
        <FundViewMonitoringView />
      )}

      {currentView === "leads" && (
        <div className="space-y-6">
          <LeadsFeedWidget />
        </div>
      )}

      {currentView === "milestones" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ProjectMilestonesWidget />
            </div>
            <div className="lg:col-span-5">
              <VitalsMonitorWidget />
            </div>
          </div>
        </div>
      )}

      {currentView === "profile" && (
        <ProfileKycView />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={<div className="h-64 flex items-center justify-center text-xs text-[var(--text-muted)] font-mono">Loading Executive Hub...</div>}>
      <DashboardContent />
    </React.Suspense>
  );
}
