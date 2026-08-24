"use client";

import { useState } from "react";

export default function CreateRole() {
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <main className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 px-5 py-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-sm font-bold text-gray-900">
                                Create Role
                            </h1>

                            <p className="mt-0.5 text-[10px] text-gray-500">
                                Roles define what an actor may do across the system
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
                    {/* Information */}
                    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                        <p className="text-[10px] leading-4 text-gray-600">
                            ⓘ V1 ships with two seeded roles —{" "}
                            <span className="font-semibold">ADMIN</span> and{" "}
                            <span className="font-semibold">DEVELOPER</span>.
                            Custom roles are stored here for future use;
                            permission scoping per role is not yet configurable.
                        </p>
                    </div>

                    {/* Role Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="roleName"
                            className="mb-1.5 block text-[10px] font-semibold text-gray-700"
                        >
                            Role Name
                        </label>

                        <input
                            id="roleName"
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="REVIEWER"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                        />
                    </div>

                    {/* Description */}
                    <div>
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
                            placeholder="Read-only access to review submissions and scoring history for assigned projects. Cannot approve or request changes."
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-5 py-3">
                    <p className="text-[9px] text-gray-400">
                        Name must be unique
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
                            Create Role
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}