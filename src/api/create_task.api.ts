export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "CHANGES_REQUESTED"
  | "READY_FOR_REVIEW"
  | "REOPENED"
  | "COMPLETED";

export interface CreateTaskRequest {
  projectId: number;
  title: string;
  description?: string;
  acceptanceCriteria?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
}

export interface CreateTaskResponse {
  success: boolean;
  message: string;
  data: unknown;
}

/*
 * This type is ONLY for data returned by the task API.
 *
 * Do NOT use this as the Task type for AssignTask/ReassignTask.
 * Those components already have their own Task types.
 */
export interface ApiTask {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  acceptanceCriteria?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string | null;
  developer?: {
    id: number;
    name: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetTasksResponse {
  success: boolean;
  message: string;
  data: ApiTask[];
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

/*
 * Get tasks.
 *
 * The projectId is optional so the same function can be used
 * later for other task-board screens.
 */
export async function getTasks(
  projectId?: number
): Promise<GetTasksResponse> {
  const url = projectId
    ? `/backend/tasks?projectId=${projectId}`
    : "/backend/tasks";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
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
      result?.message || "Failed to fetch tasks"
    );
  }

  return result;
}