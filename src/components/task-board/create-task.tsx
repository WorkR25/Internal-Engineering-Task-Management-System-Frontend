"use client";

import { FormEvent, useState } from "react";

type CreateTaskProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateTask({
  open,
  onClose,
}: CreateTaskProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Static for now.
    // API will be connected here later.
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4">

      <div className="w-full max-w-[450px] rounded-xl bg-white shadow-xl">

        {submitted ? (

          /* SUCCESS MESSAGE */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Task submitted
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your new task has been submitted successfully.
            </p>

          </div>

        ) : (

          <>
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  New Task
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Create a new task for Payments Platform
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-lg text-gray-400 hover:text-gray-600"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="px-6 py-5"
            >

              <div className="space-y-4">

                {/* TITLE */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Title
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter task title"
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the task"
                    className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                  />
                </div>

                {/* ACCEPTANCE CRITERIA */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Acceptance Criteria
                  </label>

                  <textarea
                    required
                    rows={3}
                    placeholder="Enter acceptance criteria"
                    className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                  />
                </div>

                {/* PRIORITY + DEADLINE */}
                <div className="grid grid-cols-2 gap-3">

                  {/* PRIORITY */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Priority
                    </label>

                    <select
                      defaultValue="HIGH"
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                    >
                      <option value="LOW">
                        Low
                      </option>

                      <option value="MEDIUM">
                        Medium
                      </option>

                      <option value="HIGH">
                        High
                      </option>

                      <option value="CRITICAL">
                        Critical
                      </option>
                    </select>
                  </div>

                  {/* DEADLINE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Deadline
                    </label>

                    <input
                      type="date"
                      required
                      className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#5146e5]"
                    />
                  </div>

                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-[#5146e5] px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Create Task
                </button>

              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}