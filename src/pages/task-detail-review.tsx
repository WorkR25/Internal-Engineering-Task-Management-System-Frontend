"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
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
  {
    label: "Requirement Analysis",
    score: 8,
  },
  {
    label: "Code Quality",
    score: 7,
  },
  {
    label: "Code Correctness",
    score: 9,
  },
  {
    label: "Testing",
    score: 8,
  },
  {
    label: "Delivery Timing",
    score: 6,
  },
  {
    label: "PR / Commit Quality",
    score: 8,
  },
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
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar />

      <main className="ml-52 min-h-screen">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
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

        <div className="mx-auto max-w-[1250px] px-6 py-6">
          <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-semibold text-blue-600">
                  {task.status}
                </span>

                <span className="rounded-full bg-red-50 px-3 py-1 text-[9px] font-semibold text-red-500">
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

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-semibold text-gray-900">
                    Description
                  </h2>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[11px] leading-5 text-gray-600">
                    The payment gateway retries webhook deliveries on timeout,
                    which currently causes duplicate charge-processing events
                    downstream. Add an idempotency layer to the webhook handler
                    so retried deliveries with the same event ID are safely
                    ignored after the first successful processing.
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-semibold text-gray-900">
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

                      <p className="text-[10px] leading-4 text-gray-600">
                        {requirement}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <div>
                    <h2 className="text-xs font-semibold text-gray-900">
                      Submission — Attempt 2
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Submitted by {submission.submittedBy} ·{" "}
                      {submission.submittedTime}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-semibold text-gray-500">
                    {submission.status}
                  </span>
                </div>

                <div className="px-5 py-4">
                  <div className="rounded-lg bg-gray-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-[10px] font-semibold text-white">
                        PR
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-[#5146e5]">
                          {submission.branch} · {submission.pullRequest}
                        </p>

                        <p className="mt-0.5 text-[9px] text-gray-400">
                          {submission.url}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-[10px] leading-5 text-gray-600">
                    "{submission.description}"
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-semibold text-gray-900">
                    Comments
                  </h2>

                  <span className="text-[10px] text-gray-400">
                    {comments.length}
                  </span>
                </div>

                <div className="space-y-4 px-5 py-4">
                  {comments.map((comment) => (
                    <div
                      key={`${comment.name}-${comment.time}`}
                      className="flex gap-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
                        {comment.initials}
                      </div>

                      <div className="min-w-0 flex-1 rounded-lg bg-gray-50 px-4 py-3">
                        <p className="text-[10px] text-gray-700">
                          <span className="font-semibold">
                            {comment.name}
                          </span>

                          <span className="ml-2 text-[9px] text-gray-400">
                            {comment.time}
                          </span>
                        </p>

                        <p className="mt-2 text-[10px] leading-4 text-gray-600">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-5">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-semibold text-gray-900">
                    Review Submission
                  </h2>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Attempt 2 · {task.developer}
                  </p>
                </div>

                <div className="px-5 py-5">
                  <div className="space-y-4">
                    {scores.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium text-gray-700">
                            {item.label}
                          </span>

                          <span className="text-[10px] font-semibold text-gray-700">
                            {item.score}/10
                          </span>
                        </div>

                        <div className="mt-2 h-1 rounded-full bg-gray-100">
                          <div
                            className="h-1 rounded-full bg-[#5146e5]"
                            style={{
                              width: `${item.score * 10}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 text-[10px] font-semibold text-gray-700">
                      Feedback
                    </p>

                    <div className="rounded-lg border border-gray-200 px-3 py-3">
                      <p className="text-[10px] leading-4 text-gray-600">
                        Looks solid — idempotency store implementation is
                        clean. Left two minor comments on the TTL edge case.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewStatus("approved")}
                      className={`flex-1 rounded-md px-3 py-2 text-[10px] font-semibold text-white ${
                        reviewStatus === "approved"
                          ? "bg-emerald-700"
                          : "bg-emerald-500 hover:bg-emerald-600"
                      }`}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setReviewStatus("changes")}
                      className={`flex-1 rounded-md border px-3 py-2 text-[10px] font-semibold ${
                        reviewStatus === "changes"
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-red-300 text-red-500 hover:bg-red-50"
                      }`}
                    >
                      Request Changes
                    </button>
                  </div>

                  {reviewStatus && (
                    <p className="mt-3 text-center text-[10px] text-gray-500">
                      {reviewStatus === "approved"
                        ? "Submission marked for approval."
                        : "Changes requested for this submission."}
                    </p>
                  )}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="text-xs font-semibold text-gray-900">
                    Activity History
                  </h2>
                </div>

                <div className="px-5 py-5">
                  <div className="space-y-5">
                    {activity.map((item, index) => (
                      <div
                        key={`${item.title}-${item.time}`}
                        className="relative flex gap-3"
                      >
                        {index < activity.length - 1 && (
                          <div className="absolute left-[4px] top-3 h-8 w-px bg-gray-200" />
                        )}

                        <div
                          className={`relative mt-1 h-2 w-2 shrink-0 rounded-full ${
                            item.type === "danger"
                              ? "bg-red-500"
                              : "bg-[#5146e5]"
                          }`}
                        />

                        <div>
                          <p className="text-[10px] font-semibold text-gray-700">
                            {item.title}
                          </p>

                          <p className="mt-1 text-[9px] text-gray-400">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}