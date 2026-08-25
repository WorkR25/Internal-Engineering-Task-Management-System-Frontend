"use client";

import { useState } from "react";
import Sidebar from "@/components/admin-components/layout/sidebar";
import "./performance.css";

type Metric = {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative" | "neutral";
};

type Developer = {
  initials: string;
  name: string;
  avgScore: number;
  onTime: number;
  completion: number;
  reassignment: number;
  trend: number[];
  trendTone: "positive" | "negative" | "neutral";
};

const metrics: Metric[] = [
  {
    label: "AVG REVIEW SCORE",
    value: "87%",
    change: "+3% vs last month",
    tone: "positive",
  },
  {
    label: "ON-TIME DELIVERY",
    value: "91%",
    change: "+2% vs last month",
    tone: "positive",
  },
  {
    label: "COMPLETION RATE",
    value: "96%",
    change: "Steady",
    tone: "neutral",
  },
  {
    label: "CHANGE REQUEST RATE",
    value: "12%",
    change: "-4% vs last month",
    tone: "positive",
  },
];

const sprintTrend = [
  { sprint: "Sprint 14", value: 78 },
  { sprint: "Sprint 15", value: 81 },
  { sprint: "Sprint 16", value: 82 },
  { sprint: "Sprint 17", value: 85 },
  { sprint: "Sprint 18", value: 83 },
  { sprint: "Sprint 19", value: 87 },
];

const developers: Developer[] = [
  {
    initials: "SD",
    name: "Sahil Das",
    avgScore: 91,
    onTime: 95,
    completion: 98,
    reassignment: 2,
    trend: [70, 74, 78, 82, 87, 91],
    trendTone: "positive",
  },
  {
    initials: "KV",
    name: "Karan Verma",
    avgScore: 88,
    onTime: 90,
    completion: 96,
    reassignment: 4,
    trend: [76, 78, 80, 83, 85, 88],
    trendTone: "positive",
  },
  {
    initials: "NP",
    name: "Neha Patil",
    avgScore: 85,
    onTime: 88,
    completion: 94,
    reassignment: 6,
    trend: [84, 85, 83, 86, 84, 85],
    trendTone: "neutral",
  },
  {
    initials: "RS",
    name: "Rhea Sen",
    avgScore: 82,
    onTime: 84,
    completion: 90,
    reassignment: 8,
    trend: [88, 86, 85, 83, 82, 82],
    trendTone: "negative",
  },
  {
    initials: "AT",
    name: "Aman Thakur",
    avgScore: 76,
    onTime: 79,
    completion: 85,
    reassignment: 14,
    trend: [90, 87, 83, 80, 78, 76],
    trendTone: "negative",
  },
];

const toneText: Record<Metric["tone"], string> = {
  positive: "text-emerald-600",
  negative: "text-red-500",
  neutral: "text-gray-400",
};

const trendStroke: Record<Developer["trendTone"], string> = {
  positive: "#10b981",
  negative: "#ef4444",
  neutral: "#9ca3af",
};

function buildPath(
  values: number[],
  width: number,
  height: number,
  pad = 4
) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x =
      (index / (values.length - 1)) * (width - pad * 2) + pad;

    const y =
      height -
      pad -
      ((value - min) / range) * (height - pad * 2);

    return { x, y };
  });

  const d = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  return { d, points };
}

function Sparkline({
  values,
  tone,
}: {
  values: number[];
  tone: Developer["trendTone"];
}) {
  const width = 64;
  const height = 24;
  const { d } = buildPath(values, width, height, 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="sparkline"
    >
      <path
        d={d}
        stroke={trendStroke[tone]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendChart({
  data,
}: {
  data: { sprint: string; value: number }[];
}) {
  const width = 1000;
  const height = 220;
  const padX = 8;
  const padY = 20;

  const values = data.map((item) => item.value);

  const { d, points } = buildPath(
    values,
    width,
    height - padY,
    padX
  );

  return (
    <div className="trend-chart">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="performance-trend-chart"
      >
        <defs>
          <linearGradient
            id="trend-area-fill"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#5146e5"
              stopOpacity="0.16"
            />
            <stop
              offset="100%"
              stopColor="#5146e5"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <line
          x1={padX}
          x2={padX}
          y1={10}
          y2={height - padY}
          stroke="#e5e7eb"
          strokeWidth={1}
        />

        <line
          x1={padX}
          x2={width - padX}
          y1={height - padY}
          y2={height - padY}
          stroke="#e5e7eb"
          strokeWidth={1}
        />

        <path
          d={`${d} L ${points[points.length - 1].x} ${
            height - padY
          } L ${points[0].x} ${height - padY} Z`}
          fill="url(#trend-area-fill)"
        />

        <path
          d={d}
          stroke="#5146e5"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={4}
            fill="#5146e5"
            stroke="white"
            strokeWidth={2}
          />
        ))}
      </svg>

      <div className="trend-labels">
        {data.map((point) => (
          <span key={point.sprint}>{point.sprint}</span>
        ))}
      </div>
    </div>
  );
}

export default function Performance() {
  const [view, setView] = useState<"my" | "team">("team");

  return (
    <div className="performance-container">
      <Sidebar
        activePage="performance"
        onPageChange={() => {}}
      />

      <main className="main-section">
        <div className="content-wrapper">
          <div className="performance-header">
            <div>
              <h1 className="header-title">Performance</h1>

              <p className="header-subtitle">
                Team performance across all evaluated tasks
              </p>
            </div>

            <div className="header-actions">
              <div className="flex items-center rounded-md bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setView("my")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    view === "my"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  My Performance
                </button>

                <button
                  type="button"
                  onClick={() => setView("team")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    view === "team"
                      ? "bg-[#5146e5] text-white"
                      : "text-gray-500"
                  }`}
                >
                  Team
                </button>
              </div>

              <span className="admin-badge">ADMIN</span>

              <div className="admin-avatar">AG</div>
            </div>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="metric-card"
              >
                <p className="metric-label">
                  {metric.label}
                </p>

                <p className="metric-value">
                  {metric.value}
                </p>

                <p
                  className={`metric-change ${toneText[metric.tone]}`}
                >
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          <section className="trend-section">
            <div className="overview-header">
              <h2 className="section-title">
                Average Review Score — Trend
              </h2>

              <p className="section-subtitle">
                Last 6 sprints · derived from APPROVED submissions
              </p>
            </div>

            <div className="trend-chart-wrapper">
              <TrendChart data={sprintTrend} />
            </div>
          </section>

          <section className="developer-comparison">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  Developer Comparison
                </h2>

                <p className="section-subtitle">
                  {developers.length} active developers · date
                  range: last 90 days
                </p>
              </div>

              <button
                type="button"
                className="export-button"
              >
                Export CSV
              </button>
            </div>

            <div className="developer-table-header">
              <span>DEVELOPER</span>
              <span>AVG SCORE</span>
              <span>ON-TIME</span>
              <span>COMPLETION</span>
              <span>REASSIGNMENT</span>
              <span>TREND</span>
            </div>

            {developers.map((developer) => (
              <div
                key={developer.name}
                className="developer-table-row"
              >
                <div className="dev-info-wrapper">
                  <div className="dev-avatar">
                    {developer.initials}
                  </div>

                  <span className="dev-name">
                    {developer.name}
                  </span>
                </div>

                <span className="table-text-bold">
                  {developer.avgScore}%
                </span>

                <span className="table-text-normal">
                  {developer.onTime}%
                </span>

                <span className="table-text-normal">
                  {developer.completion}%
                </span>

                <span className="table-text-normal">
                  {developer.reassignment}%
                </span>

                <Sparkline
                  values={developer.trend}
                  tone={developer.trendTone}
                />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}