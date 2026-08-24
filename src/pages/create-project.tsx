"use client";

import { useState } from "react";

export default function CreateProject() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [targetEndDate, setTargetEndDate] = useState("");

    return (
        <main className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 px-5 py-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-sm font-bold text-gray-900">
                                Create Project
                            </h1>

                            <p className="mt-0.5 text-[10px] text-gray-500">
                                New projects start in PLANNING status
                            </p>
                        </div>

                        <button
                            type="button"
                            className="text-sm text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="px-5 py-4">
                    {/* Project Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="projectName"
                            className="mb-1.5 block text-[10px] font-semibold text-gray-700"
                        >
                            Project Name
                        </label>

                        <input
                            id="projectName"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Analytics Pipeline v2"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="mb-1.5 block text-[10px] font-semibold text-gray-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Rebuild the nightly analytics aggregation pipeline to support real-time developer performance snapshots."
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label
                                htmlFor="startDate"
                                className="mb-1.5 block text-[10px] font-semibold text-gray-700"
                            >
                                Start Date
                            </label>

                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="targetEndDate"
                                className="mb-1.5 block text-[10px] font-semibold text-gray-700"
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
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-5 py-3">
                    <p className="text-[9px] text-gray-400">
                        You&apos;ll add team members after creating
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-indigo-700"
                        >
                            Create Project
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}