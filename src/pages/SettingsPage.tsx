import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { Bell, Calendar, RefreshCw } from "lucide-react";
import { googleCalendarService } from "../services/googleCalendarService";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const firebaseUser = useAuthStore((state) => state.firebaseUser);
  const [notifications, setNotifications] = useState(true);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (firebaseUser?.uid) {
      checkCalendarConnection();
    }
  }, [firebaseUser?.uid]);

  const checkCalendarConnection = async () => {
    if (!firebaseUser?.uid) return;
    try {
      const connected = await googleCalendarService.isConnected(firebaseUser.uid);
      setCalendarConnected(connected);
    } catch (error) {
      console.error("Error checking calendar connection:", error);
    }
  };

  const handleCalendarConnect = async () => {
    if (!firebaseUser?.uid) return;
    setConnecting(true);

    try {
      await googleCalendarService.connectGoogleCalendar(firebaseUser.uid);
      setCalendarConnected(true);
    } catch (error: any) {
      console.error("Error connecting to Google Calendar:", error);
      alert("Failed to connect to Google Calendar: " + (error.message || "Unknown error"));
    } finally {
      setConnecting(false);
    }
  };

  const handleCalendarDisconnect = async () => {
    if (!firebaseUser?.uid) return;
    setConnecting(true);

    try {
      await googleCalendarService.disconnectGoogleCalendar(firebaseUser.uid);
      setCalendarConnected(false);
    } catch (error: any) {
      console.error("Error disconnecting from Google Calendar:", error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-text-secondary">Manage your account preferences</p>
      </motion.div>

      <div className="space-y-6">
        <div className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-display font-semibold text-text-primary mb-4">
            Profile
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-primary">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium text-text-primary">{user?.name}</p>
                <p className="text-sm text-text-secondary">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-display font-semibold text-text-primary mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-text-secondary" />
                <span className="text-text-primary">Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  notifications ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${
                    notifications ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-display font-semibold text-text-primary mb-4">
            Integrations
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-text-secondary" />
                <div>
                  <span className="text-text-primary block">
                    Google Calendar
                  </span>
                  <span className="text-xs text-text-secondary">
                    Sync tasks with your calendar
                  </span>
                </div>
              </div>
              <button
                onClick={
                  calendarConnected
                    ? handleCalendarDisconnect
                    : handleCalendarConnect
                }
                disabled={connecting}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  calendarConnected ? "bg-green-500" : "bg-gray-300"
                } ${
                  connecting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {connecting ? (
                  <RefreshCw
                    size={14}
                    className="animate-spin absolute top-1 left-1 text-white"
                  />
                ) : (
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${
                      calendarConnected ? "right-0.5" : "left-0.5"
                    }`}
                  />
                )}
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
