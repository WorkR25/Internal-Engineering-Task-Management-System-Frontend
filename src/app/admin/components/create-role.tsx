"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
  const [isSuccess, setIsSuccess] = useState(false);

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
    onSuccess: () => {
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2000);
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
    setIsSuccess(false);
    createRoleMutation.reset();
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
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
            className="text-gray-400 transition-colors hover:text-gray-600"
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

        {isSuccess ? (
          <div className="my-6 flex flex-col items-center justify-center space-y-4 p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Role Created Successfully!
            </h3>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleCreateRole)}
            noValidate
          >
            <div className="space-y-5 p-6">
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-black">
                  Role Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Lead Engineer"
                  aria-invalid={!!errors.roleName}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 ${
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

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-black">
                  Description
                </label>

                <textarea
                  placeholder="Briefly describe the responsibilities..."
                  rows={3}
                  aria-invalid={!!errors.description}
                  className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 ${
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

              {createRoleMutation.isError && (
                <p className="mt-1.5 text-[11px] font-medium text-red-500">
                  {createRoleMutation.error.message}
                </p>
              )}
            </div>

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
        )}
      </div>
    </div>
  );
}