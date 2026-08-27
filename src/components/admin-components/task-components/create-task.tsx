"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createTask,
  type CreateTaskRequest,
} from "@/api/create_task.api";

import "./create-task.css";

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

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

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

type CreateTaskFormValues = z.infer<
  typeof createTaskSchema
>;

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

  /*
   * Keep projectId synchronized with the value received
   * from the parent component.
   */
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
    mutationFn: (data: CreateTaskRequest) =>
      createTask(data),

    onSuccess: () => {
      setSubmitted(true);

      /*
       * Tell the Task Board that a new task was created.
       * The board will refetch the backend data.
       */
      onCreated?.();

      setTimeout(() => {
        setSubmitted(false);
        reset();
        onClose();
      }, 1800);
    },
  });

  const onSubmit = (
    data: CreateTaskFormValues
  ) => {
    createTaskMutation.mutate({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      acceptanceCriteria: data.acceptanceCriteria,
      priority: data.priority,

      ...(data.deadline
        ? {
            deadline: new Date(
              data.deadline
            ).toISOString(),
          }
        : {}),
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="create-task-overlay">
      <div className="create-task-modal">

        {submitted ? (
          <div className="create-task-success">

            <div className="create-task-success-icon">
              ✓
            </div>

            <h2 className="create-task-success-title">
              Task submitted
            </h2>

            <p className="create-task-success-text">
              Your new task has been submitted successfully.
            </p>

          </div>
        ) : (
          <>
            {/* HEADER */}

            <div className="create-task-header">

              <div>
                <h2 className="create-task-title">
                  New Task
                </h2>

                <p className="create-task-subtitle">
                  Create a new task
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="create-task-close"
                disabled={createTaskMutation.isPending}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="create-task-form"
            >

              <div className="create-task-fields">

                {/* PROJECT ID */}

                <div>
                  <label className="create-task-label">
                    Project ID
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter project ID"
                    className="create-task-input"
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

                {/* TITLE */}

                <div>
                  <label className="create-task-label">
                    Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="create-task-input"
                    {...register("title")}
                  />

                  {errors.title && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="create-task-label">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Describe the task"
                    className="create-task-textarea"
                    {...register("description")}
                  />

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* ACCEPTANCE CRITERIA */}

                <div>
                  <label className="create-task-label">
                    Acceptance Criteria
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Enter acceptance criteria"
                    className="create-task-textarea"
                    {...register("acceptanceCriteria")}
                  />

                  {errors.acceptanceCriteria && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.acceptanceCriteria.message}
                    </p>
                  )}
                </div>

                {/* PRIORITY + DEADLINE */}

                <div className="create-task-priority-deadline">

                  <div>
                    <label className="create-task-label">
                      Priority
                    </label>

                    <select
                      className="create-task-input"
                      {...register("priority")}
                    >
                      <option value="LOW">
                        Low
                      </option>

                      <option value="MEDIUM">
                        Medium
                      </option>

                      <option value="HIGH">
                        High
                      </option>

                      <option value="CRITICAL">
                        Critical
                      </option>
                    </select>

                    {errors.priority && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.priority.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="create-task-label">
                      Deadline
                    </label>

                    <input
                      type="date"
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      className="create-task-input"
                      {...register("deadline")}
                    />

                    {errors.deadline && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* API ERROR */}

                {createTaskMutation.isError && (
                  <p className="mt-1 text-sm text-red-600">
                    {createTaskMutation.error instanceof Error
                      ? createTaskMutation.error.message
                      : "Failed to create task"}
                  </p>
                )}

              </div>

              {/* FOOTER */}

              <div className="create-task-footer">

                <button
                  type="button"
                  onClick={onClose}
                  className="create-task-cancel"
                  disabled={createTaskMutation.isPending}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-task-submit"
                  disabled={createTaskMutation.isPending}
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