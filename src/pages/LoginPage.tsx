import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-purple-600 to-pink-500 p-8 md:p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-button bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl md:text-2xl">
                T
              </span>
            </div>
            <span className="text-white font-display font-bold text-xl md:text-2xl">
              TaskFlow
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
            Manage your tasks with ease
          </h1>
          <p className="text-white/70 text-sm md:text-lg max-w-md">
            Stay organized, track progress, and achieve your goals with
            TaskFlow's beautiful task management experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10"
        >
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/50" />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-surface-secondary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
