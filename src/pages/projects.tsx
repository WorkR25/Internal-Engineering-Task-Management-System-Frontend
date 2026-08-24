"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/layout/sidebar';

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
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Sidebar Integration */}
      <Sidebar
              activePage="projects"
              onPageChange={() => {}}
            />

      {/* Main Content Area - Offset by sidebar width (ml-56) */}
      <div className="flex-1 ml-56 flex flex-col"> 
        
        {/* Top Header Section */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">Projects</p>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payments Platform</h1>
              <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Edit Project
            </button>
            <button className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
              + Add Member
            </button>
            
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4 ml-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Admin</span>
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-[#4f46e5] flex items-center justify-center text-sm font-bold border border-indigo-100">
                AG
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-8 space-y-6 bg-white flex-1">
          
          {/* Project Meta Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              Core payments processing platform — handles gateway integration, webhook ingestion, settlement reconciliation and refund workflows for all consumer-facing checkout surfaces.
            </p>
            <div className="flex space-x-8 text-sm text-gray-500">
              <p>Started <span className="font-semibold text-gray-900">Aug 1, 2026</span></p>
              <p>Target End <span className="font-semibold text-gray-900">Dec 12, 2026</span></p>
              <p>Created by <span className="font-semibold text-gray-900">Arijit Ganguly</span></p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Open Tasks</h3>
              <p className="text-4xl font-bold text-gray-900">9</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">In Review</h3>
              <p className="text-4xl font-bold text-gray-900">2</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h3>
              <p className="text-4xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Members</h3>
              <p className="text-4xl font-bold text-gray-900">5</p>
            </div>
          </div>

          {/* Bottom Split Layout */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* Members Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Members</h2>
                <p className="text-sm text-gray-500">5 active · removal preserves membership history</p>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Developer</th>
                    <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Focus</th>
                    <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {members.map((member, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#4f46e5] flex items-center justify-center text-xs font-bold">
                            {member.initials}
                          </div>
                          <p className="text-sm font-bold text-gray-900">{member.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{member.focus}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{member.joined}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="px-4 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Tasks List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
                  <p className="text-sm text-gray-500">Latest activity</p>
                </div>
                <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Open Board
                </button>
              </div>
              <div className="flex-1 p-6 space-y-5">
                {recentTasks.map((task, idx) => (
                  <div key={idx} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <p className="text-sm font-bold text-gray-900 mb-2">{task.title}</p>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${task.statusColor}`}>
                        {task.status}
                      </span>
                      <span className="text-gray-500">{task.assignee}</span>
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