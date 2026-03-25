"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKyc } from "@/hooks/useKyc";
import { api } from "@/lib/api";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Gamepad2,
  Loader2,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Wallet,
  Star,
  Sparkles,
  FileText,
  ScanLine,
  UserCheck,
  Hourglass,
  AlertTriangle,
  MessageSquareWarning,
  HelpCircle,
  Mail,
  RotateCcw,
} from "lucide-react";

export default function StatusPage() {
  const router = useRouter();
  const { application, loading, getGameUrl, refetch } = useKyc();
  const [gameLoading, setGameLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const [, meRes] = await Promise.all([
        refetch(),
        api.get("/auth/me"),
      ]);
      if (meRes.data?.data?.isBlocked) {
        window.location.reload();
        return;
      }
    } catch {
      // handled by interceptors
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const status = application?.status || "NOT_STARTED";

  const handlePlayGame = async () => {
    setGameLoading(true);
    const url = await getGameUrl();
    setGameLoading(false);
    if (url) {
      window.open(url, "_blank");
    }
  };

  if (status === "NOT_STARTED") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="card py-12">
          <Clock className="h-16 w-16 text-offwhite/20 mx-auto mb-6" />
          <h1 className="font-heading text-2xl font-bold mb-3">
            Start Your TrustLayer Verification
          </h1>
          <p className="text-offwhite/50 mb-8 max-w-md mx-auto">
            Complete identity verification to unlock access to the Web3 gaming
            platform.
          </p>
          <button
            onClick={() => router.push("/kyc")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Begin Verification <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (status === "APPROVED") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="relative overflow-hidden rounded-card border border-primary/30 bg-gradient-to-br from-primary/10 via-dark-card to-dark-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center glow-primary">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-dark" />
                </div>
              </div>
            </div>
            <h1 className="font-title text-3xl sm:text-4xl font-extrabold mb-3">
              Identity <span className="text-primary">Verified</span>
            </h1>
            <p className="text-offwhite/50 max-w-md mx-auto leading-relaxed">
              Congratulations! Your TrustLayer verification is complete. You now
              have full access to the Web3 gaming platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center py-5">
            <ShieldCheck className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Identity</div>
            <div className="text-sm text-offwhite/60">Verified</div>
          </div>
          <div className="card text-center py-5">
            <Wallet className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Wallet</div>
            <div className="text-sm text-offwhite/60 truncate px-2">
              {application?.walletAddress
                ? `${application.walletAddress.slice(0, 6)}...${application.walletAddress.slice(-4)}`
                : "Connected"}
            </div>
          </div>
          <div className="card text-center py-5">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Status</div>
            <div className="text-sm text-primary font-semibold">Approved</div>
          </div>
        </div>

        <div className="card text-center py-10 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading text-xl font-bold mb-2">Ready to Play</h2>
          <p className="text-offwhite/50 text-sm mb-6 max-w-sm mx-auto">
            Your verified account is all set. Launch the game and start your Web3
            gaming journey.
          </p>
          <button
            onClick={handlePlayGame}
            disabled={gameLoading}
            className="btn-primary text-lg py-4 px-12 inline-flex items-center gap-3"
          >
            {gameLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Gamepad2 className="h-5 w-5" />
                Launch Game
              </>
            )}
          </button>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
              What you&apos;ve unlocked
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Trophy, text: "Participate in tournaments & earn rewards" },
              { icon: Wallet, text: "Trade NFTs & in-game assets securely" },
              { icon: ShieldCheck, text: "Play in a verified, cheat-free environment" },
              { icon: Gamepad2, text: "Access the full Web3 game catalog" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-input bg-dark/50">
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-offwhite/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-sm text-offwhite/40 hover:text-offwhite/60 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Checking..." : "Refresh Status"}
          </button>
        </div>
      </div>
    );
  }

  // ── PENDING / UNDER_REVIEW / REJECTED ──
  const isPending = status === "PENDING";
  const isUnderReview = status === "UNDER_REVIEW";
  const isRejected = status === "REJECTED";
  const isWaiting = isPending || isUnderReview;

  const timelineSteps = [
    {
      icon: Send,
      label: "Application Submitted",
      description: "Your documents and details have been received.",
      done: true,
    },
    {
      icon: ScanLine,
      label: "Document Verification",
      description: "Our team is verifying your uploaded ID documents.",
      done: isUnderReview,
      active: isPending,
    },
    {
      icon: UserCheck,
      label: "Identity Confirmation",
      description: "Final identity review and approval decision.",
      done: false,
      active: isUnderReview,
    },
    {
      icon: CheckCircle2,
      label: "Verification Complete",
      description: "You'll get full access to the platform.",
      done: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* Hero with animated waiting indicator */}
      {isWaiting && (
        <div className="fade-slide-up relative overflow-hidden rounded-card border border-dark-border bg-gradient-to-br from-dark-card via-dark-card to-dark">
          <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 ${isPending ? "bg-yellow-400/5" : "bg-blue-400/5"}`} />
          <div className={`absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 ${isPending ? "bg-yellow-400/5" : "bg-blue-400/5"}`} />

          <div className="relative px-8 py-12 text-center">
            {/* Animated orbiting indicator */}
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28">
                {/* Pulse rings */}
                <div className={`pulse-ring ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
                <div className={`pulse-ring pulse-ring-delay ${isPending ? "text-yellow-400" : "text-blue-400"}`} />

                {/* Orbiting dots */}
                <div className="orbit-dot" />
                <div className="orbit-dot orbit-dot-2" />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center float-anim ${
                    isPending ? "bg-yellow-400/15 border-2 border-yellow-400/30" : "bg-blue-400/15 border-2 border-blue-400/30"
                  }`}>
                    <Hourglass className={`h-7 w-7 ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="font-title text-2xl sm:text-3xl font-extrabold mb-3">
              {isPending ? (
                <>Application <span className="text-yellow-400">Submitted</span></>
              ) : (
                <>Under <span className="text-blue-400">Review</span></>
              )}
            </h1>
            <p className="text-offwhite/50 max-w-md mx-auto leading-relaxed text-sm">
              {isPending
                ? "Your KYC application has been successfully submitted. Our team will begin reviewing it shortly."
                : "An administrator is currently reviewing your documents and verifying your identity."}
            </p>

            {/* Shimmer progress bar */}
            <div className="mt-8 max-w-xs mx-auto">
              <div className="h-1.5 bg-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full shimmer-bar"
                  style={{ width: isPending ? "35%" : "65%" }}
                />
              </div>
              <p className="text-[11px] text-offwhite/30 mt-2">
                {isPending ? "Waiting for review" : "Review in progress"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submitted info cards */}
      {isWaiting && (
        <div className="grid grid-cols-3 gap-3 fade-slide-up fade-slide-up-1">
          <div className="card text-center py-4 px-2">
            <FileText className={`h-5 w-5 mx-auto mb-1.5 ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
            <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">Documents</div>
            <div className="text-sm text-offwhite/70 font-medium">Uploaded</div>
          </div>
          <div className="card text-center py-4 px-2">
            <ScanLine className={`h-5 w-5 mx-auto mb-1.5 ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
            <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">OCR</div>
            <div className="text-sm text-offwhite/70 font-medium">Verified</div>
          </div>
          <div className="card text-center py-4 px-2">
            <Hourglass className={`h-5 w-5 mx-auto mb-1.5 ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
            <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">Status</div>
            <div className={`text-sm font-semibold ${isPending ? "text-yellow-400" : "text-blue-400"}`}>
              {isPending ? "Pending" : "In Review"}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      {isWaiting && (
        <div className="card fade-slide-up fade-slide-up-2">
          <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider mb-6">
            Verification Progress
          </h3>
          <div className="space-y-0">
            {timelineSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isDone = step.done;
              const isActive = step.active;
              const isLast = i === timelineSteps.length - 1;

              return (
                <div key={i} className="flex gap-4">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isDone
                          ? "bg-primary/20 border-2 border-primary"
                          : isActive
                          ? isPending
                            ? "bg-yellow-400/15 border-2 border-yellow-400/50"
                            : "bg-blue-400/15 border-2 border-blue-400/50"
                          : "bg-dark border border-dark-border"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : isActive ? (
                        <Loader2 className={`h-4 w-4 animate-spin ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
                      ) : (
                        <StepIcon className="h-4 w-4 text-offwhite/20" />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-10 ${isDone ? "bg-primary/40" : "bg-dark-border"}`}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                    <p
                      className={`text-sm font-semibold ${
                        isDone
                          ? "text-primary"
                          : isActive
                          ? isPending ? "text-yellow-400" : "text-blue-400"
                          : "text-offwhite/30"
                      }`}
                    >
                      {step.label}
                      {isActive && (
                        <span className={`ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          isPending
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                            : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                        }`}>
                          In Progress
                        </span>
                      )}
                    </p>
                    <p className={`text-xs mt-0.5 ${isDone || isActive ? "text-offwhite/50" : "text-offwhite/20"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Estimated time card */}
      {isWaiting && (
        <div className={`card fade-slide-up fade-slide-up-3 ${isPending ? "border-yellow-400/20" : "border-blue-400/20"}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isPending ? "bg-yellow-400/10" : "bg-blue-400/10"
            }`}>
              <Clock className={`h-6 w-6 ${isPending ? "text-yellow-400" : "text-blue-400"}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-offwhite/80">Estimated Review Time</p>
              <p className="text-xs text-offwhite/40 mt-0.5">
                Applications are typically reviewed within <strong className="text-offwhite/60">24–48 hours</strong>.
                You&apos;ll be notified once a decision is made.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rejected state */}
      {isRejected && (
        <>
          {/* Hero */}
          <div className="fade-slide-up relative overflow-hidden rounded-card border border-red-500/20 bg-gradient-to-br from-red-500/5 via-dark-card to-dark-card">
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative px-8 py-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center">
                    <XCircle className="h-10 w-10 text-red-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="font-title text-2xl sm:text-3xl font-extrabold mb-3">
                Verification <span className="text-red-400">Unsuccessful</span>
              </h1>
              <p className="text-offwhite/50 text-sm max-w-md mx-auto leading-relaxed">
                Your application has been reviewed by our team and could not be
                approved at this time. Please review the feedback below.
              </p>
            </div>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-3 gap-3 fade-slide-up fade-slide-up-1">
            <div className="card text-center py-4 px-2">
              <FileText className="h-5 w-5 text-red-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">Documents</div>
              <div className="text-sm text-offwhite/70 font-medium">Reviewed</div>
            </div>
            <div className="card text-center py-4 px-2">
              <UserCheck className="h-5 w-5 text-red-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">Identity</div>
              <div className="text-sm text-offwhite/70 font-medium">Checked</div>
            </div>
            <div className="card text-center py-4 px-2">
              <XCircle className="h-5 w-5 text-red-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider mb-0.5">Decision</div>
              <div className="text-sm text-red-400 font-semibold">Rejected</div>
            </div>
          </div>

          {/* Reason card */}
          <div className="card border-red-500/20 fade-slide-up fade-slide-up-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquareWarning className="h-4.5 w-4.5 text-red-400" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-red-400 uppercase tracking-wider">
                  Rejection Reason
                </h3>
                <p className="text-[11px] text-offwhite/30">Provided by the review team</p>
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/15 rounded-input p-5">
              <p className="text-sm text-offwhite/70 leading-relaxed italic">
                &ldquo;{application?.adminRemarks || "No remarks provided."}&rdquo;
              </p>
            </div>
            {application?.reviewedAt && (
              <p className="text-[11px] text-offwhite/25 mt-3">
                Reviewed on {new Date(application.reviewedAt).toLocaleString()}
              </p>
            )}
          </div>

          {/* What you can do */}
          <div className="card fade-slide-up fade-slide-up-3">
            <div className="flex items-center gap-2 mb-5">
              <HelpCircle className="h-4 w-4 text-offwhite/40" />
              <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider">
                What you can do
              </h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: RotateCcw,
                  title: "Re-submit your application",
                  desc: "Fix the issues mentioned above and submit a new application with corrected details.",
                },
                {
                  icon: FileText,
                  title: "Upload clearer documents",
                  desc: "Ensure your ID is clearly visible, not expired, and all text is legible.",
                },
                {
                  icon: Mail,
                  title: "Contact support",
                  desc: "If you believe this was an error, reach out to our support team for assistance.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-input bg-dark/50 border border-dark-border/50">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-offwhite/80">{item.title}</p>
                    <p className="text-xs text-offwhite/40 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="card text-center py-8 border-red-500/10 bg-gradient-to-b from-red-500/5 to-transparent fade-slide-up fade-slide-up-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-heading text-lg font-bold mb-2">
              Ready to try again?
            </h2>
            <p className="text-offwhite/40 text-sm mb-6 max-w-sm mx-auto">
              Address the feedback above and submit a new application. Our team
              will review it as soon as possible.
            </p>
            <button
              onClick={() => router.push("/kyc")}
              className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-10"
            >
              <RefreshCw className="h-5 w-5" />
              Re-submit Application
            </button>
          </div>
        </>
      )}

      {/* Refresh */}
      <div className="text-center fade-slide-up fade-slide-up-4">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-sm text-offwhite/40 hover:text-offwhite/60 transition-colors inline-flex items-center gap-2 py-2 px-4 rounded-input hover:bg-dark-card disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Checking..." : "Refresh Status"}
        </button>
      </div>
    </div>
  );
}
