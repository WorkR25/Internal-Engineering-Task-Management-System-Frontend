"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/admin-components/layout/sidebar";
import CreateProject from "@/components/admin-components/project-components/create-project";
import ProjectDetail from "@/components/admin-components/project-components/project-detail";
import { getAllProjects } from "@/api/create-project.api";
import "./project.css";

type Member = {
  initials: string;
  name: string;
  focus: string;
  joined: string;
};

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
  openTasks?: number;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  completed: number;
  inReview: number;
  members: Member[];
  recentTasks: RecentTask[];
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const projects: Project[] = data?.data ?? [];

  if (selectedProject) {
    return (
      <div className="projects-container">
        <Sidebar
          activePage="projects"
          onPageChange={() => {}}
        />

        <main className="main-content">
          <ProjectDetail
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <Sidebar
        activePage="projects"
        onPageChange={() => {}}
      />

      <main className="main-content">
        <div className="projects-header">
          <div>
            <h1 className="projects-title">
              Projects
            </h1>

            <p className="projects-subtitle">
              {projects.length} projects · all statuses
            </p>
          </div>

          <div className="projects-header-actions">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(true)}
              className="projects-create-button"
            >
              + New Project
            </button>

            <span className="projects-admin-badge">
              ADMIN
            </span>

            <div className="projects-admin-avatar">
              AG
            </div>
          </div>
        </div>

        <div className="projects-body">
          <div className="projects-table-card">
            {isLoading ? (
              <div className="projects-loading">
                Loading projects...
              </div>
            ) : isError ? (
              <div className="projects-error">
                {error instanceof Error
                  ? error.message
                  : "Failed to load projects"}
              </div>
            ) : projects.length === 0 ? (
              <div className="projects-empty">
                No projects found.
              </div>
            ) : (
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Open Tasks</th>
                    <th>Target End</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() =>
                        setSelectedProject(project)
                      }
                      className="projects-table-row"
                    >
                      <td>
                        <span className="projects-name">
                          {project.name}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`projects-status projects-status-${project.status.toLowerCase()}`}
                        >
                          {project.status}
                        </span>
                      </td>

                      <td>
                        {project.openTasks ?? 0}
                      </td>

                      <td>
                        {project.targetEndDate
                          ? new Date(
                              project.targetEndDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <CreateProject
        open={isCreateProjectOpen}
        onClose={() =>
          setIsCreateProjectOpen(false)
        }
      />
    </div>
  );
}