"use client";

import "./dashboard.css";
import Sidebar from "@/components/developer-components/sidebar/sidebar";

const tasks = [
  {
    task: "Add rate limiting to /auth/signin",
    project: "Payments Platform",
    status: "TODO",
    deadline: "Dec 2, 2026",
  },
  {
    task: "Add pagination to GET /tasks",
    project: "Payments Platform",
    status: "IN_REVIEW",
    deadline: "Dec 1, 2026",
  },
  {
    task: "Refactor review scoring service",
    project: "Payments Platform",
    status: "CHANGES_REQUESTED",
    deadline: "Dec 5, 2026",
  },
  {
    task: "Set up Sequelize migrations",
    project: "Payments Platform",
    status: "COMPLETED",
    deadline: "Nov 18, 2026",
  },
];

export default function Dashboard() {
  return (
    <div className="developer-dashboard">
      <Sidebar
        activePage="dashboard"
        onPageChange={() => {}}
      />

      <main className="developer-dashboard-main">
        <header className="developer-dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back, Karan — here&apos;s what&apos;s on your plate
            </p>
          </div>

          <div className="developer-dashboard-user">
            <span className="developer-dashboard-role">
              DEVELOPER
            </span>

            <span className="developer-dashboard-avatar">
              KV
            </span>
          </div>
        </header>

        <div className="developer-dashboard-content">

          <section className="developer-dashboard-stats">
            <div className="developer-dashboard-stat-card">
              <p>Open Tasks</p>

              <h2>4</h2>

              <span>
                Across 2 projects
              </span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>In Review</p>

              <h2>1</h2>

              <span>
                Awaiting Admin decision
              </span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>Needs Changes</p>

              <h2>1</h2>

              <span className="developer-dashboard-stat-danger">
                Action needed
              </span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>Avg Review Score</p>

              <h2>88%</h2>

              <span className="developer-dashboard-stat-success">
                +2% vs last month
              </span>
            </div>
          </section>

          <section className="developer-dashboard-action">
            <div className="developer-dashboard-action-header">
              <div>
                <h2>Needs Your Action</h2>

                <p>
                  Changes were requested — restart work to resubmit
                </p>
              </div>

              <span className="developer-dashboard-action-count">
                1
              </span>
            </div>

            <div className="developer-dashboard-action-body">
              <div>
                <h3>
                  Refactor review scoring service
                </h3>

                <p>
                  Payments Platform · feedback left 3 days ago · deadline Dec 5, 2026
                </p>
              </div>

              <div className="developer-dashboard-action-buttons">
                <button type="button">
                  View Feedback
                </button>

                <button type="button">
                  Start Work
                </button>
              </div>
            </div>
          </section>

          <section className="developer-dashboard-card">
            <div className="developer-dashboard-card-header">
              <div>
                <h2>My Tasks</h2>

                <p>
                  Sorted by deadline
                </p>
              </div>

              <button type="button">
                View all
              </button>
            </div>

            <div className="developer-dashboard-table">
              <div className="developer-dashboard-table-header">
                <span>Task</span>
                <span>Project</span>
                <span>Status</span>
                <span>Deadline</span>
              </div>

              {tasks.map((task) => (
                <div
                  key={task.task}
                  className="developer-dashboard-table-row"
                >
                  <span className="developer-dashboard-task-name">
                    {task.task}
                  </span>

                  <span>
                    {task.project}
                  </span>

                  <span>
                    <span
                      className={`developer-dashboard-status developer-dashboard-status-${task.status.toLowerCase()}`}
                    >
                      {task.status}
                    </span>
                  </span>

                  <span>
                    {task.deadline}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}