"use client";

import { Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark/80 backdrop-blur-sm py-12 mt-auto relative">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-card/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="bg-primary/10 rounded-lg p-1 group-hover:bg-primary/15 transition-colors duration-300">
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <span className="font-title text-sm font-semibold text-offwhite">
                Trust<span className="text-primary">Layer</span>
              </span>
            </Link>
            <p className="text-xs text-offwhite/30 leading-relaxed max-w-xs">
              Secure identity verification for the Web3 gaming ecosystem.
              A capstone project by B.Tech CSE Gaming Technology students
              at VIT Bhopal University.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold mb-4 text-offwhite/50 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/signup"
                  className="text-xs text-offwhite/30 hover:text-primary transition-colors duration-300"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-xs text-offwhite/30 hover:text-primary transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold mb-4 text-offwhite/50 uppercase tracking-wider">
              Team
            </h4>
            <p className="text-xs text-offwhite/30 leading-relaxed">
              Abhishek Gupta &middot; Harsh Raj &middot; Devansh &middot;
              Utkarsh &middot; Karan Verma
            </p>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-offwhite/20">
            &copy; {new Date().getFullYear()} TrustLayer. All rights reserved.
          </p>
          <p className="text-xs text-offwhite/20">
            VIT Bhopal University &mdash; B.Tech CSE Gaming Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
