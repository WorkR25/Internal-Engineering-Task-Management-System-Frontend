"use client";

import { useState } from "react";

type Developer = {
  initials: string;
  name: string;
  score: number;
  onTime: number;
  completion: number;
  reassignment: number;
  trend: "up" | "down" | "flat";
};

const developers: Developer[] = [
  {
    initials: "SD",
    name: "Sahil Das",
    score: 91,
    onTime: 95,
    completion: 98,
    reassignment: 2,
    trend: "up",
  },
  {
    initials: "KV",
    name: "Karan Verma",
    score: 88,
    onTime: 90,
    completion: 95,
    reassignment: 4,
    trend: "up",
  },
  {
    initials: "NP",
    name: "Neha Patil",
    score: 85,
    onTime: 88,
    completion: 94,
    reassignment: 6,
    trend: "flat",
  },
  {
    initials: "RS",
    name: "Rhea Sen",
    score: 82,
    onTime: 84,
    completion: 90,
    reassignment: 8,
    trend: "down",
  },
  {
    initials: "AT",
    name: "Aman Thakur",
    score: 76,
    onTime: 79,
    completion: 85,
    reassignment: 14,
    trend: "down",
  },
];

function Trend({ type }: { type: Developer["trend"] }) {
  if (type === "up") {
    return (
      <svg width="42" height="18" viewBox="0 0 42 18">
        <polyline
          points="1,13 8,11 15,12 22,7 29,8 41,3"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (type === "down") {
    return (
      <svg width="42" height="18" viewBox="0 0 42 18">
        <polyline
          points="1,3 8,5 15,7 22,10 29,11 41,14"
          fill="none"
          stroke="#ff4d4d"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg width="42" height="18" viewBox="0 0 42 18">
      <polyline
        points="1,9 8,8 15,10 22,9 29,10 41,9"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Performance() {
  const [activeTab, setActiveTab] = useState<"my" | "team">("team");
  const [selectedDeveloper, setSelectedDeveloper] =
    useState<string | null>(null);

  const [selectedSprint, setSelectedSprint] = useState<number | null>(
    null
  );

  const sprints = [
    { name: "Sprint 14", score: 82 },
    { name: "Sprint 15", score: 85 },
    { name: "Sprint 16", score: 87 },
    { name: "Sprint 17", score: 89 },
    { name: "Sprint 18", score: 88 },
    { name: "Sprint 19", score: 91 },
  ];

  const handleExport = () => {
    const header =
      "Developer,Average Score,On-Time,Completion,Reassignment\n";

    const rows = developers
      .map(
        (developer) =>
          `${developer.name},${developer.score}%,${developer.onTime}%,${developer.completion}%,${developer.reassignment}%`
      )
      .join("\n");

    const csv = header + rows;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "developer-performance.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] p-6">

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-xl font-semibold text-[#20242d]">
            Performance
          </h1>

          <p className="mt-1 text-xs text-gray-400">
            Team performance across all evaluated tasks
          </p>
        </div>

        {/* TOP BUTTONS */}

        <div className="flex items-center gap-1 rounded-lg bg-white p-1">

          <button
            type="button"
            onClick={() => setActiveTab("my")}
            className={`rounded-md px-3 py-1.5 text-[10px] ${
              activeTab === "my"
                ? "bg-gray-100 text-gray-600"
                : "text-gray-400"
            }`}
          >
            My Performance
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("team")}
            className={`rounded-md px-3 py-1.5 text-[10px] ${
              activeTab === "team"
                ? "bg-[#5146e5] text-white"
                : "text-gray-400"
            }`}
          >
            Team
          </button>

          <button
            type="button"
            onClick={() => alert("Admin panel clicked")}
            className="rounded-md px-3 py-1.5 text-[10px] font-medium text-gray-500"
          >
            ADMIN
          </button>

          <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
            AG
          </div>

        </div>
      </div>

      {/* KPI CARDS */}

      <div className="mt-5 grid grid-cols-4 gap-4">

        {/* CARD 1 */}

        <button
          type="button"
          onClick={() => alert("Average Review Score: 87%")}
          className="rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:shadow-sm"
        >
          <p className="text-[9px] font-semibold text-gray-400">
            AVG REVIEW SCORE
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#20242d]">
            87%
          </p>

          <p className="mt-1 text-[9px] text-green-500">
            +3% vs last month
          </p>
        </button>

        {/* CARD 2 */}

        <button
          type="button"
          onClick={() => alert("On-Time Delivery: 91%")}
          className="rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:shadow-sm"
        >
          <p className="text-[9px] font-semibold text-gray-400">
            ON-TIME DELIVERY
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#20242d]">
            91%
          </p>

          <p className="mt-1 text-[9px] text-green-500">
            +2% vs last month
          </p>
        </button>

        {/* CARD 3 */}

        <button
          type="button"
          onClick={() => alert("Completion Rate: 96%")}
          className="rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:shadow-sm"
        >
          <p className="text-[9px] font-semibold text-gray-400">
            COMPLETION RATE
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#20242d]">
            96%
          </p>

          <p className="mt-1 text-[9px] text-gray-400">
            Steady
          </p>
        </button>

        {/* CARD 4 */}

        <button
          type="button"
          onClick={() => alert("Change Request Rate: 12%")}
          className="rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:shadow-sm"
        >
          <p className="text-[9px] font-semibold text-gray-400">
            CHANGE REQUEST RATE
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#20242d]">
            12%
          </p>

          <p className="mt-1 text-[9px] text-green-500">
            -4% vs last month
          </p>
        </button>

      </div>

      {/* TREND */}

      <section className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">

        <div className="border-b border-gray-200 px-4 py-3">

          <h2 className="text-xs font-semibold text-[#20242d]">
            Average Review Score — Trend
          </h2>

          <p className="mt-1 text-[9px] text-gray-400">
            Last 6 sprints · derived from APPROVED submissions
          </p>

        </div>

        <div className="px-6 py-4">

          <div className="relative h-28">

            {/* Y AXIS */}

            <div className="absolute left-0 top-0 flex h-[90px] flex-col justify-between text-[8px] text-gray-300">
              <span>100%</span>
              <span>95%</span>
              <span>90%</span>
              <span>85%</span>
              <span>80%</span>
            </div>

            {/* CHART */}

            <div className="absolute bottom-0 left-10 right-0 top-0">

              <svg
                className="h-[90px] w-full"
                viewBox="0 0 700 100"
                preserveAspectRatio="none"
              >

                <line
                  x1="0"
                  y1="5"
                  x2="700"
                  y2="5"
                  stroke="#f0f0f0"
                />

                <line
                  x1="0"
                  y1="28"
                  x2="700"
                  y2="28"
                  stroke="#f0f0f0"
                />

                <line
                  x1="0"
                  y1="51"
                  x2="700"
                  y2="51"
                  stroke="#f0f0f0"
                />

                <line
                  x1="0"
                  y1="74"
                  x2="700"
                  y2="74"
                  stroke="#f0f0f0"
                />

                <path
                  d="
                    M0 67
                    L140 52
                    L280 44
                    L420 31
                    L560 37
                    L700 20
                    L700 90
                    L0 90
                    Z
                  "
                  fill="#f0efff"
                />

                <polyline
                  points="
                    0,67
                    140,52
                    280,44
                    420,31
                    560,37
                    700,20
                  "
                  fill="none"
                  stroke="#5146e5"
                  strokeWidth="2"
                />

                {sprints.map((sprint, index) => {
                  const x = index * 140;
                  const y = [67, 52, 44, 31, 37, 20][index];

                  return (
                    <circle
                      key={sprint.name}
                      cx={x}
                      cy={y}
                      r={selectedSprint === index ? 5 : 3}
                      fill="#5146e5"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedSprint(index);
                      }}
                    />
                  );
                })}

              </svg>

              {/* SPRINT LABELS */}

              <div className="flex justify-between text-[8px] text-gray-400">

                {sprints.map((sprint, index) => (
                  <button
                    type="button"
                    key={sprint.name}
                    onClick={() => setSelectedSprint(index)}
                    className={
                      selectedSprint === index
                        ? "font-semibold text-[#5146e5]"
                        : ""
                    }
                  >
                    {sprint.name}
                  </button>
                ))}

              </div>

            </div>

          </div>

          {selectedSprint !== null && (
            <div className="mt-2 rounded-md bg-[#f7f6ff] px-3 py-2 text-[10px] text-[#5146e5]">
              {sprints[selectedSprint].name}:{" "}
              {sprints[selectedSprint].score}% average review score
            </div>
          )}

        </div>
      </section>

      {/* DEVELOPER COMPARISON */}

      <section className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">

        {/* TITLE */}

        <div className="flex items-center justify-between px-4 py-3">

          <div>
            <h2 className="text-xs font-semibold text-[#20242d]">
              Developer Comparison
            </h2>

            <p className="mt-1 text-[9px] text-gray-400">
              5 active developers · data over last 90 days
            </p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[9px] font-medium text-gray-600 hover:bg-gray-50"
          >
            Export CSV
          </button>

        </div>

        {/* TABLE HEADER */}

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.7fr] border-y border-gray-200 bg-gray-50 px-4 py-2.5 text-[8px] font-semibold text-gray-400">

          <span>DEVELOPER</span>
          <span>AVG SCORE</span>
          <span>ON-TIME</span>
          <span>COMPLETION</span>
          <span>REASSIGNMENT</span>
          <span>TREND</span>

        </div>

        {/* DEVELOPERS */}

        {developers.map((developer) => (

          <button
            type="button"
            key={developer.name}
            onClick={() => {
              setSelectedDeveloper(developer.name);
            }}
            className="grid w-full grid-cols-[2fr_1fr_1fr_1fr_1fr_0.7fr] items-center border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
          >

            {/* DEVELOPER */}

            <div className="flex items-center gap-2">

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eeedff] text-[8px] font-bold text-[#5146e5]">
                {developer.initials}
              </div>

              <span className="text-[10px] font-medium text-gray-700">
                {developer.name}
              </span>

            </div>

            {/* SCORE */}

            <span className="text-[10px] font-semibold text-gray-700">
              {developer.score}%
            </span>

            {/* ON TIME */}

            <span className="text-[10px] text-gray-600">
              {developer.onTime}%
            </span>

            {/* COMPLETION */}

            <span className="text-[10px] text-gray-600">
              {developer.completion}%
            </span>

            {/* REASSIGNMENT */}

            <span className="text-[10px] text-gray-600">
              {developer.reassignment}%
            </span>

            {/* TREND */}

            <Trend type={developer.trend} />

          </button>

        ))}

        {selectedDeveloper && (
          <div className="border-t bg-[#f7f6ff] px-4 py-2 text-[10px] text-[#5146e5]">
            Selected developer:{" "}
            <span className="font-semibold">
              {selectedDeveloper}
            </span>
          </div>
        )}

      </section>

    </main>
  );
}