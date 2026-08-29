import axiosInstance from "@/configs/axios.config";

export interface Project {
  id: number;
  name: string;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  openTasks: number;
  targetEnd: string;
  description: string;
  startDate: string;
  targetEndDate: string;
  createdBy: string;
  completed: number;
  inReview: number;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: Project[];
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: string;
  targetEndDate: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  startDate?: string | null;
  targetEndDate?: string | null;
}

export interface UpdateProjectStatusRequest {
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
}

export async function getProjects(): Promise<ProjectsResponse> {
  const response = await axiosInstance.get<ProjectsResponse>(
    "/projects"
  );

  return response.data;
}

export async function getProject(
  projectId: number
): Promise<ProjectResponse> {
  const response = await axiosInstance.get<ProjectResponse>(
    `/projects/${projectId}`
  );

  return response.data;
}

export async function createProject(
  data: CreateProjectRequest
): Promise<CreateProjectResponse> {
  const response = await axiosInstance.post<CreateProjectResponse>(
    "/projects",
    data
  );

  return response.data;
}

export async function updateProject(
  projectId: number,
  data: UpdateProjectRequest
): Promise<ProjectResponse> {
  const response = await axiosInstance.patch<ProjectResponse>(
    `/projects/${projectId}`,
    data
  );

  return response.data;
}

export async function updateProjectStatus(
  projectId: number,
  data: UpdateProjectStatusRequest
): Promise<ProjectResponse> {
  const response = await axiosInstance.patch<ProjectResponse>(
    `/projects/${projectId}/status`,
    data
  );

  return response.data;
}