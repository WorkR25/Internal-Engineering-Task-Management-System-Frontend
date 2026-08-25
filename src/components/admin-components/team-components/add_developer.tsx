"use client";

import React, { useState, useEffect } from "react";
import "./add_developer.css";

interface AddDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddDeveloperModal({
  isOpen,
  onClose,
}: AddDeveloperModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

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

  if (!isOpen) return null;

  const handleCreateAccount = () => {
    // TODO: Integrate your POST /api/v1/auth/signup API call here

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="add-developer-overlay">
      <div className="add-developer-modal">
        {/* Modal Header */}
        <div className="add-developer-header">
          <div>
            <h2 className="add-developer-title">Add Developer</h2>

            <p className="add-developer-subtitle">
              There is no public sign-up — accounts are created by Admin only
            </p>
          </div>

          <button
            onClick={handleClose}
            className="add-developer-close-button"
          >
            <svg
              className="close-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Success View OR Form View */}
        {isSuccess ? (
          <div className="success-container">
            <div className="success-icon-container">
              <svg
                className="success-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="success-title">
              Account Created Successfully!
            </h3>

            <p className="success-message">
              The developer can now sign in using the temporary password.
            </p>
          </div>
        ) : (
          <>
            {/* Modal Body */}
            <div className="add-developer-body">
              <div>
                <label className="form-label">Full Name</label>

                <input
                  type="text"
                  placeholder="Priyanka Iyer"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Email</label>

                <input
                  type="email"
                  placeholder="priyanka.iyer@company.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="password-label">
                  Temporary Password
                </label>

                <div className="password-container">
                  <input
                    type="text"
                    value="Tr8•kL2•pQm9"
                    readOnly
                    className="password-input"
                  />

                  <span className="auto-generated-badge">
                    Auto-generated
                  </span>
                </div>
              </div>

              {/* Info Box */}
              <div className="info-box">
                <svg
                  className="info-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="info-text">
                  The Developer must change this password on first sign-in. It
                  won't be shown again after this account is created — share it
                  securely.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="add-developer-footer">
              <div className="role-status">
                Role: DEVELOPER · Status: Active
              </div>

              <div className="footer-buttons">
                <button
                  onClick={handleClose}
                  className="cancel-button"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateAccount}
                  className="create-account-button"
                >
                  Create Account
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}