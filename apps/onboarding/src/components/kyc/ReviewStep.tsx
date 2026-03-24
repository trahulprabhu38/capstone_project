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
} from "lucide-react";

interface ReviewStepProps {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    country: string;
    phone: string;
  };
  walletAddress: string;
  documentsUploaded: number;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  submitting: boolean;
}

export default function ReviewStep({
  personalInfo,
  walletAddress,
  documentsUploaded,
  onSubmit,
  onBack,
  submitting,
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

      <div className="card space-y-4">
        <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-offwhite/40">Full Name</p>
              <p className="text-sm font-medium">{personalInfo.fullName || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-offwhite/40">Date of Birth</p>
              <p className="text-sm font-medium">{personalInfo.dateOfBirth || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-offwhite/40">Country</p>
              <p className="text-sm font-medium">{personalInfo.country || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-offwhite/40">Phone</p>
              <p className="text-sm font-medium">{personalInfo.phone || "—"}</p>
            </div>
          </div>
        </div>
      </div>

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
