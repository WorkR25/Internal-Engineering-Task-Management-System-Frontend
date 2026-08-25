"use client";

import React from "react";
import Sidebar from "@/components/developer-components/sidebar/sidebar";
import "./performance.css";

export default function Performance() {
  return (
    <div className="performance-container">
      <Sidebar activePage="performance" />

      <main className="main-content">

        {/* Header */}
        <header className="performance-header">
          <div>
            <h1 className="page-title">My Performance</h1>
            <p className="page-subtitle">
              Derived from your APPROVED submissions · last 90 days
            </p>
          </div>

          <div className="header-profile">
            <span className="developer-badge">DEVELOPER</span>
            <div className="profile-avatar">KV</div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="kpi-grid">

          <div className="kpi-card">
            <p className="kpi-label">AVG REVIEW SCORE</p>
            <h2 className="kpi-value">88%</h2>
            <p className="kpi-change positive">+3% vs last month</p>
          </div>

          <div className="kpi-card">
            <p className="kpi-label">ON-TIME DELIVERY</p>
            <h2 className="kpi-value">90%</h2>
            <p className="kpi-change positive">+1% vs last month</p>
          </div>

          <div className="kpi-card">
            <p className="kpi-label">COMPLETION RATE</p>
            <h2 className="kpi-value">96%</h2>
            <p className="kpi-change neutral">Steady</p>
          </div>

          <div className="kpi-card">
            <p className="kpi-label">CHANGE REQUEST RATE</p>
            <h2 className="kpi-value">15%</h2>
            <p className="kpi-change negative">+3% vs last month</p>
          </div>

        </section>

        {/* Charts Row */}
        <section className="charts-grid">

          {/* Trend Chart */}
          <div className="panel trend-panel">
            <div className="panel-header">
              <h2>Your Review Score — Trend</h2>
              <p>Last 6 sprints</p>
            </div>

            <div className="chart-area">

              <div className="chart-y-labels">
                <span>90</span>
                <span>85</span>
                <span>80</span>
                <span>75</span>
              </div>

              <div className="chart">
                <div className="chart-grid-line line-1" />
                <div className="chart-grid-line line-2" />
                <div className="chart-grid-line line-3" />
                <div className="chart-grid-line line-4" />

                <svg
                  className="trend-svg"
                  viewBox="0 0 600 180"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="20,80 130,88 245,58 360,70 480,48 580,55 580,160 20,160"
                    className="chart-fill"
                  />

                  <polyline
                    points="20,80 130,88 245,58 360,70 480,48 580,55"
                    className="chart-line"
                  />

                  <circle cx="20" cy="80" r="4" className="chart-dot" />
                  <circle cx="130" cy="88" r="4" className="chart-dot" />
                  <circle cx="245" cy="58" r="4" className="chart-dot" />
                  <circle cx="360" cy="70" r="4" className="chart-dot" />
                  <circle cx="480" cy="48" r="4" className="chart-dot" />
                  <circle cx="580" cy="55" r="4" className="chart-dot" />
                </svg>

                <div className="chart-x-labels">
                  <span>Sprint 14</span>
                  <span>Sprint 16</span>
                  <span>Sprint 18</span>
                  <span>Sprint 19</span>
                </div>
              </div>
            </div>
          </div>

          {/* Average by Dimension */}
          <div className="panel dimension-panel">
            <div className="panel-header">
              <h2>Average by Dimension</h2>
              <p>Across all reviewed submissions</p>
            </div>

            <div className="dimension-list">

              <div className="dimension-row">
                <span>Requirement Analysis</span>
                <div className="dimension-bar">
                  <div style={{ width: "82%" }} />
                </div>
                <strong>8.2</strong>
              </div>

              <div className="dimension-row">
                <span>Code Quality</span>
                <div className="dimension-bar">
                  <div style={{ width: "80%" }} />
                </div>
                <strong>8.0</strong>
              </div>

              <div className="dimension-row">
                <span>Code Correctness</span>
                <div className="dimension-bar">
                  <div style={{ width: "76%" }} />
                </div>
                <strong>7.6</strong>
              </div>

              <div className="dimension-row">
                <span>Testing</span>
                <div className="dimension-bar">
                  <div style={{ width: "71%" }} />
                </div>
                <strong>7.1</strong>
              </div>

              <div className="dimension-row">
                <span>Delivery Timing</span>
                <div className="dimension-bar">
                  <div style={{ width: "88%" }} />
                </div>
                <strong>8.8</strong>
              </div>

              <div className="dimension-row">
                <span>PR / Commit Quality</span>
                <div className="dimension-bar">
                  <div style={{ width: "83%" }} />
                </div>
                <strong>8.3</strong>
              </div>

            </div>
          </div>

        </section>

        {/* Recent Reviews */}
        <section className="panel reviews-panel">

          <div className="panel-header">
            <h2>Recent Reviews</h2>
            <p>Your last 4 reviewed submissions</p>
          </div>

          <div className="table-wrapper">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>TASK</th>
                  <th>ATTEMPT</th>
                  <th>REVIEWED</th>
                  <th>SCORE</th>
                  <th>DECISION</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td className="task-name">
                    Add pagination to GET /tasks
                  </td>
                  <td>1 of 1</td>
                  <td>Awaiting review</td>
                  <td>—</td>
                  <td>
                    <span className="status-badge pending">
                      PENDING
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="task-name">
                    Set up Sequelize migrations
                  </td>
                  <td>1 of 1</td>
                  <td>Nov 18, 2026</td>
                  <td className="score">93%</td>
                  <td>
                    <span className="status-badge approved">
                      APPROVED
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="task-name">
                    Seed roles and unassignment reasons
                  </td>
                  <td>1 of 1</td>
                  <td>Nov 12, 2026</td>
                  <td className="score">90%</td>
                  <td>
                    <span className="status-badge approved">
                      APPROVED
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="task-name">
                    Add request logging middleware
                  </td>
                  <td>2 of 2</td>
                  <td>Oct 30, 2026</td>
                  <td className="score">85%</td>
                  <td>
                    <span className="status-badge approved">
                      APPROVED
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
}