import axiosInstance from "@/configs/axios.config";

export type SubmitForReviewRequest = {
  taskId: number;
  assignmentId: number;
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
  const response =
    await axiosInstance.post<SubmitForReviewResponse>(
      `/tasks/${data.taskId}/submissions`,
      {
        assignmentId: data.assignmentId,
        prUrl: data.pullRequestUrl,
        notes: data.notes?.trim() || undefined,
      }
    );

  return response.data;
}