import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center p-8"
      >
        <div className="mb-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-8">
            <span className="text-white font-display font-bold text-4xl">
              T
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold text-white text-center mb-4"
          >
            TaskFlow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-text-secondary text-center text-lg max-w-md"
          >
            Organize your tasks, track progress, and achieve your goals
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm"
        >
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-button transition-all duration-200"
          >
            Get Started
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-text-secondary text-sm"
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="w-2 h-2 rounded-full bg-primary/50"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
