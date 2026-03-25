"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import DocumentViewer from "./DocumentViewer";
import {
  User,
  Calendar,
  Globe,
  Phone,
  Wallet,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  Building2,
  Hash,
  Clock,
  ScanLine,
  CreditCard,
} from "lucide-react";

interface ApplicationDetailProps {
  application: any;
  onApprove: () => Promise<void>;
  onReject: (remarks: string) => Promise<void>;
}

export default function ApplicationDetail({
  application,
  onApprove,
  onReject,
}: ApplicationDetailProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [processing, setProcessing] = useState(false);

  const user =
    typeof application.userId === "object" ? application.userId : null;
  const info = application.personalInfo;
  const docDetails = application.documentDetails;

  const handleApprove = async () => {
    setProcessing(true);
    await onApprove();
    setProcessing(false);
    setShowApproveModal(false);
  };

  const handleReject = async () => {
    if (!remarks.trim()) return;
    setProcessing(true);
    await onReject(remarks);
    setProcessing(false);
    setShowRejectModal(false);
  };

  const canReview = ["PENDING", "UNDER_REVIEW"].includes(application.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold">
            {info?.fullName || user?.email || "Application"}
          </h1>
          <p className="text-sm text-offwhite/50">{user?.email}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="card space-y-4">
          <h2 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
            Personal Information
          </h2>
          <div className="space-y-3">
            {[
              { icon: User, label: "Full Name", value: info?.fullName },
              { icon: Calendar, label: "Date of Birth", value: info?.dateOfBirth },
              { icon: Globe, label: "Country", value: info?.country },
              { icon: MapPin, label: "State", value: info?.state },
              { icon: Building2, label: "City / Town", value: info?.city },
              { icon: Phone, label: "Phone", value: info?.phone },
              { icon: Wallet, label: "Wallet", value: application.walletAddress },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-offwhite/40">{item.label}</p>
                  <p className="text-sm font-medium break-all">
                    {item.value || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-dark-border text-xs text-offwhite/30">
            Submitted:{" "}
            {application.submittedAt
              ? new Date(application.submittedAt).toLocaleString()
              : "—"}
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h2 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
            Documents
          </h2>
          {application.documents?.length > 0 ? (
            application.documents.map((doc: any, i: number) => (
              <DocumentViewer
                key={i}
                s3Key={doc.s3Key}
                label={doc.type.replace("_", " ")}
              />
            ))
          ) : (
            <div className="card text-center py-8 text-offwhite/30 text-sm">
              No documents uploaded
            </div>
          )}
        </div>
      </div>

      {/* Document Details (OCR-scanned) */}
      {docDetails && (
        <div className="card space-y-4">
          <h2 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-primary" />
            Document Details (OCR Verified)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: User, label: "Name on Document", value: docDetails.nameOnDocument },
              { icon: Hash, label: "Document Number", value: docDetails.documentNumber },
              { icon: Calendar, label: "DOB on Document", value: docDetails.dateOfBirth },
              ...(docDetails.expiryDate
                ? [{ icon: Clock, label: "Expiry Date", value: docDetails.expiryDate }]
                : []),
              ...(docDetails.issuingAuthority
                ? [{ icon: CreditCard, label: "Issuing Authority", value: docDetails.issuingAuthority }]
                : []),
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-dark rounded-input p-3">
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-offwhite/40">{item.label}</p>
                  <p className="text-sm font-medium break-all">
                    {item.value || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Remarks (if already reviewed) */}
      {application.adminRemarks && (
        <div className="card">
          <h2 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider mb-2">
            Admin Remarks
          </h2>
          <p className="text-sm text-offwhite/70">{application.adminRemarks}</p>
          {application.reviewedAt && (
            <p className="text-xs text-offwhite/30 mt-2">
              Reviewed: {new Date(application.reviewedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {canReview && (
        <div className="card flex items-center gap-4">
          <button
            onClick={() => setShowApproveModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Approve
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="btn-danger flex items-center gap-2"
          >
            <XCircle className="h-5 w-5" />
            Reject
          </button>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="font-heading text-lg font-semibold mb-2">
              Confirm Approval
            </h3>
            <p className="text-sm text-offwhite/50 mb-6">
              This will grant the user access to the gaming platform.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={processing}
                className="btn-primary flex items-center gap-2"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Approve"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="font-heading text-lg font-semibold mb-2">
              Reject Application
            </h3>
            <p className="text-sm text-offwhite/50 mb-4">
              Please provide a reason for rejection.
            </p>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="input-field min-h-[100px] mb-4"
              placeholder="Enter rejection reason..."
              required
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processing || !remarks.trim()}
                className="btn-danger flex items-center gap-2 disabled:opacity-40"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
