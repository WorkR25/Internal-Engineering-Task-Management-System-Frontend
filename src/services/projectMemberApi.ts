import axiosInstance from "@/configs/axios.config";

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
  const response = await axiosInstance.get<ProjectMembersResponse>(
    `/projects/${projectId}/members`
  );

  return response.data;
}

export async function getDevelopers(): Promise<DevelopersResponse> {
  const response = await axiosInstance.get<DevelopersResponse>(
    "/users",
    {
      params: {
        roleId: 2,
      },
    }
  );

  return response.data;
}

export async function addProjectMember(
  projectId: number,
  data: AddProjectMemberRequest
): Promise<ProjectMemberResponse> {
  const response = await axiosInstance.post<ProjectMemberResponse>(
    `/projects/${projectId}/members`,
    data
  );

  return response.data;
}

export async function removeProjectMember(
  projectId: number,
  userId: number
): Promise<{ success: boolean; message: string }> {
  const response = await axiosInstance.delete<{
    success: boolean;
    message: string;
  }>(`/projects/${projectId}/members/${userId}`);

  return response.data;
}