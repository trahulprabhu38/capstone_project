import { Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-title text-sm font-semibold text-offwhite">
                KYC<span className="text-primary">Gate</span>
              </span>
            </div>
            <p className="text-xs text-offwhite/40 leading-relaxed">
              Secure identity verification for the Web3 gaming ecosystem.
              A capstone project by B.Tech CSE Gaming Technology students
              at VIT Bhopal University.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-offwhite/70">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/signup"
                  className="text-xs text-offwhite/40 hover:text-primary transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-xs text-offwhite/40 hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-offwhite/70">
              Team
            </h4>
            <p className="text-xs text-offwhite/40 leading-relaxed">
              Abhishek Gupta &middot; Harsh Raj &middot; Devansh &middot;
              Utkarsh &middot; Karan Verma
            </p>
          </div>
        </div>

        <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-offwhite/30">
            &copy; {new Date().getFullYear()} KYCGate. All rights reserved.
          </p>
          <p className="text-xs text-offwhite/30">
            VIT, Bhopal University &mdash; B.Tech CSE Gaming Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
