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
  const response = await fetch(`/backend/projects/${projectId}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch project");
  }

  return result;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong";
}

function getInitials(fullName?: string) {
  if (!fullName) {
    return "U";
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
  return member.fullName?.trim() || "Unknown Developer";
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

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="project-detail-back"
    >
      ← Back to Projects
    </button>
  );
}

function ProjectHeader({
  project,
  onBack,
  onAddMember,
}: {
  project: Project;
  onBack: () => void;
  onAddMember: () => void;
}) {
  return (
    <div className="project-detail-header">
      <div>
        <BackButton onBack={onBack} />

        <p className="project-detail-subtitle">Projects</p>

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
          onClick={onAddMember}
          className="project-detail-primary-button"
        >
          + Add Member
        </button>

        <div className="project-detail-admin">
          <span>ADMIN</span>

          <div className="project-detail-avatar">AG</div>
        </div>
      </div>
    </div>
  );
}

function ProjectOverview({ project }: { project: Project }) {
  const projectMeta = [
    {
      label: "Started",
      value: formatDate(project.startDate),
    },
    {
      label: "Target End",
      value: formatDate(project.targetEndDate),
    },
    {
      label: "Created by",
      value: project.createdBy || "-",
    },
  ];

  return (
    <div className="project-detail-meta-card">
      <p className="project-detail-description">
        {project.description || "No description available."}
      </p>

      <div className="project-detail-meta">
        {projectMeta.map((item) => (
          <p key={item.label}>
            {item.label} <span>{item.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function ProjectStats({
  project,
  memberCount,
  isMembersLoading,
}: {
  project: Project;
  memberCount: number;
  isMembersLoading: boolean;
}) {
  const stats = [
    {
      label: "Open Tasks",
      value: project.openTasks ?? 0,
    },
    {
      label: "In Review",
      value: project.inReview ?? 0,
    },
    {
      label: "Completed",
      value: project.completed ?? 0,
    },
    {
      label: "Members",
      value: isMembersLoading ? "..." : memberCount,
    },
  ];

  return (
    <div className="project-detail-stats">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="project-detail-stat-card"
        >
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function MembersSection({
  members,
  isLoading,
  error,
}: {
  members: ProjectMember[];
  isLoading: boolean;
  error: unknown;
}) {
  return (
    <div className="project-detail-table-card">
      <div className="project-detail-card-header">
        <h2>Members</h2>

        <p>
          {members.length} active · removal preserves membership
          history
        </p>
      </div>

      {error ? (
        <div className="project-detail-no-tasks">
          {getErrorMessage(error)}
        </div>
      ) : isLoading ? (
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
              <th>Developer</th>
              <th>Role</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => {
              const memberName = getMemberName(member);

              return (
                <tr
                  key={member.id ?? member.userId}
                >
                  <td>
                    <div className="project-detail-member">
                      <div className="project-detail-member-avatar">
                        {getInitials(memberName)}
                      </div>

                      <div>
                        <span>{memberName}</span>
                        <small>{member.email || "-"}</small>
                      </div>
                    </div>
                  </td>

                  <td>{member.role || "DEVELOPER"}</td>

                  <td>{formatDate(member.joinedAt)}</td>

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
  );
}

function RecentTasks() {
  return (
    <div className="project-detail-tasks-card">
      <div className="project-detail-card-header project-detail-card-header-flex">
        <div>
          <h2>Recent Tasks</h2>
          <p>Latest activity</p>
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
  );
}

export default function ProjectDetail({
  projectId,
  onBack,
}: ProjectDetailProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

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
        <BackButton onBack={onBack} />

        <div className="project-detail-error">
          {getErrorMessage(projectError)}
        </div>
      </div>
    );
  }

  const project = projectResponse?.data;

  if (!project) {
    return (
      <div className="project-detail-container">
        <BackButton onBack={onBack} />

        <div className="project-detail-error">
          Project not found.
        </div>
      </div>
    );
  }

  const members = membersResponse?.data ?? [];

  return (
    <div className="project-detail-container">
      <ProjectHeader
        project={project}
        onBack={onBack}
        onAddMember={() => setIsAddMemberOpen(true)}
      />

      <div className="project-detail-body">
        <ProjectOverview project={project} />

        <ProjectStats
          project={project}
          memberCount={members.length}
          isMembersLoading={isMembersLoading}
        />

        <div className="project-detail-bottom">
          <MembersSection
            members={members}
            isLoading={isMembersLoading}
            error={membersError}
          />

          <RecentTasks />
        </div>
      </div>

      <AddMember
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        projectId={projectId}
        projectName={project.name}
      />
    </div>
  );
}