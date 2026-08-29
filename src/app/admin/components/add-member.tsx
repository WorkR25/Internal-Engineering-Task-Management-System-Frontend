"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProjectMember,
  getDevelopers,
  getProjectMembers,
} from "@/services/projectMemberApi";

type AddMemberProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  projectName: string;
};

export default function AddMember({
  isOpen,
  onClose,
  projectId,
  projectName,
}: AddMemberProps) {
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: developersResponse,
    isLoading: developersLoading,
    error: developersError,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: getDevelopers,
    enabled: isOpen,
  });

  const {
    data: membersResponse,
    isLoading: membersLoading,
  } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: isOpen,
  });

  const developers = useMemo(() => {
    return (developersResponse?.data ?? []).filter(
      (developer) =>
        String(developer.roleId) === "2" &&
        developer.isActive
    );
  }, [developersResponse]);

  const members = useMemo(() => {
    return membersResponse?.data ?? [];
  }, [membersResponse]);

  const availableDevelopers = useMemo(() => {
    const memberIds = new Set(
      members.map((member) => Number(member.userId))
    );

    const searchValue = search.trim().toLowerCase();

    return developers.filter((developer) => {
      if (memberIds.has(Number(developer.id))) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      return (
        developer.fullName.toLowerCase().includes(searchValue) ||
        developer.email.toLowerCase().includes(searchValue)
      );
    });
  }, [developers, members, search]);

  const addMemberMutation = useMutation({
    mutationFn: () => {
      if (selectedUserId === null) {
        throw new Error("Please select a developer");
      }

      return addProjectMember(projectId, {
        userId: selectedUserId,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setSearch("");
      setSelectedUserId(null);
      onClose();
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

  const getInitials = (name: string) => {
    if (!name) {
      return "DU";
    }

    return name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleClose = () => {
    if (addMemberMutation.isPending) {
      return;
    }

    setSearch("");
    setSelectedUserId(null);
    addMemberMutation.reset();
    onClose();
  };

  const handleSubmit = () => {
    if (
      selectedUserId === null ||
      addMemberMutation.isPending
    ) {
      return;
    }

    addMemberMutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-[580px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Add Project Member
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a developer to {projectName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={addMemberMutation.isPending}
            className="flex h-8 w-8 items-center justify-center rounded-md text-2xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="mb-5">
            <label
              htmlFor="developer-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search Developer
            </label>

            <input
              id="developer-search"
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedUserId(null);
              }}
              placeholder="Search developer by name or email"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100"
              disabled={
                developersLoading ||
                membersLoading ||
                addMemberMutation.isPending
              }
            />
          </div>

          <div className="w-full">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Select Developer
            </label>

            <div className="max-h-[250px] space-y-2 overflow-y-auto">
              {developersLoading || membersLoading ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  Loading developers...
                </div>
              ) : developersError ? (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {developersError.message}
                </div>
              ) : availableDevelopers.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  {search.trim()
                    ? "No developer found."
                    : "No developers available."}
                </div>
              ) : (
                availableDevelopers.map((developer) => {
                  const isSelected =
                    selectedUserId === Number(developer.id);

                  return (
                    <label
                      key={developer.id}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 text-left transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="developer"
                        value={developer.id}
                        checked={isSelected}
                        onChange={() =>
                          setSelectedUserId(
                            Number(developer.id)
                          )
                        }
                        className="sr-only"
                        disabled={addMemberMutation.isPending}
                      />

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                        {getInitials(developer.fullName)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {developer.fullName}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                          {developer.email}
                        </p>
                      </div>

                      <span
                        className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </span>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {addMemberMutation.isError && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {addMemberMutation.error instanceof Error
                ? addMemberMutation.error.message
                : "Failed to add member"}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={addMemberMutation.isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            disabled={
              selectedUserId === null ||
              addMemberMutation.isPending
            }
          >
            {addMemberMutation.isPending
              ? "Adding..."
              : "Add to Project"}
          </button>
        </div>
      </div>
    </div>
  );
}