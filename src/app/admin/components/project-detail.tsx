"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddMember from "@/app/admin/components/add-member";
import {
  getProject,
  updateProject,
  updateProjectStatus,
} from "@/services/projectApi";
import {
  getProjectMembers,
  removeProjectMember,
  type ProjectMember,
} from "@/services/projectMemberApi";

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  openTasks: number;
  completed: number;
  inReview: number;
};

type ProjectDetailProps = {
  projectId: number;
  onBack: () => void;
};

type EditProjectData = {
  name: string;
  description: string;
  startDate: string;
  targetEndDate: string;
};

function getInitials(fullName?: string, fallback = "U") {
  if (!fullName || typeof fullName !== "string") {
    return fallback;
  }

  return fullName
    .trim()
    .split(/\s+/)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getMemberName(member: ProjectMember) {
  return member.user?.fullName?.trim() || "Unknown Developer";
}

function formatDate(date?: string) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateForInput(date?: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  try {
    return parsedDate.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function ProjectDetail({
  projectId,
  onBack,
}: ProjectDetailProps) {
  const queryClient = useQueryClient();

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);

  const [editProjectData, setEditProjectData] =
    useState<EditProjectData>({
      name: "",
      description: "",
      startDate: "",
      targetEndDate: "",
    });

  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const {
    data: membersResponse,
    isLoading: isMembersLoading,
    error: membersError,
  } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
  });

  const editProjectMutation = useMutation({
    mutationFn: (data: EditProjectData) =>
      updateProject(projectId, {
        name: data.name,
        description: data.description,
        startDate: data.startDate || null,
        targetEndDate: data.targetEndDate || null,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setIsEditProjectOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (
      status: "ACTIVE" | "PLANNING" | "COMPLETED"
    ) => updateProjectStatus(projectId, { status }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (userId: number) =>
      removeProjectMember(projectId, userId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });
    },
  });

  if (isProjectLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] p-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Loading project...
        </div>
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] p-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-xs font-semibold text-[#5146e5] hover:underline"
        >
          ← Back to Projects
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {projectError.message}
        </div>
      </div>
    );
  }

  const project = projectResponse?.data;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] p-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-xs font-semibold text-[#5146e5] hover:underline"
        >
          ← Back to Projects
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Project not found.
        </div>
      </div>
    );
  }

  const members = membersResponse?.data || [];

  const openEditProject = () => {
    setEditProjectData({
      name: project.name || "",
      description: project.description || "",
      startDate: formatDateForInput(project.startDate),
      targetEndDate: formatDateForInput(project.targetEndDate),
    });

    setIsEditProjectOpen(true);
  };

  const closeEditProject = () => {
    if (editProjectMutation.isPending) {
      return;
    }

    setIsEditProjectOpen(false);
  };

  const handleEditProjectSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    editProjectMutation.mutate({
      name: editProjectData.name.trim(),
      description: editProjectData.description.trim(),
      startDate: editProjectData.startDate,
      targetEndDate: editProjectData.targetEndDate,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="mb-2 text-xs font-semibold text-[#5146e5] hover:underline"
          >
            ← Back to Projects
          </button>

          <p className="mb-1 text-xs text-gray-500">
            Projects
          </p>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {project.name}
            </h1>

            <select
              value={project.status}
              onChange={(event) =>
                updateStatusMutation.mutate(
                  event.target.value as
                    | "PLANNING"
                    | "ACTIVE"
                    | "COMPLETED"
                )
              }
              disabled={updateStatusMutation.isPending}
              className="rounded bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 outline-none disabled:opacity-60"
            >
              <option value="PLANNING">PLANNING</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openEditProject}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Edit Project
          </button>

          <button
            type="button"
            onClick={() => setIsAddMemberOpen(true)}
            className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            + Add Member
          </button>

          <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4">
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
              ADMIN
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-[10px] font-semibold text-white">
              AG
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[calc(100vh-89px)] space-y-6 bg-[#f8f9fc] p-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="mb-4 text-sm leading-relaxed text-gray-700">
            {project.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-8 text-sm text-gray-500">
            <p>
              Started{" "}
              <span className="font-semibold text-gray-900">
                {formatDate(project.startDate)}
              </span>
            </p>

            <p>
              Target End{" "}
              <span className="font-semibold text-gray-900">
                {formatDate(project.targetEndDate)}
              </span>
            </p>

            <p>
              Created by{" "}
              <span className="font-semibold text-gray-900">
                {project.createdBy || "-"}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Open Tasks
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {project.openTasks ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              In Review
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {project.inReview ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Completed
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {project.completed ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Members
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {isMembersLoading ? "..." : members.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Members
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {members.length} active · removal preserves membership history
              </p>
            </div>

            {membersError ? (
              <div className="p-6 text-sm text-red-600">
                {membersError.message}
              </div>
            ) : isMembersLoading ? (
              <div className="p-6 text-sm text-gray-500">
                Loading members...
              </div>
            ) : members.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">
                No members added to this project yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Developer
                      </th>

                      <th className="border-b border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Role
                      </th>

                      <th className="border-b border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Joined
                      </th>

                      <th className="border-b border-gray-200 px-6 py-3"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {members.map((member) => {
                      const memberName = getMemberName(member);
                      const isRemoving =
                        removeMemberMutation.isPending &&
                        removeMemberMutation.variables === member.userId;

                      return (
                        <tr
                          key={member.id || member.userId}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-[#4f46e5]">
                                {getInitials(memberName)}
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">
                                  {memberName}
                                </span>

                                <small className="text-gray-500">
                                  {member.user?.email || "-"}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {member.role || "DEVELOPER"}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(member.joinedAt)}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                removeMemberMutation.mutate(
                                  member.userId
                                )
                              }
                              disabled={isRemoving}
                              className="rounded-lg border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isRemoving
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Tasks
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest activity
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Open Board
              </button>
            </div>

            <div className="space-y-5 p-6">
              <p className="text-sm text-gray-500">
                No recent tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddMember
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        projectId={projectId}
        projectName={project.name}
      />

      {isEditProjectOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditProject();
            }
          }}
        >
          <div className="w-full max-w-[620px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-7 py-5">
              <div>
                <h2 className="text-[22px] font-semibold text-gray-900">
                  Edit Project
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update project information
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditProject}
                disabled={editProjectMutation.isPending}
                className="text-xl text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditProjectSubmit}>
              <div className="space-y-5 px-7 py-6">
                <div>
                  <label
                    htmlFor="edit-project-name"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Project Name
                  </label>

                  <input
                    id="edit-project-name"
                    type="text"
                    value={editProjectData.name}
                    onChange={(event) =>
                      setEditProjectData((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    required
                    disabled={editProjectMutation.isPending}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-project-description"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Description
                  </label>

                  <textarea
                    id="edit-project-description"
                    value={editProjectData.description}
                    onChange={(event) =>
                      setEditProjectData((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={4}
                    disabled={editProjectMutation.isPending}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-project-start-date"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Start Date
                    </label>

                    <input
                      id="edit-project-start-date"
                      type="date"
                      value={editProjectData.startDate}
                      onChange={(event) =>
                        setEditProjectData((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      disabled={editProjectMutation.isPending}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-project-target-end-date"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Target End Date
                    </label>

                    <input
                      id="edit-project-target-end-date"
                      type="date"
                      value={editProjectData.targetEndDate}
                      onChange={(event) =>
                        setEditProjectData((current) => ({
                          ...current,
                          targetEndDate: event.target.value,
                        }))
                      }
                      disabled={editProjectMutation.isPending}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {editProjectMutation.isError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {editProjectMutation.error instanceof Error
                      ? editProjectMutation.error.message
                      : "Failed to update project."}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-7 py-5">
                <button
                  type="button"
                  onClick={closeEditProject}
                  disabled={editProjectMutation.isPending}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    editProjectMutation.isPending ||
                    !editProjectData.name.trim()
                  }
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editProjectMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}