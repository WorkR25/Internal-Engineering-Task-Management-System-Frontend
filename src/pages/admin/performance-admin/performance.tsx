"use client";

import { useState } from "react";
import Sidebar from "@/components/admin-components/layout/sidebar";
import "./performance.css"; // <-- Import the new stylesheet

type Metric = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

const metrics: Metric[] = [
  { label: "ON-TIME DELIVERY", value: "92%", change: "+4% vs last sprint", positive: true },
  { label: "AVG REVIEW SCORE", value: "8.6", change: "+0.4 vs last sprint", positive: true },
  { label: "TASK COMPLETION", value: "87%", change: "+6% vs last sprint", positive: true },
  { label: "REWORK RATE", value: "13%", change: "-3% vs last sprint", positive: true },
];

const developers = [
  { initials: "RS", name: "Rhea Sen", completed: 18, score: "9.2", delivery: "96%" },
  { initials: "KV", name: "Karan Verma", completed: 16, score: "8.9", delivery: "94%" },
  { initials: "NP", name: "Neha Patil", completed: 15, score: "8.7", delivery: "91%" },
  { initials: "SD", name: "Sahil Das", completed: 14, score: "8.4", delivery: "88%" },
];

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Sprint");

  return (
    <div className="performance-container">
      <Sidebar
        activePage="performance"
        onPageChange={() => {}}
      />

      <main className="main-section">
        <div className="content-wrapper">

          {/* Header Section */}
          <div className="performance-header">
            <div>
              <h1 className="header-title">
                Performance
              </h1>
              <p className="header-subtitle">
                Engineering performance overview across all projects
              </p>
            </div>

            <div className="header-actions">
              <select
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
                className="period-select"
              >
                <option>This Sprint</option>
                <option>Last Sprint</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>

              <span className="admin-badge">ADMIN</span>
              <div className="admin-avatar">AG</div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p className="metric-label">{metric.label}</p>
                <p className="metric-value">{metric.value}</p>
                <p className={metric.positive ? "metric-change-positive" : "metric-change-negative"}>
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Split Layout */}
          <div className="bottom-split-layout">
            
            {/* Developer Performance Table */}
            <section className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Developer Performance</h2>
                  <p className="section-subtitle">Performance summary for the selected period</p>
                </div>
              </div>

              <div className="table-header-row">
                <span>DEVELOPER</span>
                <span>COMPLETED</span>
                <span>AVG SCORE</span>
                <span>ON-TIME</span>
              </div>

              {developers.map((developer) => (
                <div key={developer.name} className="table-row">
                  <div className="dev-info-wrapper">
                    <div className="dev-avatar">
                      {developer.initials}
                    </div>
                    <span className="dev-name">
                      {developer.name}
                    </span>
                  </div>

                  <span className="table-text-normal">{developer.completed}</span>
                  <span className="table-text-bold">{developer.score}</span>
                  <span className="table-text-success">{developer.delivery}</span>
                </div>
              ))}
            </section>

            {/* Performance Overview Bars */}
            <section className="overview-card">
              <div className="overview-header">
                <h2 className="section-title">Performance Overview</h2>
                <p className="section-subtitle">Current engineering team metrics</p>
              </div>

              <div className="overview-list">
                
                <div>
                  <div className="bar-header">
                    <span className="bar-label">Task Completion</span>
                    <span className="bar-value">87%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill w-[87%]" />
                  </div>
                </div>

                <div>
                  <div className="bar-header">
                    <span className="bar-label">On-Time Delivery</span>
                    <span className="bar-value">92%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="bar-header">
                    <span className="bar-label">Review Quality</span>
                    <span className="bar-value">86%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill w-[86%]" />
                  </div>
                </div>

                <div>
                  <div className="bar-header">
                    <span className="bar-label">Rework Control</span>
                    <span className="bar-value">87%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill w-[87%]" />
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* Review Insights Bottom Card */}
          <section className="insights-card">
            <div>
              <h2 className="section-title">Review Insights</h2>
              <p className="section-subtitle">Summary of recent review activity</p>
            </div>

            <div className="insights-grid">
              
              <div className="insight-item">
                <p className="insight-label">REVIEWS COMPLETED</p>
                <p className="insight-value">42</p>
                <p className="insight-change-positive">+8 this sprint</p>
              </div>

              <div className="insight-item">
                <p className="insight-label">AVERAGE REVIEW TIME</p>
                <p className="insight-value">3.2h</p>
                <p className="insight-change-positive">18% faster</p>
              </div>

              <div className="insight-item">
                <p className="insight-label">CHANGES REQUESTED</p>
                <p className="insight-value">13%</p>
                <p className="insight-change-positive">-3% this sprint</p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}