"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRole } from "@/services/roleApi";

const createRoleSchema = z.object({
  roleName: z
    .string()
    .trim()
    .min(1, "Role name is required")
    .min(3, "Role name must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type CreateRoleFormValues = z.infer<typeof createRoleSchema>;

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoleModal({
  isOpen,
  onClose,
}: CreateRoleModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
  });

  const createRoleMutation = useMutation({
    mutationFn: createRole,

    onSuccess: (response) => {
      // Success is now shown using Sonner toast
      toast.success(
        response?.message || "Role created successfully!"
      );

      reset();
      onClose();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create role"
      );
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCreateRole = (data: CreateRoleFormValues) => {
    createRoleMutation.mutate({
      name: data.roleName,
      description: data.description,
    });
  };

  const handleClose = () => {
    if (createRoleMutation.isPending) {
      return;
    }

    createRoleMutation.reset();
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Create New Role
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Define permissions and access levels for your team
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={createRoleMutation.isPending}
            className="text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(handleCreateRole)}
          noValidate
        >
          <div className="space-y-5 p-6">

            {/* ROLE NAME */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-semibold text-black">
                Role Name
              </label>

              <input
                type="text"
                placeholder="e.g. Lead Engineer"
                disabled={createRoleMutation.isPending}
                aria-invalid={!!errors.roleName}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  errors.roleName
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[#4f46e5]"
                }`}
                {...register("roleName")}
              />

              {errors.roleName && (
                <p className="mt-1.5 text-[11px] font-medium text-red-500">
                  {errors.roleName.message}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-black">
                Description
              </label>

              <textarea
                placeholder="Briefly describe the responsibilities..."
                rows={3}
                disabled={createRoleMutation.isPending}
                aria-invalid={!!errors.description}
                className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  errors.description
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[#4f46e5]"
                }`}
                {...register("description")}
              />

              {errors.description && (
                <p className="mt-1.5 text-[11px] font-medium text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50/80 px-6 py-6">
            <div className="flex items-center space-x-3">

              <button
                type="button"
                onClick={handleClose}
                disabled={createRoleMutation.isPending}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={createRoleMutation.isPending}
                className="rounded-lg bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createRoleMutation.isPending
                  ? "Creating..."
                  : "Create Role"}
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}