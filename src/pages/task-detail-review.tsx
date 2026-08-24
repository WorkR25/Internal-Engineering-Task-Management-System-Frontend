import Sidebar from "../components/layout/sidebar";

const task = {
  title: "Implement payment webhook handler",
  project: "Payments Platform",
  status: "IN PROGRESS",
  priority: "HIGH",
  developer: "Sahil Das",
  deadline: "Dec 4, 2026",
  created: "Nov 24, 2026",
};

const description =
  "Implement the payment webhook handler with proper validation, error handling and retry support.";

const requirements = [
  "Validate incoming webhook payloads",
  "Handle duplicate webhook events safely",
  "Implement proper error handling",
  "Add retry support for failed processing",
];

const activity = [
  {
    name: "Sahil Das",
    action: "started working on this task",
    time: "2h ago",
  },
  {
    name: "Arnab Mukherjee",
    action: "assigned this task",
    time: "1d ago",
  },
];

export default function TaskDetail() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar />

      <main className="ml-52 min-h-screen">
        <div className="mx-auto max-w-6xl px-7 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">
                Payments Platform / Task
              </p>

              <h1 className="mt-2 text-xl font-semibold text-gray-900">
                {task.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
                ADMIN
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-[10px] font-semibold text-white">
                AM
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-5">
              <section className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Task Details
                  </h2>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-gray-600">
                    {description}
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Requirements
                  </h2>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    {requirements.map((requirement) => (
                      <div
                        key={requirement}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-bold text-[#5146e5]">
                          ✓
                        </span>

                        <p className="text-xs text-gray-600">
                          {requirement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Activity
                  </h2>
                </div>

                <div>
                  {activity.map((item) => (
                    <div
                      key={${item.name}-${item.time}}
                      className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 last:border-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
                        {item.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-xs text-gray-700">
                          <span className="font-medium">
                            {item.name}
                          </span>{" "}
                          {item.action}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Task Information
                </h2>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Status
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-medium text-blue-600">
                    {task.status}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Priority
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-medium text-orange-600">
                    {task.priority}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Assigned To
                  </p>

                  <p className="mt-2 text-xs font-medium text-gray-800">
                    {task.developer}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Project
                  </p>

                  <p className="mt-2 text-xs font-medium text-gray-800">
                    {task.project}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Deadline
                  </p>

                  <p className="mt-2 text-xs font-medium text-gray-800">
                    {task.deadline}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase text-gray-400">
                    Created
                  </p>

                  <p className="mt-2 text-xs font-medium text-gray-800">
                    {task.created}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    className="w-full rounded-md bg-[#5146e5] px-4 py-2.5 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Submit for Review
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}