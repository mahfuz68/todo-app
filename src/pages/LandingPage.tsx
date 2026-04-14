import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  Zap,
  LayoutDashboard,
  ListTodo,
  ClipboardList,
  Timer,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Calendar",
    description: "Day, week, and month views with hourly timeline",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks to team members and track progress together",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Weekly stacked bar charts showing your progress",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Instant updates powered by Firebase",
  },
  {
    icon: Clock,
    title: "Task Scheduling",
    description: "Set due dates, times, and track progress",
  },
  {
    icon: CheckCircle,
    title: "Review System",
    description: "Approve or reject submissions with tracking",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-surface-darker">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border dark:border-border-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-button bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg md:text-xl">
              T
            </span>
          </div>
          <span className="font-display font-bold text-lg md:text-xl text-text-primary dark:text-text-primary-dark">
            TaskFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark text-sm font-medium"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark text-sm font-medium"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark text-sm font-medium"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-3 md:px-4 py-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark text-xs md:text-sm font-medium"
          >
            Log in
          </button>
          <button
            onClick={handleGetStarted}
            className="px-4 md:px-5 py-2 bg-primary text-white dark:text-white text-xs md:text-sm font-medium rounded-button hover:bg-primary/90 transition-all"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent-purple/10 rounded-full blur-[80px] md:blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-2 md:px-4 md:py-2 rounded-full mb-6 md:mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-primary">
              Now with team collaboration & calendar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-text-primary mb-4 md:mb-6 leading-tight"
          >
            Organize work.
            <br />
            <span className="text-primary">Track progress.</span>
            <br />
            <span className="text-text-secondary">Ship faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-lg text-text-secondary max-w-xl mx-auto mb-8 md:mb-10 px-4"
          >
            A multifunctional task manager with built-in scheduling, team
            reviews, and real-time collaboration — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 px-4"
          >
            <button
              onClick={handleGetStarted}
              className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-medium rounded-button text-sm md:text-lg hover:bg-primary/90 flex items-center gap-2 transition-all w-full md:w-auto"
            >
              Start for free
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-text-primary font-medium rounded-button text-sm md:text-lg border border-border hover:bg-surface-secondary transition-all w-full md:w-auto"
            >
              See how it works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12"
          >
            <div className="flex -space-x-3 justify-center">
              {["AK", "MR", "SL", "+"].map((avatar, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs md:text-sm font-medium text-gray-600"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-xs md:text-sm">
              Loved by{" "}
              <span className="text-primary font-semibold">2,400+</span> teams
            </p>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section className="px-4 md:pb-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-card shadow-modal overflow-hidden border border-border"
        >
          <div className="bg-surface-secondary px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 bg-white/50 mx-2 md:mx-4 py-1 md:py-1.5 rounded text-center text-xs text-text-secondary">
              app.taskflow.io/dashboard
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-[200px] bg-surface-secondary p-3 md:p-4 border-r border-border">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-button bg-primary flex items-center justify-center text-white text-xs md:text-sm font-bold">
                  T
                </div>
                <span className="font-display font-bold text-xs md:text-sm">
                  TaskFlow
                </span>
              </div>
              <div className="space-y-1">
                <div className="py-1.5 md:py-2 px-2 md:px-3 bg-primary/10 text-primary rounded-lg flex items-center gap-2">
                  <LayoutDashboard size={14} className="md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">
                    Dashboard
                  </span>
                </div>
                <div className="py-1.5 md:py-2 px-2 md:px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <ListTodo size={14} className="md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">My Tasks</span>
                </div>
                <div className="py-1.5 md:py-2 px-2 md:px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <Calendar size={14} className="md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Calendar</span>
                </div>
                <div className="py-1.5 md:py-2 px-2 md:px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <BarChart3 size={14} className="md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Analytics</span>
                </div>
                <div className="py-1.5 md:py-2 px-2 md:px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <CheckCircle size={14} className="md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Done</span>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-3 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-4 md:mb-6 gap-3">
                <div>
                  <h3 className="font-display font-semibold text-text-primary text-sm md:text-lg">
                    Good morning, Alex 👋
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary">
                    You have 18 tasks this month
                  </p>
                </div>
                <button className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white text-xs md:text-sm font-medium rounded-button">
                  + Add Task
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="bg-surface-secondary rounded-card p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-accent-blue flex items-center justify-center">
                    <ClipboardList
                      size={14}
                      className="text-white w-4 h-4 md:w-5 md:h-5"
                    />
                  </div>
                  <div>
                    <div className="text-sm md:text-xl font-display font-bold text-text-primary">
                      18
                    </div>
                    <div className="text-[10px] md:text-xs text-accent-blue">
                      To-Do
                    </div>
                  </div>
                </div>
                <div className="bg-surface-secondary rounded-card p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-accent-amber flex items-center justify-center">
                    <Timer
                      size={14}
                      className="text-white w-4 h-4 md:w-5 md:h-5"
                    />
                  </div>
                  <div>
                    <div className="text-sm md:text-xl font-display font-bold text-text-primary">
                      12
                    </div>
                    <div className="text-[10px] md:text-xs text-accent-amber">
                      In Progress
                    </div>
                  </div>
                </div>
                <div className="bg-surface-secondary rounded-card p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-accent-green flex items-center justify-center">
                    <CheckCircle
                      size={14}
                      className="text-white w-4 h-4 md:w-5 md:h-5"
                    />
                  </div>
                  <div>
                    <div className="text-sm md:text-xl font-display font-bold text-text-primary">
                      31
                    </div>
                    <div className="text-[10px] md:text-xs text-accent-green">
                      Done
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2 md:space-y-3">
                <div className="bg-surface-secondary rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent-green flex items-center justify-center text-white text-[10px] md:text-xs">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm font-medium text-text-primary line-through opacity-60">
                      User Research
                    </div>
                    <div className="text-[10px] md:text-xs text-text-secondary">
                      10:00–11:00 AM · Completed
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 text-text-secondary text-[10px] md:text-xs rounded-full">
                    Done
                  </span>
                </div>
                <div className="bg-surface-secondary rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-gray-300" />
                  <div className="flex-1">
                    <div className="text-xs md:text-sm font-medium text-text-primary">
                      Dashboard design for admin panel
                    </div>
                    <div className="text-[10px] md:text-xs text-text-secondary">
                      2:00–5:30 PM
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-purple-100 text-purple-600 text-[10px] md:text-xs rounded-full">
                    High
                  </span>
                </div>
                <div className="bg-surface-secondary rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3 border border-border">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-gray-300" />
                  <div className="flex-1">
                    <div className="text-xs md:text-sm font-medium text-text-primary">
                      Web app registration flow
                    </div>
                    <div className="text-[10px] md:text-xs text-text-secondary">
                      10:00 AM–5:30 PM
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-accent-green/10 text-accent-green text-[10px] md:text-xs rounded-full">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wider mb-2 md:mb-3">
              Features
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-primary">
              Everything your team needs to{" "}
              <span className="text-text-secondary">move fast</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 md:p-6 rounded-card border border-border hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-light flex items-center justify-center mb-3 md:mb-4">
                  <feature.icon
                    size={20}
                    className="text-primary w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold text-text-primary mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-xs md:text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="py-12 md:py-20 px-4 md:px-8 bg-surface-secondary"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wider mb-2 md:mb-3">
              How it works
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-primary">
              Three steps to a{" "}
              <span className="text-text-secondary">productive team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                number: "01",
                title: "Create your workspace",
                description:
                  "Sign up, invite your team, and set up your first project in under 2 minutes.",
              },
              {
                number: "02",
                title: "Add & assign tasks",
                description:
                  "Create tasks with priorities, time ranges, and due dates. Assign team members.",
              },
              {
                number: "03",
                title: "Review & ship",
                description:
                  "Submit tasks for review, get approval, and close out work with clear records.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-display font-bold text-primary/20 mb-3 md:mb-4">
                  {step.number}
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold text-text-primary mb-1 md:mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs md:text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {[
            { number: "2.4k+", label: "Teams using TaskFlow" },
            { number: "98%", label: "Free on Spark plan" },
            { number: "<1s", label: "Real-time sync speed" },
            { number: "15+", label: "Firebase features" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-4xl font-display font-bold text-primary mb-1 md:mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-12 md:py-20 px-4 md:px-8 bg-surface-secondary"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-medium text-primary uppercase tracking-wider mb-2 md:mb-3">
              Pricing
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-primary">
              Simple pricing,{" "}
              <span className="text-text-secondary">no surprises</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-card p-6 md:p-8 border border-border">
              <p className="text-xs md:text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">
                Free
              </p>
              <p className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                $0
                <span className="text-base font-normal text-text-secondary">
                  /month
                </span>
              </p>
              <p className="text-text-secondary text-sm mb-4 md:mb-6">
                Everything you need to get started. No credit card required.
              </p>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {[
                  "Up to 3 team members",
                  "Unlimited tasks",
                  "Calendar & schedule view",
                  "Firebase Realtime sync",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs md:text-sm text-text-secondary"
                  >
                    <CheckCircle
                      size={14}
                      className="text-accent-green w-3.5 h-3.5 md:w-4 md:h-4"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-2.5 md:py-3 border border-border rounded-button font-medium text-text-primary hover:bg-surface-secondary transition-all text-sm"
              >
                Get started free
              </button>
            </div>

            <div className="bg-white rounded-card p-6 md:p-8 border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 md:px-4 py-1 text-xs font-medium rounded-full">
                Most popular
              </div>
              <p className="text-xs md:text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">
                Pro
              </p>
              <p className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                $9
                <span className="text-base font-normal text-text-secondary">
                  /month
                </span>
              </p>
              <p className="text-text-secondary text-sm mb-4 md:mb-6">
                For growing teams that need more power and analytics.
              </p>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {[
                  "Unlimited team members",
                  "Advanced analytics charts",
                  "Review & approval workflow",
                  "Push notifications",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs md:text-sm text-text-secondary"
                  >
                    <CheckCircle
                      size={14}
                      className="text-accent-green w-3.5 h-3.5 md:w-4 md:h-4"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-2.5 md:py-3 bg-primary text-white rounded-button font-medium hover:bg-primary/90 transition-all text-sm"
              >
                Start Pro free trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-primary mb-3 md:mb-4">
            Ready to <span className="text-primary">organize</span> your work?
          </h2>
          <p className="text-text-secondary mb-6 md:mb-8 text-sm md:text-base">
            Join thousands of teams already using TaskFlow. Free forever on the
            Spark plan.
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleGetStarted}
              className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-medium rounded-button text-sm md:text-lg hover:bg-primary/90 flex items-center gap-2 transition-all"
            >
              Create free account
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 md:px-8 bg-surface-secondary border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-button bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs md:text-sm">
                T
              </span>
            </div>
            <span className="font-display font-bold text-sm md:text-base text-text-primary">
              TaskFlow
            </span>
          </div>
          <p className="text-text-secondary text-xs md:text-sm">
            © 2026 TaskFlow. Built with Firebase.
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-xs md:text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-xs md:text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-xs md:text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
