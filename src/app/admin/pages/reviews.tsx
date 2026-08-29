"use client";

import { useState } from "react";
import Sidebar from "@/app/admin/components/sidebar";

type Review = {
  title: string;
  project: string;
  developer: string;
  attempt: string;
  submitted: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

const reviews: Review[] = [
  {
    title: "Rework webhook retry backoff",
    project: "Payments Platform",
    developer: "Rhea Sen",
    attempt: "1 of 2",
    submitted: "2 hours ago",
    priority: "MEDIUM",
  },
  {
    title: "Implement idempotent payment webhook handler",
    project: "Payments Platform",
    developer: "Sahil Das",
    attempt: "2 of 2",
    submitted: "3 hours ago",
    priority: "HIGH",
  },
  {
    title: "Add pagination to GET tasks",
    project: "Payments Platform",
    developer: "Karan Verma",
    attempt: "1 of 1",
    submitted: "5 hours ago",
    priority: "HIGH",
  },
  {
    title: "Fix N+1 query on dashboard",
    project: "Internal Admin Console",
    developer: "Neha Patil",
    attempt: "1 of 3",
    submitted: "Yesterday",
    priority: "HIGH",
  },
  {
    title: "Add retry after header support",
    project: "Notification Service",
    developer: "Arman Thakur",
    attempt: "3 of 3",
    submitted: "Yesterday",
    priority: "LOW",
  },
  {
    title: "Validate webhook signature on gateway callback",
    project: "Mobile API Gateway",
    developer: "Vikram Rao",
    attempt: "1 of 1",
    submitted: "2 days ago",
    priority: "HIGH",
  },
];

const projectFilters = [
  "All Projects",
  "Payments Platform",
  "Notification Service",
  "Mobile API Gateway",
];

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredReviews =
    activeFilter === "All Projects"
      ? reviews
      : reviews.filter((review) => review.project === activeFilter);

  const handleReviewClick = (review: Review) => {
    console.log("Review selected:", review);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar
        activePage="reviews"
        onPageChange={() => {}}
      />

      <section className="ml-56 min-h-screen">
        <div className="p-7">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Reviews
              </h1>

              <p className="mt-1 text-xs text-gray-400">
                {filteredReviews.length} submission
                {filteredReviews.length !== 1 ? "s" : ""} awaiting a
                decision
                {activeFilter !== "All Projects"
                  ? ` in ${activeFilter}`
                  : ", across all projects"}
              </p>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-md border px-3 py-1.5 text-[10px] font-medium transition-colors ${
                    activeFilter === filter
                      ? "border-[#5146e5] bg-[#5146e5] text-white hover:bg-[#4338ca]"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-[2fr_1.2fr_1.1fr_0.8fr_1fr_0.8fr_0.7fr] border-b border-gray-200 px-5 py-3 text-[9px] font-semibold text-gray-500">
                  <span>TASK</span>
                  <span>PROJECT</span>
                  <span>DEVELOPER</span>
                  <span>ATTEMPT</span>
                  <span>SUBMITTED</span>
                  <span>PRIORITY</span>
                  <span></span>
                </div>

                {filteredReviews.map((review) => (
                  <div
                    key={review.title}
                    onClick={() => handleReviewClick(review)}
                    className="grid cursor-pointer grid-cols-[2fr_1.2fr_1.1fr_0.8fr_1fr_0.8fr_0.7fr] items-center border-b border-gray-100 px-5 py-3.5 last:border-0"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="truncate text-xs font-medium text-gray-800">
                        {review.title}
                      </p>
                    </div>

                    <span className="text-[10px] text-gray-600">
                      {review.project}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eeedff] text-[8px] font-semibold text-[#5146e5]">
                        {review.developer
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <span className="truncate text-[10px] text-gray-600">
                        {review.developer}
                      </span>
                    </div>

                    <span className="text-[10px] text-gray-600">
                      {review.attempt}
                    </span>

                    <span className="text-[10px] text-gray-500">
                      {review.submitted}
                    </span>

                    <span>
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                          review.priority === "HIGH"
                            ? "bg-red-50 text-red-600"
                            : review.priority === "MEDIUM"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {review.priority}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleReviewClick(review);
                      }}
                      className="rounded-md bg-[#5146e5] px-2.5 py-1.5 text-[9px] font-medium text-white hover:bg-indigo-700"
                    >
                      Review
                    </button>
                  </div>
                ))}

                {filteredReviews.length === 0 && (
                  <div className="p-6 text-center text-[10px] text-[#9aa1ae]">
                    No submissions for {activeFilter}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}