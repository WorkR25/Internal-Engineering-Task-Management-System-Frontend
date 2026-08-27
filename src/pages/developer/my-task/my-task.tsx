"use client";

import { useState } from "react";
import Sidebar from "../../../components/developer-components/sidebar/sidebar";
import TaskDetail from "../../../components/developer-components/my-task/task-detail";
import "./my-task.css";

type Task = {
  title: string;
  project: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  deadline?: string;
  submitted?: string;
};

const tasks = {
  todo: [
    {
      title: "Add rate limiting to auth/signin",
      project: "Payments Platform",
      priority: "MEDIUM" as const,
      deadline: "Dec 2",
    },
  ],

  inProgress: [] as Task[],

  inReview: [
    {
      title: "Add pagination to GET /tasks",
      project: "Payments Platform",
      priority: "MEDIUM" as const,
      submitted: "5h ago",
    },
  ],

  changesRequested: [
    {
      title: "Refactor review scoring service",
      project: "Payments Platform",
      priority: "CRITICAL" as const,
      submitted: "3d ago",
    },
  ],

  completed: [
    {
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
      className="developer-task-card"
    >
      <h3 className="developer-task-card-title">
        {task.title}
      </h3>

      <div className="developer-task-card-priority">
        <span
          className={`developer-priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="developer-task-card-footer">
        <span className="developer-task-project">
          {task.project}
        </span>

        <span className="developer-task-date">
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
    <div className="developer-task-column">

      <div className="developer-task-column-header">

        <span className="developer-task-column-title">
          {title}
        </span>

        <span className="developer-task-column-count">
          {tasks.length}
        </span>

      </div>

      <div className="developer-task-column-content">

        {tasks.length === 0 ? (

          <div className="developer-task-empty">
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
      : list.filter((task) => task.project === activeFilter);

  if (selectedTask) {
    return (
      <main className="developer-my-task-page">

        <Sidebar
          activePage="my-tasks"
          onPageChange={() => {}}
        />

        <section className="developer-my-task-content">

          <TaskDetail
            task={selectedTask}
            onBack={() => setSelectedTask(null)}
          />

        </section>

      </main>
    );
  }

  return (
    <main className="developer-my-task-page">

      <Sidebar
        activePage="my-tasks"
        onPageChange={() => {}}
      />

      <section className="developer-my-task-content">

        <header className="developer-my-task-header">

          <div>

            <h1 className="developer-my-task-title">
              My Tasks
            </h1>

            <p className="developer-my-task-subtitle">
              Developer&apos;s personal Kanban — assigned tasks only.
            </p>

          </div>

          <div className="developer-my-task-user">

            <span className="developer-role-badge">
              DEVELOPER
            </span>

            <div className="developer-user-avatar">
              KV
            </div>

          </div>

        </header>

        <section className="developer-my-task-board">

          <div className="developer-my-task-board-header">

            <div>

              <h2 className="developer-my-task-board-title">
                My Tasks
              </h2>

              <p className="developer-my-task-board-subtitle">
                4 tasks assigned to you, across 2 projects
              </p>

            </div>

          </div>

          <div className="developer-project-filters">

            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`developer-project-filter ${
                  activeFilter === filter
                    ? "developer-project-filter-active"
                    : ""
                }`}
              >
                {filter}
              </button>
            ))}

          </div>

          <div className="developer-kanban-wrapper">

            <div className="developer-kanban">

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