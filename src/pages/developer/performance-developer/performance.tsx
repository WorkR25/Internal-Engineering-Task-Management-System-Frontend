"use client";

import Sidebar from "@/components/developer-components/sidebar/sidebar";
import "./performance.css";

type PageName = "dashboard" | "my-tasks" | "performance";

export default function Performance() {
  const handlePageChange = (page: PageName) => {
    console.log("Page changed:", page);
  };

  return (
    <div className="performance-container">
      {/* Sidebar */}
      <Sidebar
        activePage="performance"
        onPageChange={handlePageChange}
      />

      {/* Main Content */}
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

        {/* Charts */}
        <section className="charts-grid">
          {/* Trend Chart */}
          <div className="panel trend-panel">
            <div className="panel-header">
              <h2>Your Review Score — Trend</h2>
              <p>Last 6 sprints</p>
            </div>

            <div className="chart-area">
              {/* Y Axis */}
              <div className="chart-y-labels">
                <span>100</span>
                <span>90</span>
                <span>80</span>
                <span>70</span>
              </div>

              {/* Chart */}
              <div className="chart">
                <div className="chart-grid-line line-1" />
                <div className="chart-grid-line line-2" />
                <div className="chart-grid-line line-3" />
                <div className="chart-grid-line line-4" />

                <svg
                  className="trend-svg"
                  viewBox="0 0 600 150"
                  preserveAspectRatio="none"
                >
                  {/* Area */}
                  <path
                    className="chart-fill"
                    d="
                      M 0 75
                      L 100 82
                      L 200 58
                      L 300 68
                      L 400 52
                      L 500 58
                      L 600 55
                      L 600 150
                      L 0 150
                      Z
                    "
                  />

                  {/* Line */}
                  <path
                    className="chart-line"
                    d="
                      M 0 75
                      L 100 82
                      L 200 58
                      L 300 68
                      L 400 52
                      L 500 58
                      L 600 55
                    "
                  />

                  {/* Dots */}
                  <circle
                    className="chart-dot"
                    cx="0"
                    cy="75"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="100"
                    cy="82"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="200"
                    cy="58"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="300"
                    cy="68"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="400"
                    cy="52"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="500"
                    cy="58"
                    r="4"
                  />

                  <circle
                    className="chart-dot"
                    cx="600"
                    cy="55"
                    r="4"
                  />
                </svg>

                {/* X Axis */}
                <div className="chart-x-labels">
                  <span>Sprint 14</span>
                  <span>Sprint 16</span>
                  <span>Sprint 18</span>
                  <span>Sprint 19</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dimension Panel */}
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

                  <td className="score">—</td>

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