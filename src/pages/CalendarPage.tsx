import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  LayoutGrid,
  List,
  Clock,
  Plus,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/authStore";
import TaskModal from "../components/tasks/TaskModal";

type ViewMode = "day" | "week" | "month";

const hours = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

const categoryColors: Record<string, string> = {
  work: "bg-accent-blue",
  personal: "bg-accent-green",
  meeting: "bg-accent-amber",
  design: "bg-accent-red",
  default: "bg-primary",
};

export default function CalendarPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const subscribeToTasks = useTaskStore((state) => state.subscribeToTasks);
  const addTask = useTaskStore((state) => state.addTask);
  const refreshTasks = useTaskStore((state) => state.refreshTasks);
  const user = useAuthStore((state) => state.user);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    subscribeToTasks();
  }, [subscribeToTasks]);

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    refreshTasks();
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      return isSameDay(parseISO(task.dueDate), date);
    });
  };

  const renderMonthView = () => {
    const days = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      const currentDay = day;
      const dayTasks = getTasksForDate(currentDay);
      const isCurrentMonth = isSameMonth(currentDay, currentDate);

      days.push(
        <button
          key={currentDay.toString()}
          onClick={() => {
            setSelectedDate(currentDay);
            handleViewChange("day");
          }}
          className={`
            min-h-[100px] p-2 border border-border text-left transition-all
            ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white hover:bg-surface-secondary"}
            ${isSameDay(currentDay, selectedDate) ? "ring-2 ring-primary ring-inset" : ""}
          `}
        >
          <div
            className={`text-sm font-medium mb-1 ${isToday(currentDay) ? "text-primary" : "text-text-primary"}`}
          >
            {format(currentDay, "d")}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className={`text-xs px-1.5 py-0.5 rounded truncate text-white ${categoryColors[task.category?.toLowerCase()] || categoryColors.default}`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-text-secondary">
                +{dayTasks.length - 3} more
              </div>
            )}
          </div>
        </button>,
      );
      day = addDays(day, 1);
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-border">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="bg-surface-secondary p-2 text-center text-sm font-medium text-text-secondary"
          >
            {d}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 text-sm font-medium text-text-secondary" />
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`p-3 text-center border-l border-border ${isToday(day) ? "bg-primary-light" : ""}`}
            >
              <div className="text-xs text-text-secondary">
                {format(day, "EEE")}
              </div>
              <div
                className={`text-lg font-semibold ${isToday(day) ? "text-primary" : "text-text-primary"}`}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border">
              <div className="p-2 text-xs text-text-secondary text-right pr-4">
                {hour}
              </div>
              {weekDays.map((day, i) => {
                const dayTasks = getTasksForDate(day).filter((t) =>
                  t.dueTime?.startsWith(hour.split(":")[0]),
                );
                return (
                  <div
                    key={i}
                    className="min-h-[60px] p-1 border-l border-border"
                  >
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs px-2 py-1 rounded mb-1 text-white cursor-pointer hover:opacity-90 ${categoryColors[task.category?.toLowerCase()] || categoryColors.default}`}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayTasks = getTasksForDate(selectedDate);

    return (
      <div className="bg-white rounded-card shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-display font-semibold text-text-primary">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h3>
        </div>

        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {hours.map((hour) => {
              const hourTasks = dayTasks.filter((t) =>
                t.dueTime?.startsWith(hour.split(":")[0]),
              );

              return (
                <div
                  key={hour}
                  className="flex items-stretch border-b border-border min-h-[80px]"
                >
                  <div className="w-16 p-3 text-sm text-text-secondary text-right pr-4">
                    {hour}
                  </div>
                  <div className="flex-1 p-2 relative">
                    {hourTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-2 p-3 rounded-card text-white ${categoryColors[task.category?.toLowerCase()] || categoryColors.default}`}
                      >
                        <div className="font-medium">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-white/70 mt-1">
                            {task.description}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {dayTasks.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-text-secondary">No tasks for this day</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Calendar
        </h1>
        <p className="text-text-secondary">View and manage your tasks</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-card shadow-card p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-surface-secondary"
            >
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <h2 className="text-lg font-display font-semibold text-text-primary min-w-[140px] text-center">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-surface-secondary"
            >
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-light rounded-button ml-2"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-1 bg-surface-secondary rounded-button p-1">
            <button
              onClick={() => handleViewChange("day")}
              className={`px-3 py-1.5 text-sm font-medium rounded-button transition-all ${
                viewMode === "day"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary"
              }`}
            >
              <LayoutGrid size={16} className="inline mr-1" />
              Day
            </button>
            <button
              onClick={() => handleViewChange("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-button transition-all ${
                viewMode === "week"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary"
              }`}
            >
              <List size={16} className="inline mr-1" />
              Week
            </button>
            <button
              onClick={() => handleViewChange("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-button transition-all ${
                viewMode === "month"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary"
              }`}
            >
              <CalendarIcon size={16} className="inline mr-1" />
              Month
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={viewMode}
      >
        {viewMode === "month" && renderMonthView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
      </motion.div>

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
        onSubmit={async (data: any) => {
          await addTask({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            dueTime: data.dueTime,
            priority: data.priority,
            status: data.status,
            category: data.category,
          });
        }}
        mode="add"
      />
    </div>
  );
}
