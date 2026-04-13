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
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border dark:border-border-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-button bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">T</span>
          </div>
          <span className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark">
            TaskFlow
          </span>
        </div>
        <div className="flex items-center gap-6">
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark text-sm font-medium"
          >
            Log in
          </button>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 bg-primary text-white dark:text-white text-sm font-medium rounded-button hover:bg-primary/90 transition-all"
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Now with team collaboration & calendar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-6 leading-tight"
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
            className="text-lg text-text-secondary max-w-xl mx-auto mb-10"
          >
            A multifunctional task manager with built-in scheduling, team
            reviews, and real-time collaboration — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-primary text-white font-medium rounded-button text-lg hover:bg-primary/90 flex items-center gap-2 transition-all"
            >
              Start for free
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-text-primary font-medium rounded-button text-lg border border-border hover:bg-surface-secondary transition-all"
            >
              See how it works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <div className="flex -space-x-3">
              {["AK", "MR", "SL", "+"].map((avatar, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm">
              Loved by{" "}
              <span className="text-primary font-semibold">2,400+</span> teams
            </p>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section className="px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-card shadow-modal overflow-hidden border border-border"
        >
          <div className="bg-surface-secondary px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 bg-white/50 mx-4 py-1.5 rounded text-center text-xs text-text-secondary">
              app.taskflow.io/dashboard
            </div>
          </div>
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[200px] bg-surface-secondary p-4 border-r border-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-button bg-primary flex items-center justify-center text-white text-sm font-bold">
                  T
                </div>
                <span className="font-display font-bold text-sm">TaskFlow</span>
              </div>
              <div className="space-y-1">
                <div className="py-2 px-3 bg-primary/10 text-primary rounded-lg flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <div className="py-2 px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <ListTodo size={16} />
                  <span className="text-sm">My Tasks</span>
                </div>
                <div className="py-2 px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <Calendar size={16} />
                  <span className="text-sm">Calendar</span>
                </div>
                <div className="py-2 px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <BarChart3 size={16} />
                  <span className="text-sm">Analytics</span>
                </div>
                <div className="py-2 px-3 text-text-secondary flex items-center gap-2 rounded-lg hover:bg-white/50">
                  <CheckCircle size={16} />
                  <span className="text-sm">Done</span>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-text-primary text-lg">
                    Good morning, Alex 👋
                  </h3>
                  <p className="text-sm text-text-secondary">
                    You have 18 tasks this month
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-button">
                  + Add Task
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-surface-secondary rounded-card p-4 flex items-center gap-3 border border-border">
                  <div className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center">
                    <ClipboardList size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-text-primary">
                      18
                    </div>
                    <div className="text-xs text-accent-blue">To-Do</div>
                  </div>
                </div>
                <div className="bg-surface-secondary rounded-card p-4 flex items-center gap-3 border border-border">
                  <div className="w-12 h-12 rounded-full bg-accent-amber flex items-center justify-center">
                    <Timer size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-text-primary">
                      12
                    </div>
                    <div className="text-xs text-accent-amber">In Progress</div>
                  </div>
                </div>
                <div className="bg-surface-secondary rounded-card p-4 flex items-center gap-3 border border-border">
                  <div className="w-12 h-12 rounded-full bg-accent-green flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-text-primary">
                      31
                    </div>
                    <div className="text-xs text-accent-green">Done</div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <div className="bg-surface-secondary rounded-lg p-4 flex items-center gap-3 border border-border">
                  <div className="w-5 h-5 rounded-full bg-accent-green flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary line-through opacity-60">
                      User Research
                    </div>
                    <div className="text-xs text-text-secondary">
                      10:00–11:00 AM · Completed
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                    Done
                  </span>
                </div>
                <div className="bg-surface-secondary rounded-lg p-4 flex items-center gap-3 border border-border">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">
                      Dashboard design for admin panel
                    </div>
                    <div className="text-xs text-text-secondary">
                      2:00–5:30 PM
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                    High
                  </span>
                </div>
                <div className="bg-surface-secondary rounded-lg p-4 flex items-center gap-3 border border-border">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">
                      Web app registration flow
                    </div>
                    <div className="text-xs text-text-secondary">
                      10:00 AM–5:30 PM
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-accent-green/10 text-accent-green text-xs rounded-full">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              Everything your team needs to{" "}
              <span className="text-text-secondary">move fast</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-card border border-border hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-8 bg-surface-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              Three steps to a{" "}
              <span className="text-text-secondary">productive team</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                <div className="text-6xl font-display font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "2.4k+", label: "Teams using TaskFlow" },
            { number: "98%", label: "Free on Spark plan" },
            { number: "<1s", label: "Real-time sync speed" },
            { number: "15+", label: "Firebase features" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-display font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-8 bg-surface-secondary">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              Simple pricing,{" "}
              <span className="text-text-secondary">no surprises</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-card p-8 border border-border">
              <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">
                Free
              </p>
              <p className="text-4xl font-display font-bold text-text-primary mb-2">
                $0
                <span className="text-base font-normal text-text-secondary">
                  /month
                </span>
              </p>
              <p className="text-text-secondary text-sm mb-6">
                Everything you need to get started. No credit card required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 3 team members",
                  "Unlimited tasks",
                  "Calendar & schedule view",
                  "Firebase Realtime sync",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle size={16} className="text-accent-green" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 border border-border rounded-button font-medium text-text-primary hover:bg-surface-secondary transition-all"
              >
                Get started free
              </button>
            </div>

            <div className="bg-white rounded-card p-8 border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 text-xs font-medium rounded-full">
                Most popular
              </div>
              <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">
                Pro
              </p>
              <p className="text-4xl font-display font-bold text-text-primary mb-2">
                $9
                <span className="text-base font-normal text-text-secondary">
                  /month
                </span>
              </p>
              <p className="text-text-secondary text-sm mb-6">
                For growing teams that need more power and analytics.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited team members",
                  "Advanced analytics charts",
                  "Review & approval workflow",
                  "Push notifications",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle size={16} className="text-accent-green" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 bg-primary text-white rounded-button font-medium hover:bg-primary/90 transition-all"
              >
                Start Pro free trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            Ready to <span className="text-primary">organize</span> your work?
          </h2>
          <p className="text-text-secondary mb-8">
            Join thousands of teams already using TaskFlow. Free forever on the
            Spark plan.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-primary text-white font-medium rounded-button text-lg hover:bg-primary/90 flex items-center gap-2 transition-all"
            >
              Create free account
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-surface-secondary border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-button bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold">T</span>
            </div>
            <span className="font-display font-bold text-text-primary">
              TaskFlow
            </span>
          </div>
          <p className="text-text-secondary text-sm">
            © 2026 TaskFlow. Built with Firebase.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
