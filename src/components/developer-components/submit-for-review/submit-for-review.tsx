"use client";

import { useState } from "react";
import "./submit-for-review.css";

interface SubmitForReviewProps {
  onClose?: () => void;
}

export default function SubmitForReview({
  onClose,
}: SubmitForReviewProps) {
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit =
    pullRequestUrl.trim().length > 0 && notes.trim().length > 0;

  return (
    <div className="submit-review-page">
      <div className="submit-review">
        <div className="submit-review-header">
          <div>
            <h2>Submit for Review</h2>

            <p>
              This will be Attempt 2 — moves the task to IN_REVIEW
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

        <div className="submit-review-content">
          <div className="submit-review-task">
            <div>
              <p className="submit-review-task-title">
                Refactor review scoring service
              </p>

              <p className="submit-review-task-meta">
                Payments Platform · previously CHANGES_REQUESTED
              </p>
            </div>

            <span className="submit-review-critical">
              CRITICAL
            </span>
          </div>

          <div className="submit-review-field">
            <label htmlFor="pullRequestUrl">
              Pull Request URL
            </label>

            <input
              id="pullRequestUrl"
              type="text"
              value={pullRequestUrl}
              onChange={(event) =>
                setPullRequestUrl(event.target.value)
              }
              placeholder="github.com/company/payments-platform/pull/471"
            />
          </div>

          <div className="submit-review-field">
            <label htmlFor="notes">
              Notes <span>(optional)</span>
            </label>

            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Switched the cache to Redis with a TTL of 10 minutes, and added a test that fires concurrent review writes to confirm validation is race-free."
            />
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
        </div>

        <div className="submit-review-footer">
          <p>Task must be IN_PROGRESS to submit</p>

          <div className="submit-review-actions">
            <button
              type="button"
              onClick={onClose}
              className="submit-review-cancel"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!canSubmit}
              className={`submit-review-submit ${
                canSubmit
                  ? "submit-review-submit-active"
                  : ""
              }`}
            >
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}