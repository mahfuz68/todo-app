import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  Unsubscribe,
  writeBatch,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Task, Status, Priority } from "../types";

const TASKS_COLLECTION = "tasks";
const SUBTASKS_COLLECTION = "subtasks";
const REVIEWS_COLLECTION = "reviews";

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category?: string;
  dueDate?: string;
  dueTime?: string;
  startTime?: string;
  endTime?: string;
  teamMembers?: string[];
  progress?: number;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  reviewCount?: number;
}

export const taskService = {
  async createTask(userId: string, data: CreateTaskData): Promise<string> {
    const taskData = {
      ...data,
      createdBy: userId,
      teamMembers: data.teamMembers || [userId],
      progress: data.progress || 0,
      reviewCount: 0,
      attachments: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData);
    return docRef.id;
  },

  async getTask(taskId: string): Promise<Task | null> {
    const docSnap = await getDoc(doc(db, TASKS_COLLECTION, taskId));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Task;
  },

  async getTasksForUser(userId: string): Promise<Task[]> {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("teamMembers", "array-contains", userId),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  },

  subscribeToTasks(
    userId: string,
    callback: (tasks: Task[]) => void,
  ): Unsubscribe {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("teamMembers", "array-contains", userId),
    );

    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      callback(tasks);
    });
  },

  async updateTask(taskId: string, data: UpdateTaskData): Promise<void> {
    await updateDoc(doc(db, TASKS_COLLECTION, taskId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  async updateTaskStatus(taskId: string, status: Status): Promise<void> {
    await updateDoc(doc(db, TASKS_COLLECTION, taskId), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  async updateTaskProgress(taskId: string, progress: number): Promise<void> {
    await updateDoc(doc(db, TASKS_COLLECTION, taskId), {
      progress,
      updatedAt: serverTimestamp(),
    });
  },

  async deleteTask(taskId: string): Promise<void> {
    const batch = writeBatch(db);

    const subtasksQuery = query(
      collection(db, SUBTASKS_COLLECTION),
      where("taskId", "==", taskId),
    );
    const subtasksSnapshot = await getDocs(subtasksQuery);
    subtasksSnapshot.docs.forEach((subtaskDoc) => {
      batch.delete(doc(db, SUBTASKS_COLLECTION, subtaskDoc.id));
    });

    batch.delete(doc(db, TASKS_COLLECTION, taskId));
    await batch.commit();
  },

  async addTeamMember(taskId: string, userId: string): Promise<void> {
    await updateDoc(doc(db, TASKS_COLLECTION, taskId), {
      teamMembers: arrayUnion(userId),
      updatedAt: serverTimestamp(),
    });
  },

  async removeTeamMember(taskId: string, userId: string): Promise<void> {
    await updateDoc(doc(db, TASKS_COLLECTION, taskId), {
      teamMembers: arrayRemove(userId),
      updatedAt: serverTimestamp(),
    });
  },

  async markTasksComplete(taskIds: string[]): Promise<void> {
    const batch = writeBatch(db);
    taskIds.forEach((taskId) => {
      batch.update(doc(db, TASKS_COLLECTION, taskId), {
        status: "done",
        progress: 100,
        updatedAt: serverTimestamp(),
      });
    });
    await batch.commit();
  },

  async deleteCompletedTasks(userId: string): Promise<number> {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("createdBy", "==", userId),
      where("status", "==", "done"),
    );

    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    let count = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
    });

    await batch.commit();
    return count;
  },

  async getTaskStats(userId: string): Promise<{
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  }> {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("teamMembers", "array-contains", userId),
    );

    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => doc.data()) as Task[];

    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in_progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    };
  },

  async getTasksByDate(userId: string, date: string): Promise<Task[]> {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("teamMembers", "array-contains", userId),
      where("dueDate", "==", date),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  },

  async getTasksByPriority(
    userId: string,
    priority: Priority,
  ): Promise<Task[]> {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("teamMembers", "array-contains", userId),
      where("priority", "==", priority),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  },
};

export default taskService;
