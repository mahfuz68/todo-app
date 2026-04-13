import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuthStore } from "../../store/authStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, error, isLoading, clearError } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const success = await login(data.email, data.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setFormError("root", { message: error || "Invalid credentials" });
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    const success = await loginWithGoogle();
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Welcome back 👋
        </h1>
        <p className="text-text-secondary">Stay on top of your tasks today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          showPasswordToggle
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => {
              const email = prompt("Enter your email for password reset:");
              if (email) {
                useAuthStore.getState().resetPassword(email);
              }
            }}
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <AnimatePresence>
          {(errors.root || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
            >
              <strong>Login Failed:</strong> {errors.root?.message || error}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting || isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-text-secondary">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-button font-medium text-text-primary hover:bg-surface-secondary transition-colors"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
