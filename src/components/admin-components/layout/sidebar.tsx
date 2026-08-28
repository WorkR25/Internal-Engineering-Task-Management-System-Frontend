"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/store/hooks";
import { clearUser } from "@/store/authSlice";
import { logout } from "@/api/auth.api";
type PageName =
  | "dashboard"
  | "task-board"
  | "task-detail-review"
  | "team"
  | "reviews"
  | "performance"
  | "projects";

interface SidebarProps {
  onPageChange: (page: PageName) => void;
  activePage: PageName;
}

export default function Sidebar({
  onPageChange,
  activePage,
}: SidebarProps) {
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      href: "/admin/dashboard-admin/dashboard",
    },
    {
      label: "Task Board",
      id: "task-board",
      href: "/admin/task-board-admin/task-board",
    },
    {
      label: "Task Detail Review",
      id: "task-detail-review",
      href: "/admin/task-detail-admin/task-detail-review",
    },
    {
      label: "Reviews",
      id: "reviews",
      href: "/admin/reviews-admin/reviews",
    },
    {
      label: "Team",
      id: "team",
      href: "/admin/team-admin/team",
    },
    {
      label: "Performance",
      id: "performance",
      href: "/admin/performance-admin/performance",
    },
    {
      label: "Projects",
      id: "projects",
      href: "/admin/Projects-admin/project",
    },
  ];

  const email = user?.email || "";
  const initials = email.slice(0, 2).toUpperCase();
  const role = user?.role?.name || "USER";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await logout();

      dispatch(clearUser());
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-56 flex-col border-r border-gray-200 bg-white">

      {/* LOGO */}
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <h1 className="text-sm font-bold text-gray-900">
          TaskReview
        </h1>
      </div>

      {/* NAVIGATION */}
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

      {/* USER */}
      <div className="relative border-t border-gray-200 px-4 py-4">
        {showLogout && (
          <div className="absolute bottom-16 left-4 z-30 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
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
          onClick={() => setShowLogout((prev) => !prev)}
          className="flex w-full items-center gap-2.5 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-xs font-semibold text-white">
            {initials || "??"}
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

    </aside>
  );
}