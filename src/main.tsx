import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuthStore } from "./store/authStore";

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
  console.error("[Global Error]", { message, source, lineno, colno, error });
};

window.onunhandledrejection = (event) => {
  console.error("[Unhandled Promise Rejection]", event.reason);
};

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  React.useEffect(() => {
    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary font-medium">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Create root with error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-text-secondary mb-4">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-button"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthInitializer>
          <App />
        </AuthInitializer>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
