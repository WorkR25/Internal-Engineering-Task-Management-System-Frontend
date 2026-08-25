"use client";

import { useState } from "react";
import Sidebar from "../../../components/admin-components/layout/sidebar";
import CreateTask from "../../../components/admin-components/task-components/create-task";
import "./task-board.css"; // <-- Import the new stylesheet

const tasks = {
  todo: [
    { title: "Add rate limiting to auth/signin", priority: "HIGH", developer: "Karan Verma", deadline: "Dec 2, 2026" },
    { title: "Seed assignment reason", priority: "LOW", developer: "Nisha Patel", deadline: "Dec 5, 2026" },
  ],
  inProgress: [
    { title: "Implement payment webhook handler", priority: "HIGH", developer: "Sahil Das", deadline: "Dec 4, 2026" },
    { title: "Add pagination to GET tasks", priority: "MEDIUM", developer: "Nisha Patel", deadline: "Dec 6, 2026" },
  ],
  inReview: [
    { title: "Fix N+1 query on dashboard", priority: "HIGH", developer: "Rhea Sen", deadline: "Dec 3, 2026" },
    { title: "Refactor webhook retry logic", priority: "MEDIUM", developer: "Sahil Das", deadline: "Dec 7, 2026" },
  ],
  changesRequested: [
    { title: "Refactor review scoring service", priority: "CRITICAL", developer: "Karan Verma", deadline: "Dec 5, 2026" },
  ],
  completed: [
    { title: "Seed roles and assignment reasons", priority: "LOW", developer: "Sahil Das", deadline: "Nov 28, 2026" },
    { title: "Set up Sequelize migrations", priority: "LOW", developer: "Nisha Patel", deadline: "Nov 30, 2026" },
  ],
};

type Task = {
  title: string;
  priority: string;
  developer: string;
  deadline: string;
};

// --- Subcomponents ---

function TaskCard({ title, priority, developer, deadline }: Task) {
  const getPriorityClass = (level: string) => {
    switch (level) {
      case "CRITICAL": return "priority-critical";
      case "HIGH": return "priority-high";
      case "MEDIUM": return "priority-medium";
      default: return "priority-low";
    }
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>

      <div className="task-meta">
        <span className={`priority-badge-base ${getPriorityClass(priority)}`}>
          {priority}
        </span>
        <span className="task-deadline">{deadline}</span>
      </div>

      <div className="task-dev-wrapper">
        <div className="task-dev-avatar">
          {developer.split(" ").map((name) => name[0]).join("")}
        </div>
        <span className="task-dev-name">{developer}</span>
      </div>
    </div>
  );
}

function Column({ title, count, tasks }: { title: string; count: number; tasks: Task[] }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-badge">{count}</span>
      </div>

      <div className="column-task-list">
        {tasks.map((task) => (
          <TaskCard key={task.title} {...task} />
        ))}
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function TaskBoard() {
  const [showCreateTask, setShowCreateTask] = useState(false);

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
              <h1 className="header-title">Task Board</h1>
              <p className="header-subtitle">Payments Platform · 9 open tasks</p>
            </div>

            <div className="header-actions">
              <button
                type="button"
                onClick={() => setShowCreateTask(true)}
                className="btn-new-task"
              >
                + New Task
              </button>

              <span className="admin-badge">ADMIN</span>
              <div className="admin-avatar">AG</div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="filters-wrapper">
            <button type="button" className="btn-filter-active">
              All Tasks
            </button>
            <button type="button" className="btn-filter-inactive">
              My Tasks
            </button>
            <button type="button" className="btn-filter-inactive">
              High Priority
            </button>
            <button type="button" className="btn-filter-inactive">
              Overdue
            </button>
          </div>

          {/* TASK BOARD */}
          <div className="kanban-scroll-area">
            <div className="kanban-container">
              <Column title="TODO" count={tasks.todo.length} tasks={tasks.todo} />
              <Column title="IN PROGRESS" count={tasks.inProgress.length} tasks={tasks.inProgress} />
              <Column title="IN REVIEW" count={tasks.inReview.length} tasks={tasks.inReview} />
              <Column title="CHANGES REQUESTED" count={tasks.changesRequested.length} tasks={tasks.changesRequested} />
              <Column title="COMPLETED" count={tasks.completed.length} tasks={tasks.completed} />
            </div>
          </div>

        </div>
      </main>

      {/* CREATE TASK MODAL */}
      <CreateTask
        open={showCreateTask}
        onClose={() => setShowCreateTask(false)}
      />

    </div>
  );
}