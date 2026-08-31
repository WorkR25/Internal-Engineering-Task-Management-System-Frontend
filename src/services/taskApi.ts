import axiosInstance from "@/configs/axios.config";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

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

export interface AssignTaskRequest {
  developerId: number;
}

export interface AssignTaskResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    taskId: number;
    developerId: number;
    assignedBy: number;
    isCurrent: boolean;
  };
}

export async function createTask(
  data: CreateTaskRequest
): Promise<CreateTaskResponse> {
  const response = await axiosInstance.post<CreateTaskResponse>(
    "/tasks",
    data
  );

  return response.data;
}

export async function getTasks(
  projectId?: number
): Promise<GetTasksResponse> {
  const response = await axiosInstance.get<GetTasksResponse>("/tasks", {
    params: projectId ? { projectId } : undefined,
  });

  return response.data;
}

export async function assignTask(
  taskId: number,
  data: AssignTaskRequest
): Promise<AssignTaskResponse> {
  const response = await axiosInstance.post<AssignTaskResponse>(
    `/tasks/${taskId}/assign`,
    data
  );

  return response.data;
}