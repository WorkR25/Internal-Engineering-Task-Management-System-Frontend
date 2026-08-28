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

export interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project;
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

export async function getProject(
  projectId: number
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch project"
    );
  }

  return result;
}

export async function updateProject(
  projectId: number,
  data: UpdateProjectRequest
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update project"
    );
  }

  return result;
}

export async function updateProjectStatus(
  projectId: number,
  data: UpdateProjectStatusRequest
): Promise<ProjectResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update project status"
    );
  }

  return result;
}