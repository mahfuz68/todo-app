import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "default" | "gradient";
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  variant = "default",
  className = "",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`h-full rounded-full ${
            variant === "gradient"
              ? "bg-gradient-to-r from-white/60 to-white"
              : "bg-primary"
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-text-secondary mt-1">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
