import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { Task, Status } from "../../types";
import { useTaskStore } from "../../store/taskStore";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

function formatDueDate(dateStr: string) {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "MMM d");
}

export default function TaskList({
  tasks,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📋</span>
        </div>
        <h3 className="text-lg font-display font-medium text-text-primary mb-2">
          No tasks yet
        </h3>
        <p className="text-text-secondary text-center">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TaskCard
            task={task}
            variant="white"
            onEdit={onEditTask}
            onDelete={(id) => {
              deleteTask(id);
              onDeleteTask?.(id);
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function TodayTaskList({ tasks }: { tasks: Task[] }) {
  const todayTasks = tasks.filter(
    (t) => t.dueDate && isToday(parseISO(t.dueDate)),
  );

  if (todayTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No tasks for today</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {todayTasks.map((task) => (
        <TaskCard key={task.id} task={task} variant="gradient" />
      ))}
    </div>
  );
}

export function UpcomingTaskList({ tasks }: { tasks: Task[] }) {
  const upcomingTasks = tasks
    .filter(
      (t) => t.dueDate && !isToday(parseISO(t.dueDate)) && t.status !== "done",
    )
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )
    .slice(0, 5);

  if (upcomingTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No upcoming tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {upcomingTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-white rounded-card border border-border"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                task.priority === "urgent"
                  ? "bg-accent-red"
                  : task.priority === "high"
                    ? "bg-accent-blue"
                    : task.priority === "medium"
                      ? "bg-accent-amber"
                      : "bg-gray-400"
              }`}
            />
            <span className="font-medium text-text-primary">{task.title}</span>
          </div>
          <span className="text-sm text-text-secondary">
            {formatDueDate(task.dueDate!)}
          </span>
        </div>
      ))}
    </div>
  );
}
