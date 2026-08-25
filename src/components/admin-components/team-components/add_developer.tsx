"use client";

import React, { useState, useEffect } from "react";
import "./add_developer.css"; // Styles for this modal (see add-developer.css)


interface AddDeveloperModalProps {
  isOpen: boolean;      // Controls whether the modal is rendered
  onClose: () => void;  // Called when the modal should close (Cancel, X button, or after success)
}

// Shape of the data we collect from the form and send to the backend.
// Update this if the API needs additional/different fields.
interface NewDeveloperFormData {
  fullName: string;
  email: string;
}

/* ============================================================
   Component
   ============================================================ */

export default function AddDeveloperModal({ isOpen, onClose }: AddDeveloperModalProps) {
  // Toggles between the form view and the "success" confirmation view
  const [isSuccess, setIsSuccess] = useState(false);

  // Controlled form fields
  const [formData, setFormData] = useState<NewDeveloperFormData>({
    fullName: "",
    email: "",
  });

  // The temporary password shown to the admin after account creation.
  // Currently hardcoded for the UI mock — see API note in handleCreateAccount below.
  const [tempPassword, setTempPassword] = useState("Tr8•kL2•pQm9");

  // Loading / error state for the future API call
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lock/unlock page scroll while the modal is open, and restore it
  // automatically if the component unmounts unexpectedly.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Don't render anything when the modal is closed
  if (!isOpen) return null;

  /**
   * Updates a single form field as the admin types.
   */
  const handleInputChange = (field: keyof NewDeveloperFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handles the "Create Account" button click.
   *
   * ------------------------------------------------------------
   * API INTEGRATION POINT
   * ------------------------------------------------------------
   * Replace the simulated logic below with a real request, e.g.:
   *
   *   POST /api/v1/auth/signup
   *   Body: { fullName: formData.fullName, email: formData.email }
   *   Response (expected): { tempPassword: string, developerId: string, ... }
  
  
   
   * ------------------------------------------------------------
   */
  const handleCreateAccount = () => {
    // TODO: Integrate your POST /api/v1/auth/signup API call here.
    // For now we simulate a successful account creation.
    setIsSuccess(true);

    // Auto-close the modal and reset state a few seconds after success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  /**
   * Handles closing the modal (Cancel button or X icon).
   * Resets local state so the form is fresh next time it opens.
   */
  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ fullName: "", email: "" });
    setErrorMessage(null);
    onClose();
  };

  return (
    // Dimmed, blurred backdrop behind the modal
    <div className="modal-overlay">
      <div className="modal-card">

        {/* ---------- Header ---------- */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Developer</h2>
            <p className="modal-subtitle">
              There is no public sign-up — accounts are created by Admin only
            </p>
          </div>
          <button onClick={handleClose} className="modal-close-btn" aria-label="Close modal">
            <svg className="modal-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ---------- Success View OR Form View ---------- */}
        {isSuccess ? (
          // Shown briefly after the account is created successfully
          <div className="success-container">
            <div className="success-icon-wrapper">
              <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="success-title">Account Created Successfully!</h3>
            <p className="success-message">
              The developer can now sign in using the temporary password.
            </p>
          </div>
        ) : (
          <>
            {/* ---------- Form Body ---------- */}
            <div className="modal-body">

              {/* Full Name field */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Priyanka Iyer"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Email field */}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="priyanka.iyer@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Auto-generated temporary password (read-only).
                  API NOTE: once the backend is wired up, this value should
                  come from the signup response instead of the hardcoded default. */}
              <div className="form-group">
                <label className="form-label-dark">Temporary Password</label>
                <div className="password-field-wrapper">
                  <input
                    type="text"
                    value={tempPassword}
                    readOnly
                    className="password-input"
                  />
                  <span className="password-badge">Auto-generated</span>
                </div>
              </div>

              {/* Info notice about the temporary password */}
              <div className="info-box">
                <svg className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="info-text">
                  The Developer must change this password on first sign-in. It won't be shown
                  again after this account is created — share it securely.
                </p>
              </div>

              {/* Error message, shown if the future API call fails */}
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
            </div>

            {/* ---------- Footer ---------- */}
            <div className="modal-footer">
              <div className="footer-meta">Role: DEVELOPER · Status: Active</div>
              <div className="footer-actions">
                <button onClick={handleClose} className="btn-cancel">
                  Cancel
                </button>
                <button
                  onClick={handleCreateAccount}
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}