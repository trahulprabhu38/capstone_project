"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";
import { Loader2, UserCog, ShieldCheck } from "lucide-react";

interface UserData {
  _id: string;
  email: string;
  fullName?: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await api.get("/admin/users");
        if (data.success) {
          setUsers(data.data);
        }
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handlePromote = async (userId: string) => {
    if (!confirm("Are you sure you want to promote this user to admin?")) return;

    // Reason: promotion endpoint would be a PATCH on the user — not yet in API
    // This is a placeholder for the promote-to-admin feature
    alert("Promote to admin feature — add PATCH /admin/users/:id/promote endpoint");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Users</h1>
        <p className="text-sm text-offwhite/50">
          Manage registered users ({users.length} total)
        </p>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
                Email
              </th>
              <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
                Full Name
              </th>
              <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
                Role
              </th>
              <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
                Registered
              </th>
              <th className="text-right text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-dark/50 transition-colors">
                <td className="py-3 px-4 text-sm">{user.email}</td>
                <td className="py-3 px-4 text-sm">{user.fullName || "—"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      user.role === "admin" ? "text-primary" : "text-offwhite/50"
                    }`}
                  >
                    {user.role === "admin" && (
                      <ShieldCheck className="h-3 w-3" />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-offwhite/50">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handlePromote(user._id)}
                      className="text-xs text-mint hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      <UserCog className="h-3 w-3" />
                      Promote
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
