import { create } from "zustand";
import { Task, Status, Priority, TaskFilters } from "../types";
import { taskService, CreateTaskData } from "../services/taskService";
import { useAuthStore } from "./authStore";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: TaskFilters;
  selectedTaskId: string | null;
  unsubscribe: (() => void) | null;
  subscribeToTasks: () => void;
  unsubscribeFromTasks: () => void;
  addTask: (task: CreateTaskData) => Promise<string | null>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskFilters>) => void;
  setSelectedTaskId: (id: string | null) => void;
  toggleComplete: (id: string) => void;
  refreshTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  filters: { status: "all", sortBy: "dueDate", sortOrder: "asc" },
  selectedTaskId: null,
  unsubscribe: null,

  subscribeToTasks: () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true });

    const unsubscribe = taskService.subscribeToTasks(userId, (tasks) => {
      set({ tasks, isLoading: false });
    });

    set({ unsubscribe });
  },

  unsubscribeFromTasks: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
      set({ unsubscribe: null });
    }
  },

  addTask: async (taskData) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: "You must be logged in to create a task" });
      return null;
    }

    set({ isLoading: true, error: null });
    try {
      const taskId = await taskService.createTask(userId, taskData);
      set({ isLoading: false });
      return taskId;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  updateTask: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.updateTask(id, updates);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.deleteTask(id);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSelectedTaskId: (id) => set({ selectedTaskId: id }),

  toggleComplete: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus: Status = task.status === "done" ? "todo" : "done";
    const newProgress = newStatus === "done" ? 100 : task.progress;

    try {
      await taskService.updateTask(id, {
        status: newStatus,
        progress: newProgress,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  refreshTasks: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const tasks = await taskService.getTasksForUser(userId);
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useTaskStore;
