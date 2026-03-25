"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKyc } from "@/hooks/useKyc";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Search,
  Gamepad2,
  Loader2,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Wallet,
  Star,
  Sparkles,
} from "lucide-react";

const statusConfig: Record<
  string,
  { icon: any; label: string; color: string; bgColor: string; border: string }
> = {
  NOT_STARTED: {
    icon: Clock,
    label: "Not Started",
    color: "text-offwhite/50",
    bgColor: "bg-offwhite/5",
    border: "border-dark-border",
  },
  PENDING: {
    icon: Send,
    label: "Submitted",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  UNDER_REVIEW: {
    icon: Search,
    label: "Under Review",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  APPROVED: {
    icon: CheckCircle2,
    label: "Approved",
    color: "text-primary",
    bgColor: "bg-primary/10",
    border: "border-primary/30",
  },
  REJECTED: {
    icon: XCircle,
    label: "Rejected",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    border: "border-red-500/20",
  },
};

const statusOrder = ["PENDING", "UNDER_REVIEW", "APPROVED"];

export default function StatusPage() {
  const router = useRouter();
  const { application, loading, getGameUrl, refetch } = useKyc();
  const [gameLoading, setGameLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const status = application?.status || "NOT_STARTED";
  const config = statusConfig[status] || statusConfig.NOT_STARTED;
  const Icon = config.icon;

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
        {/* Approved Hero */}
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
              Identity{" "}
              <span className="text-primary">Verified</span>
            </h1>
            <p className="text-offwhite/50 max-w-md mx-auto leading-relaxed">
              Congratulations! Your TrustLayer verification is complete. You now have
              full access to the Web3 gaming platform.
            </p>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center py-5">
            <ShieldCheck className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Identity
            </div>
            <div className="text-sm text-offwhite/60">Verified</div>
          </div>
          <div className="card text-center py-5">
            <Wallet className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Wallet
            </div>
            <div className="text-sm text-offwhite/60 truncate px-2">
              {application?.walletAddress
                ? `${application.walletAddress.slice(0, 6)}...${application.walletAddress.slice(-4)}`
                : "Connected"}
            </div>
          </div>
          <div className="card text-center py-5">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-sm text-primary font-semibold">Approved</div>
          </div>
        </div>

        {/* Play Game CTA */}
        <div className="card text-center py-10 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading text-xl font-bold mb-2">
            Ready to Play
          </h2>
          <p className="text-offwhite/50 text-sm mb-6 max-w-sm mx-auto">
            Your verified account is all set. Launch the game and start
            your Web3 gaming journey.
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

        {/* Benefits */}
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
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-input bg-dark/50"
              >
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-offwhite/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Refresh */}
        <div className="text-center">
          <button
            onClick={refetch}
            className="text-sm text-offwhite/40 hover:text-offwhite/60 transition-colors inline-flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold mb-2">
          Application Status
        </h1>
        <p className="text-offwhite/50 text-sm">
          Track the progress of your TrustLayer verification
        </p>
      </div>

      {/* Status Tracker */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          {statusOrder.map((s, i) => {
            const sConf = statusConfig[s];
            const SIcon = sConf.icon;
            const currentIdx = statusOrder.indexOf(status);
            const isCompleted =
              status === "REJECTED" ? false : i <= currentIdx;
            const isActive = s === status;

            return (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-primary/20 border-2 border-primary"
                        : "bg-dark border border-dark-border"
                    }`}
                  >
                    <SIcon
                      className={`h-6 w-6 ${
                        isCompleted ? "text-primary" : "text-offwhite/20"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      isActive ? sConf.color : "text-offwhite/30"
                    }`}
                  >
                    {sConf.label}
                  </span>
                </div>
                {i < statusOrder.length - 1 && (
                  <div
                    className={`h-0.5 w-full mt-[-1.5rem] ${
                      i < currentIdx ? "bg-primary" : "bg-dark-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`flex items-center gap-4 p-4 rounded-input ${config.bgColor} border ${config.border}`}
        >
          <Icon className={`h-8 w-8 flex-shrink-0 ${config.color}`} />
          <div>
            <p className={`font-semibold ${config.color}`}>{config.label}</p>
            <p className="text-sm text-offwhite/50">
              {status === "PENDING" &&
                "Your application has been submitted and is awaiting review."}
              {status === "UNDER_REVIEW" &&
                "An admin is currently reviewing your application."}
              {status === "REJECTED" &&
                "Your application was not approved. See remarks below."}
            </p>
          </div>
        </div>
      </div>

      {/* Rejected — Remarks + Re-submit */}
      {status === "REJECTED" && (
        <div className="card border-red-500/20">
          <h3 className="font-heading font-semibold text-red-400 mb-3">
            Rejection Reason
          </h3>
          <div className="bg-red-500/5 border border-red-500/20 rounded-input p-4 mb-6">
            <p className="text-sm text-offwhite/70">
              {application?.adminRemarks || "No remarks provided."}
            </p>
          </div>
          <button
            onClick={() => router.push("/kyc")}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Re-submit Application
          </button>
        </div>
      )}

      {/* Pending / Under Review info */}
      {(status === "PENDING" || status === "UNDER_REVIEW") && (
        <div className="card">
          <h3 className="font-heading text-sm font-semibold text-offwhite/70 uppercase tracking-wider mb-4">
            What happens next?
          </h3>
          <div className="space-y-3">
            {[
              {
                step: "1",
                text: "Our admin team reviews your submitted documents and selfie.",
              },
              {
                step: "2",
                text: "Your identity is verified against the uploaded government ID.",
              },
              {
                step: "3",
                text: "Once approved, you'll get instant access to the gaming platform.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 p-3 rounded-input bg-dark/50"
              >
                <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                  {item.step}
                </div>
                <span className="text-sm text-offwhite/50">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refresh */}
      <div className="text-center">
        <button
          onClick={refetch}
          className="text-sm text-offwhite/40 hover:text-offwhite/60 transition-colors inline-flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh Status
        </button>
      </div>
    </div>
  );
}
