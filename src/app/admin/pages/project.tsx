"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/app/admin/components/sidebar";
import CreateProject from "@/app/admin/components/create-project";
import ProjectDetail from "@/app/admin/components/project-detail";
import { getProjects } from "@/services/projectApi";

type Project = {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  openTasks: number;
  targetEnd: string;
};

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

  const projects: Project[] = projectsResponse?.data || [];

  if (selectedProjectId !== null) {
    return (
      <div className="flex min-h-screen bg-[#f8f9fc]">
        <Sidebar
          activePage="projects"
          onPageChange={() => {}}
        />

        <main className="ml-56 min-h-screen flex-1">
          <ProjectDetail
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar
        activePage="projects"
        onPageChange={() => {}}
      />

      <main className="ml-56 min-h-screen flex-1">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Projects
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {projects.length} projects · all statuses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(true)}
              className="rounded-lg bg-[#5146e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              + New Project
            </button>

            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
              ADMIN
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-[10px] font-semibold text-white">
              AG
            </div>
          </div>
        </div>

        <div className="min-h-[calc(100vh-89px)] bg-[#f8f9fc] p-8">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-gray-500">
                Loading projects...
              </div>
            ) : error ? (
              <div className="p-6 text-center text-sm text-red-500">
                {error.message}
              </div>
            ) : projects.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No projects found.
              </div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-6 py-4 text-xs font-semibold text-gray-500">
                      Project
                    </th>

                    <th className="border-b border-gray-200 px-6 py-4 text-xs font-semibold text-gray-500">
                      Status
                    </th>

                    <th className="border-b border-gray-200 px-6 py-4 text-xs font-semibold text-gray-500">
                      Open Tasks
                    </th>

                    <th className="border-b border-gray-200 px-6 py-4 text-xs font-semibold text-gray-500">
                      Target End
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() =>
                        setSelectedProjectId(project.id)
                      }
                      className="cursor-pointer transition hover:bg-gray-50"
                    >
                      <td className="border-b border-gray-100 px-6 py-5 text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          {project.name}
                        </span>
                      </td>

                      <td className="border-b border-gray-100 px-6 py-5 text-sm text-gray-700">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            project.status === "ACTIVE"
                              ? "bg-blue-50 text-blue-600"
                              : project.status === "PLANNING"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      <td className="border-b border-gray-100 px-6 py-5 text-sm text-gray-700">
                        {project.openTasks ?? 0}
                      </td>

                      <td className="border-b border-gray-100 px-6 py-5 text-sm text-gray-700">
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