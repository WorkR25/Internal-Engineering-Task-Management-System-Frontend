"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddMember from "@/components/admin-components/project-member-components/add-member";
import {
  getProjectMembers,
  removeProjectMember,
  ProjectMember,
} from "@/api/project-member.api";

import "./project-detail.css";

type Project = {
  id: number;
  name: string;
  status: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  openTasks: number;
  completed: number;
  inReview: number;
};

type ProjectResponse = {
  success: boolean;
  message: string;
  data: Project;
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

async function getProjectById(
  projectId: number
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch project"
    );
  }

  return result;
}

async function updateProject(
  projectId: number,
  data: EditProjectData
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update project"
    );
  }

  return result;
}

async function updateProjectStatus(
  projectId: number,
  status: string
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update project status"
    );
  }

  return result;
}

function getInitials(
  fullName?: string,
  fallback = "U"
) {
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

  const [isAddMemberOpen, setIsAddMemberOpen] =
    useState(false);

  const [isEditProjectOpen, setIsEditProjectOpen] =
    useState(false);

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
    queryFn: () => getProjectById(projectId),
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
      updateProject(projectId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      setIsEditProjectOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) =>
      updateProjectStatus(projectId, status),
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
      <div className="project-detail-container">
        <div className="project-detail-loading">
          Loading project...
        </div>
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="project-detail-container">
        <button
          type="button"
          onClick={onBack}
          className="project-detail-back"
        >
          ← Back to Projects
        </button>

        <div className="project-detail-error">
          {projectError.message}
        </div>
      </div>
    );
  }

  const project = projectResponse?.data;

  if (!project) {
    return (
      <div className="project-detail-container">
        <button
          type="button"
          onClick={onBack}
          className="project-detail-back"
        >
          ← Back to Projects
        </button>

        <div className="project-detail-error">
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
      startDate: editProjectData.startDate || "",
      targetEndDate: editProjectData.targetEndDate || "",
    });
  };

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="project-detail-back"
          >
            ← Back to Projects
          </button>

          <p className="project-detail-subtitle">
            Projects
          </p>

          <div className="project-detail-title-wrapper">
            <h1 className="project-detail-title">
              {project.name}
            </h1>

            <select
              value={project.status}
              onChange={(event) =>
                updateStatusMutation.mutate(
                  event.target.value
                )
              }
              disabled={updateStatusMutation.isPending}
              className="project-detail-status"
            >
              <option value="PLANNING">
                PLANNING
              </option>

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="COMPLETED">
                COMPLETED
              </option>
            </select>
          </div>
        </div>

        <div className="project-detail-actions">
          <button
            type="button"
            onClick={openEditProject}
            className="project-detail-secondary-button"
          >
            Edit Project
          </button>

          <button
            type="button"
            onClick={() => setIsAddMemberOpen(true)}
            className="project-detail-primary-button"
          >
            + Add Member
          </button>

          <div className="project-detail-admin">
            <span>
              ADMIN
            </span>

            <div className="project-detail-avatar">
              AG
            </div>
          </div>
        </div>
      </div>

      <div className="project-detail-body">
        <div className="project-detail-meta-card">
          <p className="project-detail-description">
            {project.description || "No description available."}
          </p>

          <div className="project-detail-meta">
            <p>
              Started{" "}
              <span>
                {formatDate(project.startDate)}
              </span>
            </p>

            <p>
              Target End{" "}
              <span>
                {formatDate(project.targetEndDate)}
              </span>
            </p>

            <p>
              Created by{" "}
              <span>
                {project.createdBy || "-"}
              </span>
            </p>
          </div>
        </div>

        <div className="project-detail-stats">
          <div className="project-detail-stat-card">
            <h3>
              Open Tasks
            </h3>

            <p>
              {project.openTasks ?? 0}
            </p>
          </div>

          <div className="project-detail-stat-card">
            <h3>
              In Review
            </h3>

            <p>
              {project.inReview ?? 0}
            </p>
          </div>

          <div className="project-detail-stat-card">
            <h3>
              Completed
            </h3>

            <p>
              {project.completed ?? 0}
            </p>
          </div>

          <div className="project-detail-stat-card">
            <h3>
              Members
            </h3>

            <p>
              {isMembersLoading
                ? "..."
                : members.length}
            </p>
          </div>
        </div>

        <div className="project-detail-bottom">
          <div className="project-detail-table-card">
            <div className="project-detail-card-header">
              <h2>
                Members
              </h2>

              <p>
                {members.length} active · removal preserves
                membership history
              </p>
            </div>

            {membersError ? (
              <div className="project-detail-no-tasks">
                {membersError.message}
              </div>
            ) : isMembersLoading ? (
              <div className="project-detail-no-tasks">
                Loading members...
              </div>
            ) : members.length === 0 ? (
              <div className="project-detail-no-tasks">
                No members added to this project yet.
              </div>
            ) : (
              <div className="project-detail-table-scroll">
                <table className="project-detail-members-table">
                  <thead>
                    <tr>
                      <th>
                        Developer
                      </th>

                      <th>
                        Role
                      </th>

                      <th>
                        Joined
                      </th>

                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {members.map((member) => {
                      const memberName =
                        getMemberName(member);

                      return (
                        <tr
                          key={
                            member.id ||
                            member.userId
                          }
                        >
                          <td>
                            <div className="project-detail-member">
                              <div className="project-detail-member-avatar">
                                {getInitials(
                                  memberName
                                )}
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900">
                                  {memberName}
                                </span>

                                <small className="text-slate-500">{member.user?.email || "-"}</small>
                              </div>
                            </div>
                          </td>

                          <td>
                            {member.role || "DEVELOPER"}
                          </td>

                          <td>
                            {formatDate(
                              member.joinedAt
                            )}
                          </td>

                                                    <td className="project-detail-remove-cell">
                            <button
                              type="button"
                              onClick={() =>
                                removeMemberMutation.mutate(
                                  member.userId
                                )
                              }
                              disabled={
                                removeMemberMutation.isPending &&
                                removeMemberMutation.variables ===
                                  member.userId
                              }
                              className="project-detail-remove-button"
                            >
                              {removeMemberMutation.isPending &&
                              removeMemberMutation.variables ===
                                member.userId
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

          <div className="project-detail-tasks-card">
            <div className="project-detail-card-header project-detail-card-header-flex">
              <div>
                <h2>
                  Recent Tasks
                </h2>

                <p>
                  Latest activity
                </p>
              </div>

              <button
                type="button"
                className="project-detail-outline-button"
              >
                Open Board
              </button>
            </div>

            <div className="project-detail-task-list">
              <p className="project-detail-no-tasks">
                No recent tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddMember
        isOpen={isAddMemberOpen}
        onClose={() =>
          setIsAddMemberOpen(false)
        }
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

            <form
              onSubmit={handleEditProjectSubmit}
            >
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {editProjectMutation.isError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {editProjectMutation.error.message}
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