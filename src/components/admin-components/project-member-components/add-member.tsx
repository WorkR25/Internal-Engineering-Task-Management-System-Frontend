"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./add-member.css";

const developers = [
  { id: 1, name: "Vikram Rao", role: "Backend", tasks: 2, joined: "joined team Jul 2026", initials: "VR" },
  { id: 2, name: "Ishita Malhotra", role: "QA", tasks: 1, joined: "joined team Aug 2026", initials: "IM" },
  // { id: 3, name: "Rahul Sharma", role: "Frontend", tasks: 3, joined: "joined team Aug 2026", initials: "RS" },
];

interface AddMemberProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

// ==========================================
// ZOD SCHEMA
// ==========================================
const addMemberSchema = z.object({
  developerId: z
    .number()
    .refine((id) => developers.some((d) => d.id === id), {
      message: "Please select a developer to continue",
    }),
  search: z.string(),
  successMessage: z.string(),
});

type AddMemberFormValues = z.infer<typeof addMemberSchema>;

export default function AddMember({ isOpen, onClose, projectName = "Payments Platform" }: AddMemberProps) {
  const {
    watch,
    setValue,
    handleSubmit,
    register,
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      developerId: 0, // no developer selected yet
      search: "",
      successMessage: "",
    },
  });

  const selected = watch("developerId");
  const search = watch("search");
  const successMessage = watch("successMessage");

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDeveloper = developers.find(
    (developer) => developer.id === selected
  );

  // FIX: if the currently selected developer is no longer visible in the
  // filtered (searched) list, clear the selection so it can't be submitted.
  useEffect(() => {
    if (selected !== 0 && !filteredDevelopers.some((d) => d.id === selected)) {
      setValue("developerId", 0, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // ==========================================
  // API INTEGRATION HANDLER
  // ==========================================
  const handleAddToProject = handleSubmit(async (data) => {
    const developer = developers.find((d) => d.id === data.developerId);

    // FIX: double-guard — never add a developer who isn't in the
    // currently visible/filtered list, even if state somehow got stale.
    if (!developer || !filteredDevelopers.some((d) => d.id === developer.id)) {
      return;
    }

    try {
      const payload = {
        developerId: developer.id,
        // projectId: "YOUR_PROJECT_ID_HERE"
      };

      // const response = await fetch('/api/projects/add-member', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // if (!response.ok) throw new Error("Failed to add member");

      console.log("Simulating API Call with Payload:", payload);

      setValue(
        "successMessage",
        `${developer.name} added to the project successfully.`
      );

      setTimeout(() => {
        setValue("successMessage", "");
        onClose();
      }, 1800);

    } catch (error) {
      console.error("Error adding developer to project:", error);
    }
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Project Member</h2>
            <p className="modal-subtitle">
              {projectName} · showing active Developers not yet on this project
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn-close">
            ×
          </button>
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Developers..."
            {...register("search")}
            className="search-input"
          />
        </div>

        {/* Available Developers Title */}
        <div className="list-title">Available Developers</div>

        {/* Hidden field so react-hook-form + zod validates a selection exists */}
        <input
          type="hidden"
          {...register("developerId", { valueAsNumber: true })}
        />

        {/* Developer List */}
        <div className="developer-list">
          {filteredDevelopers.map((developer) => {
            const isSelected = selected === developer.id;

            return (
              <button
                type="button"
                key={developer.id}
                onClick={() => {
                  setValue("developerId", developer.id, { shouldValidate: true });
                  setValue("successMessage", "");
                }}
                className={`developer-card ${isSelected ? "card-selected" : "card-unselected"}`}
              >
                <div className="developer-info">
                  <div className="developer-initials">
                    {developer.initials}
                  </div>
                  <div className="developer-details">
                    <strong className="developer-name">{developer.name}</strong>
                    <span className="developer-meta">
                      {developer.role} · {developer.tasks} active tasks · {developer.joined}
                    </span>
                  </div>
                </div>

                <div className={`radio-outer ${isSelected ? "radio-selected" : "radio-unselected"}`}>
                  {isSelected && <div className="radio-inner" />}
                </div>
              </button>
            );
          })}

          {/* Empty State */}
          {filteredDevelopers.length === 0 && (
            <div className="no-results">No developers found</div>
          )}
        </div>

        {/* Success Message Alert */}
        {successMessage && (
          <div className="alert-success">✓ {successMessage}</div>
        )}

        {/* Footer */}
        <div className="modal-footer">
          <span className="already-members-text">
            Karan Verma, Sahil Das, Neha Patil, Rhea Sen<br />
            and Aman Thakur are already members
          </span>

          <div className="footer-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddToProject}
              disabled={
                !!successMessage ||
                !selectedDeveloper ||
                !filteredDevelopers.some((d) => d.id === selectedDeveloper.id)
              }
              className={`btn-submit ${
                successMessage ||
                !selectedDeveloper ||
                !filteredDevelopers.some((d) => d.id === selectedDeveloper.id)
                  ? "btn-submit-disabled"
                  : "btn-submit-active"
              }`}
            >
              {successMessage ? "Added ✓" : "Add to Project"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}