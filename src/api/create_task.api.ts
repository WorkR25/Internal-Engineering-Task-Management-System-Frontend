export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

export interface CreateTaskRequest {
  projectId: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
}

export interface CreateTaskResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export async function createTask(
  data: CreateTaskRequest
): Promise<CreateTaskResponse> {
  const response = await fetch("/backend/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");

  const result = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    if (typeof result === "string") {
      throw new Error(result);
    }

    throw new Error(
      result?.message || "Failed to create task"
    );
  }

  return result;
}