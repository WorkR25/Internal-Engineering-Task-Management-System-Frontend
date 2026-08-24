"use client";

import { useState } from "react";

type Developer = {
  initials: string;
  name: string;
  role: string;
  activeTasks: number;
};

const developers: Developer[] = [
  {
    initials: "NP",
    name: "Neha Patil",
    role: "Backend",
    activeTasks: 3,
  },
  {
    initials: "RS",
    name: "Rhea Sen",
    role: "Full-stack",
    activeTasks: 5,
  },
  {
    initials: "SD",
    name: "Sahil Das",
    role: "Backend",
    activeTasks: 4,
  },
];

const reasons = [
  "DEVELOPER UNAVAILABLE — Availability / leave",
  "WORKLOAD BALANCING",
  "SKILL / OWNERSHIP FIT",
  "DEADLINE RISK",
  "OTHER",
];

interface ReassignTaskProps {
  onClose: () => void;
}

export default function ReassignTask({ onClose }: ReassignTaskProps) {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const isFormValid =
    selectedDeveloper.trim() !== "" &&
    reason.trim() !== "" &&
    note.trim() !== "";

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-4 py-4">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Reassign Task
              </h1>

              <p className="mt-1 text-[11px] text-gray-500">
                Closes the current assignment and opens a new one — history is
                preserved
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="px-5 py-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    Add pagination to GET /tasks
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Currently assigned to Karan Verma · Payments Platform
                  </p>
                </div>

                <span className="whitespace-nowrap rounded-full bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600">
                  IN_PROGRESS
                </span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[11px] font-semibold text-gray-700">
                Reassign to
              </p>

              <div className="mt-1.5 space-y-1.5">
                {developers.map((developer) => (
                  <label
                    key={developer.name}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 transition ${
                      selectedDeveloper === developer.name
                        ? "border-[#5146e5] bg-[#eeedff]"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="developer"
                      value={developer.name}
                      checked={selectedDeveloper === developer.name}
                      onChange={(event) =>
                        setSelectedDeveloper(event.target.value)
                      }
                      className="h-3.5 w-3.5 accent-[#5146e5]"
                    />

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
                      {developer.initials}
                    </div>

                    <div className="flex-1">
                      <p className="text-[11px] font-semibold text-gray-900">
                        {developer.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-gray-500">
                        {developer.role} · {developer.activeTasks} active
                        tasks
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="reason"
                className="text-[11px] font-semibold text-gray-700"
              >
                Reason
              </label>

              <select
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[10px] text-gray-700 outline-none focus:border-[#5146e5]"
              >
                <option value="" disabled>
                  Select a reason
                </option>

                {reasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <span className="mt-1.5 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">
                Does not affect performance
              </span>
            </div>

            <div className="mt-3">
              <label
                htmlFor="note"
                className="text-[11px] font-semibold text-gray-700"
              >
                Note{" "}
                <span className="font-normal text-gray-400">
                  (optional)
                </span>
              </label>

              <textarea
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={2}
                placeholder="Karan is on approved leave from Dec 3–10. Moving this to Neha to keep the sprint on track."
                className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-[10px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#5146e5]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!isFormValid}
              className={`rounded-lg px-4 py-1.5 text-[10px] font-semibold text-white ${
                isFormValid
                  ? "bg-[#5146e5] hover:bg-[#453bd1]"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Reassign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}