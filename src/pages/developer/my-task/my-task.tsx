"use client";

import Sidebar from "../../../components/developer-components/sidebar/sidebar";
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

function TaskCard({ task }: { task: Task }) {
  return (
    <div className={`developer-task-card priority-${task.priority.toLowerCase()}`}>
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
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function MyTask() {
  return (
    <main className="developer-my-task-page">

      {/* SIDEBAR */}
      <Sidebar activePage="my-tasks" />

      {/* MAIN CONTENT */}
      <section className="developer-my-task-content">

        {/* PAGE HEADER */}
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

        {/* TASK BOARD */}
        <section className="developer-my-task-board">

          {/* BOARD HEADER */}
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

          {/* PROJECT FILTERS */}
          <div className="developer-project-filters">

            <button
              type="button"
              className="developer-project-filter developer-project-filter-active"
            >
              All Projects
            </button>

            <button
              type="button"
              className="developer-project-filter"
            >
              Payments Platform
            </button>

            <button
              type="button"
              className="developer-project-filter"
            >
              Notification Service
            </button>

          </div>

          {/* KANBAN */}
          <div className="developer-kanban-wrapper">

            <div className="developer-kanban">

              <TaskColumn
                title="TO DO"
                tasks={tasks.todo}
              />

              <TaskColumn
                title="IN PROGRESS"
                tasks={tasks.inProgress}
              />

              <TaskColumn
                title="IN REVIEW"
                tasks={tasks.inReview}
              />

              <TaskColumn
                title="CHANGES REQUESTED"
                tasks={tasks.changesRequested}
              />

              <TaskColumn
                title="COMPLETED"
                tasks={tasks.completed}
              />

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}