"use client";

import "./dashboard.css";
import Sidebar from "@/components/developer-components/sidebar/sidebar";

const tasks = [
  {
    task: "Implement payment webhook handler",
    project: "Payments Platform",
    priority: "HIGH",
    deadline: "Dec 4, 2026",
  },
  {
    task: "Add pagination to GET /tasks",
    project: "Payments Platform",
    priority: "MEDIUM",
    deadline: "Dec 6, 2026",
  },
  {
    task: "Fix N+1 query on dashboard",
    project: "Internal Admin Console",
    priority: "HIGH",
    deadline: "Dec 3, 2026",
  },
  {
    task: "Refactor webhook retry logic",
    project: "Notification Service",
    priority: "MEDIUM",
    deadline: "Dec 7, 2026",
  },
];

const projects = [
  {
    initials: "PP",
    name: "Payments Platform",
    details: "9 open tasks · Dec 12, 2026",
    status: "ACTIVE",
  },
  {
    initials: "NS",
    name: "Notification Service",
    details: "6 open tasks · Nov 30, 2026",
    status: "ACTIVE",
  },
  {
    initials: "IA",
    name: "Internal Admin Console",
    details: "4 open tasks · Jan 15, 2027",
    status: "PLANNING",
  },
  {
    initials: "MA",
    name: "Mobile API Gateway",
    details: "11 open tasks · Dec 20, 2026",
    status: "ACTIVE",
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
            <p>Welcome back — here's your engineering overview</p>
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

          {/* STATS */}
          <section className="developer-dashboard-stats">

            <div className="developer-dashboard-stat-card">
              <p>ASSIGNED TASKS</p>
              <h2>8</h2>
              <span className="developer-dashboard-stat-success">
                3 completed this sprint
              </span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>IN PROGRESS</p>
              <h2>3</h2>
              <span>Across 2 projects</span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>IN REVIEW</p>
              <h2>2</h2>
              <span className="developer-dashboard-stat-danger">
                Awaiting review
              </span>
            </div>

            <div className="developer-dashboard-stat-card">
              <p>ON-TIME DELIVERY</p>
              <h2>94%</h2>
              <span className="developer-dashboard-stat-success">
                +3% vs last sprint
              </span>
            </div>

          </section>

          {/* MAIN CONTENT */}
          <section className="developer-dashboard-grid">

            {/* MY TASKS */}
            <div className="developer-dashboard-card">
              <div className="developer-dashboard-card-header">
                <div>
                  <h2>My Tasks</h2>
                  <p>Your currently assigned tasks</p>
                </div>

                <button type="button">
                  View all
                </button>
              </div>

              <div className="developer-dashboard-table">

                <div className="developer-dashboard-table-header">
                  <span>TASK</span>
                  <span>PROJECT</span>
                  <span>PRIORITY</span>
                  <span>DEADLINE</span>
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
                        className={`developer-dashboard-priority developer-dashboard-priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </span>

                    <span>
                      {task.deadline}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* PROJECTS */}
            <div className="developer-dashboard-card">
              <div className="developer-dashboard-card-header">
                <div>
                  <h2>Projects</h2>
                  <p>Projects you are currently working on</p>
                </div>
              </div>

              <div className="developer-dashboard-project-list">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="developer-dashboard-project"
                  >
                    <div className="developer-dashboard-project-info">

                      <div className="developer-dashboard-project-avatar">
                        {project.initials}
                      </div>

                      <div>
                        <p>{project.name}</p>
                        <span>{project.details}</span>
                      </div>

                    </div>

                    <span
                      className={`developer-dashboard-project-status developer-dashboard-project-status-${project.status.toLowerCase()}`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}