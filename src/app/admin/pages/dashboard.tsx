"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/sidebar";
import CreateRoleModal from "../components/create-role";
import { getProjects, type Project } from "@/services/projectApi";

const pendingReviews = [
  {
    initials: "RS",
    title: "Rework webhook retry backoff",
    developer: "Rhea Sen",
    submitted: "submitted 2h ago",
  },
  {
    initials: "KV",
    title: "Add pagination to /tasks list",
    developer: "Karan Verma",
    submitted: "submitted 5h ago",
  },
  {
    initials: "NP",
    title: "Fix N+1 query on dashboard",
    developer: "Neha Patil",
    submitted: "submitted yesterday",
  },
  {
    initials: "SD",
    title: "Idempotent payment webhook",
    developer: "Sahil Das",
    submitted: "submitted yesterday",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const {
    data: projectsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects: Project[] = projectsResponse?.data || [];
  const previewProjects = projects.slice(0, 5);

  const activeProjectsCount = projects.filter(
    (project) => project.status === "ACTIVE"
  ).length;

  const openTasksCount = projects.reduce(
    (sum, project) => sum + (project.openTasks ?? 0),
    0
  );

  const pendingReviewsCount = pendingReviews.length;

  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar
        activePage="dashboard"
        onPageChange={() => {}}
      />

      <section className="ml-56 min-h-screen">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-7 py-5">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Dashboard
            </h1>

            <p className="mt-1 text-xs text-indigo-400">
              Welcome back — overview across all projects
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(true)}
              className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              + Add Role
            </button>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              ADMIN
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-xs font-semibold text-[#5146e5]">
              AG
            </div>
          </div>
        </header>

        <div className="p-7">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium text-gray-500">
                ACTIVE PROJECTS
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {activeProjectsCount}
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                +1 this quarter
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium text-gray-500">
                OPEN TASKS
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {openTasksCount}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {pendingReviewsCount} currently in review
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium text-gray-500">
                PENDING REVIEWS
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {pendingReviewsCount}
              </p>

              <p className="mt-1 text-xs text-red-500">
                Needs your attention
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium text-gray-500">
                ON-TIME DELIVERY
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                92%
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                +4% vs last sprint
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Projects
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    {projects.length} total · sorted by target end date
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  onClick={() =>
                    router.push(
                      "/admin/projects-admin/project"
                    )
                  }
                >
                  View all
                </button>
              </div>

              {isLoading && (
                <p className="px-5 py-4 text-xs text-gray-400">
                  Loading projects...
                </p>
              )}

              {!isLoading && error && (
                <p className="px-5 py-4 text-xs text-red-500">
                  {error instanceof Error
                    ? error.message
                    : "Failed to fetch projects"}
                </p>
              )}

              {!isLoading &&
                !error &&
                previewProjects.length === 0 && (
                  <p className="px-5 py-4 text-xs text-gray-400">
                    No projects found.
                  </p>
                )}

              {!isLoading &&
                !error &&
                previewProjects.map((project) => (
                  <div
                    key={project.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-100 px-5 py-3.5 last:border-0"
                  >
                    <span className="text-xs font-bold text-gray-800">
                      {project.name}
                    </span>

                    <span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${
                          project.status === "ACTIVE"
                            ? "bg-blue-50 text-blue-600"
                            : project.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </span>

                    <span className="text-xs text-gray-700">
                      {project.openTasks ?? 0}
                    </span>

                    <span className="text-xs text-gray-700">
                      {project.targetEnd
                        ? new Date(
                            project.targetEnd
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                  </div>
                ))}
            </section>

            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Pending Reviews
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Submissions awaiting your decision
                </p>
              </div>

              {pendingReviews.map((review) => (
                <div
                  key={review.title}
                  className="flex items-center gap-3 border-b border-gray-100 px-5 py-3 last:border-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
                    {review.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-gray-800">
                      {review.title}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      {review.developer} · {review.submitted}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[#5146e5] px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-indigo-700"
                  >
                    Review
                  </button>
                </div>
              ))}
            </section>
          </div>
        </div>
      </section>

      <CreateRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </main>
  );
}