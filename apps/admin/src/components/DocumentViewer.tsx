"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";

interface DocumentViewerProps {
  s3Key: string;
  label: string;
}

export default function DocumentViewer({ s3Key, label }: DocumentViewerProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const { data } = await api.get(
          `/upload/document/${encodeURIComponent(s3Key)}`
        );
        if (data.success) {
          setUrl(data.data.url);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUrl();
  }, [s3Key]);

  if (loading) {
    return (
      <div className="card flex items-center justify-center h-48">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="card flex items-center justify-center h-48 text-offwhite/40 text-sm">
        Failed to load document
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-offwhite/70">{label}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            className="p-1 rounded hover:bg-dark-border transition-colors"
          >
            <ZoomOut className="h-4 w-4 text-offwhite/50" />
          </button>
          <span className="text-xs text-offwhite/40">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="p-1 rounded hover:bg-dark-border transition-colors"
          >
            <ZoomIn className="h-4 w-4 text-offwhite/50" />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-dark-border transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-offwhite/50" />
          </a>
        </div>
      </div>
      <div className="overflow-auto bg-dark rounded-input max-h-80">
        <img
          src={url}
          alt={label}
          className="transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        />
      </div>
    </div>
  );
}
