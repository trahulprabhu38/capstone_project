"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { api } from "@/lib/api";
import { Loader2, Ban, LogOut } from "lucide-react";
import { clearTokens } from "@/lib/auth";

interface BlockedInfo {
  isBlocked: boolean;
  blockReason?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [blocked, setBlocked] = useState<BlockedInfo | null>(null);

  const checkUser = useCallback(async () => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      if (data.success && data.data.isBlocked) {
        setBlocked({
          isBlocked: true,
          blockReason: data.data.blockReason,
        });
      }
    } catch {
      // If the request fails, the interceptor will handle logout
    }

    setChecking(false);
  }, [router]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login";
  };

  if (checking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (blocked?.isBlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center">
              <Ban className="h-10 w-10 text-red-400" />
            </div>
          </div>

          <div>
            <h1 className="font-heading text-2xl font-bold text-red-400 mb-2">
              Account Blocked
            </h1>
            <p className="text-offwhite/50 text-sm">
              Your account has been blocked by an administrator. You cannot
              access any features until your account is restored.
            </p>
          </div>

          {blocked.blockReason && (
            <div className="card border-red-500/20 text-left">
              <h3 className="text-xs font-semibold text-red-400/70 uppercase tracking-wider mb-2">
                Reason
              </h3>
              <p className="text-sm text-offwhite/70 leading-relaxed">
                {blocked.blockReason}
              </p>
            </div>
          )}

          <div className="card border-dark-border text-left space-y-3">
            <h3 className="text-xs font-semibold text-offwhite/40 uppercase tracking-wider">
              What can you do?
            </h3>
            <ul className="space-y-2 text-sm text-offwhite/50">
              <li className="flex items-start gap-2">
                <span className="text-offwhite/30 mt-0.5">•</span>
                Contact support if you believe this is a mistake.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-offwhite/30 mt-0.5">•</span>
                Resolve any outstanding issues mentioned in the reason above.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-offwhite/30 mt-0.5">•</span>
                An administrator must unblock your account before you can proceed.
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="btn-secondary inline-flex items-center gap-2 mx-auto"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
