"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Shield, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="border-b border-dark-border bg-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-title text-xl font-bold text-offwhite">
              KYC<span className="text-primary">Gate</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/status"
                  className="text-sm text-offwhite/70 hover:text-offwhite transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 text-sm text-offwhite/50">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-sm py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
