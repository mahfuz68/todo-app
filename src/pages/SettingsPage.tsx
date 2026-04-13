import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Moon, Bell, Sun } from "lucide-react";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = useState(true);

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
            <label className="flex items-center justify-between cursor-pointer"></label>
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
      </div>
    </div>
  );
}
