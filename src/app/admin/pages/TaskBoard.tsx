"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/sidebar";
import CreateTask from "../components/CreateTask";
import AssignTask from "../components/assign-task";
import ReassignTask from "../components/reassign-task";
import { getTasks, type ApiTask } from "@/services/taskApi";

type BoardTask = {
  id: number;
  title: string;
  priority: string;
  developer: string | null;
  deadline: string;
  status: string;
};

function mapApiTaskToBoardTask(task: ApiTask): BoardTask {
  return {
    id: task.id,
    title: task.title,
    priority: task.priority,
    developer: task.developer?.name ?? null,
    deadline: task.deadline
      ? new Date(task.deadline).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "No deadline",
    status: task.status,
  };
}

function TaskCard({
  title,
  priority,
  developer,
  deadline,
  onClick,
}: BoardTask & { onClick?: () => void }) {
  const priorityClass = {
    CRITICAL: "bg-red-100 text-red-600",
    HIGH: "bg-orange-100 text-orange-600",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-gray-100 text-gray-600",
  }[priority] ?? "bg-gray-100 text-gray-600";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-sm font-semibold leading-5 text-gray-900">
        {title}
      </h3>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`rounded px-2 py-1 text-[10px] font-semibold ${priorityClass}`}
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
            ? developer
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "?"}
        </div>

        <span className="text-xs text-gray-600">
          {developer ?? "Unassigned"}
        </span>
      </div>
    </div>
  );
}

function Column({
  title,
  count,
  tasks,
  onTaskClick,
}: {
  title: string;
  count: number;
  tasks: BoardTask[];
  onTaskClick?: (task: BoardTask) => void;
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
            key={task.id}
            {...task}
            onClick={() => onTaskClick?.(task)}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-400">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}

export default function TaskBoard() {
  const projectId = 1;

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<BoardTask | null>(null);
  const [selectedReassignTask, setSelectedReassignTask] =
    useState<BoardTask | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
  });

  const tasks: BoardTask[] =
    data?.data?.map(mapApiTaskToBoardTask) ?? [];

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const inReviewTasks = tasks.filter(
    (task) => task.status === "IN_REVIEW"
  );

  const changesRequestedTasks = tasks.filter(
    (task) => task.status === "CHANGES_REQUESTED"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  const openTasks = tasks.filter(
    (task) => task.status !== "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">
      <Sidebar
        activePage="task-board"
        onPageChange={() => {}}
      />

      <main className="ml-56 min-h-screen">
        <div className="p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Task Board
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Payments Platform · {openTasks} open tasks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCreateTask(true)}
                className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
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
              className="rounded-md bg-[#5146e5] px-3 py-2 text-[10px] font-medium text-white transition-colors"
            >
              All Tasks
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              My Tasks
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              High Priority
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Overdue
            </button>
          </div>

          {isLoading && (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading tasks...
            </div>
          )}

          {isError && (
            <div className="py-10 text-center">
              <p className="text-sm text-red-600">
                {error instanceof Error
                  ? error.message
                  : "Failed to load tasks"}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-3 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <div className="flex min-w-[1150px] gap-5">
                <Column
                  title="TODO"
                  count={todoTasks.length}
                  tasks={todoTasks}
                  onTaskClick={setSelectedTask}
                />

                <Column
                  title="IN PROGRESS"
                  count={inProgressTasks.length}
                  tasks={inProgressTasks}
                  onTaskClick={setSelectedReassignTask}
                />

                <Column
                  title="IN REVIEW"
                  count={inReviewTasks.length}
                  tasks={inReviewTasks}
                />

                <Column
                  title="CHANGES REQUESTED"
                  count={changesRequestedTasks.length}
                  tasks={changesRequestedTasks}
                />

                <Column
                  title="COMPLETED"
                  count={completedTasks.length}
                  tasks={completedTasks}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <CreateTask
        open={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        projectId={projectId}
        onCreated={() => {
          refetch();
        }}
      />

      <AssignTask
        open={selectedTask !== null}
        task={
          selectedTask
            ? {
                title: selectedTask.title,
                priority: selectedTask.priority,
                developer: selectedTask.developer,
                deadline: selectedTask.deadline,
              }
            : null
        }
        onClose={() => setSelectedTask(null)}
      />

      <ReassignTask
        open={selectedReassignTask !== null}
        task={
          selectedReassignTask
            ? {
                title: selectedReassignTask.title,
                developer: selectedReassignTask.developer,
                status: selectedReassignTask.status,
              }
            : null
        }
        onClose={() => setSelectedReassignTask(null)}
      />
    </div>
  );
}