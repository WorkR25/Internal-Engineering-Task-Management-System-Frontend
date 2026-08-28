export interface ProjectMember {
  id: number;
  userId: number;
  role: string;
  joinedAt: string;
  user: {
    fullName: string;
    email: string;
  };
}
export interface Developer {
  id: number;
  fullName: string;
  email: string;
  roleId: string;
  isActive: boolean;
}

export interface AddProjectMemberRequest {
  userId: number;
}

export interface ProjectMemberResponse {
  success: boolean;
  message: string;
  data: ProjectMember;
}

export interface ProjectMembersResponse {
  success: boolean;
  message: string;
  data: ProjectMember[];
}

export interface DevelopersResponse {
  success: boolean;
  message: string;
  data: Developer[];
}

export async function getProjectMembers(
  projectId: number
): Promise<ProjectMembersResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}/members`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch project members"
    );
  }

  return result;
}

export async function getDevelopers(): Promise<DevelopersResponse> {
  const response = await fetch("/backend/users", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch developers"
    );
  }

  return result;
}

export async function addProjectMember(
  projectId: number,
  data: AddProjectMemberRequest
): Promise<ProjectMemberResponse> {
  const response = await fetch(
    `/backend/projects/${projectId}/members`,
    {
      method: "POST",
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
      result?.message || "Failed to add project member"
    );
  }

  return result;
}

export async function removeProjectMember(
  projectId: number,
  userId: number
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(
    `/backend/projects/${projectId}/members/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to remove project member"
    );
  }

  return result;
}