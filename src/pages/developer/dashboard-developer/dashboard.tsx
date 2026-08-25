"use client";

import Sidebar from "@/components/developer-components/sidebar/sidebar";
import "./dashboard.css";

const tasks = [
  {
    title: "Add rate limiting to /auth/signin",
    project: "Payments Platform",
    status: "TODO",
    deadline: "Dec 2, 2026",
  },
  {
    title: "Add pagination to GET /tasks",
    project: "Payments Platform",
    status: "IN_REVIEW",
    deadline: "Dec 1, 2026",
  },
  {
    title: "Refactor review scoring service",
    project: "Payments Platform",
    status: "CHANGES_REQUESTED",
    deadline: "Dec 5, 2026",
  },
  {
    title: "Set up Sequelize migrations",
    project: "Payments Platform",
    status: "COMPLETED",
    deadline: "Nov 18, 2026",
  },
];

export default function Dashboard() {
  return (
    <main className="developer-dashboard">
      <Sidebar activePage="dashboard" />

      <section className="developer-dashboard-main">
        <header className="developer-dashboard-header">
          <div>
            <h1 className="developer-dashboard-header-title">
              Dashboard
            </h1>

            <p className="developer-dashboard-header-subtitle">
              Welcome back, Karan — here's what's on your plate
            </p>
          </div>

          <div className="developer-dashboard-header-user">
            <span className="developer-dashboard-role">
              DEVELOPER
            </span>

            <div className="developer-dashboard-avatar">
              KV
            </div>
          </div>
        </header>

        <div className="developer-dashboard-content">
          <div className="developer-dashboard-stat-grid">
            <div className="developer-dashboard-stat-card">
              <p className="developer-dashboard-stat-label">
                Open Tasks
              </p>

              <p className="developer-dashboard-stat-value">
                4
              </p>

              <p className="developer-dashboard-stat-description">
                Across 2 projects
              </p>
            </div>

            <div className="developer-dashboard-stat-card">
              <p className="developer-dashboard-stat-label">
                In Review
              </p>

              <p className="developer-dashboard-stat-value">
                1
              </p>

              <p className="developer-dashboard-stat-description">
                Awaiting Admin decision
              </p>
            </div>

            <div className="developer-dashboard-stat-card">
              <p className="developer-dashboard-stat-label">
                Needs Changes
              </p>

              <p className="developer-dashboard-stat-value">
                1
              </p>

              <p className="developer-dashboard-stat-description red">
                Action needed
              </p>
            </div>

            <div className="developer-dashboard-stat-card">
              <p className="developer-dashboard-stat-label">
                Avg Review Score
              </p>

              <p className="developer-dashboard-stat-value">
                88%
              </p>

              <p className="developer-dashboard-stat-description green">
                +2% vs last month
              </p>
            </div>
          </div>

          <section className="developer-dashboard-action">
            <div className="developer-dashboard-action-header">
              <div>
                <h2 className="developer-dashboard-action-title">
                  Needs Your Action
                </h2>

                <p className="developer-dashboard-action-subtitle">
                  Changes were requested — restart work to resubmit
                </p>
              </div>

              <span className="developer-dashboard-action-count">
                1
              </span>
            </div>

            <div className="developer-dashboard-action-content">
              <div>
                <p className="developer-dashboard-task-title">
                  Refactor review scoring service
                </p>

                <p className="developer-dashboard-task-meta">
                  Payments Platform · feedback left 3 days ago · deadline Dec 5, 2026
                </p>
              </div>

              <div className="developer-dashboard-action-buttons">
                <button
                  type="button"
                  className="developer-dashboard-button developer-dashboard-button-secondary"
                >
                  View Feedback
                </button>

                <button
                  type="button"
                  className="developer-dashboard-button developer-dashboard-button-primary"
                >
                  Start Work
                </button>
              </div>
            </div>
          </section>

          <section className="developer-dashboard-my-tasks">
            <div className="developer-dashboard-section-header">
              <div>
                <h2 className="developer-dashboard-section-title">
                  My Tasks
                </h2>

                <p className="developer-dashboard-section-subtitle">
                  Sorted by deadline
                </p>
              </div>

              <button
                type="button"
                className="developer-dashboard-view-all"
              >
                View all
              </button>
            </div>

            <div className="developer-dashboard-table-header">
              <span>Task</span>
              <span>Project</span>
              <span>Status</span>
              <span>Deadline</span>
            </div>

            {tasks.map((task) => (
              <div
                key={task.title}
                className="developer-dashboard-table-row"
              >
                <span className="developer-dashboard-table-task">
                  {task.title}
                </span>

                <span className="developer-dashboard-table-project">
                  {task.project}
                </span>

                <span>
                  <span
                    className={`developer-dashboard-status ${
                      task.status === "TODO"
                        ? "todo"
                        : task.status === "IN_REVIEW"
                          ? "review"
                          : task.status === "CHANGES_REQUESTED"
                            ? "changes"
                            : "completed"
                    }`}
                  >
                    {task.status}
                  </span>
                </span>

                <span className="developer-dashboard-table-deadline">
                  {task.deadline}
                </span>
              </div>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}