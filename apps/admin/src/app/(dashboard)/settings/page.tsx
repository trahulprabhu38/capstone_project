"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Gamepad2,
  Save,
  Loader2,
  BarChart3,
  Users,
  FileText,
} from "lucide-react";

export default function SettingsPage() {
  const [gameUrl, setGameUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("/admin/stats");
        if (data.success) {
          setStats(data.data);
        }
      } catch {
        // handle error
      }
    }
    fetchData();
    setGameUrl(process.env.NEXT_PUBLIC_GAME_URL || "");
  }, []);

  const handleSaveUrl = async () => {
    setSaving(true);
    // Reason: game URL config would require an additional endpoint or DB collection
    // This is a placeholder — in production, save to a config collection via API
    setTimeout(() => {
      setSaving(false);
      alert("Game URL configuration saved (placeholder — implement config API)");
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
        <p className="text-sm text-offwhite/50">
          Configure platform settings and view system stats
        </p>
      </div>

      {/* Game URL Config */}
      <div className="card space-y-4">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <h2 className="font-heading font-semibold">WebGL Game URL</h2>
        </div>
        <p className="text-sm text-offwhite/50">
          The URL users will be redirected to after KYC approval.
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            value={gameUrl}
            onChange={(e) => setGameUrl(e.target.value)}
            className="input-field flex-1"
            placeholder="https://your-game.com"
          />
          <button
            onClick={handleSaveUrl}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* System Stats */}
      {stats && (
        <div className="card space-y-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="font-heading font-semibold">System Statistics</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark rounded-input p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-offwhite/40" />
                <span className="text-xs text-offwhite/40">Total Users</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-dark rounded-input p-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-offwhite/40" />
                <span className="text-xs text-offwhite/40">
                  Total Applications
                </span>
              </div>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
            </div>
            <div className="bg-dark rounded-input p-4">
              <span className="text-xs text-offwhite/40">Pending</span>
              <p className="text-xl font-bold text-yellow-400">
                {stats.pending}
              </p>
            </div>
            <div className="bg-dark rounded-input p-4">
              <span className="text-xs text-offwhite/40">Under Review</span>
              <p className="text-xl font-bold text-blue-400">
                {stats.underReview}
              </p>
            </div>
            <div className="bg-dark rounded-input p-4">
              <span className="text-xs text-offwhite/40">Approved</span>
              <p className="text-xl font-bold text-primary">{stats.approved}</p>
            </div>
            <div className="bg-dark rounded-input p-4">
              <span className="text-xs text-offwhite/40">Rejected</span>
              <p className="text-xl font-bold text-red-400">
                {stats.rejected}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
