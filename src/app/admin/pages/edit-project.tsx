"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProject,
  updateProjectStatus,
} from "@/services/projectApi";

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  description: string;
  startDate: string;
  targetEndDate: string;
};

type EditProjectProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
};

type EditProjectFormValues = {
  name: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
};

function formatInputDate(date?: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
}

export default function EditProject({
  isOpen,
  onClose,
  project,
}: EditProjectProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProjectFormValues>({
    defaultValues: {
      name: project.name || "",
      description: project.description || "",
      startDate: formatInputDate(project.startDate),
      targetEndDate: formatInputDate(project.targetEndDate),
      status: project.status,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: EditProjectFormValues) => {
      await updateProject(project.id, {
        name: data.name.trim(),
        description: data.description.trim(),
        startDate: data.startDate || null,
        targetEndDate: data.targetEndDate || null,
      });

      if (data.status !== project.status) {
        await updateProjectStatus(project.id, {
          status: data.status,
        });
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["project", project.id],
      });

      reset();
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset({
      name: project.name || "",
      description: project.description || "",
      startDate: formatInputDate(project.startDate),
      targetEndDate: formatInputDate(project.targetEndDate),
      status: project.status,
    });

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    isOpen,
    project.name,
    project.description,
    project.startDate,
    project.targetEndDate,
    project.status,
    reset,
  ]);

  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = (data: EditProjectFormValues) => {
    updateMutation.mutate(data);
  };

  const handleClose = () => {
    if (updateMutation.isPending) {
      return;
    }

    updateMutation.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Project
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update project information
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={updateMutation.isPending}
            className="text-2xl leading-none text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5 px-6 py-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Project Name
              </label>

              <input
                type="text"
                {...register("name", {
                  required: "Project name is required",
                })}
                disabled={updateMutation.isPending}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={4}
                {...register("description")}
                disabled={updateMutation.isPending}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Start Date
                </label>

                <input
                  type="date"
                  {...register("startDate")}
                  disabled={updateMutation.isPending}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Target End Date
                </label>

                <input
                  type="date"
                  {...register("targetEndDate")}
                  disabled={updateMutation.isPending}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                {...register("status")}
                disabled={updateMutation.isPending}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
              >
                <option value="PLANNING">
                  PLANNING
                </option>

                <option value="ACTIVE">
                  ACTIVE
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>
              </select>
            </div>

            {updateMutation.isError && (
              <p className="text-sm text-red-600">
                {updateMutation.error instanceof Error
                  ? updateMutation.error.message
                  : "Failed to update project."}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}