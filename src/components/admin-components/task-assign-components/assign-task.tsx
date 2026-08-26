"use client";

import { useState } from "react";
import "./assign-task.css";

const developers = [
  { id: 1, name: "Karan Verma", role: "Backend", tasks: 6, initials: "KV" },
  { id: 2, name: "Neha Patil", role: "Backend", tasks: 3, initials: "NP" },
  { id: 3, name: "Rhea Sen", role: "Full-stack", tasks: 5, initials: "RS" },
  { id: 4, name: "Sahil Das", role: "Backend", tasks: 4, initials: "SD" },
];

// 1. add Task type + props type, change the function signature
type Task = {
  title: string;
  priority: string;
  developer: string | null;
  deadline: string;
};

type AssignTaskProps = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
};

export default function AssignTask({ open, task, onClose }: AssignTaskProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [assigned, setAssigned] = useState(false);

  if (!open || !task) return null;


  const handleAssign = () => {
    setAssigned(true);
    setTimeout(() => {
      setAssigned(false);
      onClose();
    }, 2200);
  };


  return (
    <div className="assign-task-modal">
      <div className="assign-task-header">
        <div>
          <h2 className="assign-task-title">Assign Task</h2>

          <p className="assign-task-subtitle">
            Assign an active project member as the current owner
          </p>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="task-info">
        <div className="task-name">
          {task.title}
        </div>

        <div className="task-meta">
          <span>Payments Platform</span>
          <span>·</span>
          <span>Due {task.deadline}</span>

          <b className="priority-badge">{task.priority}</b>

          <b className="status-badge">TODO</b>
        </div>
      </div>

      <div className="assign-label">Assign to</div>

      <div className="developer-list">
        {developers.map((developer) => {
          const isSelected = selected === developer.id;

          return (
            <button
              type="button"
              key={developer.id}
              onClick={() => setSelected(developer.id)}
              className={`developer-button ${
                isSelected ? "developer-button-selected" : ""
              }`}
            >
              <div className="developer-info">
                <div className="developer-avatar">
                  {developer.initials}
                </div>

                <div className="developer-details">
                  <strong className="developer-name">
                    {developer.name}
                  </strong>

                  <span className="developer-role">
                    {developer.role} · {developer.tasks} active tasks
                  </span>
                </div>
              </div>

              <div
                className={`radio-button ${
                  isSelected ? "radio-button-selected" : ""
                }`}
              >
                {isSelected && <div className="radio-dot" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="assign-task-footer">
        <span className="footer-note">
          Only active members of this project are shown
        </span>

        <div className="footer-actions">
          {!assigned && (
            <>
              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="assign-button"
                onClick={handleAssign}
              >
                Assign Task
              </button>
            </>
          )}

        </div>
          {assigned && (
            <div className="assign-success-message">
              <span>✓</span> Task Assigned successfully
            </div>
          )}
      </div>
    </div>
  );
}