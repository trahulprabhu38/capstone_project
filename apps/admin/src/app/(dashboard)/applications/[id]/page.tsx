"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import ApplicationDetail from "@/components/ApplicationDetail";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplication() {
      try {
        const { data } = await api.get(`/admin/applications/${id}`);
        if (data.success) {
          setApplication(data.data);
        } else {
          setError(data.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [id]);

  const handleApprove = async () => {
    const { data } = await api.patch(`/admin/applications/${id}`, {
      status: "APPROVED",
    });
    if (data.success) {
      setApplication(data.data);
    }
  };

  const handleReject = async (remarks: string) => {
    const { data } = await api.patch(`/admin/applications/${id}`, {
      status: "REJECTED",
      adminRemarks: remarks,
    });
    if (data.success) {
      setApplication(data.data);
    }
  };

  const getUserId = () => {
    const u = application?.userId;
    return typeof u === "object" ? u._id : u;
  };

  const handleBlock = async (reason: string) => {
    const userId = getUserId();
    if (!userId) return;
    const { data } = await api.patch(`/admin/users/${userId}/block`, { reason });
    if (data.success) {
      setApplication((prev: any) => ({
        ...prev,
        userId: typeof prev.userId === "object"
          ? { ...prev.userId, isBlocked: true, blockReason: reason, blockedAt: new Date().toISOString() }
          : prev.userId,
      }));
    }
  };

  const handleUnblock = async () => {
    const userId = getUserId();
    if (!userId) return;
    const { data } = await api.patch(`/admin/users/${userId}/unblock`);
    if (data.success) {
      setApplication((prev: any) => ({
        ...prev,
        userId: typeof prev.userId === "object"
          ? { ...prev.userId, isBlocked: false, blockReason: undefined, blockedAt: undefined }
          : prev.userId,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => router.back()} className="btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-offwhite/50 hover:text-offwhite transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </button>

      {application && (
        <ApplicationDetail
          application={application}
          onApprove={handleApprove}
          onReject={handleReject}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
        />
      )}
    </div>
  );
}
