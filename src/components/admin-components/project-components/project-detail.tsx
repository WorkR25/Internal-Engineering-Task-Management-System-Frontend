"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AddMember from "@/components/admin-components/project-member-components/add-member";
import {
  getProjectMembers,
  removeProjectMember,
} from "@/api/project-member.api";
import "./project-detail.css";

type RecentTask = {
  title: string;
  status: string;
  assignee: string;
  statusColor: string;
};

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  openTasks: number;
  targetEnd: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  completed: number;
  inReview: number;
  recentTasks: RecentTask[];
};

type ProjectDetailProps = {
  project: Project;
  onBack: () => void;
};

function formatDate(date: string) {
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
  project,
  onBack,
}: ProjectDetailProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] =
    useState(false);

  const queryClient = useQueryClient();

  const {
    data: membersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project-members", project.id],
    queryFn: () => getProjectMembers(project.id),
  });

  const removeMemberMutation = useMutation({
    mutationFn: (userId: number) =>
      removeProjectMember(project.id, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", project.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", project.id],
      });
    },
  });

  const members = membersResponse?.data || [];

  const handleRemoveMember = (userId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member from the project?"
    );

    if (!confirmed) {
      return;
    }

    removeMemberMutation.mutate(userId);
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
              {members.length}
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

            {isLoading ? (
              <p className="project-detail-no-tasks">
                Loading members...
              </p>
            ) : error ? (
              <p className="text-sm text-red-600">
                {error.message}
              </p>
            ) : members.length === 0 ? (
              <p className="project-detail-no-tasks">
                No members assigned to this project.
              </p>
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
                  {members.map((member) => (
                    <tr key={member.userId}>
                      <td>
                        <div className="project-detail-member">
                          <div className="project-detail-member-avatar">
                            {member.fullName
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <span>
                              {member.fullName}
                            </span>

                            <small>
                              {member.email}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        {member.role}
                      </td>

                      <td>
                        {formatDate(member.joinedAt)}
                      </td>

                      <td className="project-detail-remove-cell">
                        <button
                          type="button"
                          className="project-detail-remove-button"
                          onClick={() =>
                            handleRemoveMember(member.userId)
                          }
                          disabled={
                            removeMemberMutation.isPending
                          }
                        >
                          {removeMemberMutation.isPending
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {removeMemberMutation.isError && (
              <p className="text-sm text-red-600">
                {removeMemberMutation.error.message}
              </p>
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
              {!project.recentTasks ||
              project.recentTasks.length === 0 ? (
                <p className="project-detail-no-tasks">
                  No recent tasks.
                </p>
              ) : (
                project.recentTasks.map((task) => (
                  <div
                    key={task.title}
                    className="project-detail-task-item"
                  >
                    <p>
                      {task.title}
                    </p>

                    <div>
                      <span
                        className={`project-detail-task-status ${
                          task.statusColor || ""
                        }`}
                      >
                        {task.status}
                      </span>

                      <span>
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <AddMember
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        projectId={project.id}
        projectName={project.name}
      />
    </div>
  );
}