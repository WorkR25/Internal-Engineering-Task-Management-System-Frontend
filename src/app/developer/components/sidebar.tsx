"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, updatePassword } from "@/services/authApi";
import { clearUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type PageName =
  | "dashboard"
  | "my-tasks"
  | "performance";

interface SidebarProps {
  onPageChange: (page: PageName) => void;
  activePage: PageName;
}

export default function Sidebar({
  onPageChange,
  activePage,
}: SidebarProps) {
  const [showLogout, setShowLogout] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const navigation: {
    label: string;
    id: PageName;
    href: string;
  }[] = [
    {
      label: "Dashboard",
      id: "dashboard",
      href: "/developer/dashboard",
    },
    {
      label: "My Tasks",
      id: "my-tasks",
      href: "/developer/my-tasks",
    },
    {
      label: "Performance",
      id: "performance",
      href: "/developer/performance",
    },
  ];

  const email = user?.email || "";
  const initials = email.slice(0, 2).toUpperCase() || "DV";
  const role = user?.role?.name || "DEVELOPER";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      dispatch(clearUser());
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordError("");
    setPasswordMessage("");

    if (!oldPassword) {
      setPasswordError("Old password is required");
      return;
    }

    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordError("New password must be different from old password");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const result = await updatePassword({
        oldPassword,
        newPassword,
      });

      setPasswordMessage(result.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleCloseUpdatePassword = () => {
    setShowUpdatePassword(false);
    setOldPassword("");
    setNewPassword("");
    setPasswordError("");
    setPasswordMessage("");
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-56 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <h1 className="text-sm font-bold text-gray-900">
          TaskReview
        </h1>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = activePage === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onPageChange(item.id)}
                className={`block w-full rounded-md px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? "bg-[#eeedff] font-medium text-[#5146e5]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="relative border-t border-gray-200 px-4 py-4">
        {showLogout && (
          <div className="absolute bottom-16 left-4 z-30 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setShowUpdatePassword(true);
                setShowLogout(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Update Password
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowLogout((prev: boolean) => !prev)}
          className="flex w-full items-center gap-2.5 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-xs font-semibold text-white">
            {initials || "DV"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-900">
              {email || "User"}
            </p>

            <p className="text-[10px] text-gray-500">
              {role}
            </p>
          </div>
        </button>
      </div>

      {showUpdatePassword && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Update Password
              </h2>

              <button
                type="button"
                onClick={handleCloseUpdatePassword}
                className="text-xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Old Password
                </label>

                <input
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5]"
                  placeholder="Enter old password"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5146e5]"
                  placeholder="Enter new password"
                />
              </div>

              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}

              {passwordMessage && (
                <p className="text-sm text-green-600">{passwordMessage}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseUpdatePassword}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword}
                  className="rounded-md bg-[#5146e5] px-4 py-2 text-sm font-medium text-white hover:bg-[#4338ca] disabled:opacity-50"
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}