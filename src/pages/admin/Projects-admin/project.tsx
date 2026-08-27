"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/admin-components/layout/sidebar";
import CreateProject from "@/components/admin-components/project-components/create-project";
import ProjectDetail from "@/components/admin-components/project-components/project-detail";
import "./project.css";

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  openTasks: number;
  targetEnd: string;
};

type ProjectsResponse = {
  success: boolean;
  message: string;
  data: Project[];
};

async function getProjects(): Promise<ProjectsResponse> {
  const response = await fetch("/backend/projects", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch projects");
  }

  return result;
}

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] =
    useState<number | null>(null);

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState(false);

  const {
    data: projectsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects = projectsResponse?.data || [];

  if (selectedProjectId !== null) {
    return (
      <div className="projects-container">
        <Sidebar
          activePage="projects"
          onPageChange={() => {}}
        />

        <main className="main-content">
          <ProjectDetail
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
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
              <div className="projects-empty-state">
                Loading projects...
              </div>
            ) : error ? (
              <div className="projects-empty-state">
                {error.message}
              </div>
            ) : projects.length === 0 ? (
              <div className="projects-empty-state">
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
                        setSelectedProjectId(project.id)
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
                        {project.targetEnd
                          ? new Date(
                              project.targetEnd
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