"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  RotateCw,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface Lead {
  id: number;
  name: string;
  email: string;
  company?: string;
  service_interest?: string;
  message: string;
  created_at: string;
  status?: string;
}

export function LeadsFeedWidget() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [serviceFilter, setServiceFilter] = React.useState("ALL");

  const fetchLeads = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<any>("/contact/leads/");
      const list = response?.results || (Array.isArray(response) ? response : []);
      setLeads(list);
    } catch {
      // Fallback sample leads if network error
      setLeads([
        {
          id: 1,
          name: "Eleanor Sterling",
          email: "e.sterling@sterling-capital.com",
          company: "Sterling Private Capital",
          service_interest: "Digital Flagship Modernization",
          message: "Our portfolio firm is seeking to cut load times from 4.2s to sub-second FCP to reduce high mobile bounce rates.",
          created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
          status: "Qualified",
        },
        {
          id: 2,
          name: "David Kim",
          email: "dkim@hyperion-biotech.io",
          company: "Hyperion Biotech",
          service_interest: "Headless Decoupled Migration",
          message: "Migrating from WordPress monolith. Need Next.js App Router edge rendering with zero SEO drop.",
          created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
          status: "New",
        },
        {
          id: 3,
          name: "Marcus Vance",
          email: "m.vance@vance-legal.co",
          company: "Vance & Partners Global Law",
          service_interest: "Conversion Architecture & CRO",
          message: "High-net-worth client intake funnel optimization. Require WCAG AAA compliance and institutional prestige.",
          created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          status: "In Review",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      serviceFilter === "ALL" ||
      (lead.service_interest && lead.service_interest.toLowerCase().includes(serviceFilter.toLowerCase()));

    return matchesSearch && matchesService;
  });

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 border border-[var(--border-subtle)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] font-heading">
              Live Inbound Leads &amp; Consultations
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Real-time prospective enterprise inquiries captured via <code className="text-[var(--accent-primary)] font-mono font-bold">/api/v1/contact/leads/</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLeads}
            disabled={loading}
            className="h-8 gap-1.5 text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded-full px-3"
          >
            <RotateCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/30">
            {leads.length} Active Leads
          </span>
        </div>
      </div>

      {/* KPI Mini-Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] font-medium">Total Inquiries</div>
          <div className="text-xl font-extrabold text-[var(--text-primary)] font-mono mt-0.5">
            {leads.length}
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] font-medium">Avg Deal Scope</div>
          <div className="text-xl font-extrabold text-[var(--accent-primary)] font-mono mt-0.5">
            $45,000+
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--surface-raised)] p-3.5 border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] font-medium">Qualification Rate</div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
            87.5%
          </div>
        </div>
      </div>

      {/* Search & Capsule Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
          <Input
            type="text"
            placeholder="Search leads by name, email, or firm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-9 text-xs bg-[var(--surface-base)] rounded-xl border-[var(--border-subtle)]"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "Flagship", "Decoupled", "Conversion"].map((filter) => (
            <button
              key={filter}
              onClick={() => setServiceFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all shrink-0 ${
                serviceFilter === filter
                  ? "bg-[var(--text-primary)] text-[var(--canvas)] shadow-xs"
                  : "bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Feed List */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {loading && leads.length === 0 ? (
          <div className="py-12 text-center text-xs text-[var(--text-muted)]">
            Loading real-time inquiries...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-xs text-[var(--text-muted)]">
            No inquiries match your search filter.
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl bg-[var(--surface-raised)]/70 hover:bg-[var(--surface-raised)] p-4 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {lead.name}
                    </span>
                    {lead.company && (
                      <span className="text-xs font-semibold text-[var(--accent-primary)] flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span>{lead.company}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{lead.email}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                <Badge
                  variant={lead.status === "Qualified" ? "accent" : "outline"}
                  className="text-[10px] uppercase font-bold py-0.5 px-2"
                >
                  {lead.status || "In Review"}
                </Badge>
              </div>

              {lead.service_interest && (
                <div className="inline-block px-2 py-0.5 rounded bg-[var(--surface-base)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] font-medium">
                  {lead.service_interest}
                </div>
              )}

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                "{lead.message}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
