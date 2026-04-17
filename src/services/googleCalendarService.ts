import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

declare global {
  interface Window {
    google: any;
  }
}

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string; timeZone?: string };
  end: { dateTime?: string; date?: string; timeZone?: string };
}

export const googleCalendarService = {
  async loadGIS(): Promise<void> {
    if (window.google?.accounts?.oauth2) {
      return;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load GIS"));
      document.body.appendChild(script);
    });
  },

  async initializeTokenClient(): Promise<any> {
    await this.loadGIS();
    
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    return window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES.join(" "),
      callback: () => {},
    });
  },

  async connectGoogleCalendar(userId: string): Promise<void> {
    await this.loadGIS();
    
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    return new Promise((resolve, reject) => {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES.join(" "),
        callback: async (response: any) => {
          if (response.access_token) {
            try {
              await updateDoc(doc(db, "users", userId), {
                googleAccessToken: response.access_token,
                calendarConnected: true,
                connectedAt: new Date(),
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          } else if (response.error) {
            reject(new Error(response.error));
          } else {
            reject(new Error("No access token"));
          }
        },
      });
      
      tokenClient.requestAccessToken({ prompt: "consent" });
    });
  },

  async disconnectGoogleCalendar(userId: string): Promise<void> {
    await updateDoc(doc(db, "users", userId), {
      googleAccessToken: null,
      calendarConnected: false,
      connectedAt: null,
    });
  },

  async isConnected(userId: string): Promise<boolean> {
    const docSnap = await getDoc(doc(db, "users", userId));
    const data = docSnap.data();
    return data?.calendarConnected === true;
  },

  async createCalendarEvent(
    accessToken: string,
    event: CalendarEvent,
  ): Promise<string> {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status}`);
    }
    
    const data = await response.json();
    return data.id;
  },

  async updateCalendarEvent(
    accessToken: string,
    eventId: string,
    event: Partial<CalendarEvent>,
  ): Promise<void> {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status}`);
    }
  },

  async deleteCalendarEvent(
    accessToken: string,
    eventId: string,
  ): Promise<void> {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok && response.status !== 204) {
      throw new Error(`Failed to delete event: ${response.status}`);
    }
  },

  async syncTaskToCalendar(
    userId: string,
    taskId: string,
    task: {
      title: string;
      description?: string;
      dueDate?: string;
      dueTime?: string;
      startTime?: string;
      endTime?: string;
    },
    existingEventId?: string,
  ): Promise<string> {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    const accessToken = userData?.googleAccessToken;

    if (!accessToken) {
      throw new Error("Google Calendar not connected");
    }

    const event: CalendarEvent = {
      summary: task.title,
      description: task.description,
    };

    if (task.dueDate) {
      const baseDate = task.dueDate;
      if (task.startTime && task.endTime) {
        event.start = { dateTime: `${baseDate}T${task.startTime}:00`, timeZone: "UTC" };
        event.end = { dateTime: `${baseDate}T${task.endTime}:00`, timeZone: "UTC" };
      } else if (task.dueTime) {
        event.start = { dateTime: `${baseDate}T${task.dueTime}:00`, timeZone: "UTC" };
        const [hours, mins] = task.dueTime.split(":").map(Number);
        const endHour = String((hours + 1) % 24).padStart(2, "0");
        event.end = { dateTime: `${baseDate}T${endHour}:${mins}:00`, timeZone: "UTC" };
      } else {
        event.start = { date: baseDate };
        event.end = { date: baseDate };
      }
    }

    if (existingEventId) {
      await this.updateCalendarEvent(accessToken, existingEventId, event);
      return existingEventId;
    }

    return await this.createCalendarEvent(accessToken, event);
  },

  async deleteTaskFromCalendar(
    userId: string,
    eventId: string,
  ): Promise<void> {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    const accessToken = userData?.googleAccessToken;

    if (accessToken && eventId) {
      await this.deleteCalendarEvent(accessToken, eventId);
    }
  },

  getAccessToken(): Promise<string | null> {
    return new Promise(async (resolve) => {
      await this.loadGIS();
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES.join(" "),
        callback: (response: any) => {
          resolve(response.access_token || null);
        },
      });
      
      tokenClient.requestAccessToken({ prompt: "none" });
    });
  },
};

export default googleCalendarService;