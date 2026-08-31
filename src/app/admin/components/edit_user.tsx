"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/userApi";

const editUserSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .max(150, "Full name must be at most 150 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.password) {
        return true;
      }

      return (
        data.password.length >= 8 &&
        data.password.length <= 72 &&
        /[a-z]/.test(data.password) &&
        /[A-Z]/.test(data.password) &&
        /[0-9]/.test(data.password) &&
        /[^a-zA-Z0-9]/.test(data.password)
      );
    },
    {
      message:
        "Password must be 8-72 characters and contain uppercase, lowercase, number, and special character",
      path: ["password"],
    }
  );

type EditUserFormValues = z.infer<typeof editUserSchema>;

interface EditUserModalProps {
  isOpen: boolean;
  user: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  onClose: () => void;
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
}: EditUserModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        password: "",
      });

      setIsSuccess(false);
      setShowPassword(false);
    }
  }, [isOpen, user, reset]);

  const updateUserMutation = useMutation({
    mutationFn: (data: EditUserFormValues) => {
      const updateData: {
        fullName?: string;
        email?: string;
        password?: string;
      } = {
        fullName: data.fullName,
        email: data.email,
      };

      if (data.password) {
        updateData.password = data.password;
      }

      return updateUser(user!.id, updateData);
    },

    onSuccess: () => {
      setIsSuccess(true);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setShowPassword(false);
        reset();
        updateUserMutation.reset();
        onClose();
      }, 1500);
    },
  });

  const handleUpdateUser = (data: EditUserFormValues) => {
    updateUserMutation.mutate(data);
  };

  const handleClose = () => {
    if (updateUserMutation.isPending) {
      return;
    }

    setIsSuccess(false);
    setShowPassword(false);
    updateUserMutation.reset();
    reset();
    onClose();
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Developer
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your account details
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close modal"
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
              Account Updated Successfully!
            </h3>

            <p className="text-center text-sm text-gray-500">
              Your account has been updated successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-black">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Priyanka Iyer"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#4f46e5]"
                  {...register("fullName")}
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-black">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="priyanka.iyer@company.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#4f46e5]"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  New Password
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Leave empty to keep current password"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#4f46e5]"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18M10.58 10.58A2 2 0 0113.42 13.42M9.88 5.09A9.77 9.77 0 0112 4.5c5.25 0 9.27 4.5 10.5 7.5a18.2 18.2 0 01-3.04 4.62M6.61 6.61C4.73 7.91 3.34 9.7 1.5 12c1.23 3 5.25 7.5 10.5 7.5 1.45 0 2.78-.27 3.96-.72"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-4">
                <svg
                  className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-sm leading-relaxed text-gray-600">
                  Leave the password field empty if you do not want
                  to change the current password.
                </p>
              </div>

              {updateUserMutation.isError && (
                <p className="text-sm text-red-600">
                  {updateUserMutation.error instanceof Error
                    ? updateUserMutation.error.message
                    : "Failed to update user"}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 p-6">
              <div className="text-xs font-medium text-gray-400">
                Role: DEVELOPER
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  disabled={updateUserMutation.isPending}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="rounded-lg bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateUserMutation.isPending
                    ? "Updating..."
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}