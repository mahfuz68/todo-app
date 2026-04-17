import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Task, Priority, Status } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  dueTime: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["todo", "in_progress", "done"]),
  category: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  task?: Task | null;
  mode?: "add" | "edit";
}

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-gray-100 text-gray-600" },
  { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-600" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-600" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-600" },
];

const statusOptions: { value: Status; label: string }[] = [
  { value: "todo", label: "To-Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode = "add",
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      dueTime: "",
      startTime: "",
      endTime: "",
      priority: "medium",
      status: "todo",
      category: "",
    },
  });

  useEffect(() => {
    if (task && mode === "edit") {
      reset({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate || "",
        dueTime: task.dueTime || "",
        startTime: task.startTime || "",
        endTime: task.endTime || "",
        priority: task.priority,
        status: task.status,
        category: task.category || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        startTime: "",
        endTime: "",
        priority: "medium",
        status: "todo",
        category: "",
      });
    }
  }, [task, mode, reset, isOpen]);

  const onFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    onClose();
  };

  const selectedPriority = watch("priority");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Create Task" : "Edit Task"}
      size="md"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="p-5 space-y-4">
        <Input
          label="Title"
          placeholder="What needs to be done?"
          {...register("title")}
          error={errors.title?.message}
        />

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Add details..."
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Start Time
            </label>
            <input
              type="time"
              {...register("startTime")}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              End Time
            </label>
            <input
              type="time"
              {...register("endTime")}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Due Time
          </label>
          <input
            type="time"
            {...register("dueTime")}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Priority
          </label>
          <div className="flex gap-2">
            {priorityOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex-1 flex items-center justify-center px-2 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                  selectedPriority === opt.value
                    ? opt.color +
                      " ring-2 ring-offset-1 ring-" +
                      (opt.value === "low"
                        ? "gray-400"
                        : opt.value === "medium"
                          ? "blue-500"
                          : opt.value === "high"
                            ? "orange-500"
                            : "red-500")
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  {...register("priority")}
                  value={opt.value}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Category
          </label>
          <input
            type="text"
            {...register("category")}
            placeholder="e.g., Work, Personal"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 text-sm py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 text-sm py-2"
            isLoading={isSubmitting}
          >
            {mode === "add" ? "Create" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
