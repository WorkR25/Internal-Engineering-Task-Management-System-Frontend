import Sidebar from "../components/layout/sidebar";

const projects = [
  {
    name: "Payments Platform",
    status: "ACTIVE",
    openTasks: 9,
    targetEnd: "Dec 12, 2026",
  },
  {
    name: "Notification Service",
    status: "ACTIVE",
    openTasks: 6,
    targetEnd: "Nov 30, 2026",
  },
  {
    name: "Internal Admin Console",
    status: "PLANNING",
    openTasks: 4,
    targetEnd: "Jan 15, 2027",
  },
  {
    name: "Mobile API Gateway",
    status: "ACTIVE",
    openTasks: 11,
    targetEnd: "Dec 20, 2026",
  },
  {
    name: "Analytics Pipeline",
    status: "COMPLETED",
    openTasks: 0,
    targetEnd: "Oct 5, 2026",
  },
];

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
                6
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
                34
              </p>

              <p className="mt-1 text-xs text-gray-500">
                12 currently in review
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium text-gray-500">
                PENDING REVIEWS
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                8
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
                    6 total · sorted by target end date
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  View all
                </button>
              </div>

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-gray-200 px-5 py-3 text-[10px] font-medium text-gray-500">
                <span>PROJECT</span>
                <span>STATUS</span>
                <span>OPEN TASKS</span>
                <span>TARGET END</span>
              </div>

              {projects.map((project) => (
                <div
                  key={project.name}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-100 px-5 py-3.5 last:border-0"
                >
                  <span className="text-xs font-medium text-gray-800">
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
                    {project.openTasks}
                  </span>

                  <span className="text-xs text-gray-700">
                    {project.targetEnd}
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
                    <p className="truncate text-xs font-medium text-gray-800">
                      {review.title}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      {review.developer} · {review.submitted}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[#5146e5] px-3 py-1.5 text-[10px] font-medium text-white hover:bg-indigo-700"
                  >
                    Review
                  </button>
                </div>
              ))}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}