"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/auth.api";

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
    mutationFn: updatePassword,
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    updatePasswordMutation.mutate({
      oldPassword,
      newPassword,
    });
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    updatePasswordMutation.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Password
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {updatePasswordMutation.isSuccess ? (
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <span className="text-5xl font-semibold text-emerald-500">
                ✓
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Password Updated Successfully!
            </h2>
          </div>
        ) : (
          <div className="space-y-4 px-6 py-6">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Old Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                placeholder="Enter old password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5]"
              />
            </div>

            {updatePasswordMutation.isError && (
              <p className="text-sm text-red-500">
                {updatePasswordMutation.error.message}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
                className="rounded-md bg-[#5146e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#4338ca] disabled:opacity-50"
              >
                {updatePasswordMutation.isPending
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}