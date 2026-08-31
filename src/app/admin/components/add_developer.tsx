"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser } from "@/services/userApi";

const addDeveloperSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type AddDeveloperFormValues = z.infer<typeof addDeveloperSchema>;

interface AddDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function generateTemporaryPassword() {
  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lowercase = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const special = "!@#$%";

  const getRandomCharacter = (characters: string) => {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return characters[values[0] % characters.length];
  };

  const passwordCharacters = [
    getRandomCharacter(uppercase),
    getRandomCharacter(lowercase),
    getRandomCharacter(numbers),
    getRandomCharacter(special),
  ];

  const allCharacters =
    uppercase + lowercase + numbers + special;

  for (let index = passwordCharacters.length; index < 12; index++) {
    passwordCharacters.push(
      getRandomCharacter(allCharacters)
    );
  }

  for (let index = passwordCharacters.length - 1; index > 0; index--) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);

    const randomIndex = values[0] % (index + 1);

    [
      passwordCharacters[index],
      passwordCharacters[randomIndex],
    ] = [
      passwordCharacters[randomIndex],
      passwordCharacters[index],
    ];
  }

  return passwordCharacters.join("");
}

export default function AddDeveloperModal({
  isOpen,
  onClose,
}: AddDeveloperModalProps) {
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDeveloperFormValues>({
    resolver: zodResolver(addDeveloperSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["developers"],
      });

      toast.success(
        response?.message || "Developer account created successfully!"
      );

      setTimeout(() => {
        setShowPassword(false);
        setTempPassword("");
        reset();
        createUserMutation.reset();
        onClose();
      }, 1500);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create developer account"
      );
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTempPassword(generateTemporaryPassword());
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

  const handleCreateAccount = (data: AddDeveloperFormValues) => {
    createUserMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: tempPassword,
      roleId: "2",
    });
  };

  const handleClose = () => {
    setShowPassword(false);
    setTempPassword("");
    createUserMutation.reset();
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Add Developer
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              There is no public sign-up — accounts are created by Admin only
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close modal"
            disabled={createUserMutation.isPending}
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

        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <div className="space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-black">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Priyanka Iyer"
                disabled={createUserMutation.isPending}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#4f46e5] disabled:bg-gray-100"
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
                disabled={createUserMutation.isPending}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#4f46e5] disabled:bg-gray-100"
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
                Temporary Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={tempPassword}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-24 font-mono text-sm text-gray-900 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 hover:text-gray-600"
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
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>

                <span className="absolute right-10 top-2.5 rounded bg-[#eef2f6] px-2 py-0.5 text-xs font-bold text-gray-600">
                  Auto-generated
                </span>
              </div>
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
                The Developer must change this password on first
                sign-in. It won't be shown again after this account
                is created — share it securely.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 p-6">
            <div className="text-xs font-medium text-gray-400">
              Role: DEVELOPER · Status: Active
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                disabled={createUserMutation.isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  createUserMutation.isPending ||
                  !tempPassword
                }
                className="rounded-lg bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createUserMutation.isPending
                  ? "Creating..."
                  : "Create Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}