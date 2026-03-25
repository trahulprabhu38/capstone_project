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
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  const [gameUrl, setGameUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [configRes, statsRes] = await Promise.all([
          api.get("/admin/config"),
          api.get("/admin/stats"),
        ]);

        if (configRes.data.success) {
          setGameUrl(configRes.data.data.gameUrl || "");
          setSavedUrl(configRes.data.data.gameUrl || "");
        }
        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
      } catch {
        // handle error
      } finally {
        setLoadingConfig(false);
      }
    }
    fetchData();
  }, []);

  const handleSaveUrl = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const { data } = await api.put("/admin/config", { gameUrl });
      if (data.success) {
        setSavedUrl(gameUrl);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      setSaveError(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = gameUrl !== savedUrl;

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
          The URL users will be redirected to after KYC approval. This is stored
          in the database and takes effect immediately.
        </p>

        {loadingConfig ? (
          <div className="flex items-center gap-2 text-offwhite/40 text-sm py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading current configuration...
          </div>
        ) : (
          <>
            <div className="flex gap-3">
              <input
                type="url"
                value={gameUrl}
                onChange={(e) => {
                  setGameUrl(e.target.value);
                  setSaveError("");
                  setSaveSuccess(false);
                }}
                className="input-field flex-1"
                placeholder="https://your-game.com"
              />
              <button
                onClick={handleSaveUrl}
                disabled={saving || !gameUrl.trim()}
                className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </button>
            </div>

            {saveSuccess && (
              <div className="flex items-center gap-2 text-primary text-sm">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Game URL saved successfully. Changes take effect immediately.
              </div>
            )}

            {saveError && (
              <div className="text-red-400 text-sm">{saveError}</div>
            )}

            {savedUrl && (
              <div className="flex items-center gap-2 text-xs text-offwhite/30 pt-1">
                <ExternalLink className="h-3 w-3" />
                Current URL:{" "}
                <a
                  href={savedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/60 hover:text-primary underline truncate max-w-sm"
                >
                  {savedUrl}
                </a>
              </div>
            )}

            {!savedUrl && (
              <div className="text-yellow-400/70 text-xs">
                No game URL is configured yet. Users will not be able to launch the game.
              </div>
            )}
          </>
        )}
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
