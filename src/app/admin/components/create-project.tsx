"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProject,
  type CreateProjectRequest,
} from "@/services/projectApi";

const createProjectSchema = z
  .object({
    projectName: z
      .string()
      .trim()
      .min(1, "Project name is required")
      .min(3, "Project name must be at least 3 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters"),

    startDate: z.string().min(1, "Start date is required"),

    targetEndDate: z
      .string()
      .min(1, "Target end date is required"),
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

type CreateProjectFormValues = z.infer<
  typeof createProjectSchema
>;

type CreateProjectProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateProject({
  open,
  onClose,
}: CreateProjectProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),

    defaultValues: {
      projectName: "",
      description: "",
      startDate: "",
      targetEndDate: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateProjectRequest) =>
      createProject(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success(
        response?.message || "Project created successfully!"
      );

      reset();

      setTimeout(() => {
        onClose();
      }, 1500);
    },

    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to create project"
      );
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
    if (isPending) {
      return;
    }

    reset();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4">
      <div className="w-full max-w-[650px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {/* HEADER */}
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                Create Project
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500">
                New projects start in PLANNING status
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="text-sm text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed"
            >
              ×
            </button>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="px-5 py-4"
        >
          {/* PROJECT NAME */}
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="mb-1.5 block text-[10px] font-semibold text-gray-700"
            >
              Project Name
            </label>

            <input
              id="projectName"
              type="text"
              placeholder="Analytics Pipeline v2"
              disabled={isPending}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 disabled:bg-gray-100"
              {...register("projectName")}
            />

            {errors.projectName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.projectName.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-1.5 block text-[10px] font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={3}
              placeholder="Rebuild the nightly analytics aggregation pipeline to support real-time developer performance snapshots."
              disabled={isPending}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 disabled:bg-gray-100"
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3">
            {/* START DATE */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-1.5 block text-[10px] font-semibold text-gray-700"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                disabled={isPending}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 disabled:bg-gray-100"
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
                className="mb-1.5 block text-[10px] font-semibold text-gray-700"
              >
                Target End Date
              </label>

              <input
                id="targetEndDate"
                type="date"
                disabled={isPending}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 disabled:bg-gray-100"
                {...register("targetEndDate")}
              />

              {errors.targetEndDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.targetEndDate.message}
                </p>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-gray-50 px-0 py-3">
            <p className="text-[9px] text-gray-400">
              You&apos;ll add team members after creating
            </p>

            <div className="flex gap-2">
              {/* CANCEL */}
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-semibold text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              {/* CREATE */}
              <button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending
                  ? "Creating..."
                  : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}