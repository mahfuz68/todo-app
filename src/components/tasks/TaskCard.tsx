import { motion } from "framer-motion";
import { Task } from "../../types";
import { PriorityBadge } from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import {
  Check,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  variant?: "gradient" | "white" | "dark";
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  showReviewBadge?: boolean;
  showTeamAvatars?: boolean;
}

const categoryColors: Record<string, string> = {
  work: "from-blue-500 to-purple-500",
  personal: "from-green-500 to-teal-500",
  meeting: "from-orange-500 to-pink-500",
  design: "from-pink-500 to-rose-500",
  default: "from-primary to-purple-500",
};

const categorySolidColors: Record<string, string> = {
  work: "bg-accent-blue",
  personal: "bg-accent-green",
  meeting: "bg-accent-amber",
  design: "bg-accent-red",
  default: "bg-primary",
};

const mockTeamMembers = [
  { id: "1", name: "Alex", avatar: "A", color: "bg-primary" },
  { id: "2", name: "Sam", avatar: "S", color: "bg-accent-blue" },
  { id: "3", name: "Kim", avatar: "K", color: "bg-accent-green" },
];

export default function TaskCard({
  task,
  variant = "white",
  onEdit,
  onDelete,
  showReviewBadge = false,
  showTeamAvatars = false,
}: TaskCardProps) {
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const reviewCount = Math.floor(Math.random() * 5) + 1;

  const categoryGradient =
    categoryColors[task.category?.toLowerCase()] || categoryColors.default;
  const categorySolid =
    categorySolidColors[task.category?.toLowerCase()] ||
    categorySolidColors.default;

  const formatTime = (time?: string) => {
    if (!time) return "";
    return time;
  };

  const handleCardClick = () => {
    navigate(`/dashboard/tasks/${task.id}`);
  };

  if (variant === "gradient") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleCardClick}
        className={`min-w-[280px] p-5 rounded-card bg-gradient-to-br ${categoryGradient} text-white shadow-card cursor-pointer`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {showReviewBadge && reviewCount > 0 && (
              <span className="text-xs px-2 py-1 bg-white/20 rounded-chip flex items-center gap-1">
                <MessageSquare size={12} />
                {reviewCount} Review{reviewCount !== 1 ? "s" : ""}
              </span>
            )}
            <span className="text-2xl">
              {task.category === "meeting"
                ? "👥"
                : task.category === "design"
                  ? "🎨"
                  : "📋"}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.status === "done"
                ? "bg-white/30 border-white"
                : "border-white/50 hover:border-white"
            }`}
          >
            {task.status === "done" && <Check size={14} />}
          </button>
        </div>

        <h3
          className={`font-display font-semibold text-lg mb-2 ${task.status === "done" ? "line-through opacity-70" : ""}`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-white/70 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-white/70" />
          <span className="text-sm text-white/70">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No date"}
            {task.dueTime && ` at ${formatTime(task.dueTime)}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">
            {task.progress}% complete
          </span>
          <ProgressBar
            value={task.progress}
            variant="gradient"
            className="w-20"
          />
        </div>

        {showTeamAvatars && task.status !== "done" && (
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {mockTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white/30`}
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              {task.progress < 100 && (
                <span className="text-xs text-white/70">WIP</span>
              )}
            </div>
            {task.progress < 100 && (
              <div className="mt-2">
                <ProgressBar
                  value={task.progress}
                  variant="gradient"
                  className="h-1"
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === "dark") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        onClick={handleCardClick}
        className="bg-[#1A1A2E] rounded-card p-5 shadow-card cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${categorySolid}`} />
            <h3
              className={`font-medium text-white ${task.status === "done" ? "line-through opacity-70" : ""}`}
            >
              {task.title}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              task.status === "done"
                ? "bg-accent-green border-accent-green"
                : "border-white/30 hover:border-accent-green"
            }`}
          >
            {task.status === "done" && (
              <Check size={12} className="text-white" />
            )}
          </button>
        </div>

        {task.description && (
          <p className="text-sm text-white/60 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PriorityBadge priority={task.priority} />
            {task.category && (
              <span className="text-xs px-2 py-1 bg-white/10 rounded-chip text-white/60">
                {task.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Clock size={14} />
            <span className="text-sm">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "No date"}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={handleCardClick}
      className={`bg-white rounded-card p-5 shadow-card border-l-4 cursor-pointer ${
        task.priority === "urgent"
          ? "border-accent-red"
          : task.priority === "high"
            ? "border-accent-blue"
            : task.priority === "medium"
              ? "border-accent-amber"
              : "border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              task.status === "done"
                ? "bg-accent-green border-accent-green"
                : "border-border hover:border-accent-green"
            }`}
          >
            {task.status === "done" && (
              <Check size={12} className="text-white" />
            )}
          </button>
          <h3
            className={`font-medium text-text-primary ${task.status === "done" ? "line-through text-text-secondary" : ""}`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {showReviewBadge && reviewCount > 0 && (
            <span className="text-xs px-2 py-1 bg-accent-blue/10 text-accent-blue rounded-chip flex items-center gap-1">
              <MessageSquare size={12} />
              {reviewCount}
            </span>
          )}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-1.5 rounded-lg hover:bg-surface-secondary"
            >
              <MoreVertical size={16} className="text-text-secondary" />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-dropdown border border-border py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(task);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(task.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-accent-red hover:bg-accent-red/5"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-text-secondary mb-3 line-clamp-2 ml-8">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-8">
        <div className="flex items-center gap-3">
          <PriorityBadge priority={task.priority} />
          {task.category && (
            <span className="text-xs px-2 py-1 bg-surface-secondary rounded-chip text-text-secondary">
              {task.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-text-secondary">
          <Clock size={14} />
          <span className="text-sm">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No date"}
          </span>
        </div>
      </div>

      {task.progress > 0 && task.progress < 100 && (
        <div className="mt-3 ml-8">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <ProgressBar value={task.progress} />
        </div>
      )}

      {showTeamAvatars && task.status !== "done" && (
        <div className="mt-3 ml-8 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {mockTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                  title={member.name}
                >
                  {member.avatar}
                </div>
              ))}
              <button className="w-7 h-7 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary text-xs border-2 border-white hover:bg-gray-200">
                +
              </button>
            </div>
            <span className="text-xs font-medium text-accent-amber">WIP</span>
          </div>
          {task.progress < 100 && (
            <div className="mt-2">
              <ProgressBar value={task.progress} className="h-1" />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
