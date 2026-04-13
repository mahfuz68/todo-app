import { motion } from "framer-motion";
import { format, isSameDay, parseISO } from "date-fns";
import { Task } from "../../types";
import TaskCard from "../tasks/TaskCard";

interface TimelineViewProps {
  tasks: Task[];
  selectedDate: Date;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

export default function TimelineView({
  tasks,
  selectedDate,
  onEditTask,
  onDeleteTask,
}: TimelineViewProps) {
  const dayTasks = tasks
    .filter(
      (task) => task.dueDate && isSameDay(parseISO(task.dueDate), selectedDate),
    )
    .sort((a, b) => {
      if (!a.dueTime || !b.dueTime) return 0;
      return a.dueTime.localeCompare(b.dueTime);
    });

  if (dayTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📅</span>
        </div>
        <h3 className="text-lg font-display font-medium text-text-primary mb-2">
          No tasks for {format(selectedDate, "MMMM d")}
        </h3>
        <p className="text-text-secondary text-center">
          Add a task to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-text-primary mb-4">
        Tasks for {format(selectedDate, "EEEE, MMMM d")}
      </h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {dayTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-border flex items-center justify-center">
                <span className="text-xs font-medium text-text-secondary">
                  {task.dueTime
                    ? format(parseISO(`2000-01-01T${task.dueTime}`), "HH:mm")
                    : "--:--"}
                </span>
              </div>
              <div className="flex-1">
                <TaskCard
                  task={task}
                  variant="white"
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
