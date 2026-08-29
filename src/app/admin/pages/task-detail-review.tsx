"use client";

import { useState } from "react";
import Sidebar from "@/app/admin/components/sidebar";

const task = {
  title: "Implement idempotent payment webhook handler",
  project: "Task Board / Payments Platform",
  status: "IN REVIEW",
  priority: "HIGH PRIORITY",
  developer: "Sahil Das",
  developerInitials: "SD",
  deadline: "Nov 28, 2026",
  attempt: "Attempt 2 of 2",
};

const requirements = [
  "Webhook handler rejects duplicate event IDs using an idempotency key store",
  "Idempotency keys expire after 24 hours",
  "Unit tests cover replay and out-of-order delivery",
  "No behavior change to existing webhook signature verification",
];

const submission = {
  branch: "fix/webhook-idempotency",
  pullRequest: "#482",
  url: "github.com/company/payments-platform/pull/482",
  submittedBy: "Sahil Das",
  submittedTime: "2 hours ago",
  status: "IN_PROGRESS → IN_REVIEW",
  description:
    "Addressed feedback from attempt 1 — added a Redis-backed idempotency store with a 24h TTL and covered replay/out-of-order cases with new unit tests.",
};

const scores = [
  { label: "Requirement Analysis", score: 8 },
  { label: "Code Quality", score: 7 },
  { label: "Code Correctness", score: 9 },
  { label: "Testing", score: 8 },
  { label: "Delivery Timing", score: 6 },
  { label: "PR / Commit Quality", score: 8 },
];

const comments = [
  {
    initials: "AG",
    name: "Arijit Ganguly",
    time: "3 days ago",
    message:
      "First attempt looked good overall — please also add a test for the case where the retry arrives after the TTL has expired.",
  },
  {
    initials: "SD",
    name: "Sahil Das",
    time: "2 hours ago",
    message:
      "Done — added the expired-TTL replay case in the latest submission, should be covered now.",
  },
];

const activity = [
  {
    title: "Assigned to Sahil Das",
    time: "Nov 20, 9:14 AM",
    type: "normal",
  },
  {
    title: "Work started",
    time: "Nov 20, 11:02 AM",
    type: "normal",
  },
  {
    title: "Submitted · Attempt 1",
    time: "Nov 22, 4:40 PM",
    type: "normal",
  },
  {
    title: "Changes requested",
    time: "Nov 23, 10:15 AM",
    type: "danger",
  },
  {
    title: "Work resumed",
    time: "Nov 23, 1:30 PM",
    type: "normal",
  },
  {
    title: "Submitted · Attempt 2",
    time: "Today, 2 hours ago",
    type: "normal",
  },
];

export default function TaskDetailReview() {
  const [reviewStatus, setReviewStatus] = useState("");

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-900">
      <Sidebar
        activePage="task-detail-review"
        onPageChange={() => {}}
      />

      <main className="ml-56 min-h-screen">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-7 py-5">
          <div>
            <p className="text-[10px] font-medium text-gray-400">
              {task.project}
            </p>

            <h1 className="mt-1 text-sm font-semibold text-gray-900">
              {task.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-semibold text-gray-600">
              ADMIN
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
              AG
            </div>
          </div>
        </header>

        <div className="p-7">
          <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-semibold uppercase text-blue-600">
                  {task.status}
                </span>

                <span className="rounded-full bg-red-50 px-3 py-1 text-[9px] font-semibold uppercase text-red-500">
                  {task.priority}
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
                    {task.developerInitials}
                  </div>

                  <span className="text-[10px] font-medium text-gray-700">
                    {task.developer}
                  </span>
                </div>

                <span className="text-[10px] text-gray-400">
                  Deadline {task.deadline}
                </span>

                <span className="text-[10px] text-gray-400">
                  {task.attempt}
                </span>
              </div>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-bold text-gray-900">
                    Description
                  </h2>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[11px] leading-5 text-gray-600">
                    The payment gateway retries webhook deliveries on
                    timeout, which currently causes duplicate
                    charge-processing events downstream. Add an
                    idempotency layer to the webhook handler so retried
                    deliveries with the same event ID are safely ignored
                    after the first successful processing.
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-bold text-gray-900">
                    Acceptance Criteria
                  </h2>
                </div>

                <div className="space-y-3 px-5 py-5">
                  {requirements.map((requirement, index) => (
                    <div
                      key={requirement}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                          index < 3
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        ✓
                      </div>

                      <p className="text-[11px] leading-5 text-gray-600">
                        {requirement}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <div>
                    <h2 className="text-xs font-bold text-gray-900">
                      Submission — Attempt 2
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-500">
                      Submitted by {submission.submittedBy} ·{" "}
                      {submission.submittedTime}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-semibold text-gray-600">
                    {submission.status}
                  </span>
                </div>

                <div className="px-5 py-5">
                  <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-[10px] font-bold text-white">
                        PR
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-[#5146e5]">
                          {submission.branch} ·{" "}
                          {submission.pullRequest}
                        </p>

                        <p className="mt-0.5 text-[9px] text-gray-400">
                          {submission.url}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] leading-5 text-gray-600">
                    &quot;{submission.description}&quot;
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-bold text-gray-900">
                    Comments
                  </h2>

                  <span className="text-[10px] text-gray-400">
                    {comments.length}
                  </span>
                </div>

                <div className="px-5 py-5">
                  {comments.map((comment) => (
                    <div
                      key={`${comment.name}-${comment.time}`}
                      className="mb-4 flex gap-3 last:mb-0"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-bold text-[#5146e5]">
                        {comment.initials}
                      </div>

                      <div className="min-w-0 flex-1 rounded-lg bg-gray-50 px-4 py-3">
                        <p className="text-[10px] text-gray-700">
                          <span className="font-bold">
                            {comment.name}
                          </span>

                          <span className="ml-2 text-[9px] text-gray-400">
                            {comment.time}
                          </span>
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-gray-600">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-5">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-bold text-gray-900">
                    Review Submission
                  </h2>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Attempt 2 · {task.developer}
                  </p>
                </div>

                <div className="px-5 py-5">
                  <div className="mb-6 space-y-3.5">
                    {scores.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-4"
                      >
                        <span className="w-[130px] text-[11px] font-medium text-gray-600">
                          {item.label}
                        </span>

                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.score <= 6
                                ? "bg-orange-500"
                                : "bg-[#5146e5]"
                            }`}
                            style={{
                              width: `${item.score * 10}%`,
                            }}
                          />
                        </div>

                        <span className="w-8 text-right text-[11px] font-bold text-gray-900">
                          {item.score}/10
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <span className="mb-2 block text-[11px] font-bold text-gray-900">
                      Feedback
                    </span>

                    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                      <p className="text-[11px] leading-5 text-gray-600">
                        Looks solid — idempotency store implementation is
                        clean. Left two minor comments on the TTL edge
                        case.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewStatus("approved")}
                      className="flex-1 rounded-lg bg-[#10b981] px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#059669]"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setReviewStatus("changes")}
                      className="flex-1 rounded-lg border border-[#ef4444] bg-white px-4 py-2.5 text-[11px] font-bold text-[#ef4444] transition-colors hover:bg-red-50"
                    >
                      Request Changes
                    </button>
                  </div>

                  {reviewStatus && (
                    <p className="mt-4 text-center text-[10px] text-gray-500">
                      {reviewStatus === "approved"
                        ? "Submission marked for approval."
                        : "Changes requested for this submission."}
                    </p>
                  )}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-bold text-gray-900">
                    Activity History
                  </h2>
                </div>

                <div className="px-5 py-5 pl-6">
                  {activity.map((item, index) => (
                    <div
                      key={`${item.title}-${item.time}`}
                      className="relative flex gap-4 pb-5 last:pb-0"
                    >
                      {index < activity.length - 1 && (
                        <div className="absolute bottom-[-8px] left-[3px] top-4 w-[2px] bg-gray-100" />
                      )}

                      <div
                        className={`relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full ${
                          item.type === "danger"
                            ? "bg-red-500"
                            : "bg-[#5146e5]"
                        }`}
                      />

                      <div>
                        <p className="text-[11px] font-bold text-gray-900">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[9px] text-gray-500">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}