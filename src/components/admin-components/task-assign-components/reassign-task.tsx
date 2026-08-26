"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./reassign-task.css";

type Developer = {
  initials: string;
  name: string;
  role: string;
  activeTasks: number;
};

const developers: Developer[] = [
  { initials: "NP", name: "Neha Patil", role: "Backend", activeTasks: 3 },
  { initials: "RS", name: "Rhea Sen", role: "Full-stack", activeTasks: 5 },
  { initials: "SD", name: "Sahil Das", role: "Backend", activeTasks: 4 },
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

// ==========================================
// ZOD SCHEMA
// ==========================================
const reassignTaskSchema = z.object({
  developer: z
    .string()
    .min(1, "Please select a developer to reassign to")
    .refine((name) => developers.some((d) => d.name === name), {
      message: "Please select a valid developer",
    }),
  reason: z.string().min(1, "Please select a reason for reassignment"),
  note: z.string(),
});

type ReassignTaskFormValues = z.infer<typeof reassignTaskSchema>;

export default function ReassignTask({ open, task, onClose }: ReassignTaskProps) {
  const [reassigned, setReassigned] = useState(false);

  const {
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReassignTaskFormValues>({
    resolver: zodResolver(reassignTaskSchema),
    defaultValues: {
      developer: "",
      reason: "",
      note: "",
    },
  });

  const selectedDeveloper = watch("developer");

  if (!open || !task) return null;

  // ==========================================
  // SUBMIT HANDLER
  // ==========================================
  const handleReassign = handleSubmit(async (data) => {
    const developer = developers.find((d) => d.name === data.developer);

    // Guard: never reassign to the developer already on the task
    if (!developer || developer.name === task.developer) return;

    const payload = {
      taskTitle: task.title,
      newDeveloper: developer.name,
      reason: data.reason,
      note: data.note,
    };

    // API INTEGRATION POINT
    // const response = await fetch('/api/tasks/reassign', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // if (!response.ok) throw new Error("Failed to reassign task");

    console.log("Simulating Reassign API Call with Payload:", payload);

    setReassigned(true);

    setTimeout(() => {
      setReassigned(false);
      reset();
      onClose();
    }, 2000);
  });

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
                {developers.map((developer) => {
                  const isCurrentAssignee = developer.name === task.developer;

                  return (
                    <label
                      key={developer.name}
                      className={`reassign-task-developer ${
                        selectedDeveloper === developer.name
                          ? "reassign-task-developer-selected"
                          : ""
                      }`}
                      style={isCurrentAssignee ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
                    >
                      <input
                        type="radio"
                        value={developer.name}
                        disabled={isCurrentAssignee}
                        {...register("developer")}
                      />

                      <div className="reassign-task-avatar">
                        {developer.initials}
                      </div>

                      <div className="reassign-task-developer-info">
                        <p>
                          {developer.name}
                          {isCurrentAssignee && " (already assigned)"}
                        </p>
                        <span>
                          {developer.role} · {developer.activeTasks} active tasks
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {errors.developer && (
                <p style={{ marginTop: 6, fontSize: 9, color: "#dc2626" }}>
                  {errors.developer.message}
                </p>
              )}
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
                {...register("reason")}
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

              {errors.reason && (
                 <p className="mt-1.5 text-[9px] text-red-600">
                     {errors.reason.message}
               </p>
        )}

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
                rows={2}
                placeholder="Karan is on approved leave from Dec 3–10. Moving this to Neha to keep the sprint on track."
                {...register("note")}
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