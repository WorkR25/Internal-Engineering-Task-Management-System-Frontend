"use client";

import React, { useState, useEffect } from 'react';
import "./create-role.css";


interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateRole = () => {
    // Simulate API Call
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="create-role-overlay">
      <div className="create-role-card">

        {/* Modal Header */}
        <div className="create-role-header">
          <div className="create-role-header-content">
            <h1>Create New Role</h1>
            <p>Define permissions and access levels for your team</p>
          </div>
          <button onClick={handleClose} className="create-role-close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success View OR Form View */}
        {isSuccess ? (
          <div className="create-role-success">
            <div className="create-role-success-icon">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Role Created Successfully!</h3>
          </div>
        ) : (
          <>
            {/* Modal Body */}
            <div className="create-role-form">
              <div className="create-role-field">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Engineer"
                />
              </div>

              <div className="create-role-field-description">
                <label>Description</label>
                <textarea
                  placeholder="Briefly describe the responsibilities..."
                  rows={3}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="create-role-footer">
              <div className="create-role-actions">
                <button onClick={handleClose} className="create-role-cancel">
                  Cancel
                </button>
                <button onClick={handleCreateRole} className="create-role-submit">
                  Create Role
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}