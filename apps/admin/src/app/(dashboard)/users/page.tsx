"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Loader2,
  ShieldCheck,
  Ban,
  ShieldOff,
  X,
} from "lucide-react";

interface UserData {
  _id: string;
  email: string;
  fullName?: string;
  role: string;
  isBlocked?: boolean;
  blockReason?: string;
  blockedAt?: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [blockModal, setBlockModal] = useState<UserData | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [processing, setProcessing] = useState(false);

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

  const handleBlock = async () => {
    if (!blockModal || !blockReason.trim()) return;
    setProcessing(true);
    try {
      const { data } = await api.patch(`/admin/users/${blockModal._id}/block`, {
        reason: blockReason,
      });
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === blockModal._id
              ? { ...u, isBlocked: true, blockReason, blockedAt: new Date().toISOString() }
              : u
          )
        );
      }
    } catch {
      // handle error
    } finally {
      setProcessing(false);
      setBlockModal(null);
      setBlockReason("");
    }
  };

  const handleUnblock = async (userId: string) => {
    setProcessing(true);
    try {
      const { data } = await api.patch(`/admin/users/${userId}/unblock`);
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? { ...u, isBlocked: false, blockReason: undefined, blockedAt: undefined }
              : u
          )
        );
      }
    } catch {
      // handle error
    } finally {
      setProcessing(false);
    }
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
        <div className="overflow-x-auto">
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
                  Status
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
                <tr
                  key={user._id}
                  className={`hover:bg-dark/50 transition-colors ${
                    user.isBlocked ? "bg-red-500/5" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-sm">{user.fullName || "—"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        user.role === "admin" ? "text-primary" : "text-offwhite/50"
                      }`}
                    >
                      {user.role === "admin" && <ShieldCheck className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.isBlocked ? (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20 cursor-help"
                        title={user.blockReason || "Blocked"}
                      >
                        <Ban className="h-3 w-3" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-offwhite/50">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {user.role !== "admin" && (
                      <>
                        {user.isBlocked ? (
                          <button
                            onClick={() => handleUnblock(user._id)}
                            className="text-xs text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1"
                          >
                            <ShieldOff className="h-3 w-3" />
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => setBlockModal(user)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1"
                          >
                            <Ban className="h-3 w-3" />
                            Block
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block Modal */}
      {blockModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/10 border border-red-500/20 rounded-full p-2">
                  <Ban className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    Block Account
                  </h3>
                  <p className="text-xs text-offwhite/40">{blockModal.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setBlockModal(null);
                  setBlockReason("");
                }}
                className="text-offwhite/40 hover:text-offwhite transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-offwhite/50 mb-4">
              The user will see this reason when they try to access their
              account. They will not be able to submit KYC or perform any
              actions.
            </p>
            <textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              className="input-field min-h-[100px] mb-4"
              placeholder="Reason for blocking this account..."
              required
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setBlockModal(null);
                  setBlockReason("");
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                disabled={processing || !blockReason.trim()}
                className="btn-danger flex items-center gap-2 disabled:opacity-40"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Ban className="h-4 w-4" />
                    Block Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
