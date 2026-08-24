"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/layout/sidebar';

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

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      
      {/* Sidebar Integration */}
      <Sidebar 
        activePage="team" 
        onPageChange={(page) => {
          router.push(`/${page}`);
        }} 
      />

      {/* Main Content Area - Offset by sidebar width (ml-56) */}
      <div className="flex-1 bg-white p-8 ml-56"> 
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Team</h1>
            <p className="text-sm text-gray-500">6 Developer accounts · managed by Admin</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
              + Add Developer
            </button>
            
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Admin</span>
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-[#4f46e5] flex items-center justify-center text-sm font-bold border border-indigo-100">
                AG
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-3 mb-6">
          <button className="px-5 py-1.5 rounded-full border border-[#4f46e5] bg-indigo-50/50 text-[#4f46e5] text-sm font-semibold">
            All
          </button>
          <button className="px-5 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Active
          </button>
          <button className="px-5 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Inactive
          </button>
        </div>

        {/* Developer Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Developer</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Active Tasks</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Review Score</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {developers.map((dev, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        dev.status === 'ACTIVE' ? 'bg-indigo-50 text-[#4f46e5]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {dev.initials}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${dev.status === 'ACTIVE' ? 'text-gray-900' : 'text-gray-500'}`}>
                          {dev.name}
                        </p>
                        <p className="text-xs text-gray-400">{dev.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      dev.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {dev.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{dev.tasks}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{dev.score}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{dev.joined}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-5 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      {dev.status === 'ACTIVE' ? 'Edit' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}