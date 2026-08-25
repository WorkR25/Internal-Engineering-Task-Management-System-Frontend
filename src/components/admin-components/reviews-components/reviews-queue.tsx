"use client";

import "./reviews-queue.css";

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

export default function ReviewsQueue() {
  return (
    <section className="reviews-page">
      <div className="reviews-card">

        {/* HEADER */}
        <div className="reviews-header">
          <h1 className="reviews-title">
            Reviews
          </h1>

          <p className="reviews-subtitle">
            6 submissions awaiting a decision, across all projects
          </p>
        </div>

        {/* FILTERS */}
        <div className="reviews-filters">
          <button
            type="button"
            className="filter-button filter-button-active"
          >
            All Projects
          </button>

          <button
            type="button"
            className="filter-button"
          >
            Payments Platform
          </button>

          <button
            type="button"
            className="filter-button"
          >
            Notification Service
          </button>

          <button
            type="button"
            className="filter-button"
          >
            Mobile API Gateway
          </button>
        </div>

        {/* TABLE HEADER */}
        <div className="reviews-table-header">
          <span>TASK</span>
          <span>PROJECT</span>
          <span>DEVELOPER</span>
          <span>ATTEMPT</span>
          <span>SUBMITTED</span>
          <span>PRIORITY</span>
          <span></span>
        </div>

        {/* ROWS */}
        {reviews.map((review) => (
          <div
            key={review.title}
            className="reviews-table-row"
          >
            {/* TASK */}
            <div className="review-task">
              <p className="review-task-title">
                {review.title}
              </p>
            </div>

            {/* PROJECT */}
            <span className="review-project">
              {review.project}
            </span>

            {/* DEVELOPER */}
            <div className="review-developer">
              <div className="developer-avatar">
                {review.developer
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <span className="developer-name">
                {review.developer}
              </span>
            </div>

            {/* ATTEMPT */}
            <span className="review-attempt">
              {review.attempt}
            </span>

            {/* SUBMITTED */}
            <span className="review-submitted">
              {review.submitted}
            </span>

            {/* PRIORITY */}
            <span>
              <span
                className={`priority-badge ${
                  review.priority === "HIGH"
                    ? "priority-high"
                    : review.priority === "MEDIUM"
                      ? "priority-medium"
                      : "priority-low"
                }`}
              >
                {review.priority}
              </span>
            </span>

            {/* REVIEW BUTTON */}
            <button
              type="button"
              className="review-button"
            >
              Review
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}