import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ClipboardList,
  Timer,
  CheckCircle,
  Video,
  ArrowRight,
} from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/authStore";
import { TodayTaskList, UpcomingTaskList } from "../components/tasks/TaskList";
import TaskModal from "../components/tasks/TaskModal";
import { Task } from "../types";
import { format, addHours } from "date-fns";

function StatsCard({
  icon: Icon,
  label,
  count,
  color,
}: {
  icon: any;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-card p-6 shadow-card flex items-center gap-4"
    >
      <div
        className={`w-14 h-14 rounded-full ${color} flex items-center justify-center`}
      >
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-text-primary">
          {count}
        </p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </motion.div>
  );
}

function NextMeetingBanner() {
  const meetingTime = addHours(new Date(), 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] rounded-card p-5 mb-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <Video size={24} className="text-white" />
        </div>
        <div>
          <p className="text-white/60 text-sm">Next Meeting</p>
          <p className="text-white font-medium text-lg">Team Standup</p>
          <p className="text-white/60 text-sm">
            Today at {format(meetingTime, "h:mm a")}
          </p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-button text-white text-sm transition-colors">
        Join Now
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const subscribeToTasks = useTaskStore((state) => state.subscribeToTasks);
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    subscribeToTasks();
  }, [subscribeToTasks]);

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in_progress",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleAddTask = async (data: any) => {
    try {
      await addTask({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        dueTime: data.dueTime,
        priority: data.priority,
        status: data.status,
        category: data.category,
        progress: data.progress,
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          {greeting()}, {user?.name?.split(" ")[0] || "User"} 👋
        </h1>
        <p className="text-text-secondary">
          You have{" "}
          <span className="font-medium text-primary">{tasks.length}</span> tasks
          this month
        </p>
      </motion.div>

      <NextMeetingBanner />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatsCard
          icon={ClipboardList}
          label="To-Do"
          count={todoCount}
          color="bg-accent-blue"
        />
        <StatsCard
          icon={Timer}
          label="In Progress"
          count={inProgressCount}
          color="bg-accent-amber"
        />
        <StatsCard
          icon={CheckCircle}
          label="Done"
          count={doneCount}
          color="bg-accent-green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-text-primary">
              Today's Tasks
            </h2>
          </div>
          <TodayTaskList tasks={tasks} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-text-primary">
              Upcoming
            </h2>
          </div>
          <UpcomingTaskList tasks={tasks} />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Plus size={28} />
      </motion.button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        mode="add"
      />
    </div>
  );
}
