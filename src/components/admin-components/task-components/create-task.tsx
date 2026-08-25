"use client";

import { FormEvent, useState } from "react";
import "./create-task.css";

type CreateTaskProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateTask({
  open,
  onClose,
}: CreateTaskProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="create-task-overlay">

      <div className="create-task-modal">

        {submitted ? (

          <div className="create-task-success">

            <div className="create-task-success-icon">
              ✓
            </div>

            <h2 className="create-task-success-title">
              Task submitted
            </h2>

            <p className="create-task-success-text">
              Your new task has been submitted successfully.
            </p>

          </div>

        ) : (

          <>

            <div className="create-task-header">

              <div>
                <h2 className="create-task-title">
                  New Task
                </h2>

                <p className="create-task-subtitle">
                  Create a new task for Payments Platform
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="create-task-close"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="create-task-form"
            >

              <div className="create-task-fields">

                <div>
                  <label className="create-task-label">
                    Title
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter task title"
                    className="create-task-input"
                  />
                </div>

                <div>
                  <label className="create-task-label">
                    Description
                  </label>

                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the task"
                    className="create-task-textarea"
                  />
                </div>

                <div>
                  <label className="create-task-label">
                    Acceptance Criteria
                  </label>

                  <textarea
                    required
                    rows={3}
                    placeholder="Enter acceptance criteria"
                    className="create-task-textarea"
                  />
                </div>

                <div className="create-task-priority-deadline">

                  <div>
                    <label className="create-task-label">
                      Priority
                    </label>

                    <select
                      defaultValue="HIGH"
                      className="create-task-input"
                    >
                      <option value="LOW">
                        Low
                      </option>

                      <option value="MEDIUM">
                        Medium
                      </option>

                      <option value="HIGH">
                        High
                      </option>

                      <option value="CRITICAL">
                        Critical
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="create-task-label">
                      Deadline
                    </label>

                    <input
                      type="date"
                      required
                      className="create-task-input"
                    />
                  </div>

                </div>

              </div>

              <div className="create-task-footer">

                <button
                  type="button"
                  onClick={onClose}
                  className="create-task-cancel"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-task-submit"
                >
                  Create Task
                </button>

              </div>

            </form>

          </>
        )}

      </div>
    </div>
  );
}