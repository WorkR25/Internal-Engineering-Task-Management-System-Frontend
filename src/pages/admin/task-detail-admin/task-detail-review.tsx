"use client";

import { useState } from "react";
import Sidebar from "@/components/admin-components/layout/sidebar";
import "./task-detail-review.css"; // <-- Import the new stylesheet

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
    message: "First attempt looked good overall — please also add a test for the case where the retry arrives after the TTL has expired.",
  },
  {
    initials: "SD",
    name: "Sahil Das",
    time: "2 hours ago",
    message: "Done — added the expired-TTL replay case in the latest submission, should be covered now.",
  },
];

const activity = [
  { title: "Assigned to Sahil Das", time: "Nov 20, 9:14 AM", type: "normal" },
  { title: "Work started", time: "Nov 20, 11:02 AM", type: "normal" },
  { title: "Submitted · Attempt 1", time: "Nov 22, 4:40 PM", type: "normal" },
  { title: "Changes requested", time: "Nov 23, 10:15 AM", type: "danger" },
  { title: "Work resumed", time: "Nov 23, 1:30 PM", type: "normal" },
  { title: "Submitted · Attempt 2", time: "Today, 2 hours ago", type: "normal" },
];

export default function TaskDetailReview() {
  const [reviewStatus, setReviewStatus] = useState("");

  return (
    <div className="task-detail-container">
      <Sidebar 
        activePage="task-detail-review"
        onPageChange={() => {}}
      />

      <main className="main-content">
        
        {/* Header */}
        <header className="page-header">
          <div>
            <p className="header-project">{task.project}</p>
            <h1 className="header-title">{task.title}</h1>
          </div>
          <div className="admin-badge-wrapper">
            <span className="admin-badge">ADMIN</span>
            <div className="admin-avatar">AG</div>
          </div>
        </header>

        {/* Layout */}
        <div className="content-wrapper">
          <div className="two-col-grid">
            
            {/* LEFT COLUMN */}
            <div className="left-col-stack">
              
              <div className="meta-bar">
                <span className="badge-status">{task.status}</span>
                <span className="badge-priority">{task.priority}</span>
                
                <div className="dev-info">
                  <div className="dev-avatar-small">{task.developerInitials}</div>
                  <span className="dev-name">{task.developer}</span>
                </div>
                
                <span className="meta-text">Deadline {task.deadline}</span>
                <span className="meta-text">{task.attempt}</span>
              </div>

              {/* Description */}
              <section className="card-panel">
                <div className="card-header">
                  <h2 className="card-title">Description</h2>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    The payment gateway retries webhook deliveries on timeout,
                    which currently causes duplicate charge-processing events
                    downstream. Add an idempotency layer to the webhook handler
                    so retried deliveries with the same event ID are safely
                    ignored after the first successful processing.
                  </p>
                </div>
              </section>

              {/* Acceptance Criteria */}
              <section className="card-panel">
                <div className="card-header">
                  <h2 className="card-title">Acceptance Criteria</h2>
                </div>
                <div className="card-body space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={requirement} className="requirement-item">
                      <div className={index < 3 ? "check-icon-active" : "check-icon-inactive"}>
                        ✓
                      </div>
                      <p className="card-text !mt-0">{requirement}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submission Details */}
              <section className="card-panel">
                <div className="card-header-flex">
                  <div>
                    <h2 className="card-title">Submission — Attempt 2</h2>
                    <p className="card-subtitle">
                      Submitted by {submission.submittedBy} · {submission.submittedTime}
                    </p>
                  </div>
                  <span className="admin-badge">{submission.status}</span>
                </div>
                <div className="card-body">
                  <div className="pr-block">
                    <div className="pr-block-inner">
                      <div className="pr-badge">PR</div>
                      <div>
                        <p className="pr-branch">{submission.branch} · {submission.pullRequest}</p>
                        <p className="pr-url">{submission.url}</p>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">&quot;{submission.description}&quot;</p>
                </div>
              </section>

              {/* Comments */}
              <section className="card-panel">
                <div className="card-header-flex">
                  <h2 className="card-title">Comments</h2>
                  <span className="meta-text">{comments.length}</span>
                </div>
                <div className="card-body">
                  {comments.map((comment) => (
                    <div key={`${comment.name}-${comment.time}`} className="comment-item">
                      <div className="comment-avatar">{comment.initials}</div>
                      <div className="comment-box">
                        <p className="comment-header">
                          <span className="comment-author">{comment.name}</span>
                          <span className="comment-time">{comment.time}</span>
                        </p>
                        <p className="card-text !mt-2">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-col-stack">
              
              {/* Review Submission Box (Figma accurately implemented) */}
              <section className="card-panel">
                <div className="card-header">
                  <h2 className="card-title">Review Submission</h2>
                  <p className="card-subtitle">Attempt 2 · {task.developer}</p>
                </div>

                <div className="card-body">
                  
                  {/* Inline Score Layout */}
                  <div className="scores-wrapper">
                    {scores.map((item) => (
                      <div key={item.label} className="score-row">
                        <span className="score-label">{item.label}</span>
                        <div className="score-track">
                          <div
                            className={`score-fill ${item.score <= 6 ? 'bg-orange-500' : 'bg-[#5146e5]'}`}
                            style={{ width: `${item.score * 10}%` }}
                          />
                        </div>
                        <span className="score-value">{item.score}/10</span>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Box */}
                  <div className="mt-6">
                    <span className="feedback-label">Feedback</span>
                    <div className="feedback-box">
                      <p className="card-text !mt-0">
                        Looks solid — idempotency store implementation is clean. 
                        Left two minor comments on the TTL edge case.
                      </p>
                    </div>
                  </div>

                  {/* Redesigned Actions matching Figma */}
                  <div className="action-buttons-wrapper">
                    <button
                      type="button"
                      onClick={() => setReviewStatus("approved")}
                      className="btn-approve"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setReviewStatus("changes")}
                      className="btn-reject"
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

              {/* Activity History */}
              <section className="card-panel">
                <div className="card-header">
                  <h2 className="card-title">Activity History</h2>
                </div>
                <div className="card-body pl-6">
                  <div>
                    {activity.map((item, index) => (
                      <div key={`${item.title}-${item.time}`} className="timeline-item">
                        {index < activity.length - 1 && (
                          <div className="timeline-line" />
                        )}
                        <div className={item.type === "danger" ? "timeline-dot-danger" : "timeline-dot-normal"} />
                        <div>
                          <p className="timeline-title">{item.title}</p>
                          <p className="timeline-time">{item.time}</p>
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