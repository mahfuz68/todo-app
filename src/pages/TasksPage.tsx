import { useState } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "../store/taskStore";
import TaskList from "../components/tasks/TaskList";
import TaskModal from "../components/tasks/TaskModal";
import { Task, Status } from "../types";
import { Filter, SortAsc } from "lucide-react";

const tabs: { value: Status | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To-Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useTaskStore((state) => state.filters);
  const setFilters = useTaskStore((state) => state.setFilters);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (
      filters.status &&
      filters.status !== "all" &&
      task.status !== filters.status
    )
      return false;
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    // Task deletion is handled by TaskCard
  };

  const handleSubmit = (data: any) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setEditingTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          My Tasks
        </h1>
        <p className="text-text-secondary">
          Manage and organize all your tasks
        </p>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilters({ status: tab.value })}
              className={`px-4 py-2 rounded-button font-medium text-sm transition-all whitespace-nowrap ${
                filters.status === tab.value
                  ? "bg-primary text-white"
                  : "bg-white text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-button transition-all ${
              showFilters
                ? "bg-primary text-white"
                : "bg-white text-text-secondary hover:bg-surface-secondary"
            }`}
          >
            <Filter size={18} />
          </button>
          <button className="p-2 rounded-button bg-white text-text-secondary hover:bg-surface-secondary">
            <SortAsc size={18} />
          </button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-card p-4 mb-6 shadow-card"
        >
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">
                Priority
              </label>
              <select
                className="px-3 py-2 border border-border rounded-button text-sm"
                onChange={(e) =>
                  setFilters({
                    priority: e.target.value as any,
                  })
                }
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-2 block">
                Sort By
              </label>
              <select
                className="px-3 py-2 border border-border rounded-button text-sm"
                onChange={(e) =>
                  setFilters({
                    sortBy: e.target.value as any,
                  })
                }
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="createdAt">Created Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      <TaskList
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        task={editingTask}
        mode={editingTask ? "edit" : "add"}
      />
    </div>
  );
}
