"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import { Eye } from "lucide-react";

interface Application {
  _id: string;
  userId: { _id: string; email: string; fullName?: string } | string;
  status: string;
  personalInfo?: { fullName: string; country: string };
  submittedAt?: string;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export default function ApplicationsTable({
  applications,
}: ApplicationsTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-border">
            <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              User
            </th>
            <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              Full Name
            </th>
            <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              Country
            </th>
            <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              Status
            </th>
            <th className="text-left text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              Submitted
            </th>
            <th className="text-right text-xs font-semibold text-offwhite/40 uppercase tracking-wider py-3 px-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          {applications.map((app) => {
            const user =
              typeof app.userId === "object" ? app.userId : null;

            return (
              <tr
                key={app._id}
                className="hover:bg-dark/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/applications/${app._id}`)}
              >
                <td className="py-3 px-4 text-sm">
                  {user?.email || "—"}
                </td>
                <td className="py-3 px-4 text-sm">
                  {app.personalInfo?.fullName || user?.fullName || "—"}
                </td>
                <td className="py-3 px-4 text-sm text-offwhite/60">
                  {app.personalInfo?.country || "—"}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={app.status} />
                </td>
                <td className="py-3 px-4 text-sm text-offwhite/50">
                  {app.submittedAt
                    ? new Date(app.submittedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-2 rounded hover:bg-dark-border transition-colors">
                    <Eye className="h-4 w-4 text-offwhite/50" />
                  </button>
                </td>
              </tr>
            );
          })}

          {applications.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-offwhite/30 text-sm"
              >
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
