import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "font-body font-medium rounded-button transition-all duration-200 inline-flex items-center justify-center gap-2";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 active:scale-[0.97]",
      secondary:
        "bg-surface-secondary text-text-primary border border-border hover:bg-white",
      ghost: "text-text-secondary hover:bg-surface-secondary",
      danger: "bg-accent-red text-white hover:bg-accent-red/90",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;
