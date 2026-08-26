"use client";

import { useState } from "react";
import "./reassign-task.css";

type Developer = {
  initials: string;
  name: string;
  role: string;
  activeTasks: number;
};

const developers: Developer[] = [
  {
    initials: "NP",
    name: "Neha Patil",
    role: "Backend",
    activeTasks: 3,
  },
  {
    initials: "RS",
    name: "Rhea Sen",
    role: "Full-stack",
    activeTasks: 5,
  },
  {
    initials: "SD",
    name: "Sahil Das",
    role: "Backend",
    activeTasks: 4,
  },
];

const reasons = [
  "DEVELOPER UNAVAILABLE — Availability / leave",
  "WORKLOAD BALANCING",
  "SKILL / OWNERSHIP FIT",
  "DEADLINE RISK",
  "OTHER",
];

type Task = {
  title: string;
  developer: string | null;
  status: string;
};

interface ReassignTaskProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

export default function ReassignTask({ open, task, onClose }: ReassignTaskProps) {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [reassigned, setReassigned] = useState(false);

  if (!open || !task) return null;

  const handleReassign = () => {
    setReassigned(true);
    setTimeout(() => {
      setReassigned(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="reassign-task-container">
      <div className="reassign-task-wrapper">
        <div className="reassign-task-card">
          <div className="reassign-task-header">
            <div>
              <h1>Reassign Task</h1>
              <p>
                Closes the current assignment and opens a new one — history is
                preserved
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="reassign-task-close"
            >
              ×
            </button>
          </div>

          <div className="reassign-task-body">
            <div className="reassign-task-current">
              <div className="reassign-task-current-info">
                <p>{task.title}</p>
                <span>
                  Currently assigned to {task.developer ?? "Unassigned"} · Payments Platform
                </span>
              </div>

              <span className="reassign-task-status">
                {task.status}
              </span>
            </div>

            <div className="reassign-task-section">
              <p className="reassign-task-label">
                Reassign to
              </p>

              <div className="reassign-task-developers">
                {developers.map((developer) => (
                  <label
                    key={developer.name}
                    className={`reassign-task-developer ${
                      selectedDeveloper === developer.name
                        ? "reassign-task-developer-selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="developer"
                      value={developer.name}
                      checked={selectedDeveloper === developer.name}
                      onChange={(event) =>
                        setSelectedDeveloper(event.target.value)
                      }
                    />

                    <div className="reassign-task-avatar">
                      {developer.initials}
                    </div>

                    <div className="reassign-task-developer-info">
                      <p>{developer.name}</p>
                      <span>
                        {developer.role} · {developer.activeTasks} active tasks
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="reassign-task-section">
              <label
                htmlFor="reason"
                className="reassign-task-label"
              >
                Reason
              </label>

              <select
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
              >
                <option value="" disabled>
                  Select a reason
                </option>

                {reasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <span className="reassign-task-note-badge">
                Does not affect performance
              </span>
            </div>

            <div className="reassign-task-section">
              <label
                htmlFor="note"
                className="reassign-task-label"
              >
                Note{" "}
                <span>
                  (optional)
                </span>
              </label>

              <textarea
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={2}
                placeholder="Karan is on approved leave from Dec 3–10. Moving this to Neha to keep the sprint on track."
              />
            </div>
          </div>

          <div className="reassign-task-footer">
            {!reassigned && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="reassign-task-cancel"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="reassign-task-submit"
                  onClick={handleReassign}
                >
                  Reassign Task
                </button>
              </>
            )}
          </div>

          {reassigned && (
            <div className="reassign-success-message">
              <span>✓</span> Task Reassigned successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}