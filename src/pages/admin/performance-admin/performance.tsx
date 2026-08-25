"use client";

import { useState } from "react";
import Sidebar from "@/components/admin-components/layout/sidebar";

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

function buildPath(values: number[], width: number, height: number, pad = 4) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * (width - pad * 2) + pad;
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return { x, y };
  });

  const d = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return { d, points };
}

function Sparkline({ values, tone }: { values: number[]; tone: Developer["trendTone"] }) {
  const width = 64;
  const height = 24;
  const { d } = buildPath(values, width, height, 2);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={d} stroke={trendStroke[tone]} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendChart({ data }: { data: { sprint: string; value: number }[] }) {
  const width = 700;
  const height = 220;
  const padX = 24;
  const padY = 24;
  const values = data.map((d) => d.value);
  const { d, points } = buildPath(values, width, height - padY, padX);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="trend-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5146e5" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#5146e5" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1={padX} x2={padX} y1={10} y2={height - padY} stroke="#e5e7eb" strokeWidth={1} />
      <line x1={padX} x2={width - padX} y1={height - padY} y2={height - padY} stroke="#e5e7eb" strokeWidth={1} />

      <path
        d={`${d} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`}
        fill="url(#trend-area-fill)"
      />

      <path d={d} stroke="#5146e5" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r={4} fill="#5146e5" stroke="white" strokeWidth={2} />
      ))}

      {data.map((point, index) => (
        <text
          key={point.sprint}
          x={points[index].x}
          y={height - 2}
          textAnchor="middle"
          fontSize="10"
          fill="#9ca3af"
        >
          {point.sprint}
        </text>
      ))}
    </svg>
  );
}

export default function Performance() {
  const [view, setView] = useState<"my" | "team">("team");

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar activePage="performance" onPageChange={() => {}} />

      <main className="ml-56 min-w-0 flex-1 bg-[#f8f9fc] p-6">
        <div className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Performance</h1>
              <p className="mt-1 text-xs text-gray-500">Team performance across all evaluated tasks</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md bg-gray-100 p-1">
                <button
                  onClick={() => setView("my")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    view === "my" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  }`}
                >
                  My Performance
                </button>

                <button
                  onClick={() => setView("team")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    view === "team" ? "bg-[#5146e5] text-white" : "text-gray-500"
                  }`}
                >
                  Team
                </button>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
                ADMIN
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-[10px] font-semibold text-white">
                AG
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-medium text-gray-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
                <p className={`mt-1 text-xs ${toneText[metric.tone]}`}>{metric.change}</p>
              </div>
            ))}
          </div>

          <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Average Review Score — Trend</h2>
              <p className="mt-1 text-xs text-gray-400">Last 6 sprints · derived from APPROVED submissions</p>
            </div>

            <div className="mt-4">
              <TrendChart data={sprintTrend} />
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Developer Comparison</h2>
                <p className="mt-1 text-xs text-gray-400">
                  {developers.length} active developers · date range: last 90 days
                </p>
              </div>

              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                Export CSV
              </button>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-200 px-5 py-3 text-[10px] font-medium text-gray-500">
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
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center border-b border-gray-100 px-5 py-3.5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
                    {developer.initials}
                  </div>
                  <span className="text-xs font-medium text-gray-800">{developer.name}</span>
                </div>

                <span className="text-xs font-semibold text-gray-800">{developer.avgScore}%</span>
                <span className="text-xs text-gray-700">{developer.onTime}%</span>
                <span className="text-xs text-gray-700">{developer.completion}%</span>
                <span className="text-xs text-gray-700">{developer.reassignment}%</span>

                <Sparkline values={developer.trend} tone={developer.trendTone} />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}