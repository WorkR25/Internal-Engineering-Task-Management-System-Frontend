"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTask,
  type CreateTaskRequest,
} from "@/services/taskApi";

const createTaskSchema = z.object({
  projectId: z
    .number({
      error: "Project ID is required",
    })
    .int("Project ID must be a valid integer")
    .positive("Project ID must be greater than 0"),
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
  projectId: number;
  onCreated?: () => void;
};

export default function CreateTask({
  open,
  onClose,
  projectId,
  onCreated,
}: CreateTaskProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      projectId,
      title: "",
      description: "",
      acceptanceCriteria: "",
      priority: "HIGH",
      deadline: "",
    },
  });

  useEffect(() => {
    reset({
      projectId,
      title: "",
      description: "",
      acceptanceCriteria: "",
      priority: "HIGH",
      deadline: "",
    });
  }, [projectId, reset]);

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskRequest) => createTask(data),
    onSuccess: () => {
      setSubmitted(true);
      onCreated?.();

      setTimeout(() => {
        setSubmitted(false);
        reset();
        onClose();
      }, 1800);
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
        {submitted ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Task submitted
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your new task has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
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
                    Project ID
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter project ID"
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                    {...register("projectId", {
                      valueAsNumber: true,
                    })}
                  />

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
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
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
                    className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
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
                    className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
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
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
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
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                      {...register("deadline")}
                    />

                    {errors.deadline && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>
                </div>

                {createTaskMutation.isError && (
                  <p className="text-xs text-red-600">
                    {createTaskMutation.error instanceof Error
                      ? createTaskMutation.error.message
                      : "Failed to create task"}
                  </p>
                )}
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
          </>
        )}
      </div>
    </div>
  );
}