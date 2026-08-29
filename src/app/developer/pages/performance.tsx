"use client";

import Sidebar from "@/app/developer/components/sidebar";

type PageName = "dashboard" | "my-tasks" | "performance";

const dimensions = [
  { name: "Requirement Analysis", score: "8.2", width: "82%" },
  { name: "Code Quality", score: "8.0", width: "80%" },
  { name: "Code Correctness", score: "7.6", width: "76%" },
  { name: "Testing", score: "7.1", width: "71%" },
  { name: "Delivery Timing", score: "8.8", width: "88%" },
  { name: "PR / Commit Quality", score: "8.3", width: "83%" },
];

const reviews = [
  {
    task: "Add pagination to GET /tasks",
    attempt: "1 of 1",
    reviewed: "Awaiting review",
    score: "—",
    decision: "PENDING",
  },
  {
    task: "Set up Sequelize migrations",
    attempt: "1 of 1",
    reviewed: "Nov 18, 2026",
    score: "93%",
    decision: "APPROVED",
  },
  {
    task: "Seed roles and unassignment reasons",
    attempt: "1 of 1",
    reviewed: "Nov 12, 2026",
    score: "90%",
    decision: "APPROVED",
  },
  {
    task: "Add request logging middleware",
    attempt: "2 of 2",
    reviewed: "Oct 30, 2026",
    score: "85%",
    decision: "APPROVED",
  },
];

export default function Performance() {
  const handlePageChange = (page: PageName) => {
    console.log("Page changed:", page);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      <Sidebar
        activePage="performance"
        onPageChange={handlePageChange}
      />

      <main className="ml-60 box-border min-h-screen w-[calc(100%-240px)] flex-1 overflow-x-hidden bg-white p-6 max-[1024px]:ml-60 max-[1024px]:w-[calc(100%-240px)] max-[640px]:ml-60 max-[640px]:w-[calc(100%-240px)] max-[640px]:p-4">
        <header className="mb-5 flex items-center justify-between border-b border-gray-200 pb-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              My Performance
            </h1>

            <p className="mt-1 text-xs text-gray-400">
              Derived from your APPROVED submissions · last 90 days
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-bold tracking-wider text-[#4f46e5]">
              DEVELOPER
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-[#4f46e5]">
              KV
            </div>
          </div>
        </header>

        <section className="mb-4 grid grid-cols-4 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-[9px] font-bold tracking-wider text-gray-500">
              AVG REVIEW SCORE
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              88%
            </h2>

            <p className="mt-1 text-[10px] text-green-600">
              +3% vs last month
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-[9px] font-bold tracking-wider text-gray-500">
              ON-TIME DELIVERY
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              90%
            </h2>

            <p className="mt-1 text-[10px] text-green-600">
              +1% vs last month
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-[9px] font-bold tracking-wider text-gray-500">
              COMPLETION RATE
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              96%
            </h2>

            <p className="mt-1 text-[10px] text-gray-500">
              Steady
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-[9px] font-bold tracking-wider text-gray-500">
              CHANGE REQUEST RATE
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              15%
            </h2>

            <p className="mt-1 text-[10px] text-red-500">
              +3% vs last month
            </p>
          </div>
        </section>

        <section className="mb-4 grid grid-cols-[1.55fr_1fr] gap-4 max-[1024px]:grid-cols-1">
          <div className="min-h-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3">
              <h2 className="text-xs font-bold text-gray-900">
                Your Review Score — Trend
              </h2>

              <p className="mt-0.5 text-[9px] text-gray-400">
                Last 6 sprints
              </p>
            </div>

            <div className="flex px-5 pb-3 pt-5">
              <div className="flex h-36 flex-col justify-between pr-3 text-[8px] text-gray-300">
                <span>100</span>
                <span>90</span>
                <span>80</span>
                <span>70</span>
              </div>

              <div className="relative h-44 flex-1">
                <div className="absolute left-0 right-0 top-0 border-t border-gray-100" />
                <div className="absolute left-0 right-0 top-[33%] border-t border-gray-100" />
                <div className="absolute left-0 right-0 top-[66%] border-t border-gray-100" />
                <div className="absolute bottom-4 left-0 right-0 border-t border-gray-100" />

                <svg
                  className="absolute left-0 top-0 h-36 w-full"
                  viewBox="0 0 600 150"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="rgba(79, 70, 229, 0.08)"
                    d="M 0 75 L 100 82 L 200 58 L 300 68 L 400 52 L 500 58 L 600 55 L 600 150 L 0 150 Z"
                  />

                  <path
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3"
                    d="M 0 75 L 100 82 L 200 58 L 300 68 L 400 52 L 500 58 L 600 55"
                  />

                  <circle fill="#4f46e5" cx="0" cy="75" r="4" />
                  <circle fill="#4f46e5" cx="100" cy="82" r="4" />
                  <circle fill="#4f46e5" cx="200" cy="58" r="4" />
                  <circle fill="#4f46e5" cx="300" cy="68" r="4" />
                  <circle fill="#4f46e5" cx="400" cy="52" r="4" />
                  <circle fill="#4f46e5" cx="500" cy="58" r="4" />
                  <circle fill="#4f46e5" cx="600" cy="55" r="4" />
                </svg>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-gray-300">
                  <span>Sprint 14</span>
                  <span>Sprint 16</span>
                  <span>Sprint 18</span>
                  <span>Sprint 19</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3">
              <h2 className="text-xs font-bold text-gray-900">
                Average by Dimension
              </h2>

              <p className="mt-0.5 text-[9px] text-gray-400">
                Across all reviewed submissions
              </p>
            </div>

            <div className="space-y-3 px-4 py-4">
              {dimensions.map((dimension) => (
                <div
                  key={dimension.name}
                  className="grid grid-cols-[105px_1fr_25px] items-center gap-2 text-[9px] text-gray-600"
                >
                  <span>{dimension.name}</span>

                  <div className="h-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#4f46e5]"
                      style={{ width: dimension.width }}
                    />
                  </div>

                  <strong className="text-right text-[9px] text-gray-800">
                    {dimension.score}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h2 className="text-xs font-bold text-gray-900">
              Recent Reviews
            </h2>

            <p className="mt-0.5 text-[9px] text-gray-400">
              Your last 4 reviewed submissions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-[8px] font-bold tracking-wider text-gray-400">
                    TASK
                  </th>

                  <th className="px-4 py-2 text-left text-[8px] font-bold tracking-wider text-gray-400">
                    ATTEMPT
                  </th>

                  <th className="px-4 py-2 text-left text-[8px] font-bold tracking-wider text-gray-400">
                    REVIEWED
                  </th>

                  <th className="px-4 py-2 text-left text-[8px] font-bold tracking-wider text-gray-400">
                    SCORE
                  </th>

                  <th className="px-4 py-2 text-left text-[8px] font-bold tracking-wider text-gray-400">
                    DECISION
                  </th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.task}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="border-b border-gray-100 px-4 py-3 text-[9px] font-semibold text-gray-900">
                      {review.task}
                    </td>

                    <td className="border-b border-gray-100 px-4 py-3 text-[9px] text-gray-600">
                      {review.attempt}
                    </td>

                    <td className="border-b border-gray-100 px-4 py-3 text-[9px] text-gray-600">
                      {review.reviewed}
                    </td>

                    <td className="border-b border-gray-100 px-4 py-3 text-[9px] font-bold text-gray-800">
                      {review.score}
                    </td>

                    <td className="border-b border-gray-100 px-4 py-3 text-[9px] text-gray-600">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[8px] font-bold ${
                          review.decision === "APPROVED"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {review.decision}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}