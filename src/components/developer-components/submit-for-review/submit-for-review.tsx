"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  submitForReview,
} from "@/api/submit-for-review.api";

import "./submit-for-review.css";

interface SubmitForReviewProps {
  task: {
    id: number;
    title: string;
    project: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    attempt?: number;
  };

  onSubmitted?: (submission: SubmitForReviewFormValues) => void;

  onClose?: () => void;
}

// ==========================================
// ZOD SCHEMA
// ==========================================

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
      pullRequestUrl: data.pullRequestUrl,
      notes: data.notes,
    });
  };

  return (
    <div className="submit-review-page">
      <div className="submit-review">
        {submitted ? (
          <div className="submit-review-content">
            <div className="submit-review-info">
              <span className="submit-review-info-icon">
                ✓
              </span>

              <p>
                Submitted successfully — this attempt is now locked and
                visible to your Admin.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="submit-review-header">
              <div>
                <h2>Submit for Review</h2>

                <p>
                  This will be Attempt {task.attempt ?? 1} — moves the task to
                  IN_REVIEW
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="submit-review-close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="submit-review-content">
                <div className="submit-review-task">
                  <div>
                    <p className="submit-review-task-title">
                      {task.title}
                    </p>

                    <p className="submit-review-task-meta">
                      {task.project} · previously CHANGES_REQUESTED
                    </p>
                  </div>

                  <span className="submit-review-priority">
                    {task.priority}
                  </span>
                </div>

                <div className="submit-review-field">
                  <label htmlFor="pullRequestUrl">
                    Pull Request URL
                  </label>

                  <input
                    id="pullRequestUrl"
                    type="text"
                    placeholder="github.com/company/payments-platform/pull/471"
                    {...register("pullRequestUrl")}
                  />

                  {errors.pullRequestUrl && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.pullRequestUrl.message}
                    </p>
                  )}
                </div>

                <div className="submit-review-field">
                  <label htmlFor="notes">
                    Notes <span>(optional)</span>
                  </label>

                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Switched the cache to Redis with a TTL of 10 minutes, and added a test that fires concurrent review writes to confirm validation is race-free."
                    {...register("notes")}
                  />

                  {errors.notes && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                <div className="submit-review-info">
                  <span className="submit-review-info-icon">
                    i
                  </span>

                  <p>
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

              <div className="submit-review-footer">
                <p>Task must be IN_PROGRESS to submit</p>

                <div className="submit-review-actions">
                  <button
                    type="button"
                    onClick={onClose}
                    className="submit-review-cancel"
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
                    className={`submit-review-submit ${
                      canSubmit &&
                      !submitForReviewMutation.isPending
                        ? "submit-review-submit-active"
                        : ""
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