import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "../store/taskStore";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  ListTodo,
  AlertCircle,
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function StackedBarChart({
  data,
}: {
  data: { day: string; todo: number; inProgress: number; done: number }[];
}) {
  const maxValue = Math.max(
    ...data.map((d) => d.todo + d.inProgress + d.done),
    1,
  );

  return (
    <div className="flex items-end justify-between gap-2 h-40">
      {data.map((item, index) => {
        const total = item.todo + item.inProgress + item.done;
        const height = (total / maxValue) * 100;

        return (
          <motion.div
            key={item.day}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(height, 4)}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-1 flex flex-col-reverse rounded-lg overflow-hidden bg-surface-secondary"
          >
            {total > 0 && (
              <>
                <div
                  className="w-full bg-accent-green"
                  style={{ height: `${(item.done / total) * 100}%` }}
                />
                <div
                  className="w-full bg-accent-amber"
                  style={{ height: `${(item.inProgress / total) * 100}%` }}
                />
                <div
                  className="w-full bg-accent-blue"
                  style={{ height: `${(item.todo / total) * 100}%` }}
                />
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function StatChip({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-card p-4 shadow-card flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-text-primary">
          {value}
        </p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const tasks = useTaskStore((state) => state.tasks);

  const stats = useMemo(() => {
    const todoCount = tasks.filter((t) => t.status === "todo").length;
    const inProgressCount = tasks.filter(
      (t) => t.status === "in_progress",
    ).length;
    const doneCount = tasks.filter((t) => t.status === "done").length;
    const totalTasks = tasks.length;
    const completionRate =
      totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

    const urgentCount = tasks.filter((t) => t.priority === "urgent").length;
    const highCount = tasks.filter((t) => t.priority === "high").length;
    const mediumCount = tasks.filter((t) => t.priority === "medium").length;
    const lowCount = tasks.filter((t) => t.priority === "low").length;

    const categoryCounts: Record<string, number> = {};
    tasks.forEach((task) => {
      const cat = task.category || "Uncategorized";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyData = weekDays.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      const dateStr = date.toISOString().split("T")[0];

      const dayTasks = tasks.filter((t) => t.dueDate === dateStr);

      return {
        day,
        todo: dayTasks.filter((t) => t.status === "todo").length,
        inProgress: dayTasks.filter((t) => t.status === "in_progress").length,
        done: dayTasks.filter((t) => t.status === "done").length,
      };
    });

    const priorityData = [
      { priority: "Urgent", count: urgentCount, color: "bg-accent-red" },
      { priority: "High", count: highCount, color: "bg-accent-blue" },
      { priority: "Medium", count: mediumCount, color: "bg-accent-amber" },
      { priority: "Low", count: lowCount, color: "bg-gray-400" },
    ].filter((p) => p.count > 0);

    const categoryData = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      todoCount,
      inProgressCount,
      doneCount,
      totalTasks,
      completionRate,
      weeklyData,
      priorityData,
      categoryData,
    };
  }, [tasks]);

  const maxPriority = Math.max(...stats.priorityData.map((p) => p.count), 1);
  const maxCategory = Math.max(...stats.categoryData.map((c) => c.count), 1);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Analytics
        </h1>
        <p className="text-text-secondary">
          Track your progress and productivity
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatChip
          icon={ListTodo}
          label="To Do"
          value={stats.todoCount}
          color="bg-accent-blue"
        />
        <StatChip
          icon={Clock}
          label="In Progress"
          value={stats.inProgressCount}
          color="bg-accent-amber"
        />
        <StatChip
          icon={CheckCircle}
          label="Completed"
          value={stats.doneCount}
          color="bg-accent-green"
        />
        <StatChip
          icon={BarChart3}
          label="Completion"
          value={`${stats.completionRate}%`}
          color="bg-primary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-card shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-text-primary">
            Weekly Overview
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-accent-blue" />
              <span className="text-text-secondary">To Do</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-accent-amber" />
              <span className="text-text-secondary">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-accent-green" />
              <span className="text-text-secondary">Done</span>
            </div>
          </div>
        </div>

        <StackedBarChart data={stats.weeklyData} />

        <div className="flex justify-between mt-4">
          {weekDays.map((day) => (
            <span key={day} className="text-xs text-text-secondary">
              {day}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Priority Breakdown
          </h3>
          {stats.priorityData.length > 0 ? (
            <div className="space-y-3">
              {stats.priorityData.map((priority) => (
                <div
                  key={priority.priority}
                  className="flex items-center justify-between"
                >
                  <span className="text-text-primary">{priority.priority}</span>
                  <div className="w-32 h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(priority.count / maxPriority) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${priority.color}`}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {priority.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-text-secondary">
              <AlertCircle size={16} />
              <span>No tasks yet</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Categories
          </h3>
          {stats.categoryData.length > 0 ? (
            <div className="space-y-3">
              {stats.categoryData.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-text-primary">{category.name}</span>
                  <div className="w-32 h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(category.count / maxCategory) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-text-secondary">
              <AlertCircle size={16} />
              <span>No categories yet</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
