"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { clearTokens } from "@/lib/auth";

const navItems = [
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    clearTokens();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <Link href="/applications" className="flex items-center gap-2">
          <Layers className="h-7 w-7 text-primary" />
          <div>
            <span className="font-title text-lg font-bold text-offwhite">
              Trust<span className="text-primary">Layer</span>
            </span>
            <p className="text-xs text-offwhite/40">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-input text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-offwhite/60 hover:text-offwhite hover:bg-dark/50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-input text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
