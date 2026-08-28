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
        notes: data.notes?.trim() || undefined,
      }),
    }
  );

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (!result) {
      throw new Error(
        `Request failed with status ${response.status}. Check the API route and backend server.`
      );
    }

    throw new Error(
      result.message || "Failed to submit for review"
    );
  }

  if (!result) {
    throw new Error(
      `API returned a non-JSON response. Status: ${response.status}`
    );
  }

  return result as SubmitForReviewResponse;
}