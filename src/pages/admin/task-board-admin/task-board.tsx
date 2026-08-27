"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "../../../components/admin-components/layout/sidebar";

import CreateTask from "../../../components/admin-components/task-components/create-task";

import AssignTask from "../../../components/admin-components/task-assign-components/assign-task";
import ReassignTask from "../../../components/admin-components/task-assign-components/reassign-task";

import {
  getTasks,
  type ApiTask,
} from "@/api/create_task.api";

import "./task-board.css";

type BoardTask = {
  id: number;
  title: string;
  priority: string;
  developer: string | null;
  deadline: string;
  status: string;
};

/*
 * This function converts the backend task into the shape
 * required by the existing Task Board UI.
 */
function mapApiTaskToBoardTask(
  task: ApiTask
): BoardTask {
  return {
    id: task.id,

    title: task.title,

    priority: task.priority,

    developer:
      task.developer?.name ?? null,

    deadline: task.deadline
      ? new Date(task.deadline).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
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
}: BoardTask & {
  onClick?: () => void;
}) {
  const getPriorityClass = (
    level: string
  ) => {
    switch (level) {
      case "CRITICAL":
        return "priority-critical";

      case "HIGH":
        return "priority-high";

      case "MEDIUM":
        return "priority-medium";

      default:
        return "priority-low";
    }
  };

  return (
    <div
      className={`task-card ${
        onClick
          ? "task-card-clickable"
          : ""
      }`}
      onClick={onClick}
    >
      <h3 className="task-title">
        {title}
      </h3>

      <div className="task-meta">

        <span
          className={`priority-badge-base ${getPriorityClass(
            priority
          )}`}
        >
          {priority}
        </span>

        <span className="task-deadline">
          {deadline}
        </span>

      </div>

      <div className="task-dev-wrapper">

        <div className="task-dev-avatar">
          {developer
            ? developer
                .split(" ")
                .map(
                  (name) => name[0]
                )
                .join("")
            : "?"}
        </div>

        <span className="task-dev-name">
          {developer ??
            "Unassigned"}
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
  onTaskClick?: (
    task: BoardTask
  ) => void;
}) {
  return (
    <div className="kanban-column">

      <div className="column-header">

        <h2 className="column-title">
          {title}
        </h2>

        <span className="column-badge">
          {count}
        </span>

      </div>

      <div className="column-task-list">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onClick={
              (
                title === "TODO" &&
                !task.developer
              ) ||
              (
                title === "IN PROGRESS" &&
                !!task.developer
              )
                ? () =>
                    onTaskClick?.(
                      task
                    )
                : undefined
            }
          />
        ))}

        {tasks.length === 0 && (
          <div className="text-sm text-gray-400">
            No tasks
          </div>
        )}

      </div>

    </div>
  );
}

export default function TaskBoard() {
  const projectId = 1;

  const [
    showCreateTask,
    setShowCreateTask,
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<BoardTask | null>(
    null
  );

  const [
    selectedReassignTask,
    setSelectedReassignTask,
  ] = useState<BoardTask | null>(
    null
  );

  /*
   * Fetch tasks from backend.
   */
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "tasks",
      projectId,
    ],

    queryFn: () =>
      getTasks(projectId),
  });

  /*
   * Convert backend response
   * into Task Board objects.
   */
  const boardTasks: BoardTask[] =
    data?.data?.map(
      mapApiTaskToBoardTask
    ) ?? [];

  /*
   * Separate tasks by status.
   */
  const todoTasks =
    boardTasks.filter(
      (task) =>
        task.status === "TODO"
    );

  const inProgressTasks =
    boardTasks.filter(
      (task) =>
        task.status ===
        "IN_PROGRESS"
    );

  const inReviewTasks =
    boardTasks.filter(
      (task) =>
        task.status ===
        "IN_REVIEW"
    );

  const changesRequestedTasks =
    boardTasks.filter(
      (task) =>
        task.status ===
        "CHANGES_REQUESTED"
    );

  const completedTasks =
    boardTasks.filter(
      (task) =>
        task.status ===
        "COMPLETED"
    );

  /*
   * Number of open tasks.
   */
  const openTasks =
    boardTasks.filter(
      (task) =>
        task.status !==
        "COMPLETED"
    ).length;

  return (
    <div className="board-container">

      <Sidebar
        activePage="task-board"
        onPageChange={() => {}}
      />

      <main className="board-main">

        <div className="board-wrapper">

          {/* HEADER */}

          <div className="board-header">

            <div>

              <h1 className="header-title">
                Task Board
              </h1>

              <p className="header-subtitle">
                Payments Platform ·{" "}
                {openTasks} open tasks
              </p>

            </div>

            <div className="header-actions">

              <button
                type="button"
                onClick={() =>
                  setShowCreateTask(
                    true
                  )
                }
                className="btn-new-task"
              >
                + New Task
              </button>

              <span className="admin-badge">
                ADMIN
              </span>

              <div className="admin-avatar">
                AG
              </div>

            </div>

          </div>

          {/* FILTERS */}

          <div className="filters-wrapper">

            <button
              type="button"
              className="btn-filter-active"
            >
              All Tasks
            </button>

            <button
              type="button"
              className="btn-filter-inactive"
            >
              My Tasks
            </button>

            <button
              type="button"
              className="btn-filter-inactive"
            >
              High Priority
            </button>

            <button
              type="button"
              className="btn-filter-inactive"
            >
              Overdue
            </button>

          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading tasks...
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="py-10 text-center">

              <p className="text-sm text-red-600">
                {error instanceof Error
                  ? error.message
                  : "Failed to load tasks"}
              </p>

              <button
                type="button"
                onClick={() =>
                  refetch()
                }
                className="mt-3 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold"
              >
                Try Again
              </button>

            </div>
          )}

          {/* TASK BOARD */}

          {!isLoading &&
            !isError && (
              <div className="kanban-scroll-area">

                <div className="kanban-container">

                  <Column
                    title="TODO"
                    count={
                      todoTasks.length
                    }
                    tasks={
                      todoTasks
                    }
                    onTaskClick={(
                      task
                    ) =>
                      setSelectedTask(
                        task
                      )
                    }
                  />

                  <Column
                    title="IN PROGRESS"
                    count={
                      inProgressTasks.length
                    }
                    tasks={
                      inProgressTasks
                    }
                    onTaskClick={(
                      task
                    ) =>
                      setSelectedReassignTask(
                        task
                      )
                    }
                  />

                  <Column
                    title="IN REVIEW"
                    count={
                      inReviewTasks.length
                    }
                    tasks={
                      inReviewTasks
                    }
                  />

                  <Column
                    title="CHANGES REQUESTED"
                    count={
                      changesRequestedTasks.length
                    }
                    tasks={
                      changesRequestedTasks
                    }
                  />

                  <Column
                    title="COMPLETED"
                    count={
                      completedTasks.length
                    }
                    tasks={
                      completedTasks
                    }
                  />

                </div>

              </div>
            )}

        </div>

      </main>

      {/* CREATE TASK MODAL */}

      <CreateTask
        open={
          showCreateTask
        }
        onClose={() =>
          setShowCreateTask(
            false
          )
        }
        projectId={
          projectId
        }
        onCreated={() => {
          /*
           * Re-fetch backend tasks
           * after successful creation.
           */
          refetch();
        }}
      />

      {/* ASSIGN TASK MODAL */}

      <AssignTask
        open={
          selectedTask !== null
        }
        task={
          selectedTask
            ? {
                title:
                  selectedTask.title,
                priority:
                  selectedTask.priority,
                developer:
                  selectedTask.developer,
                deadline:
                  selectedTask.deadline,
              }
            : null
        }
        onClose={() =>
          setSelectedTask(
            null
          )
        }
      />

      {/* REASSIGN TASK MODAL */}

      <ReassignTask
        open={
          selectedReassignTask !==
          null
        }
        task={
          selectedReassignTask
            ? {
                title:
                  selectedReassignTask.title,
                developer:
                  selectedReassignTask.developer,
                status:
                  selectedReassignTask.status,
              }
            : null
        }
        onClose={() =>
          setSelectedReassignTask(
            null
          )
        }
      />

    </div>
  );
}