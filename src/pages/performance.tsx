"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";

type Metric = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

const metrics: Metric[] = [
  {
    label: "ON-TIME DELIVERY",
    value: "92%",
    change: "+4% vs last sprint",
    positive: true,
  },
  {
    label: "AVG REVIEW SCORE",
    value: "8.6",
    change: "+0.4 vs last sprint",
    positive: true,
  },
  {
    label: "TASK COMPLETION",
    value: "87%",
    change: "+6% vs last sprint",
    positive: true,
  },
  {
    label: "REWORK RATE",
    value: "13%",
    change: "-3% vs last sprint",
    positive: true,
  },
];

const developers = [
  {
    initials: "RS",
    name: "Rhea Sen",
    completed: 18,
    score: "9.2",
    delivery: "96%",
  },
  {
    initials: "KV",
    name: "Karan Verma",
    completed: 16,
    score: "8.9",
    delivery: "94%",
  },
  {
    initials: "NP",
    name: "Neha Patil",
    completed: 15,
    score: "8.7",
    delivery: "91%",
  },
  {
    initials: "SD",
    name: "Sahil Das",
    completed: 14,
    score: "8.4",
    delivery: "88%",
  },
];

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Sprint");

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Sidebar
        activePage="performance"
        onPageChange={() => {}}
      />

      <main className="ml-56 min-h-screen bg-[#f8f9fc] p-6">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Performance
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Engineering performance overview across all projects
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(event) =>
                  setSelectedPeriod(event.target.value)
                }
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none"
              >
                <option>This Sprint</option>
                <option>Last Sprint</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>

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
              <div
                key={metric.label}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <p className="text-xs font-medium text-gray-500">
                  {metric.label}
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    metric.positive
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Developer Performance
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Performance summary for the selected period
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-gray-200 px-5 py-3 text-[10px] font-medium text-gray-500">
                <span>DEVELOPER</span>
                <span>COMPLETED</span>
                <span>AVG SCORE</span>
                <span>ON-TIME</span>
              </div>

              {developers.map((developer) => (
                <div
                  key={developer.name}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-100 px-5 py-3.5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-semibold text-[#5146e5]">
                      {developer.initials}
                    </div>

                    <span className="text-xs font-medium text-gray-800">
                      {developer.name}
                    </span>
                  </div>

                  <span className="text-xs text-gray-700">
                    {developer.completed}
                  </span>

                  <span className="text-xs font-medium text-gray-700">
                    {developer.score}
                  </span>

                  <span className="text-xs text-emerald-600">
                    {developer.delivery}
                  </span>
                </div>
              ))}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-900">
                  Performance Overview
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Current engineering team metrics
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Task Completion
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      87%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 w-[87%] rounded-full bg-[#5146e5]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      On-Time Delivery
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      92%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 w-[92%] rounded-full bg-[#5146e5]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Review Quality
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      86%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 w-[86%] rounded-full bg-[#5146e5]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Rework Control
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      87%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 w-[87%] rounded-full bg-[#5146e5]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Review Insights
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Summary of recent review activity
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-[10px] font-medium text-gray-500">
                  REVIEWS COMPLETED
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  42
                </p>

                <p className="mt-1 text-[10px] text-emerald-600">
                  +8 this sprint
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-[10px] font-medium text-gray-500">
                  AVERAGE REVIEW TIME
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  3.2h
                </p>

                <p className="mt-1 text-[10px] text-emerald-600">
                  18% faster
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-[10px] font-medium text-gray-500">
                  CHANGES REQUESTED
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  13%
                </p>

                <p className="mt-1 text-[10px] text-emerald-600">
                  -3% this sprint
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}