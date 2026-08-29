"use client";

import Sidebar from "@/app/developer/components/sidebar";

const tasks = [
  {
    task: "Add rate limiting to /auth/signin",
    project: "Payments Platform",
    status: "TODO",
    deadline: "Dec 2, 2026",
  },
  {
    task: "Add pagination to GET /tasks",
    project: "Payments Platform",
    status: "IN_REVIEW",
    deadline: "Dec 1, 2026",
  },
  {
    task: "Refactor review scoring service",
    project: "Payments Platform",
    status: "CHANGES_REQUESTED",
    deadline: "Dec 5, 2026",
  },
  {
    task: "Set up Sequelize migrations",
    project: "Payments Platform",
    status: "COMPLETED",
    deadline: "Nov 18, 2026",
  },
];

const statusStyles = {
  TODO: "bg-gray-100 text-gray-600",
  IN_REVIEW: "bg-blue-50 text-blue-600",
  CHANGES_REQUESTED: "bg-red-50 text-red-500",
  COMPLETED: "bg-emerald-50 text-emerald-600",
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar
        activePage="dashboard"
        onPageChange={() => {}}
      />

      <main className="ml-60 min-h-screen w-[calc(100%-240px)] box-border overflow-x-hidden max-[600px]:ml-60 max-[600px]:w-[calc(100%-240px)]">
        <header className="flex h-12 items-center justify-between border-b border-gray-200 bg-white px-5 max-[600px]:px-3">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Dashboard
            </h1>

            <p className="mt-0.5 text-[9px] text-gray-500">
              Welcome back, Karan — here&apos;s what&apos;s on your plate
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#f4f1ff] px-2.5 py-1 text-[8px] font-medium text-[#5146e5]">
              DEVELOPER
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
              KV
            </span>
          </div>
        </header>

        <div className="box-border w-full max-w-full overflow-hidden px-5 py-5 max-[900px]:px-4 max-[600px]:px-[15px]">
          <section className="grid w-full max-w-full grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            <div className="min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-3">
              <p className="text-[8px] font-medium text-gray-500">
                Open Tasks
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                4
              </h2>

              <span className="mt-0.5 block text-[8px] text-gray-500">
                Across 2 projects
              </span>
            </div>

            <div className="min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-3">
              <p className="text-[8px] font-medium text-gray-500">
                In Review
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                1
              </h2>

              <span className="mt-0.5 block text-[8px] text-gray-500">
                Awaiting Admin decision
              </span>
            </div>

            <div className="min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-3">
              <p className="text-[8px] font-medium text-gray-500">
                Needs Changes
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                1
              </h2>

              <span className="mt-0.5 block text-[8px] text-red-500">
                Action needed
              </span>
            </div>

            <div className="min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-3">
              <p className="text-[8px] font-medium text-gray-500">
                Avg Review Score
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                88%
              </h2>

              <span className="mt-0.5 block text-[8px] text-emerald-600">
                +2% vs last month
              </span>
            </div>
          </section>

          <section className="mt-3 w-full max-w-full overflow-hidden rounded-lg border border-red-300 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-3.5 py-2.5">
              <div>
                <h2 className="text-[10px] font-semibold text-gray-900">
                  Needs Your Action
                </h2>

                <p className="mt-0.5 text-[8px] text-gray-500">
                  Changes were requested — restart work to resubmit
                </p>
              </div>

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-50 text-[7px] font-medium text-red-500">
                1
              </span>
            </div>

            <div className="flex items-center justify-between px-3.5 py-2.5 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3">
              <div>
                <h3 className="text-[9px] font-semibold text-gray-800">
                  Refactor review scoring service
                </h3>

                <p className="mt-0.5 text-[8px] text-gray-500">
                  Payments Platform · feedback left 3 days ago · deadline Dec 5, 2026
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[8px] font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  View Feedback
                </button>

                <button
                  type="button"
                  className="rounded-md border border-[#5146e5] bg-[#5146e5] px-3 py-1.5 text-[8px] font-medium text-white transition hover:bg-[#453bd1]"
                >
                  Start Work
                </button>
              </div>
            </div>
          </section>

          <section className="mt-5 box-border w-full max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-3.5 py-2.5">
              <div>
                <h2 className="text-[10px] font-semibold text-gray-900">
                  My Tasks
                </h2>

                <p className="mt-0.5 text-[8px] text-gray-500">
                  Sorted by deadline
                </p>
              </div>

              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-[8px] font-medium text-gray-600 transition hover:bg-gray-50"
              >
                View all
              </button>
            </div>

            <div className="w-full max-w-full overflow-x-auto">
              <div className="grid min-w-[700px] grid-cols-[2fr_1.3fr_0.9fr_0.8fr] border-b border-gray-200 bg-gray-50 px-3.5 py-2">
                <span className="min-w-0 text-[8px] font-medium uppercase text-gray-500">
                  Task
                </span>

                <span className="min-w-0 text-[8px] font-medium uppercase text-gray-500">
                  Project
                </span>

                <span className="min-w-0 text-[8px] font-medium uppercase text-gray-500">
                  Status
                </span>

                <span className="min-w-0 text-[8px] font-medium uppercase text-gray-500">
                  Deadline
                </span>
              </div>

              {tasks.map((task) => (
                <div
                  key={task.task}
                  className="grid min-w-[700px] grid-cols-[2fr_1.3fr_0.9fr_0.8fr] items-center border-b border-gray-100 px-3.5 py-2.5 last:border-b-0"
                >
                  <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] font-medium text-gray-800">
                    {task.task}
                  </span>

                  <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-gray-600">
                    {task.project}
                  </span>

                  <span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[7px] font-medium ${statusStyles[task.status as keyof typeof statusStyles]}`}
                    >
                      {task.status}
                    </span>
                  </span>

                  <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-gray-600">
                    {task.deadline}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}