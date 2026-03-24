"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import ApplicationsTable from "@/components/ApplicationsTable";
import {
  Search,
  Loader2,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

const filters = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState<any>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filter) params.status = filter;
      if (search) params.search = search;

      const [appRes, statsRes] = await Promise.all([
        api.get("/admin/applications", { params }),
        api.get("/admin/stats"),
      ]);

      if (appRes.data.success) {
        setApplications(appRes.data.data.applications);
        setTotal(appRes.data.data.total);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const statCards = stats
    ? [
        { label: "Total", value: stats.totalApplications, icon: FileText, color: "text-offwhite" },
        { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-400" },
        { label: "Approved", value: stats.approved, icon: CheckCircle2, color: "text-primary" },
        { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-400" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Applications</h1>
        <p className="text-sm text-offwhite/50">
          Review and manage KYC applications
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <div key={i} className="card flex items-center gap-4">
              <div className="bg-dark rounded-input p-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-offwhite/40">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`text-sm py-1.5 px-4 rounded-full transition-colors ${
                filter === f.value
                  ? "bg-primary text-offwhite"
                  : "bg-dark-card border border-dark-border text-offwhite/50 hover:text-offwhite"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-offwhite/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
            placeholder="Search by name..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <ApplicationsTable applications={applications} />
        )}
      </div>

      {!loading && (
        <p className="text-xs text-offwhite/30 text-center">
          Showing {applications.length} of {total} applications
        </p>
      )}
    </div>
  );
}
