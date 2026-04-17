import {
  ref,
  set,
  update,
  onValue,
  push,
  remove,
  serverTimestamp,
} from "firebase/database";
import { rtdb } from "../lib/firebase";

export interface Notification {
  id?: string;
  type:
    | "task_assigned"
    | "review_added"
    | "task_completed"
    | "comment_added";
  taskId?: string;
  message: string;
  read: boolean;
  createdAt: number | object;
}

export const notificationService = {
  async createNotification(
    userId: string,
    notification: Omit<Notification, "id" | "createdAt" | "read">,
  ): Promise<string> {
    const notificationsRef = ref(rtdb, `notifications/${userId}/items`);
    const newNotifRef = push(notificationsRef);

    await set(newNotifRef, {
      ...notification,
      read: false,
      createdAt: serverTimestamp(),
    });

    return newNotifRef.key || "";
  },

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const notifRef = ref(
      rtdb,
      `notifications/${userId}/items/${notificationId}`,
    );
    await update(notifRef, { read: true });
  },

  async markAllAsRead(userId: string): Promise<void> {
    const notificationsRef = ref(rtdb, `notifications/${userId}/items`);
    const snapshot = await new Promise<any>((resolve) => {
      onValue(
        notificationsRef,
        (snapshot) => {
          resolve(snapshot);
        },
        { onlyOnce: true },
      );
    });

    if (snapshot.exists()) {
      const updates: Record<string, boolean> = {};
      snapshot.forEach((child: any) => {
        if (!child.val().read) {
          updates[`${child.key}/read`] = true;
        }
      });

      if (Object.keys(updates).length > 0) {
        await update(ref(rtdb, `notifications/${userId}/items`), updates);
      }
    }
  },

  async deleteNotification(
    userId: string,
    notificationId: string,
  ): Promise<void> {
    const notifRef = ref(
      rtdb,
      `notifications/${userId}/items/${notificationId}`,
    );
    await remove(notifRef);
  },

  subscribeToNotifications(
    userId: string,
    callback: (notifications: Notification[]) => void,
  ): () => void {
    const notificationsRef = ref(rtdb, `notifications/${userId}/items`);

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const notifications: Notification[] = [];
      snapshot.forEach((child) => {
        notifications.push({
          id: child.key,
          ...child.val(),
        });
      });

      notifications.sort((a, b) => {
        const aTime = typeof a.createdAt === "object" ? 0 : a.createdAt;
        const bTime = typeof b.createdAt === "object" ? 0 : b.createdAt;
        return bTime - aTime;
      });

      callback(notifications);
    });

    return unsubscribe;
  },

  subscribeToUnreadCount(
    userId: string,
    callback: (count: number) => void,
  ): () => void {
    const notificationsRef = ref(rtdb, `notifications/${userId}/items`);

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(0);
        return;
      }

      let unreadCount = 0;
      snapshot.forEach((child) => {
        if (!child.val().read) {
          unreadCount++;
        }
      });

      callback(unreadCount);
    });

    return unsubscribe;
  },

  async notifyTaskAssigned(
    userId: string,
    taskId: string,
    taskTitle: string,
    assignedBy: string,
  ): Promise<void> {
    await this.createNotification(userId, {
      type: "task_assigned",
      taskId,
      message: `${assignedBy} assigned you to "${taskTitle}"`,
    });
  },

  async notifyReviewAdded(
    userId: string,
    taskId: string,
    taskTitle: string,
    reviewerName: string,
  ): Promise<void> {
    await this.createNotification(userId, {
      type: "review_added",
      taskId,
      message: `${reviewerName} added a review to "${taskTitle}"`,
    });
  },
};

export default notificationService;
