"use client";

import { useState } from "react";
import "./AssignTask.css";

const developers = [
  { id: 1, name: "Karan Verma", role: "Backend", tasks: 6, initials: "KV" },
  { id: 2, name: "Neha Patil", role: "Backend", tasks: 3, initials: "NP" },
  { id: 3, name: "Rhea Sen", role: "Full-stack", tasks: 5, initials: "RS" },
  { id: 4, name: "Sahil Das", role: "Backend", tasks: 4, initials: "SD" },
];

export default function AssignTask() {
  const [selected, setSelected] = useState(2);

  return (
    <div className="assign-task-modal">
      {/* Header */}
      <div className="assign-task-header">
        <div>
          <h2 className="assign-task-title">Assign Task</h2>

          <p className="assign-task-subtitle">
            Assign an active project member as the current owner
          </p>
        </div>

        <button className="close-button">×</button>
      </div>

      {/* Task Information */}
      <div className="task-info">
        <div className="task-name">
          Add rate limiting to /auth/signin
        </div>

        <div className="task-meta">
          <span>Payments Platform</span>
          <span>·</span>
          <span>Due Dec 2, 2026</span>

          <b className="priority-badge">MEDIUM</b>

          <b className="status-badge">TODO</b>
        </div>
      </div>

      {/* Assign To */}
      <div className="assign-label">Assign to</div>

      <div className="developer-list">
        {developers.map((developer) => (
          <button
            key={developer.id}
            onClick={() => setSelected(developer.id)}
            className={`developer-button ${
              selected === developer.id ? "selected" : ""
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
                selected === developer.id ? "selected" : ""
              }`}
            >
              {selected === developer.id && (
                <div className="radio-dot" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="assign-task-footer">
        <span className="footer-note">
          Only active members of this project are shown
        </span>

        <div className="footer-actions">
          <button className="cancel-button">
            Cancel
          </button>

          <button className="assign-button">
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}