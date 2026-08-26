"use client";

import { useState } from "react";
import "./create-role.css";

interface CreateRoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRole({isOpen,onClose,}: CreateRoleProps) {
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    if (!isOpen) return null;

    return (
        <main className="create-role-page">
            <div className="create-role-card">
                <div className="create-role-header">
                    <div className="create-role-header-content">
                        <h1>Create Role</h1>
                        <p>
                            Roles define what an actor may do across the system
                        </p>
                    </div>

                    <button
                        type="button"
                        className="create-role-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="create-role-form">
                    <div className="create-role-info">
                        <p>
                            ⓘ V1 ships with two seeded roles —{" "}
                            <span>ADMIN</span> and{" "}
                            <span>DEVELOPER</span>.
                            Custom roles are stored here for future use;
                            permission scoping per role is not yet configurable.
                        </p>
                    </div>

                    <div className="create-role-field">
                        <label htmlFor="roleName">
                            Role Name
                        </label>

                        <input
                            id="roleName"
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="REVIEWER"
                        />
                    </div>

                    <div className="create-role-field-description">
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Read-only access to review submissions and scoring history for assigned projects. Cannot approve or request changes."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="create-role-footer">
                    <p>
                        Name must be unique
                    </p>

                    <div className="create-role-actions">
                        <button
                            type="button"
                            className="create-role-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="create-role-submit"
                        >
                            Create Role
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}