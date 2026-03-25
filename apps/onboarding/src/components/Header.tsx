"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Layers, LogOut, User, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const { user, loading, logout, isAuthenticated } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/[0.06] bg-dark/60 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary/10 rounded-lg p-1.5 group-hover:bg-primary/15 transition-colors duration-300">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <span className="font-title text-xl font-bold text-offwhite">
              Trust<span className="text-primary">Layer</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            {loading ? (
              <div className="flex items-center gap-3 h-9">
                <div className="w-16 h-4 bg-dark-border/50 rounded animate-pulse" />
                <div className="w-20 h-9 bg-dark-border/50 rounded-input animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/status"
                  className="text-sm text-offwhite/50 hover:text-offwhite transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm text-offwhite/50 hover:text-offwhite transition-colors duration-300"
                >
                  <Settings className="h-4 w-4" />
                  Profile
                </Link>
                <div className="flex items-center gap-2 text-sm text-offwhite/35 border-l border-white/[0.06] pl-4 ml-1">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm text-red-400/80 hover:text-red-400 transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm text-offwhite/50 hover:text-offwhite transition-colors duration-300 py-2 px-4"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary text-sm py-2 px-5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
