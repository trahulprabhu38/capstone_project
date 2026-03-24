interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  NOT_STARTED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  UNDER_REVIEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  APPROVED: "bg-primary/10 text-primary border-primary/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  NOT_STARTED: "Not Started",
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
        statusStyles[status] || statusStyles.NOT_STARTED
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
