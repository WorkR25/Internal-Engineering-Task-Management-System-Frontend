"use client";

import { useState } from "react";
import Sidebar from "../../../components/admin-components/layout/sidebar";
import CreateRoleModal from "../../../components/admin-components/role-components/create-role";
import "./dashboard.css"; 

const projects = [
  { name: "Payments Platform", status: "ACTIVE", openTasks: 9, targetEnd: "Dec 12, 2026" },
  { name: "Notification Service", status: "ACTIVE", openTasks: 6, targetEnd: "Nov 30, 2026" },
  { name: "Internal Admin Console", status: "PLANNING", openTasks: 4, targetEnd: "Jan 15, 2027" },
  { name: "Mobile API Gateway", status: "ACTIVE", openTasks: 11, targetEnd: "Dec 20, 2026" },
  { name: "Analytics Pipeline", status: "COMPLETED", openTasks: 0, targetEnd: "Oct 5, 2026" },
];

const pendingReviews = [
  { initials: "RS", title: "Rework webhook retry backoff", developer: "Rhea Sen", submitted: "submitted 2h ago" },
  { initials: "KV", title: "Add pagination to /tasks list", developer: "Karan Verma", submitted: "submitted 5h ago" },
  { initials: "NP", title: "Fix N+1 query on dashboard", developer: "Neha Patil", submitted: "submitted yesterday" },
  { initials: "SD", title: "Idempotent payment webhook", developer: "Sahil Das", submitted: "submitted yesterday" },
];

export default function Dashboard() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const activeProjectsCount = projects.filter((p) => p.status === "ACTIVE").length;
  const openTasksCount = projects.reduce((sum, p) => sum + p.openTasks, 0);
  const pendingReviewsCount = pendingReviews.length;

  return (
    <main className="dashboard-container">
      <Sidebar 
        activePage="dashboard"
        onPageChange={() => {}}
      />

      <section className="main-section">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="header-title">Dashboard</h1>
            <p className="header-subtitle">Welcome back — overview across all projects</p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(true)}
              className="btn-add-role"
            >
              + Add Role
            </button>

            <span className="admin-badge">ADMIN</span>
            <div className="admin-avatar">AG</div>
          </div>
        </header>

        {/* Main Content */}
        <div className="content-wrapper">
          
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-title">ACTIVE PROJECTS</p>
              <p className="stat-value">{activeProjectsCount}</p>
              <p className="stat-trend-positive">+1 this quarter</p>
            </div>

            <div className="stat-card">
              <p className="stat-title">OPEN TASKS</p>
              <p className="stat-value">{openTasksCount}</p>
              <p className="stat-trend-neutral">{pendingReviewsCount} currently in review</p>
            </div>

            <div className="stat-card">
              <p className="stat-title">PENDING REVIEWS</p>
              <p className="stat-value">{pendingReviewsCount}</p>
              <p className="stat-trend-negative">Needs your attention</p>
            </div>

            <div className="stat-card">
              <p className="stat-title">ON-TIME DELIVERY</p>
              <p className="stat-value">92%</p>      {/* hard coded */}
              <p className="stat-trend-positive">+4% vs last sprint</p>       {/* hard coded */}
            </div>
          </div>

          {/* Bottom Grid: Projects & Reviews */}
          <div className="bottom-grid">
            
            {/* Projects Table */}
            <section className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Projects</h2>
                  <p className="section-subtitle">{projects.length} total · sorted by target end date</p>
                </div>
                <button type="button" className="btn-outline">
                  View all
                </button>
              </div>

              {/* <div className="table-header-row">
                <span>PROJECT</span>
                <span>STATUS</span>
                <span>OPEN TASKS</span>
                <span>TARGET END</span>
              </div> */}

              {projects.map((project) => (
                <div key={project.name} className="table-row">
                  <span className="project-name">{project.name}</span>
                  <span>
                    <span
                      className={`status-badge-base ${
                        project.status === "ACTIVE"
                          ? "status-active"
                          : project.status === "COMPLETED"
                          ? "status-completed"
                          : "status-planning"
                      }`}
                    >
                      {project.status}
                    </span>
                  </span>
                  <span className="table-text">{project.openTasks}</span>
                  <span className="table-text">{project.targetEnd}</span>
                </div>
              ))}
            </section>

            {/* Pending Reviews List */}
            <section className="section-card">
              <div className="section-header-simple">
                <h2 className="section-title">Pending Reviews</h2>
                <p className="section-subtitle">Submissions awaiting your decision</p>
              </div>

              {pendingReviews.map((review) => (
                <div key={review.title} className="review-item">
                  <div className="review-avatar">
                    {review.initials}
                  </div>

                  <div className="review-info">
                    <p className="review-title">{review.title}</p>
                    <p className="review-meta">
                      {review.developer} · {review.submitted}
                    </p>
                  </div>

                  <button type="button" className="btn-primary">
                    Review
                  </button>
                </div>
              ))}
            </section>

          </div>
        </div>
      </section>

      {/* Role Creation Modal */}
      <CreateRoleModal 
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)} 
      />
    </main>
  );
}