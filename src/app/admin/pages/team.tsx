"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/app/admin/components/sidebar";
import AddDeveloperModal from "@/app/admin/components/add_developer";
import EditUserModal from "@/app/admin/components/edit_user";
import { getAllUsers, User } from "@/services/userApi";

type Developer = {
  id: string;
  initials: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  tasks: number;
  score: string;
  joined: string;
};

type Filter = "ALL" | "ACTIVE" | "INACTIVE";

function DeveloperRow({
  developer,
  user,
  onEdit,
}: {
  developer: Developer;
  user: User;
  onEdit: (user: User) => void;
}) {
  const isActive = developer.status === "ACTIVE";

  return (
    <tr className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
      <td className="px-6 py-4">
        <div className="flex min-w-0 items-center space-x-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              isActive
                ? "bg-indigo-50 text-[#4f46e5]"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {developer.initials}
          </div>

          <div className="min-w-0">
            <p
              className={`text-sm font-bold ${
                isActive ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {developer.name}
            </p>

            <p className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400">
              {developer.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            isActive
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {developer.status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {developer.tasks}
      </td>

      <td className="px-6 py-4 text-sm font-bold text-gray-900">
        {developer.score}
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        {developer.joined}
      </td>

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="rounded-lg border border-gray-200 px-5 py-1.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          {isActive ? "Edit" : "Reactivate"}
        </button>
      </td>
    </tr>
  );
}

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);
  const [selectedFilter, setSelectedFilter] =
    useState<Filter>("ALL");

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "ALL" },
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const developers: Developer[] = users.map((user) => ({
    id: user.id,
    initials: user.fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: user.fullName,
    email: user.email,
    status: user.isActive ? "ACTIVE" : "INACTIVE",
    tasks: 0,
    score: "-",
    joined: new Date(user.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    ),
  }));

  const filteredDevelopers = developers.filter((developer) => {
    if (selectedFilter === "ALL") {
      return true;
    }

    return developer.status === selectedFilter;
  });

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id) ?? null;
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fc] font-sans">
      <Sidebar
        activePage="team"
        onPageChange={() => {}}
      />

      <main className="ml-56 min-h-screen p-7">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Team
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {isLoading
                ? "Loading..."
                : `${developers.length} Developer accounts · managed by Admin`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              + Add Developer
            </button>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
                ADMIN
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
                AG
              </div>
            </div>
          </div>
        </header>

        <div className="mb-6 flex items-center gap-2">
          {filters.map((filter) => {
            const isSelected =
              selectedFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedFilter(filter.value)
                }
                className={`rounded-md border px-4 py-2 text-[10px] font-medium transition-colors ${
                  isSelected
                    ? "border-[#5146e5] bg-[#5146e5] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Developer
                </th>

                <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Active Tasks
                </th>

                <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Avg Review Score
                </th>

                <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-[9px] font-semibold uppercase tracking-wider text-gray-400"></th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-xs text-gray-500"
                  >
                    Loading developers...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-xs text-red-500"
                  >
                    {error.message}
                  </td>
                </tr>
              ) : filteredDevelopers.length > 0 ? (
                filteredDevelopers.map((developer) => {
                  const user = getUserById(developer.id);

                  if (!user) {
                    return null;
                  }

                  return (
                    <DeveloperRow
                      key={developer.id}
                      developer={developer}
                      user={user}
                      onEdit={handleEdit}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-xs text-gray-500"
                  >
                    No developers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <AddDeveloperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        user={selectedUser}
        onClose={handleEditClose}
      />
    </div>
  );
}