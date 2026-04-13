import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { ThemeContext } from "../../context/ThemeContext";
import SearchBar from "../ui/SearchBar";
import { ChevronDown, User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const tasks = useTaskStore((state) => state.tasks);
  const setFilters = useTaskStore((state) => state.setFilters);
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in_progress",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const totalTasks = tasks.length;

  const trancatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "..";
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilters({ search: value });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-display font-semibold text-text-primary">
          {greeting()}, {user?.name?.split(" ")[0] || "User"} 👋
        </h1>
        <p className="text-sm text-text-secondary">
          You have{" "}
          <span className="font-medium text-primary">{totalTasks}</span> tasks
          this month
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-80">
          <SearchBar
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search tasks..."
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-button hover:bg-surface-secondary transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-text-secondary" />
          ) : (
            <Moon size={20} className="text-text-secondary" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 rounded-button hover:bg-surface-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
              <span className="text-primary font-medium">
                {user?.avatar || user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-dropdown border border-border py-2"
              >
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-medium text-text-primary">{user?.name}</p>
                  <p className="text-sm text-text-secondary">
                    {user?.email && trancatedText(user.email, 16)}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/dashboard/settings")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-accent-red hover:bg-accent-red/5"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
