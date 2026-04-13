import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  CheckCircle,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/dashboard/tasks", icon: ListTodo, label: "My Tasks" },
  { path: "/dashboard/calendar", icon: Calendar, label: "Calendar View" },
  { path: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/dashboard/completed", icon: CheckCircle, label: "Done" },
  { path: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-60 h-screen bg-white border-r border-border flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-button bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg">T</span>
          </div>
          <span className="font-display font-bold text-xl text-text-primary">
            TaskFlow
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-button font-medium transition-all ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-button font-medium text-text-secondary hover:bg-surface-secondary hover:text-accent-red transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
