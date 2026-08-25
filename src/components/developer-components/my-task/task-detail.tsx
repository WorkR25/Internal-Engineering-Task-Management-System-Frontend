"use client";

import "./task-detail.css";

type TaskDetailProps = {
  task: {
    title: string;
    project: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    deadline?: string;
    submitted?: string;
  };
  onBack: () => void;
};

export default function TaskDetail({
  task,
  onBack,
}: TaskDetailProps) {
  return (
    <section className="developer-task-detail-page">

      <div className="developer-task-detail-header">

        <button
          type="button"
          onClick={onBack}
          className="developer-task-detail-back"
        >
          ← Back to My Tasks
        </button>

        <div className="developer-task-detail-user">
          <span className="developer-role-badge">
            DEVELOPER
          </span>

          <div className="developer-user-avatar">
            KV
          </div>
        </div>

      </div>

      <div className="developer-task-detail-breadcrumb">
        My Tasks / {task.project}
      </div>

      <div className="developer-task-detail-title-row">

        <div>
          <h1 className="developer-task-detail-title">
            {task.title}
          </h1>

          <div className="developer-task-detail-meta">

            <span className="developer-detail-status">
              {task.submitted
                ? "CHANGES REQUESTED"
                : "TODO"}
            </span>

            <span
              className={`developer-priority priority-${task.priority.toLowerCase()}`}
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

      <div className="developer-task-detail-layout">

        {/* LEFT SIDE */}

        <div className="developer-task-detail-main">

          {/* DESCRIPTION */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">
              Description
            </div>

            <div className="developer-detail-card-body">

              <p>
                The review scoring service recalculates all six
                dimension aggregates on every read, causing slow
                dashboard loads for projects with high submission
                volume.
              </p>

              <p>
                Refactor to precompute and cache aggregates,
                invalidating the cache on new review writes.
              </p>

            </div>

          </section>

          {/* ACCEPTANCE CRITERIA */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">
              Acceptance Criteria
            </div>

            <div className="developer-detail-card-body">

              <div className="developer-criteria-item">
                <span className="developer-criteria-icon success">
                  ✓
                </span>

                <span>
                  Aggregates precomputed and cached at review time
                </span>
              </div>

              <div className="developer-criteria-item">
                <span className="developer-criteria-icon success">
                  ✓
                </span>

                <span>
                  Cache invalidated on new review write
                </span>
              </div>

              <div className="developer-criteria-item">
                <span className="developer-criteria-icon success">
                  ✓
                </span>

                <span>
                  No change to public review API response shape
                </span>
              </div>

              <div className="developer-criteria-item">
                <span className="developer-criteria-icon error">
                  !
                </span>

                <span>
                  Unit tests cover cache invalidation under
                  concurrent writes
                </span>
              </div>

            </div>

          </section>

          {/* SUBMISSION */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">

              <div>
                <strong>
                  Your Submission — Attempt 1
                </strong>

                <p className="developer-detail-small">
                  Submitted 4 days ago
                </p>
              </div>

            </div>

            <div className="developer-detail-card-body">

              <div className="developer-submission-box">

                <div className="developer-submission-icon">
                  PR
                </div>

                <div>
                  <p className="developer-submission-title">
                    refactor/review-score-cache · #467
                  </p>

                  <p className="developer-detail-small">
                    github.com/company/payments-platform/pull/467
                  </p>
                </div>

              </div>

              <p className="developer-submission-description">
                Added a caching layer using an in-memory LRU cache
                keyed by submission id, invalidated on new review
                writes.
              </p>

            </div>

          </section>

          {/* COMMENTS */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">
              Comments
            </div>

            <div className="developer-detail-card-body">

              <div className="developer-comment">

                <div className="developer-comment-avatar">
                  AG
                </div>

                <div>

                  <div className="developer-comment-meta">
                    <strong>
                      Arijit Ganguly
                    </strong>

                    <span>
                      3 days ago
                    </span>
                  </div>

                  <p>
                    Left detailed feedback on the review. The main
                    gap is that in-memory caching won't work once we
                    scale past one instance.
                  </p>

                </div>

              </div>

            </div>

          </section>

        </div>

        {/* RIGHT SIDE */}

        <aside className="developer-task-detail-side">

          {/* REVIEW FEEDBACK */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">

              <div>
                <strong>
                  Review Feedback — Attempt 1
                </strong>

                <p className="developer-detail-small">
                  Reviewed by Arijit Ganguly · 3 days ago
                </p>
              </div>

              <span className="developer-review-status">
                CHANGES REQUESTED
              </span>

            </div>

            <div className="developer-detail-card-body">

              <div className="developer-score-row">
                <span>Requirement Analysis</span>
                <strong>7/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "70%" }} />
              </div>

              <div className="developer-score-row">
                <span>Code Quality</span>
                <strong>6/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "60%" }} />
              </div>

              <div className="developer-score-row">
                <span>Code Correctness</span>
                <strong>5/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "50%" }} />
              </div>

              <div className="developer-score-row">
                <span>Testing</span>
                <strong>4/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "40%" }} />
              </div>

              <div className="developer-score-row">
                <span>Delivery Timing</span>
                <strong>8/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "80%" }} />
              </div>

              <div className="developer-score-row">
                <span>PR / Commit Quality</span>
                <strong>7/10</strong>
              </div>

              <div className="developer-score-bar">
                <div style={{ width: "70%" }} />
              </div>

              <div className="developer-feedback-text">
                Good direction, but the in-memory cache won't survive
                across service instances once we scale horizontally.
                Please switch to a Redis-backed cache and add a test
                for concurrent invalidation.
              </div>

            </div>

          </section>

          {/* CONTINUE TASK */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">
              Continue This Task
            </div>

            <div className="developer-detail-card-body">

              <p>
                Changes were requested on your last submission.
                Start work to move this task back to In Progress —
                you&apos;ll be able to resubmit once you&apos;re ready.
              </p>

              <button
                type="button"
                className="developer-start-work-button"
              >
                Start Work
              </button>

            </div>

          </section>

          {/* ACTIVITY */}

          <section className="developer-detail-card">

            <div className="developer-detail-card-header">
              Activity History
            </div>

            <div className="developer-detail-card-body">

              <div className="developer-activity-item">
                <span className="developer-activity-dot" />
                <div>
                  <strong>Assigned to you</strong>
                  <span>Nov 26, 9:00 AM</span>
                </div>
              </div>

              <div className="developer-activity-item">
                <span className="developer-activity-dot" />
                <div>
                  <strong>Work started</strong>
                  <span>Nov 26, 10:20 AM</span>
                </div>
              </div>

              <div className="developer-activity-item">
                <span className="developer-activity-dot" />
                <div>
                  <strong>Submitted · Attempt 1</strong>
                  <span>Nov 28, 3:10 PM</span>
                </div>
              </div>

              <div className="developer-activity-item">
                <span className="developer-activity-dot error" />
                <div>
                  <strong>Changes requested</strong>
                  <span>3 days ago</span>
                </div>
              </div>

            </div>

          </section>

        </aside>

      </div>

    </section>
  );

}