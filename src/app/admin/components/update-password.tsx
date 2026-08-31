"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  updatePassword,
  type UpdatePasswordRequest,
} from "@/services/authApi";
import { toast } from "sonner";

interface UpdatePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePassword({
  isOpen,
  onClose,
}: UpdatePasswordProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePasswordMutation = useMutation({
    mutationFn: (data: UpdatePasswordRequest) =>
      updatePassword(data),

    onSuccess: (response) => {
      setOldPassword("");
      setNewPassword("");

      toast.success(
        response.message || "Password updated successfully!"
      );

      onClose();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update password"
      );
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please enter both old and new passwords.");
      return;
    }

    updatePasswordMutation.mutate({
      oldPassword,
      newPassword,
    });
  };

  const handleClose = () => {
    if (updatePasswordMutation.isPending) {
      return;
    }

    setOldPassword("");
    setNewPassword("");
    updatePasswordMutation.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Password
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={updatePasswordMutation.isPending}
            className="text-2xl text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-6 py-6">

          {/* Old Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Old Password
            </label>

            <input
              type="password"
              value={oldPassword}
              onChange={(event) =>
                setOldPassword(event.target.value)
              }
              placeholder="Enter old password"
              disabled={updatePasswordMutation.isPending}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5] disabled:bg-gray-100"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder="Enter new password"
              disabled={updatePasswordMutation.isPending}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5] disabled:bg-gray-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={updatePasswordMutation.isPending}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                updatePasswordMutation.isPending ||
                !oldPassword ||
                !newPassword
              }
              className="rounded-md bg-[#5146e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updatePasswordMutation.isPending
                ? "Updating..."
                : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}