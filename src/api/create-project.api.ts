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

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data: Project[]; // import Project from wherever it should canonically live
}

export async function createProject(
  data: CreateProjectRequest
): Promise<CreateProjectResponse> {
  const response = await fetch("/backend/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create project");
  }

  return result;
}

export async function getAllProjects(): Promise<GetProjectsResponse> {
  const response = await fetch("/backend/projects", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch projects");
  }

  return result;
}