import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, error, showPasswordToggle, type, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`
              w-full px-4 py-3 rounded-button border border-border bg-white
              font-body text-text-primary placeholder:text-text-secondary/60
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
              transition-all duration-200
              ${error ? "border-accent-red focus:ring-accent-red/30" : ""}
              ${isPassword && showPasswordToggle ? "pr-12" : ""}
              ${className}
            `}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-accent-red">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
