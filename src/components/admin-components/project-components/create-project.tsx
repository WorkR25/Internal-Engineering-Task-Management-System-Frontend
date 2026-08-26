"use client";

import { useState } from "react";
import "./create-project.css";

type CreateProjectProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateProject({
  open,
  onClose,
}: CreateProjectProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetEndDate, setTargetEndDate] = useState("");

  const handleCreateProject = async () => {
    const payload = {
      name: projectName,
      description,
      startDate,
      targetEndDate,
    };

    try {
      /*
       * API will be connected here later.
       */
      console.log("Submitting payload:", payload);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="create-project-overlay">

      <div className="modal-container">

        {/* HEADER */}

        <div className="modal-header">

          <div className="modal-header-flex">

            <div>

              <h1 className="modal-title">
                Create Project
              </h1>

              <p className="modal-subtitle">
                New projects start in PLANNING status
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-close"
            >
              ×
            </button>

          </div>

        </div>

        {/* FORM BODY */}

        <div className="form-body">

          {/* PROJECT NAME */}

          <div className="form-group">

            <label
              htmlFor="projectName"
              className="form-label"
            >
              Project Name
            </label>

            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              placeholder="Analytics Pipeline v2"
              className="form-input"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label
              htmlFor="description"
              className="form-label"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Rebuild the nightly analytics aggregation pipeline to support real-time developer performance snapshots."
              rows={3}
              className="form-textarea"
            />

          </div>

          {/* DATES */}

          <div className="dates-grid">

            <div>

              <label
                htmlFor="startDate"
                className="form-label"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="form-input"
              />

            </div>

            <div>

              <label
                htmlFor="targetEndDate"
                className="form-label"
              >
                Target End Date
              </label>

              <input
                id="targetEndDate"
                type="date"
                value={targetEndDate}
                onChange={(e) =>
                  setTargetEndDate(e.target.value)
                }
                className="form-input"
              />

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="modal-footer">

          <p className="footer-hint">
            You&apos;ll add team members after creating
          </p>

          <div className="footer-actions">

            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleCreateProject}
              className="btn-submit"
            >
              Create Project
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}