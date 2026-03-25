"use client";

import { useState } from "react";
import {
  User,
  Calendar,
  Globe,
  Phone,
  Wallet,
  FileCheck,
  Check,
  Loader2,
  MapPin,
  Building2,
  Hash,
  Clock,
  ScanLine,
  AlertTriangle,
  X,
} from "lucide-react";

interface ReviewStepProps {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    country: string;
    state: string;
    city: string;
    phone: string;
  };
  documentDetails: {
    nameOnDocument: string;
    documentNumber: string;
    dateOfBirth: string;
    expiryDate: string;
    issuingAuthority: string;
  };
  walletAddress: string;
  documentsUploaded: number;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  submitting: boolean;
  error?: string | null;
  onDismissError?: () => void;
}

export default function ReviewStep({
  personalInfo,
  documentDetails,
  walletAddress,
  documentsUploaded,
  onSubmit,
  onBack,
  submitting,
  error,
  onDismissError,
}: ReviewStepProps) {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h2 className="font-heading text-xl font-semibold mb-2">
          Review Your Application
        </h2>
        <p className="text-offwhite/50 text-sm">
          Please review all details before submitting.
        </p>
      </div>

      {/* Personal Information */}
      <div className="card space-y-4">
        <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReviewItem icon={User} label="Full Name" value={personalInfo.fullName} />
          <ReviewItem icon={Calendar} label="Date of Birth" value={personalInfo.dateOfBirth} />
          <ReviewItem icon={Globe} label="Country" value={personalInfo.country} />
          <ReviewItem icon={MapPin} label="State" value={personalInfo.state} />
          <ReviewItem icon={Building2} label="City / Town" value={personalInfo.city} />
          <ReviewItem icon={Phone} label="Phone" value={personalInfo.phone} />
        </div>
      </div>

      {/* Document Details */}
      {documentDetails.nameOnDocument && (
        <div className="card space-y-4">
          <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-primary" />
            Document Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ReviewItem icon={User} label="Name on Document" value={documentDetails.nameOnDocument} />
            <ReviewItem icon={Hash} label="Document Number" value={documentDetails.documentNumber} />
            <ReviewItem icon={Calendar} label="DOB on Document" value={documentDetails.dateOfBirth} />
            {documentDetails.expiryDate && (
              <ReviewItem icon={Clock} label="Expiry Date" value={documentDetails.expiryDate} />
            )}
            {documentDetails.issuingAuthority && (
              <ReviewItem icon={Building2} label="Issuing Authority" value={documentDetails.issuingAuthority} />
            )}
          </div>
        </div>
      )}

      {/* Wallet & Documents */}
      <div className="card space-y-4">
        <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
          Wallet & Documents
        </h3>
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-offwhite/40">Wallet Address</p>
            <p className="text-sm font-mono font-medium break-all">
              {walletAddress || "Not connected"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileCheck className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-offwhite/40">Documents Uploaded</p>
            <p className="text-sm font-medium">{documentsUploaded} of 3</p>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="card">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded accent-primary"
          />
          <span className="text-sm text-offwhite/60">
            I certify that all information provided is accurate and I agree to the{" "}
            <span className="text-primary">Terms & Conditions</span> and{" "}
            <span className="text-primary">Privacy Policy</span>.
          </span>
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-300">Submission Failed</p>
            <p className="text-sm text-yellow-200/80 mt-0.5">{error}</p>
          </div>
          {onDismissError && (
            <button
              type="button"
              onClick={onDismissError}
              className="text-yellow-400/60 hover:text-yellow-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button
          type="submit"
          disabled={!agreed || submitting}
          className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="h-5 w-5" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function ReviewItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-xs text-offwhite/40">{label}</p>
        <p className="text-sm font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}
