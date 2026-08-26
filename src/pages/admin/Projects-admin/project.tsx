"use client";

import { useState } from "react";
import Sidebar from "@/components/admin-components/layout/sidebar";
import CreateProject from "@/components/admin-components/project-components/create-project";
import ProjectDetail from "@/components/admin-components/project-components/project-detail";
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
  openTasks: number;
  targetEnd: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  completed: number;
  inReview: number;
  members: Member[];
  recentTasks: RecentTask[];
};

const projects: Project[] = [
  {
    id: 1,
    name: "Payments Platform",
    status: "ACTIVE",
    openTasks: 9,
    targetEnd: "Dec 12, 2026",
    description:
      "Core payments processing platform — handles gateway integration, webhook ingestion, settlement reconciliation and refund workflows for all consumer-facing checkout surfaces.",
    startDate: "Aug 1, 2026",
    targetEndDate: "Dec 12, 2026",
    createdBy: "Arijit Ganguly",
    completed: 12,
    inReview: 2,

    members: [
      {
        initials: "KV",
        name: "Karan Verma",
        focus: "Backend",
        joined: "Jan 14, 2026",
      },
      {
        initials: "SD",
        name: "Sahil Das",
        focus: "Backend",
        joined: "Feb 3, 2026",
      },
      {
        initials: "NP",
        name: "Neha Patil",
        focus: "Backend",
        joined: "Mar 22, 2026",
      },
      {
        initials: "RS",
        name: "Rhea Sen",
        focus: "Full-stack",
        joined: "Apr 8, 2026",
      },
      {
        initials: "AT",
        name: "Aman Thakur",
        focus: "Full-stack",
        joined: "Jun 30, 2026",
      },
    ],

    recentTasks: [
      {
        title: "Implement idempotent payment webhook handler",
        status: "IN_PROGRESS",
        assignee: "Sahil Das",
        statusColor: "bg-blue-50 text-blue-600",
      },
      {
        title: "Fix N+1 query on dashboard",
        status: "IN_REVIEW",
        assignee: "Neha Patil",
        statusColor: "bg-purple-50 text-purple-600",
      },
      {
        title: "Refactor review scoring service",
        status: "CHANGES_REQUESTED",
        assignee: "Aman Thakur",
        statusColor: "bg-red-50 text-red-600",
      },
      {
        title: "Seed roles and unassignment reasons",
        status: "COMPLETED",
        assignee: "Sahil Das",
        statusColor: "bg-green-50 text-green-600",
      },
    ],
  },

  {
    id: 2,
    name: "Notification Service",
    status: "ACTIVE",
    openTasks: 6,
    targetEnd: "Nov 30, 2026",
    description:
      "Central notification service responsible for email, push and internal notification delivery.",
    startDate: "Jul 15, 2026",
    targetEndDate: "Nov 30, 2026",
    createdBy: "Arijit Ganguly",
    completed: 8,
    inReview: 1,
    members: [],
    recentTasks: [],
  },

  {
    id: 3,
    name: "Internal Admin Console",
    status: "PLANNING",
    openTasks: 0,
    targetEnd: "Jan 15, 2027",
    description:
      "Internal administration console for managing engineering workflows and system configuration.",
    startDate: "Dec 1, 2026",
    targetEndDate: "Jan 15, 2027",
    createdBy: "Arijit Ganguly",
    completed: 0,
    inReview: 0,
    members: [],
    recentTasks: [],
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState(false);

  /*
   * If a project is selected,
   * show the project details screen.
   */
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

  /*
   * Otherwise show the Projects homepage.
   */
  return (
    <div className="projects-container">

      <Sidebar
        activePage="projects"
        onPageChange={() => {}}
      />

      <main className="main-content">

        {/* HEADER */}
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

        {/* PROJECT LIST */}
        <div className="projects-body">

          <div className="projects-table-card">

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
                    onClick={() => setSelectedProject(project)}
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
                      {project.openTasks}
                    </td>

                    <td>
                      {project.targetEnd}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

      {/* CREATE PROJECT MODAL */}
      <CreateProject
        open={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />

    </div>
  );
}