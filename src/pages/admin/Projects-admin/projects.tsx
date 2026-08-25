"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin-components/layout/sidebar';
import './projects.css'; // <-- Import the new stylesheet

// Mock data based on the provided UI design
const members = [
  { initials: 'KV', name: 'Karan Verma', focus: 'Backend', joined: 'Jan 14, 2026' },
  { initials: 'SD', name: 'Sahil Das', focus: 'Backend', joined: 'Feb 3, 2026' },
  { initials: 'NP', name: 'Neha Patil', focus: 'Backend', joined: 'Mar 22, 2026' },
  { initials: 'RS', name: 'Rhea Sen', focus: 'Full-stack', joined: 'Apr 8, 2026' },
  { initials: 'AT', name: 'Aman Thakur', focus: 'Full-stack', joined: 'Jun 30, 2026' },
];

const recentTasks = [
  { title: 'Implement idempotent payment webhook handler', status: 'IN_PROGRESS', assignee: 'Sahil Das', statusColor: 'bg-blue-50 text-blue-600' },
  { title: 'Fix N+1 query on dashboard', status: 'IN_REVIEW', assignee: 'Neha Patil', statusColor: 'bg-purple-50 text-purple-600' },
  { title: 'Refactor review scoring service', status: 'CHANGES_REQUESTED', assignee: 'Aman Thakur', statusColor: 'bg-red-50 text-red-600' },
  { title: 'Seed roles and unassignment reasons', status: 'COMPLETED', assignee: 'Sahil Das', statusColor: 'bg-green-50 text-green-600' },
];

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="projects-container">
      
      {/* Sidebar Integration */}
      <Sidebar
        activePage="projects"
        onPageChange={() => {}}
      />

      {/* Main Content Area */}
      <div className="main-content"> 
        
        {/* Top Header Section */}
        <div className="header-section">
          <div>
            <p className="page-subtitle">Projects</p>
            <div className="header-title-wrapper">
              <h1 className="page-title">Payments Platform</h1>
              <span className="status-badge-active">
                Active
              </span>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="btn-secondary">
              Edit Project
            </button>
            <button className="btn-primary">
              + Add Member
            </button>
            
            <div className="admin-badge-wrapper">
              <span className="admin-role-text">Admin</span>
              <div className="admin-avatar">
                AG
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="scrollable-body">
          
          {/* Project Meta Info */}
          <div className="meta-card">
            <p className="meta-description">
              Core payments processing platform — handles gateway integration, webhook ingestion, settlement reconciliation and refund workflows for all consumer-facing checkout surfaces.
            </p>
            <div className="meta-details">
              <p>Started <span className="meta-highlight">Aug 1, 2026</span></p>
              <p>Target End <span className="meta-highlight">Dec 12, 2026</span></p>
              <p>Created by <span className="meta-highlight">Arijit Ganguly</span></p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Open Tasks</h3>
              <p className="stat-value">9</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">In Review</h3>
              <p className="stat-value">2</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Completed</h3>
              <p className="stat-value">12</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Members</h3>
              <p className="stat-value">5</p>
            </div>
          </div>

          {/* Bottom Split Layout */}
          <div className="bottom-split-layout">
            
            {/* Members Table */}
            <div className="table-card">
              <div className="card-header">
                <h2 className="card-title">Members</h2>
                <p className="card-subtitle">5 active · removal preserves membership history</p>
              </div>
              <table className="members-table">
                <thead>
                  <tr className="table-head-row">
                    <th className="table-head-cell">Developer</th>
                    <th className="table-head-cell">Focus</th>
                    <th className="table-head-cell">Joined</th>
                    <th className="table-head-cell"></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {members.map((member, idx) => (
                    <tr key={idx} className="table-row">
                      <td className="table-cell">
                        <div className="member-info-wrapper">
                          <div className="member-avatar">
                            {member.initials}
                          </div>
                          <p className="member-name">{member.name}</p>
                        </div>
                      </td>
                      <td className="member-focus">{member.focus}</td>
                      <td className="member-joined">{member.joined}</td>
                      <td className="table-cell-right">
                        <button className="btn-danger">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Tasks List */}
            <div className="tasks-card">
              <div className="card-header-flex">
                <div>
                  <h2 className="card-title">Recent Tasks</h2>
                  <p className="card-subtitle">Latest activity</p>
                </div>
                <button className="btn-outline">
                  Open Board
                </button>
              </div>
              <div className="tasks-list-wrapper">
                {recentTasks.map((task, idx) => (
                  <div key={idx} className="task-item">
                    <p className="task-title">{task.title}</p>
                    <div className="task-meta">
                      <span className={`task-status-base ${task.statusColor}`}>
                        {task.status}
                      </span>
                      <span className="task-assignee">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}