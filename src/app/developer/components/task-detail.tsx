"use client";

import { useState } from "react";
import SubmitForReview from "./submit-for-review";

type TaskDetailProps = {
  task: {
    id: number;
    assignmentId: number;
    title: string;
    project: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    deadline?: string;
    submitted?: string;
  };

  onBack: () => void;
};

const priorityStyles = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-orange-50 text-orange-600",
  HIGH: "bg-red-50 text-red-600",
  CRITICAL: "bg-red-100 text-red-600",
};

export default function TaskDetail({
  task,
  onBack,
}: TaskDetailProps) {
  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  if (isSubmitModalOpen) {
    return (
      <SubmitForReview
        task={{
          ...task,
          attempt: task.submitted ? 2 : 1,
        }}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f9fc] text-[#172033]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-[#5146e5] hover:underline"
        >
          ← Back to My Tasks
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#f1edff] px-2.5 py-1 text-[9px] font-bold text-[#5146e5]">
            DEVELOPER
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-bold text-[#5146e5]">
            KV
          </div>
        </div>
      </div>

      <div className="mt-1 text-[11px] font-semibold text-[#7b8494]">
        My Tasks / {task.project}
      </div>

      <div className="mb-5 mt-1">
        <div>
          <h1 className="m-0 text-2xl font-bold leading-[1.3] text-[#172033]">
            {task.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#788296]">
            <span className="rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
              {task.submitted ? "CHANGES REQUESTED" : "TODO"}
            </span>

            <span
              className={`inline-block rounded-full px-2 py-1 text-[9px] font-bold ${priorityStyles[task.priority]}`}
            >
              {task.priority} PRIORITY
            </span>

            {task.deadline && (
              <span>
                Deadline {task.deadline}
              </span>
            )}

            {task.submitted && (
              <span>
                Attempt 1 of 1 so far
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)] items-start gap-4 max-[1000px]:grid-cols-1">
        <div className="min-w-0">
          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              Description
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              <p className="mb-2">
                The review scoring service recalculates all six
                dimension aggregates on every read, causing slow
                dashboard loads for projects with high submission
                volume.
              </p>

              <p className="mb-0">
                Refactor to precompute and cache aggregates,
                invalidating the cache on new review writes.
              </p>
            </div>
          </section>

          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              Acceptance Criteria
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              <div className="mb-2 flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600">
                  ✓
                </span>

                <span>
                  Aggregates precomputed and cached at review time
                </span>
              </div>

              <div className="mb-2 flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600">
                  ✓
                </span>

                <span>
                  Cache invalidated on new review write
                </span>
              </div>

              <div className="mb-2 flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600">
                  ✓
                </span>

                <span>
                  No change to public review API response shape
                </span>
              </div>

              <div className="mb-0 flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-50 text-[9px] font-bold text-red-600">
                  !
                </span>

                <span>
                  Unit tests cover cache invalidation under
                  concurrent writes
                </span>
              </div>
            </div>
          </section>

          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              <div>
                <strong>
                  Your Submission — Attempt 1
                </strong>

                <p className="mt-1 text-[9px] font-normal text-[#8791a3]">
                  Submitted 4 days ago
                </p>
              </div>
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              <div className="flex items-center gap-2.5 rounded-md bg-[#f8f9fb] p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#172033] text-[8px] font-bold text-white">
                  PR
                </div>

                <div>
                  <p className="m-0 text-[10px] font-bold text-[#5146e5]">
                    refactor/review-score-cache · #467
                  </p>

                  <p className="mt-1 text-[9px] font-normal text-[#8791a3]">
                    github.com/company/payments-platform/pull/467
                  </p>
                </div>
              </div>

              <p className="mt-2.5 mb-0 text-[10px] leading-[1.6] text-[#657087]">
                Added a caching layer using an in-memory LRU cache
                keyed by submission id, invalidated on new review
                writes.
              </p>
            </div>
          </section>

          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              Comments
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              <div className="flex items-start gap-2.5 rounded-md bg-[#f8f9fb] p-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eeedff] text-[8px] font-bold text-[#5146e5]">
                  AG
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-1.5">
                    <strong className="text-[10px] text-[#263044]">
                      Arijit Ganguly
                    </strong>

                    <span className="text-[9px] text-[#9aa2b0]">
                      3 days ago
                    </span>
                  </div>

                  <p className="m-0 text-[10px] leading-[1.5] text-[#657087]">
                    Left detailed feedback on the review. The main
                    gap is that in-memory caching won&apos;t work once we
                    scale past one instance.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="min-w-0 max-[1000px]:grid max-[1000px]:grid-cols-2 max-[1000px]:gap-3 max-[700px]:block">
          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white max-[1000px]:mb-0 max-[700px]:mb-3">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              <div>
                <strong>
                  Review Feedback — Attempt 1
                </strong>

                <p className="mt-1 text-[9px] font-normal text-[#8791a3]">
                  Reviewed by Arijit Ganguly · 3 days ago
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
                CHANGES REQUESTED
              </span>
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              {[
                ["Requirement Analysis", "7/10", "70%"],
                ["Code Quality", "6/10", "60%"],
                ["Code Correctness", "5/10", "50%"],
                ["Testing", "4/10", "40%"],
                ["Delivery Timing", "8/10", "80%"],
                ["PR / Commit Quality", "7/10", "70%"],
              ].map(([label, score, width]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-[10px] text-[#566074]">
                    <span>{label}</span>

                    <strong className="text-[10px] text-[#263044]">
                      {score}
                    </strong>
                  </div>

                  <div className="mb-2.5 h-1 w-full overflow-hidden rounded-full bg-[#edf0f4]">
                    <div
                      className="h-full rounded-full bg-[#5146e5]"
                      style={{ width }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-3 border-t border-gray-200 pt-3 text-[10px] leading-[1.6] text-[#657087]">
                Good direction, but the in-memory cache won&apos;t survive
                across service instances once we scale horizontally.
                Please switch to a Redis-backed cache and add a test
                for concurrent invalidation.
              </div>
            </div>
          </section>

          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white max-[1000px]:mb-0 max-[700px]:mb-3">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              Continue This Task
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              <p className="mb-2">
                Changes were requested on your last submission.
                Start work to move this task back to In Progress —
                you&apos;ll be able to resubmit once you&apos;re ready.
              </p>

              <button
                type="button"
                onClick={() => setIsWorkStarted(true)}
                className="mt-3 w-full cursor-pointer rounded-md border-0 bg-[#5146e5] px-3 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#4338ca]"
              >
                {isWorkStarted
                  ? "Work In Progress"
                  : "Start Work"}
              </button>

              {isWorkStarted && (
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="mt-2 w-full cursor-pointer rounded-md border border-[#5146e5] bg-white px-3 py-2.5 text-[10px] font-semibold text-[#5146e5] transition hover:bg-[#eeedff]"
                >
                  Submit for Review
                </button>
              )}
            </div>
          </section>

          <section className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white max-[1000px]:mb-0 max-[700px]:mb-3">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 text-[11px] font-bold text-[#263044]">
              Activity History
            </div>

            <div className="p-4 text-[10px] leading-[1.6] text-[#657087]">
              {[
                ["Assigned to you", "Nov 26, 9:00 AM", false],
                ["Work started", "Nov 26, 10:20 AM", false],
                ["Submitted · Attempt 1", "Nov 28, 3:10 PM", false],
                ["Changes requested", "3 days ago", true],
              ].map(([title, time, error]) => (
                <div
                  key={title}
                  className="relative flex items-start gap-2 pb-3 last:pb-0"
                >
                  <span
                    className={`relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full ${
                      error ? "bg-red-500" : "bg-[#5146e5]"
                    }`}
                  />

                  <div className="flex flex-col gap-0.5">
                    <strong className="text-[10px] text-[#263044]">
                      {title}
                    </strong>

                    <span className="text-[9px] text-[#9aa2b0]">
                      {time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}