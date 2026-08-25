"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin-components/layout/sidebar';
import AddDeveloperModal from '@/components/admin-components/team-components/add_developer';
import './team.css'; // <-- Import the new stylesheet

// Mock data based on the provided UI design
const developers = [
  { initials: 'SD', name: 'Sahil Das', email: 'sahil.das@company.com', status: 'ACTIVE', tasks: 4, score: '91%', joined: 'Feb 3, 2026' },
  { initials: 'KV', name: 'Karan Verma', email: 'karan.verma@company.com', status: 'ACTIVE', tasks: 6, score: '88%', joined: 'Jan 14, 2026' },
  { initials: 'NP', name: 'Neha Patil', email: 'neha.patil@company.com', status: 'ACTIVE', tasks: 3, score: '85%', joined: 'Mar 22, 2026' },
  { initials: 'RS', name: 'Rhea Sen', email: 'rhea.sen@company.com', status: 'ACTIVE', tasks: 5, score: '82%', joined: 'Apr 8, 2026' },
  { initials: 'AT', name: 'Aman Thakur', email: 'aman.thakur@company.com', status: 'ACTIVE', tasks: 2, score: '76%', joined: 'Jun 30, 2026' },
  { initials: 'PN', name: 'Priya Nair', email: 'priya.nair@company.com', status: 'INACTIVE', tasks: 0, score: '79%', joined: 'Nov 11, 2025' },
];

export default function TeamPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="team-container">
      
      {/* Sidebar Integration */}
      <Sidebar 
        activePage="team"
        onPageChange={() => {}}
    />

      {/* Main Content Area */}
      <div className="main-content"> 
        
        {/* Header Section */}
        <div className="header-section">
          <div>
            <h1 className="page-title">Team</h1>
            <p className="page-subtitle">6 Developer accounts · managed by Admin</p>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              + Add Developer
            </button>
            
            <div className="admin-badge-wrapper">
              <span className="admin-role-text">Admin</span>
              <div className="admin-avatar">AG</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filters-wrapper">
          <button className="filter-btn-active">All</button>
          <button className="filter-btn-inactive">Active</button>
          <button className="filter-btn-inactive">Inactive</button>
        </div>

        {/* Developer Table */}
        <div className="table-container">
          <table className="team-table">
            <thead>
              <tr className="table-head-row">
                <th className="table-head-cell">Developer</th>
                <th className="table-head-cell">Status</th>
                <th className="table-head-cell">Active Tasks</th>
                <th className="table-head-cell">Avg Review Score</th>
                <th className="table-head-cell">Joined</th>
                <th className="table-cell-right"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {developers.map((dev, idx) => (
                <tr key={idx} className="table-row">
                  
                  <td className="table-cell">
                    <div className="dev-info-wrapper">
                      <div className={`dev-avatar ${dev.status === 'ACTIVE' ? 'avatar-active' : 'avatar-inactive'}`}>
                        {dev.initials}
                      </div>
                      <div>
                        <p className={`dev-name ${dev.status === 'ACTIVE' ? 'name-active' : 'name-inactive'}`}>
                          {dev.name}
                        </p>
                        <p className="dev-email">{dev.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <span className={`status-badge ${dev.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                      {dev.status}
                    </span>
                  </td>
                  
                  <td className="tasks-cell">{dev.tasks}</td>
                  <td className="score-cell">{dev.score}</td>
                  <td className="joined-cell">{dev.joined}</td>
                  
                  <td className="table-cell-right">
                    <button className="btn-secondary">
                      {dev.status === 'ACTIVE' ? 'Edit' : 'Reactivate'}
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Developer Modal Component */}
      <AddDeveloperModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </div>
  );
}