"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar";
import TaskDetail from "../components/task-detail";

type Task = {
  id: number;
  title: string;
  project: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  deadline?: string;
  submitted?: string;
};

const tasks = {
  todo: [
    {
      id: 1,
      title: "Add rate limiting to auth/signin",
      project: "Payments Platform",
      priority: "MEDIUM" as const,
      deadline: "Dec 2",
    },
  ],

  inProgress: [] as Task[],

  inReview: [
    {
      id: 2,
      title: "Add pagination to GET /tasks",
      project: "Payments Platform",
      priority: "MEDIUM" as const,
      submitted: "5h ago",
    },
  ],

  changesRequested: [
    {
      id: 3,
      title: "Refactor review scoring service",
      project: "Payments Platform",
      priority: "CRITICAL" as const,
      submitted: "3d ago",
    },
  ],

  completed: [
    {
      id: 4,
      title: "Set up Sequelize migrations",
      project: "Payments Platform",
      priority: "LOW" as const,
      deadline: "Nov 18",
    },
  ],
};

const projectFilters = [
  "All Projects",
  "Payments Platform",
  "Notification Service",
];

const priorityStyles = {
  LOW: "bg-gray-100 text-gray-500",
  MEDIUM: "bg-orange-50 text-orange-600",
  HIGH: "bg-red-50 text-red-600",
  CRITICAL: "bg-red-100 text-red-600",
};

function TaskCard({
  task,
  onClick,
}: {
  task: Task;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-2.5 block w-full cursor-pointer rounded-md border border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-gray-300"
    >
      <h3 className="m-0 text-[10px] font-bold leading-[1.4] text-[#263044]">
        {task.title}
      </h3>

      <div className="mt-2">
        <span
          className={`inline-block rounded-full px-1.5 py-0.5 text-[7px] font-bold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#788296]">
          {task.project}
        </span>

        <span className="shrink-0 text-[8px] text-[#8a93a3]">
          {task.deadline
            ? `Due ${task.deadline}`
            : task.submitted
              ? `Submitted ${task.submitted}`
              : ""}
        </span>
      </div>
    </button>
  );
}

function TaskColumn({
  title,
  tasks,
  onTaskClick,
}: {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[9px] font-bold text-[#566074]">
          {title}
        </span>

        <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#f1f3f6] px-1 text-[8px] font-semibold text-[#7b8494]">
          {tasks.length}
        </span>
      </div>

      <div className="min-h-[100px]">
        {tasks.length === 0 ? (
          <div className="flex min-h-[72px] items-center justify-center rounded-md border border-dashed border-gray-200 p-3 text-center text-[9px] text-[#a0a8b6]">
            Nothing in progress
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.title}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function MyTask() {
  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [activeFilter, setActiveFilter] =
    useState("All Projects");

  const filterTasks = (list: Task[]) =>
    activeFilter === "All Projects"
      ? list
      : list.filter(
          (task) => task.project === activeFilter
        );

  if (selectedTask) {
    return (
      <main className="min-h-screen bg-[#f8f9fc] text-gray-900">
        <Sidebar
          activePage="my-tasks"
          onPageChange={() => {}}
        />

        <section className="ml-60 min-h-screen w-[calc(100%-240px)] box-border overflow-x-hidden p-8 max-[900px]:ml-60 max-[900px]:w-[calc(100%-240px)] max-[900px]:p-5 max-[600px]:ml-60 max-[600px]:w-[calc(100%-240px)] max-[600px]:p-[15px]">
          <TaskDetail
            task={selectedTask}
            onBack={() => setSelectedTask(null)}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar
        activePage="my-tasks"
        onPageChange={() => {}}
      />

      <section className="ml-60 min-h-screen w-[calc(100%-240px)] box-border overflow-x-hidden p-8 max-[900px]:ml-60 max-[900px]:w-[calc(100%-240px)] max-[900px]:p-5 max-[600px]:ml-60 max-[600px]:w-[calc(100%-240px)] max-[600px]:p-[15px]">
        <header className="flex items-start justify-between border-b border-gray-200 pb-6 max-[900px]:gap-5 max-[600px]:flex-col">
          <div>
            <h1 className="m-0 text-[28px] font-bold leading-[1.2] text-[#172033] max-[600px]:text-[22px]">
              My Tasks
            </h1>

            <p className="mt-1.5 text-[13px] text-[#647087]">
              Developer&apos;s personal Kanban — assigned tasks only.
            </p>
          </div>

          <div className="flex items-center gap-2.5 max-[600px]:self-start">
            <span className="rounded-full bg-[#f1edff] px-2 py-1 text-[9px] font-bold tracking-[0.3px] text-[#5146e5]">
              DEVELOPER
            </span>

            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#eeedff] text-[10px] font-bold text-[#5146e5]">
              KV
            </div>
          </div>
        </header>

        <section className="mt-[22px] w-full max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="m-0 text-sm font-bold text-[#172033]">
                My Tasks
              </h2>

              <p className="mt-1 text-[10px] text-[#8791a3]">
                4 tasks assigned to you, across 2 projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 bg-gray-50 px-5 py-3">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-md border px-3 py-1.5 text-[9px] font-medium transition ${
                  activeFilter === filter
                    ? "border-[#5146e5] bg-[#eeedff] text-[#5146e5]"
                    : "border-gray-200 bg-white text-[#5f697a] hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="box-border w-full max-w-full overflow-x-auto overflow-y-hidden p-5">
            <div className="grid min-w-[850px] grid-cols-5 gap-3">
              <TaskColumn
                title="TO DO"
                tasks={filterTasks(tasks.todo)}
                onTaskClick={setSelectedTask}
              />

              <TaskColumn
                title="IN PROGRESS"
                tasks={filterTasks(tasks.inProgress)}
                onTaskClick={setSelectedTask}
              />

              <TaskColumn
                title="IN REVIEW"
                tasks={filterTasks(tasks.inReview)}
                onTaskClick={setSelectedTask}
              />

              <TaskColumn
                title="CHANGES REQUESTED"
                tasks={filterTasks(tasks.changesRequested)}
                onTaskClick={setSelectedTask}
              />

              <TaskColumn
                title="COMPLETED"
                tasks={filterTasks(tasks.completed)}
                onTaskClick={setSelectedTask}
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}