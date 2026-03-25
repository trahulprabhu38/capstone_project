"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import {
  Loader2,
  Mail,
  Calendar,
  Globe,
  Phone,
  Wallet,
  ShieldCheck,
  FileImage,
  User,
  Camera,
  CreditCard,
  Clock,
  Layers,
  ExternalLink,
} from "lucide-react";

interface ProfileData {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
    createdAt: string;
  };
  kyc: {
    status: string;
    personalInfo: {
      fullName: string;
      dateOfBirth: string;
      country: string;
      phone: string;
    } | null;
    walletAddress: string | null;
    submittedAt: string | null;
    reviewedAt: string | null;
    adminRemarks: string | null;
  } | null;
  documents: {
    type: string;
    url: string;
    uploadedAt: string;
  }[];
}

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  APPROVED: { label: "Approved", color: "text-primary", bg: "bg-primary/10" },
  PENDING: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  UNDER_REVIEW: { label: "Under Review", color: "text-blue-400", bg: "bg-blue-400/10" },
  REJECTED: { label: "Rejected", color: "text-red-400", bg: "bg-red-400/10" },
  NOT_STARTED: { label: "Not Started", color: "text-offwhite/50", bg: "bg-offwhite/5" },
};

const docLabels: Record<string, { label: string; icon: typeof FileImage }> = {
  ID_FRONT: { label: "ID Front", icon: CreditCard },
  ID_BACK: { label: "ID Back", icon: CreditCard },
  SELFIE: { label: "Selfie", icon: Camera },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ url: string; label: string } | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/profile");
      if (data.success) {
        setProfile(data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="card py-12">
          <p className="text-red-400 mb-4">{error || "Could not load profile."}</p>
          <button onClick={fetchProfile} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { user, kyc, documents } = profile;
  const statusInfo = statusStyles[kyc?.status || "NOT_STARTED"] || statusStyles.NOT_STARTED;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Your Profile
        </h1>
        <p className="text-offwhite/50 text-sm">
          View your account details and submitted documents
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className="relative overflow-hidden rounded-card border border-dark-border bg-gradient-to-br from-primary/5 via-dark-card to-dark-card">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-primary/30">
            <span className="text-primary font-title text-2xl font-bold">
              {(kyc?.personalInfo?.fullName || user.email)
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="font-title text-xl sm:text-2xl font-bold">
              {kyc?.personalInfo?.fullName || user.fullName || "User"}
            </h2>
            <p className="text-offwhite/50 text-sm mt-1">{user.email}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 justify-center sm:justify-start">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                KYC {statusInfo.label}
              </span>
              <span className="text-xs text-offwhite/30 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
          <Layers className="h-16 w-16 text-primary/10 hidden sm:block" />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <User className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              Account Information
            </h3>
          </div>
          <div className="space-y-4">
            <InfoRow icon={Mail} label="Email" value={user.email} />
            <InfoRow
              icon={Calendar}
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <InfoRow
              icon={ShieldCheck}
              label="Role"
              value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            />
          </div>
        </div>

        {/* Personal Details */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <FileImage className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              Personal Details
            </h3>
          </div>
          {kyc?.personalInfo ? (
            <div className="space-y-4">
              <InfoRow icon={User} label="Full Name" value={kyc.personalInfo.fullName} />
              <InfoRow icon={Calendar} label="Date of Birth" value={kyc.personalInfo.dateOfBirth} />
              <InfoRow icon={Globe} label="Country" value={kyc.personalInfo.country} />
              <InfoRow icon={Phone} label="Phone" value={kyc.personalInfo.phone} />
            </div>
          ) : (
            <p className="text-offwhite/40 text-sm">No personal details submitted yet.</p>
          )}
        </div>
      </div>

      {/* Wallet Address */}
      {kyc?.walletAddress && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              Connected Wallet
            </h3>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-input bg-dark/50 border border-dark-border">
            <Wallet className="h-5 w-5 text-primary flex-shrink-0" />
            <code className="text-sm text-offwhite/70 break-all font-mono">
              {kyc.walletAddress}
            </code>
          </div>
        </div>
      )}

      {/* KYC Timeline */}
      {kyc && (
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              Verification Timeline
            </h3>
          </div>
          <div className="space-y-3">
            {kyc.submittedAt && (
              <TimelineItem
                label="Application Submitted"
                date={kyc.submittedAt}
                color="text-yellow-400"
              />
            )}
            {kyc.reviewedAt && (
              <TimelineItem
                label={kyc.status === "APPROVED" ? "Approved by Admin" : "Reviewed by Admin"}
                date={kyc.reviewedAt}
                color={kyc.status === "APPROVED" ? "text-primary" : "text-red-400"}
              />
            )}
            {kyc.adminRemarks && (
              <div className="ml-8 p-3 rounded-input bg-red-500/5 border border-red-500/20">
                <p className="text-xs text-offwhite/50 mb-1 font-semibold">Admin Remarks</p>
                <p className="text-sm text-offwhite/70">{kyc.adminRemarks}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <FileImage className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              Submitted Documents
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {documents.map((doc, i) => {
              const info = docLabels[doc.type] || { label: doc.type, icon: FileImage };
              const DocIcon = info.icon;
              return (
                <button
                  key={i}
                  onClick={() => setPreviewDoc({ url: doc.url, label: info.label })}
                  className="group relative overflow-hidden rounded-card border border-dark-border hover:border-primary/40 transition-all bg-dark/50 cursor-pointer"
                >
                  <div className="aspect-[4/3] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={doc.url}
                      alt={info.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-offwhite" />
                    </div>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <DocIcon className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-offwhite/70">
                      {info.label}
                    </span>
                    <span className="text-xs text-offwhite/30 ml-auto">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[85vh] overflow-auto rounded-card border border-dark-border bg-dark-card p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-dark-border mb-2">
              <span className="font-heading text-sm font-semibold">
                {previewDoc.label}
              </span>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-offwhite/50 hover:text-offwhite text-sm"
              >
                Close
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewDoc.url}
              alt={previewDoc.label}
              className="w-full rounded-input"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-offwhite/40 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-offwhite/80 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function TimelineItem({
  label,
  date,
  color,
}: {
  label: string;
  date: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${color.replace("text-", "bg-")}`} />
      <div className="flex-1">
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
      <span className="text-xs text-offwhite/40">
        {new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  );
}
