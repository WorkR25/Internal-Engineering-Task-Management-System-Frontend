"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createTask,
  type CreateTaskRequest,
} from "@/services/taskApi";
import { getProjects } from "@/services/projectApi";

const createTaskSchema = z.object({
  projectId: z
    .number({
      error: "Project is required",
    })
    .int("Project must be valid")
    .positive("Please select a project"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),

  acceptanceCriteria: z
    .string()
    .trim()
    .min(1, "Acceptance criteria is required")
    .min(5, "Acceptance criteria must be at least 5 characters"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),

  deadline: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) {
          return true;
        }

        const selectedDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return (
          !Number.isNaN(selectedDate.getTime()) &&
          selectedDate >= today
        );
      },
      {
        message: "Deadline must be today or a future date",
      }
    ),
});

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

type CreateTaskProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export default function CreateTask({
  open,
  onClose,
  onCreated,
}: CreateTaskProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      projectId: 0,
      title: "",
      description: "",
      acceptanceCriteria: "",
      priority: "HIGH",
      deadline: "",
    },
  });

  const {
    data: projectsResponse,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: open,
  });

  const projects = projectsResponse?.data ?? [];

  useEffect(() => {
    if (open) {
      reset({
        projectId: 0,
        title: "",
        description: "",
        acceptanceCriteria: "",
        priority: "HIGH",
        deadline: "",
      });
    }
  }, [open, reset]);

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskRequest) => createTask(data),

    onSuccess: (response) => {
      toast.success(
        response?.message || "Task created successfully!"
      );

      onCreated?.();

      reset();

      onClose();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create task"
      );
    },
  });

  const onSubmit = (data: CreateTaskFormValues) => {
    createTaskMutation.mutate({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      acceptanceCriteria: data.acceptanceCriteria,
      priority: data.priority,
      ...(data.deadline
        ? {
            deadline: new Date(data.deadline).toISOString(),
          }
        : {}),
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4">
      <div className="w-full max-w-[450px] rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              New Task
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Create a new task
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={createTaskMutation.isPending}
            className="text-lg text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-5"
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Project
              </label>

              <select
                disabled={
                  createTaskMutation.isPending ||
                  projectsLoading ||
                  projects.length === 0
                }
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                {...register("projectId", {
                  valueAsNumber: true,
                })}
              >
                <option value={0}>
                  {projectsLoading
                    ? "Loading projects..."
                    : "Select a project"}
                </option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>

              {projectsError && (
                <p className="mt-1 text-xs text-red-600">
                  Failed to load projects
                </p>
              )}

              {errors.projectId && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.projectId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter task title"
                disabled={createTaskMutation.isPending}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                {...register("title")}
              />

              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows={3}
                placeholder="Describe the task"
                disabled={createTaskMutation.isPending}
                className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                {...register("description")}
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Acceptance Criteria
              </label>

              <textarea
                rows={3}
                placeholder="Enter acceptance criteria"
                disabled={createTaskMutation.isPending}
                className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                {...register("acceptanceCriteria")}
              />

              {errors.acceptanceCriteria && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.acceptanceCriteria.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Priority
                </label>

                <select
                  disabled={createTaskMutation.isPending}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                  {...register("priority")}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>

                {errors.priority && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Deadline
                </label>

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  disabled={createTaskMutation.isPending}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5] disabled:bg-gray-100"
                  {...register("deadline")}
                />

                {errors.deadline && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={createTaskMutation.isPending}
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="rounded-md bg-[#5146e5] px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createTaskMutation.isPending
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}