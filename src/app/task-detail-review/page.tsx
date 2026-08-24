"use client";

import { useState } from "react";

export default function TaskDetailReview() {
  const [scores, setScores] = useState([8, 7, 9, 8, 6, 8]);

  const [feedback, setFeedback] = useState(
    "Looks solid — idempotency store implementation is clean. Left two minor comments on the TTL edge case."
  );

  const criteria = [
    "Requirement Analysis",
    "Code Quality",
    "Code Correctness",
    "Testing",
    "Delivery Timing",
    "PR / Commit Quality",
  ];

  const updateScore = (index: number, value: number) => {
    const updatedScores = [...scores];
    updatedScores[index] = value;
    setScores(updatedScores);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8fc] text-[#172033]">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 flex h-screen w-[230px] flex-col border-r border-gray-200 bg-white px-5 py-7">

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-[17px] font-bold tracking-tight">
            TaskReview
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">

          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-gray-500 hover:bg-gray-50"
          >
            <span className="text-gray-300">•</span>
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-gray-500 hover:bg-gray-50"
          >
            <span className="text-gray-300">•</span>
            Projects
          </a>

          {/* Active */}
          <a
            href="#"
            className="flex items-center gap-2 rounded-md bg-[#eeeeff] px-3 py-2 text-[12px] font-semibold text-[#5146e5]"
          >
            <span className="text-[#5146e5]">•</span>
            Task Board
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-gray-500 hover:bg-gray-50"
          >
            <span className="text-gray-300">•</span>
            Reviews
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-gray-500 hover:bg-gray-50"
          >
            <span className="text-gray-300">•</span>
            Performance
          </a>

        </nav>

        {/* Bottom user */}
        <div className="mt-auto border-t border-gray-200 pt-4">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeeff] text-[10px] font-bold text-[#5146e5]">
              AG
            </div>

            <div>
              <p className="text-[11px] font-semibold">
                Arjit Ganguly
              </p>

              <p className="text-[9px] text-gray-400">
                ADMIN
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="ml-[230px] flex min-h-screen flex-1 flex-col">

        {/* ================= TOP HEADER ================= */}
        <header className="border-b border-gray-200 bg-white px-8 py-4">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[10px] text-gray-400">
                Task Board / Payments Platform
              </p>

              <h2 className="mt-1 text-[17px] font-bold">
                Implement idempotent payment webhook handler
              </h2>
            </div>

            <div className="flex items-center gap-3">

              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[9px] font-bold text-gray-500">
                ADMIN
              </span>

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeeff] text-[9px] font-bold text-[#5146e5]">
                AG
              </div>

            </div>

          </div>

        </header>

        {/* ================= TASK STATUS ================= */}
        <div className="border-b border-gray-200 bg-white px-8 py-3">

          <div className="flex flex-wrap items-center gap-4">

            <span className="rounded-full bg-[#edf7ff] px-2.5 py-1 text-[9px] font-bold text-[#4b8bd8]">
              IN REVIEW
            </span>

            <span className="rounded-full bg-[#fff0f0] px-2.5 py-1 text-[9px] font-bold text-[#ef4444]">
              HIGH PRIORITY
            </span>

            <span className="text-[10px] text-gray-500">
              <b className="mr-1 text-[9px] text-[#5146e5]">SD</b>
              Sahil Das
            </span>

            <span className="text-[10px] text-gray-400">
              Deadline Nov 28, 2026
            </span>

            <span className="text-[10px] text-gray-400">
              Attempt 2 of 2
            </span>

          </div>

        </div>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-6">

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">

            {/* ================= LEFT CONTENT ================= */}
            <div className="space-y-5">

              {/* Description */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="border-b border-gray-200 px-5 py-3">
                  <h3 className="text-[11px] font-bold">
                    Description
                  </h3>
                </div>

                <div className="p-5">

                  <p className="text-[10px] leading-5 text-gray-600">
                    The payment gateway retries webhook deliveries on timeout,
                    which currently causes duplicate charge-processing events
                    downstream. Add an idempotency layer to the webhook handler
                    so retried deliveries with the same event ID are safely
                    ignored after the first successful processing.
                  </p>

                </div>

              </section>

              {/* Acceptance Criteria */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="border-b border-gray-200 px-5 py-3">
                  <h3 className="text-[11px] font-bold">
                    Acceptance Criteria
                  </h3>
                </div>

                <div className="space-y-3 p-5">

                  {[
                    "Webhook handler rejects duplicate event IDs using an idempotency key store",
                    "Idempotency keys expire after 24 hours",
                    "Unit tests cover replayed and out-of-order delivery",
                    "No behavior change to existing webhook signature verification",
                  ].map((item, index) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] ${
                          index < 3
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        ✓
                      </span>

                      <span className="text-[10px] text-gray-600">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </section>

              {/* Submission */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">

                  <div>
                    <h3 className="text-[11px] font-bold">
                      Submission — Attempt 2
                    </h3>

                    <p className="mt-1 text-[9px] text-gray-400">
                      Submitted by Sahil Das · 2 hours ago
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2 py-1 text-[8px] font-bold text-gray-500">
                    IN PROGRESS → IN REVIEW
                  </span>

                </div>

                <div className="p-5">

                  <div className="rounded-lg bg-[#f8f9fc] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-7 w-7 items-center justify-center rounded bg-[#172033] text-[8px] font-bold text-white">
                        PR
                      </div>

                      <div>

                        <p className="text-[10px] font-semibold text-[#5146e5]">
                          fix/webhook-idempotency · #482
                        </p>

                        <p className="text-[8px] text-gray-400">
                          github.com/company/payments-platform/pull/482
                        </p>

                      </div>

                    </div>

                    <p className="mt-3 text-[9px] leading-4 text-gray-500">
                      Addressed feedback from attempt 1 — added a Redis-backed
                      idempotency store with a 24h TTL and covered
                      replay/out-of-order cases with new unit tests.
                    </p>

                  </div>

                </div>

              </section>

              {/* Comments */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">

                  <h3 className="text-[11px] font-bold">
                    Comments
                  </h3>

                  <span className="text-[9px] text-gray-400">
                    2
                  </span>

                </div>

                <div className="space-y-3 p-5">

                  <div className="flex gap-3">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eeeeff] text-[8px] font-bold text-[#5146e5]">
                      AG
                    </div>

                    <div className="flex-1 rounded-lg bg-[#f8f9fc] p-3">

                      <div className="flex justify-between">

                        <span className="text-[9px] font-bold">
                          Arjit Ganguly
                        </span>

                        <span className="text-[8px] text-gray-400">
                          3 days ago
                        </span>

                      </div>

                      <p className="mt-1 text-[9px] leading-4 text-gray-500">
                        First attempt looked good overall — please also add a
                        test for the case where the retry arrives after the TTL
                        has expired.
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eeeeff] text-[8px] font-bold text-[#5146e5]">
                      SD
                    </div>

                    <div className="flex-1 rounded-lg bg-[#f8f9fc] p-3">

                      <div className="flex justify-between">

                        <span className="text-[9px] font-bold">
                          Sahil Das
                        </span>

                        <span className="text-[8px] text-gray-400">
                          2 hours ago
                        </span>

                      </div>

                      <p className="mt-1 text-[9px] leading-4 text-gray-500">
                        Done — added the expired-TTL replay case in the latest
                        submission, should be covered now.
                      </p>

                    </div>

                  </div>

                </div>

              </section>

            </div>

            {/* ================= RIGHT CONTENT ================= */}
            <div className="space-y-5">

              {/* Review Submission */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="border-b border-gray-200 px-5 py-3">

                  <h3 className="text-[11px] font-bold">
                    Review Submission
                  </h3>

                  <p className="mt-1 text-[9px] text-gray-400">
                    Attempt 2 · Sahil Das
                  </p>

                </div>

                <div className="p-5">

                  <div className="space-y-4">

                    {criteria.map((item, index) => (

                      <div key={item}>

                        <div className="mb-1 flex justify-between">

                          <span className="text-[9px] font-medium text-gray-600">
                            {item}
                          </span>

                          <span className="text-[9px] font-bold">
                            {scores[index]}/10
                          </span>

                        </div>

                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={scores[index]}
                          onChange={(event) =>
                            updateScore(
                              index,
                              Number(event.target.value)
                            )
                          }
                          className="h-1 w-full cursor-pointer accent-[#5146e5]"
                        />

                      </div>

                    ))}

                  </div>

                  {/* Feedback */}
                  <div className="mt-5">

                    <label className="mb-2 block text-[9px] font-bold">
                      Feedback
                    </label>

                    <textarea
                      value={feedback}
                      onChange={(event) =>
                        setFeedback(event.target.value)
                      }
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-200 p-3 text-[9px] leading-4 text-gray-600 outline-none focus:border-[#5146e5]"
                    />

                  </div>

                  {/* Buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() => alert("Task Approved")}
                      className="rounded-md bg-[#18b66a] py-2 text-[9px] font-bold text-white hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => alert("Changes Requested")}
                      className="rounded-md border border-red-300 py-2 text-[9px] font-bold text-red-500 hover:bg-red-50"
                    >
                      Request Changes
                    </button>

                  </div>

                </div>

              </section>

              {/* Activity History */}
              <section className="rounded-xl border border-gray-200 bg-white">

                <div className="border-b border-gray-200 px-5 py-3">
                  <h3 className="text-[11px] font-bold">
                    Activity History
                  </h3>
                </div>

                <div className="p-5">

                  <div className="relative space-y-5 pl-4">

                    <div className="absolute left-[3px] top-1 bottom-1 w-px bg-gray-200" />

                    {[
                      ["Assigned to Sahil Das", "Nov 20, 9:14 AM"],
                      ["Work started", "Nov 20, 11:02 AM"],
                      ["Submitted — Attempt 1", "Nov 22, 4:40 PM"],
                      ["Changes requested", "Nov 23, 10:15 AM"],
                      ["Work resumed", "Nov 23, 1:30 PM"],
                      ["Submitted — Attempt 2", "Today, 2 hours ago"],
                    ].map(([title, time]) => (

                      <div
                        key={title}
                        className="relative"
                      >

                        <span
                          className={`absolute -left-[15px] top-[2px] h-2 w-2 rounded-full border border-white ${
                            title === "Changes requested"
                              ? "bg-red-500"
                              : "bg-[#5146e5]"
                          }`}
                        />

                        <p className="text-[9px] font-semibold text-gray-700">
                          {title}
                        </p>

                        <p className="mt-0.5 text-[8px] text-gray-400">
                          {time}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </section>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}