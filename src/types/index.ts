export type Priority = "low" | "medium" | "high" | "urgent";
export type Status = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  priority: Priority;
  status: Status;
  category?: string;
  progress: number;
  subtasks?: Subtask[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface TaskFilters {
  status?: Status | "all";
  priority?: Priority | "all";
  search?: string;
  sortBy?: "dueDate" | "priority" | "createdAt" | "title";
  sortOrder?: "asc" | "desc";
}
