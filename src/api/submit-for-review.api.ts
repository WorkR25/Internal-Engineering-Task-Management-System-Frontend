export type SubmitForReviewRequest = {
  taskId: number;
  pullRequestUrl: string;
  notes?: string;
};

export type SubmitForReviewResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export async function submitForReview(
  data: SubmitForReviewRequest
): Promise<SubmitForReviewResponse> {
  const response = await fetch(
    `/backend/tasks/${data.taskId}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        prUrl: data.pullRequestUrl,
        notes: data.notes,
      }),
    }
  );

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `API returned HTML instead of JSON. Status: ${response.status}. Check API URL and backend route.`
    );
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to submit for review"
    );
  }

  return result;
}