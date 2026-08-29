import axiosInstance from "@/configs/axios.config";

export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface CreateRoleResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export async function createRole(
  data: CreateRoleRequest
): Promise<CreateRoleResponse> {
  const response = await axiosInstance.post<CreateRoleResponse>(
    "/roles",
    data
  );

  return response.data;
}