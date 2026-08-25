"use client";

import { useState } from "react";
import "../create-project.css"; // <-- Import the new stylesheet

export default function CreateProject() {
    // State management for form fields
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [targetEndDate, setTargetEndDate] = useState("");
    
    // API Integration Handler
    const handleCreateProject = async () => {
        // Prepare the payload mapping your local state to the expected API schema
        const payload = {
            name: projectName,
            description,
            startDate,
            targetEndDate,
        };

        try {
            // [API ENDPOINT LOCATION]
            // Example: POST /api/v1/projects
            // const response = await fetch('/api/v1/projects', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // });
            
            // if (!response.ok) throw new Error("Failed to create project");
            
            // Handle success (e.g., show a toast notification, redirect, or close modal)
            console.log("Submitting payload:", payload);
        } catch (error) {
            // Handle error (e.g., display error message to the user)
            console.error(error);
        }
    };

    return (
        <main className="create-project-main">
            <div className="modal-container">
                
                {/* Header Section */}
                <div className="modal-header">
                    <div className="modal-header-flex">
                        <div>
                            <h1 className="modal-title">Create Project</h1>
                            <p className="modal-subtitle">
                                New projects start in PLANNING status
                            </p>
                        </div>
                        <button type="button" className="btn-close">
                            ×
                        </button>
                    </div>
                </div>

                {/* Form Body Section */}
                <div className="form-body">
                    
                    {/* Project Name Field */}
                    <div className="form-group">
                        <label htmlFor="projectName" className="form-label">
                            Project Name
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Analytics Pipeline v2"
                            className="form-input"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Rebuild the nightly analytics aggregation pipeline to support real-time developer performance snapshots."
                            rows={3}
                            className="form-textarea"
                        />
                    </div>

                    {/* Dates Configuration (Start & End) */}
                    <div className="dates-grid">
                        <div>
                            <label htmlFor="startDate" className="form-label">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="targetEndDate" className="form-label">
                                Target End Date
                            </label>
                            <input
                                id="targetEndDate"
                                type="date"
                                value={targetEndDate}
                                onChange={(e) => setTargetEndDate(e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer / Actions Section */}
                <div className="modal-footer">
                    <p className="footer-hint">
                        You&apos;ll add team members after creating
                    </p>
                    <div className="footer-actions">
                        <button type="button" className="btn-cancel">
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
        </main>
    );
}