"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitForReview } from "@/services/submitForReviewApi";

interface SubmitForReviewProps {
  task: {
    id: number;
    assignmentId: number;
    title: string;
    project: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    attempt?: number;
  };

  onSubmitted?: (submission: SubmitForReviewFormValues) => void;

  onClose?: () => void;
}

const githubPrUrlRegex =
  /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d+\/?$/i;

const submitForReviewSchema = z.object({
  pullRequestUrl: z
    .string()
    .trim()
    .min(1, "Pull request URL is required")
    .regex(
      githubPrUrlRegex,
      "Enter a valid GitHub pull request URL (e.g. github.com/org/repo/pull/123)"
    ),

  notes: z.string().trim().optional(),
});

type SubmitForReviewFormValues = z.infer<
  typeof submitForReviewSchema
>;

export default function SubmitForReview({
  task,
  onSubmitted,
  onClose,
}: SubmitForReviewProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubmitForReviewFormValues>({
    resolver: zodResolver(submitForReviewSchema),
    mode: "onChange",
    defaultValues: {
      pullRequestUrl: "",
      notes: "",
    },
  });

  const pullRequestUrl = watch("pullRequestUrl");
  const notes = watch("notes");

  const canSubmit = submitForReviewSchema.safeParse({
    pullRequestUrl,
    notes,
  }).success;

  const submitForReviewMutation = useMutation({
    mutationFn: submitForReview,

    onSuccess: () => {
      onSubmitted?.({
        pullRequestUrl,
        notes,
      });

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        reset();
        onClose?.();
      }, 1800);
    },

    onError: (error) => {
      console.error(
        "Submit for review failed:",
        error
      );
    },
  });

  const onSubmit = (
    data: SubmitForReviewFormValues
  ) => {
    submitForReviewMutation.mutate({
      taskId: task.id,
      assignmentId: task.assignmentId,
      pullRequestUrl: data.pullRequestUrl,
      notes: data.notes,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-4 py-6">
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        {submitted ? (
          <div className="px-5 py-4">
            <div className="mt-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2.5">
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-blue-400 text-[8px] font-semibold text-blue-500">
                ✓
              </span>

              <p className="text-[9px] leading-4 text-blue-600">
                Submitted successfully — this attempt is now locked and
                visible to your Admin.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Submit for Review
                </h2>

                <p className="mt-1 text-[10px] text-gray-500">
                  This will be Attempt {task.attempt ?? 1} — moves the task
                  to READY FOR REVIEW
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-6 w-6 items-center justify-center rounded-md text-sm text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-800">
                      {task.title}
                    </p>

                    <p className="mt-0.5 text-[9px] text-gray-500">
                      {task.project} · previously CHANGES_REQUESTED
                    </p>
                  </div>

                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-[8px] font-semibold text-red-500">
                    {task.priority}
                  </span>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="pullRequestUrl"
                    className="text-[9px] font-semibold text-gray-700"
                  >
                    Pull Request URL
                  </label>

                  <input
                    id="pullRequestUrl"
                    type="text"
                    placeholder="github.com/company/payments-platform/pull/471"
                    {...register("pullRequestUrl")}
                    className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5146e5] focus:ring-1 focus:ring-[#5146e5]/10"
                  />

                  {errors.pullRequestUrl && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.pullRequestUrl.message}
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="notes"
                    className="text-[9px] font-semibold text-gray-700"
                  >
                    Notes{" "}
                    <span className="font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Switched the cache to Redis with a TTL of 10 minutes, and added a test that fires concurrent review writes to confirm validation is race-free."
                    {...register("notes")}
                    className="mt-1.5 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] leading-4 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5146e5] focus:ring-1 focus:ring-[#5146e5]/10"
                  />

                  {errors.notes && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2.5">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-blue-400 text-[8px] font-semibold text-blue-500">
                    i
                  </span>

                  <p className="text-[9px] leading-4 text-blue-600">
                    Once submitted, this attempt is locked and visible to
                    your Admin — you won&apos;t be able to edit the PR link
                    or notes after submitting.
                  </p>
                </div>

                {submitForReviewMutation.isError && (
                  <p className="mt-1 text-xs text-red-600">
                    {submitForReviewMutation.error instanceof Error
                      ? submitForReviewMutation.error.message
                      : "Failed to submit for review"}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3">
                <p className="text-[9px] text-gray-400">
                  Task must be IN_PROGRESS to submit
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[9px] font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={submitForReviewMutation.isPending}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      !canSubmit ||
                      submitForReviewMutation.isPending
                    }
                    className={`rounded-md px-3 py-1.5 text-[9px] font-semibold text-white ${
                      canSubmit &&
                      !submitForReviewMutation.isPending
                        ? "cursor-pointer bg-[#5146e5] hover:bg-[#453bd1]"
                        : "cursor-not-allowed bg-gray-300"
                    }`}
                  >
                    {submitForReviewMutation.isPending
                      ? "Submitting..."
                      : "Submit for Review"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}