"use client";

import { useState } from "react";
import Sidebar from "../components/layout/sidebar";

const tasks = {
  todo: [
    {
      title: "Add rate limiting to auth/signin",
      priority: "HIGH",
      developer: "Karan Verma",
      deadline: "Dec 2, 2026",
    },
    {
      title: "Seed assignment reason",
      priority: "LOW",
      developer: "Nisha Patel",
      deadline: "Dec 5, 2026",
    },
  ],
  inProgress: [
    {
      title: "Implement payment webhook handler",
      priority: "HIGH",
      developer: "Sahil Das",
      deadline: "Dec 4, 2026",
    },
    {
      title: "Add pagination to GET tasks",
      priority: "MEDIUM",
      developer: "Nisha Patel",
      deadline: "Dec 6, 2026",
    },
  ],
  inReview: [
    {
      title: "Fix N+1 query on dashboard",
      priority: "HIGH",
      developer: "Rhea Sen",
      deadline: "Dec 3, 2026",
    },
    {
      title: "Refactor webhook retry logic",
      priority: "MEDIUM",
      developer: "Sahil Das",
      deadline: "Dec 7, 2026",
    },
  ],
  changesRequested: [
    {
      title: "Refactor review scoring service",
      priority: "CRITICAL",
      developer: "Karan Verma",
      deadline: "Dec 5, 2026",
    },
  ],
  completed: [
    {
      title: "Seed roles and assignment reasons",
      priority: "LOW",
      developer: "Sahil Das",
      deadline: "Nov 28, 2026",
    },
    {
      title: "Set up Sequelize migrations",
      priority: "LOW",
      developer: "Nisha Patel",
      deadline: "Nov 30, 2026",
    },
  ],
};

type Task = {
  title: string;
  priority: string;
  developer: string;
  deadline: string;
};

function TaskCard({
  title,
  priority,
  developer,
  deadline,
}: Task) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold leading-5 text-gray-900">
        {title}
      </h3>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`rounded px-2 py-1 text-[10px] font-semibold ${
            priority === "CRITICAL"
              ? "bg-red-100 text-red-600"
              : priority === "HIGH"
                ? "bg-orange-100 text-orange-600"
                : priority === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
          }`}
        >
          {priority}
        </span>

        <span className="text-xs text-gray-500">
          {deadline}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700">
          {developer
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>

        <span className="text-xs text-gray-600">
          {developer}
        </span>
      </div>
    </div>
  );
}

function Column({
  title,
  count,
  tasks,
}: {
  title: string;
  count: number;
  tasks: Task[];
}) {
  return (
    <div className="min-w-[220px] flex-1">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-xs font-semibold text-gray-700">
          {title}
        </h2>

        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.title}
            {...task}
          />
        ))}
      </div>
    </div>
  );
}

export default function TaskBoard() {
  const [showCreateTask, setShowCreateTask] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar />

      <main className="ml-56 min-h-screen">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Task Board
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Payments Platform · 9 open tasks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCreateTask(true)}
                className="rounded-md bg-[#5146e5] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                + New Task
              </button>

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600">
                ADMIN
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-[10px] font-semibold text-white">
                AG
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <button
              type="button"
              className="rounded-md bg-[#5146e5] px-3 py-2 text-[10px] font-medium text-white"
            >
              All Tasks
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600"
            >
              My Tasks
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600"
            >
              High Priority
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600"
            >
              Overdue
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-[1150px] gap-5">
              <Column
                title="TODO"
                count={2}
                tasks={tasks.todo}
              />

              <Column
                title="IN PROGRESS"
                count={2}
                tasks={tasks.inProgress}
              />

              <Column
                title="IN REVIEW"
                count={2}
                tasks={tasks.inReview}
              />

              <Column
                title="CHANGES REQUESTED"
                count={1}
                tasks={tasks.changesRequested}
              />

              <Column
                title="COMPLETED"
                count={2}
                tasks={tasks.completed}
              />
            </div>
          </div>
        </div>
      </main>

      {showCreateTask && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Create New Task
              </h2>

              <button
                type="button"
                onClick={() => setShowCreateTask(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Task creation will be connected to the API later.
            </p>

            <button
              type="button"
              onClick={() => setShowCreateTask(false)}
              className="mt-5 rounded-md bg-[#5146e5] px-4 py-2 text-xs font-medium text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}