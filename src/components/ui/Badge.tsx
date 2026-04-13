import { Priority } from "../../types";

interface BadgeProps {
  variant?: "default" | "low" | "medium" | "high" | "urgent";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-surface-secondary text-text-secondary",
    low: "bg-gray-100 text-gray-600",
    medium: "bg-accent-amber/15 text-accent-amber",
    high: "bg-accent-blue/15 text-accent-blue",
    urgent: "bg-accent-red/15 text-accent-red",
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-chip text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  };

  return <Badge variant={priority}>{labels[priority]}</Badge>;
}
