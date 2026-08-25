"use client";

import { useEffect, useState } from "react";
import "./add-member.css"; // <-- Import your Tailwind stylesheet

const developers = [
  { id: 1, name: "Vikram Rao", role: "Backend", tasks: 2, joined: "joined team Jul 2026", initials: "VR" },
  { id: 2, name: "Ishita Malhotra", role: "QA", tasks: 1, joined: "joined team Aug 2026", initials: "IM" },
  // { id: 3, name: "Rahul Sharma", role: "Frontend", tasks: 3, joined: "joined team Aug 2026", initials: "RS" },
];

interface AddMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMember({ isOpen, onClose }: AddMemberProps) {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDeveloper = developers.find(
    (developer) => developer.id === selected
  );

  // ==========================================
  // API INTEGRATION HANDLER
  // ==========================================
  const handleAddToProject = async () => {
    if (!selectedDeveloper) return;

    try {
      // 1. Prepare your payload for the backend
      const payload = {
        developerId: selectedDeveloper.id,
        // projectId: "YOUR_PROJECT_ID_HERE" // Pass this down via props later
      };

      // 2. Make your API Request Here
      // Example: 
      // const response = await fetch('/api/projects/add-member', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // 
      // if (!response.ok) throw new Error("Failed to add member");

      console.log("Simulating API Call with Payload:", payload);

      // 3. Trigger UI success state
      setSuccessMessage(`${selectedDeveloper.name} added to the project successfully.`);

      // 4. Close modal automatically after brief delay
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1800);
      
    } catch (error) {
      console.error("Error adding developer to project:", error);
      // Optional: Handle error UI here (e.g., set an errorMessage state)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Project Member</h2>
            <p className="modal-subtitle">
              Payments Platform · showing active Developers not yet on this project
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Available Developers Title */}
        <div className="list-title">Available Developers</div>

        {/* Developer List */}
        <div className="developer-list">
          {filteredDevelopers.map((developer) => {
            const isSelected = selected === developer.id;

            return (
              <button
                type="button"
                key={developer.id}
                onClick={() => {
                  setSelected(developer.id);
                  setSuccessMessage(""); // Clear alert if they select a new dev
                }}
                className={`developer-card ${isSelected ? "card-selected" : "card-unselected"}`}
              >
                {/* Developer Info */}
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

                {/* Radio Button UI */}
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
              disabled={!!successMessage}
              className={`btn-submit ${successMessage ? "btn-submit-disabled" : "btn-submit-active"}`}
            >
              {successMessage ? "Added ✓" : "Add to Project"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}