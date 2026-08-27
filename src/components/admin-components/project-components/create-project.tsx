"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./create-project.css";
import { createProject, CreateProjectRequest } from "@/api/create-project.api";

const createProjectSchema = z
  .object({
    projectName: z.string().trim().min(1, "Project name is required").min(3, "Project name must be at least 3 characters"),
    description: z.string().trim().min(1, "Description is required").min(10, "Description must be at least 10 characters"),
    startDate: z.string().min(1, "Start date is required"),
    targetEndDate: z.string().min(1, "Target end date is required"),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.targetEndDate ||
      data.targetEndDate >= data.startDate,
    {
      message: "Target end date must be on or after the start date",
      path: ["targetEndDate"],
    }
  );

type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

type CreateProjectProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateProject({
  open,
  onClose,
}: CreateProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: CreateProjectRequest) => createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: CreateProjectFormValues) => {
    mutate({
      name: data.projectName,
      description: data.description,
      startDate: data.startDate,
      targetEndDate: data.targetEndDate,
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="create-project-overlay">

      <div className="modal-container">

        {/* HEADER */}

        <div className="modal-header">

          <div className="modal-header-flex">

            <div>

              <h1 className="modal-title">
                Create Project
              </h1>

              <p className="modal-subtitle">
                New projects start in PLANNING status
              </p>

            </div>

            <button
              type="button"
              onClick={handleClose}
              className="btn-close"
            >
              ×
            </button>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-body"
        >

          {/* PROJECT NAME */}

          <div className="form-group">

            <label
              htmlFor="projectName"
              className="form-label"
            >
              Project Name
            </label>

            <input
              id="projectName"
              type="text"
              placeholder="Analytics Pipeline v2"
              className="form-input"
              {...register("projectName")}
            />

            {errors.projectName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.projectName.message}
              </p>
            )}

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label
              htmlFor="description"
              className="form-label"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={3}
              placeholder="Rebuild the nightly analytics aggregation pipeline to support real-time developer performance snapshots."
              className="form-textarea"
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}

          </div>

          {/* DATES */}

          <div className="dates-grid">

            {/* START DATE */}

            <div>

              <label
                htmlFor="startDate"
                className="form-label"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                className="form-input"
                {...register("startDate")}
              />

              {errors.startDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.startDate.message}
                </p>
              )}

            </div>

            {/* TARGET END DATE */}

            <div>

              <label
                htmlFor="targetEndDate"
                className="form-label"
              >
                Target End Date
              </label>

              <input
                id="targetEndDate"
                type="date"
                className="form-input"
                {...register("targetEndDate")}
              />

              {errors.targetEndDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.targetEndDate.message}
                </p>
              )}

            </div>

          </div>

          {/* API ERROR */}

          {error && (
            <p className="mb-3 text-xs text-red-600">
              {error.message}
            </p>
          )}

          {/* FOOTER */}

          <div className="modal-footer">

            <p className="footer-hint">
              You&apos;ll add team members after creating
            </p>

            <div className="footer-actions">

              <button
                type="button"
                onClick={handleClose}
                className="btn-cancel"
                disabled={isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Project"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}