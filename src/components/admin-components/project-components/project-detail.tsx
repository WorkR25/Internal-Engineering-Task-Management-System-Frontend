"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddMember from "@/components/admin-components/project-member-components/add-member";
import {
  getProjectMembers,
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
  if (
    member.fullName &&
    typeof member.fullName === "string"
  ) {
    return member.fullName;
  }

  return "Unknown Developer";
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

export default function ProjectDetail({
  projectId,
  onBack,
}: ProjectDetailProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] =
    useState(false);

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

            <span className="project-detail-status">
              {project.status}
            </span>
          </div>
        </div>

        <div className="project-detail-actions">
          <button
            type="button"
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

                            <div>
                              <span>
                                {memberName}
                              </span>

                              <small>
                                {member.email || "-"}
                              </small>
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
                            className="project-detail-remove-button"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
    </div>
  );
}