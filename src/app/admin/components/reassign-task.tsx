"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAllUsers } from "@/api/user.api";

type Developer = {
  id: string;
  initials: string;
  name: string;
  role: string;
  activeTasks: number;
};

type Task = {
  title: string;
  developer: string | null;
  status: string;
};

interface ReassignTaskProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

const reasons = [
  "DEVELOPER UNAVAILABLE — Availability / leave",
  "WORKLOAD BALANCING",
  "SKILL / OWNERSHIP FIT",
  "DEADLINE RISK",
  "OTHER",
];

const reassignTaskSchema = z.object({
  developer: z.string().min(1, "Please select a developer to reassign to"),
  reason: z.string().min(1, "Please select a reason for reassignment"),
  note: z.string(),
});

type ReassignTaskFormValues = z.infer<typeof reassignTaskSchema>;

export default function ReassignTask({
  open,
  task,
  onClose,
}: ReassignTaskProps) {
  const [reassigned, setReassigned] = useState(false);

  const {
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReassignTaskFormValues>({
    resolver: zodResolver(reassignTaskSchema),
    defaultValues: {
      developer: "",
      reason: "",
      note: "",
    },
  });

  const selectedDeveloper = watch("developer");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: getAllUsers,
    enabled: open,
  });

  const developers: Developer[] = users
    .filter((user) => user.isActive && user.roleId === "2")
    .map((user) => ({
      id: user.id,
      initials: user.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      name: user.fullName,
      role: "Developer",
      activeTasks: 0,
    }));

  useEffect(() => {
    if (open) {
      setReassigned(false);
      reset({
        developer: "",
        reason: "",
        note: "",
      });
    }
  }, [open, task, reset]);

  if (!open || !task) {
    return null;
  }

  const handleReassign = handleSubmit((data) => {
    const developer = developers.find(
      (item) => item.id === data.developer
    );

    if (!developer || developer.name === task.developer) {
      return;
    }

    setReassigned(true);

    setTimeout(() => {
      setReassigned(false);
      reset();
      onClose();
    }, 2000);
  });

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 px-4 py-4">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Reassign Task
              </h1>

              <p className="mt-1 text-[11px] text-gray-500">
                Closes the current assignment and opens a new one —
                history is preserved
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
            <div className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-900">
                  {task.title}
                </p>

                <span className="mt-1 block text-[10px] text-gray-500">
                  Currently assigned to{" "}
                  {task.developer ?? "Unassigned"} · Payments Platform
                </span>
              </div>

              <span className="whitespace-nowrap rounded-full bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600">
                {task.status}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-[11px] font-semibold text-gray-700">
                Reassign to
              </p>

              {isLoading && (
                <p className="mt-3 text-[10px] text-gray-500">
                  Loading developers...
                </p>
              )}

              {isError && (
                <p className="mt-3 text-[10px] text-red-600">
                  Failed to load developers.
                </p>
              )}

              {!isLoading && !isError && developers.length === 0 && (
                <p className="mt-3 text-[10px] text-gray-500">
                  No active developers found.
                </p>
              )}

              {!isLoading && !isError && developers.length > 0 && (
                <div className="mt-1.5 space-y-1.5">
                  {developers.map((developer) => {
                    const isCurrentAssignee =
                      developer.name === task.developer;

                    const isSelected =
                      selectedDeveloper === developer.id;

                    return (
                      <label
                        key={developer.id}
                        className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 transition ${
                          isCurrentAssignee
                            ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
                            : isSelected
                              ? "cursor-pointer border-[#5146e5] bg-[#eeedff]"
                              : "cursor-pointer border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          value={developer.id}
                          disabled={isCurrentAssignee}
                          className="h-3.5 w-3.5 accent-[#5146e5]"
                          {...register("developer")}
                        />

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeedff] text-[9px] font-semibold text-[#5146e5]">
                          {developer.initials}
                        </div>

                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-gray-900">
                            {developer.name}
                            {isCurrentAssignee &&
                              " (already assigned)"}
                          </p>

                          <span className="mt-0.5 block text-[9px] text-gray-500">
                            {developer.role} ·{" "}
                            {developer.activeTasks} active tasks
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {errors.developer && (
                <p className="mt-1.5 text-[9px] text-red-600">
                  {errors.developer.message}
                </p>
              )}
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
                {...register("reason")}
                className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[10px] text-gray-700 outline-none focus:border-[#5146e5]"
              >
                <option value="" disabled>
                  Select a reason
                </option>

                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {errors.reason && (
                <p className="mt-1.5 text-[9px] text-red-600">
                  {errors.reason.message}
                </p>
              )}

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
                rows={2}
                placeholder="Karan is on approved leave from Dec 3–10. Moving this to Neha to keep the sprint on track."
                {...register("note")}
                className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-[10px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#5146e5]"
              />
            </div>
          </div>

          {!reassigned && (
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
                onClick={handleReassign}
                disabled={developers.length === 0}
                className="rounded-lg bg-[#5146e5] px-4 py-1.5 text-[10px] font-semibold text-white hover:bg-[#453bd1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reassign Task
              </button>
            </div>
          )}

          {reassigned && (
            <div className="mx-5 mb-4 flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-xs font-semibold text-green-700">
              <span>✓</span>
              Task Reassigned successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}