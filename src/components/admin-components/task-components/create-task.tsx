"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./create-task.css";

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").min(5, "Title must be at least 5 characters"),
  description: z.string().trim().min(1, "Description is required").min(5, "Description must be at least 5 characters"),
  acceptanceCriteria: z.string().min(1, "Acceptance criteria is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  deadline: z.string().optional(),
});

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

type CreateTaskProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateTask({
  open,
  onClose,
}: CreateTaskProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      priority: "HIGH",
    },
  });

  const onSubmit = (data: CreateTaskFormValues) => {
    console.log(data);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
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

            <div className="create-task-header">

              <div>
                <h2 className="create-task-title">
                  New Task
                </h2>

                <p className="create-task-subtitle">
                  Create a new task for Payments Platform
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="create-task-close"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="create-task-form"
            >

              <div className="create-task-fields">

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

              </div>

              <div className="create-task-footer">

                <button
                  type="button"
                  onClick={onClose}
                  className="create-task-cancel"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-task-submit"
                >
                  Create Task
                </button>

              </div>

            </form>

          </>
        )}

      </div>
    </div>
  );
}