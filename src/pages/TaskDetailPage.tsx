import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Flag,
  MessageSquare,
  Users,
  BarChart3,
} from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import { PriorityBadge } from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import Button from "../components/ui/Button";

const mockTeamMembers = [
  { id: "1", name: "Alex", avatar: "A", color: "bg-primary" },
  { id: "2", name: "Sam", avatar: "S", color: "bg-accent-blue" },
  { id: "3", name: "Kim", avatar: "K", color: "bg-accent-green" },
];

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
            Task not found
          </h2>
          <Button onClick={() => navigate("/dashboard")}>Go Back</Button>
        </div>
      </div>
    );
  }

  const reviewCount = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-4xl mx-auto p-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-card shadow-card p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
                {task.title}
              </h1>
              <div className="flex items-center gap-3">
                <PriorityBadge priority={task.priority} />
                {task.category && (
                  <span className="text-sm px-3 py-1 bg-surface-secondary rounded-chip text-text-secondary">
                    {task.category}
                  </span>
                )}
                {reviewCount > 0 && (
                  <span className="text-sm px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-chip flex items-center gap-1">
                    <MessageSquare size={14} />
                    {reviewCount} Review{reviewCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {task.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-secondary mb-2">
                Description
              </h3>
              <p className="text-text-primary">{task.description}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2 text-text-secondary">
              <Calendar size={16} />
              <span className="text-sm">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No due date"}
              </span>
            </div>
            {task.dueTime && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock size={16} />
                <span className="text-sm">{task.dueTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-text-secondary">
              <Flag size={16} />
              <span className="text-sm capitalize">
                {task.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-secondary">
                Work In Progress
              </span>
              <span className="text-sm text-text-secondary">
                {task.progress}%
              </span>
            </div>
            <ProgressBar value={task.progress} className="mb-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Team:</span>
                <div className="flex -space-x-2">
                  {mockTeamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                      title={member.name}
                    >
                      {member.avatar}
                    </div>
                  ))}
                  <button className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary text-xs border-2 border-white hover:bg-gray-200">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-medium">
                A
              </div>
              <div>
                <p className="text-sm text-text-primary">
                  <span className="font-medium">Alex</span> started this task
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
