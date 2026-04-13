import { motion } from "framer-motion";
import { useTaskStore } from "../store/taskStore";
import TaskList from "../components/tasks/TaskList";
import { Task } from "../types";

export default function CompletedPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const completedTasks = tasks.filter((task) => task.status === "done");

  const handleEditTask = (task: Task) => {
    // Navigate to edit
  };

  const handleDeleteTask = (id: string) => {
    // Handled by store
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Completed Tasks
        </h1>
        <p className="text-text-secondary">
          {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""}{" "}
          completed
        </p>
      </motion.div>

      <TaskList
        tasks={completedTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
